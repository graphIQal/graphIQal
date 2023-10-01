import {
	Block,
	MyTitleElement,
	ELEMENT_NODE,
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODETITLE,
} from '@/packages/editor/plateTypes';
import { getNodeData_cypher } from '../../../../backend/cypher-generation/cypherGenerators';
import { read, write } from '../../../../backend/driver/helpers';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const { nodeId } = params;
	// Find all relevant data to the node

	const cypher: string = `
	MATCH (n: Node {id: $nodeId})
	OPTIONAL MATCH (n)-[r]-(c:Node)
	WITH n, collect({r:r {.*, type: type(r), fromNode:(startNode(r) = n)}, connected_node:c {.*}}) AS connectedNodes
	MATCH path = (n)-[r:CHILD_BLOCK|NEXT_BLOCK*0..]->(p)
	WITH n, connectedNodes, collect(path) AS paths
	CALL apoc.convert.toTree(paths)
	YIELD value
	RETURN value, n {.*}, connectedNodes
	`;

	const data = await read(cypher, params);

	const resArray: string[] = [];
	const resNodes: any[] = [];

	// I NEED TO MAKE THE FIRST BLOCKS A CHILD BLOCK
	// because there can be a next-block in a node, in fact there can be multiple next_blocks for a node if it's part of multiple documents.
	// We will in fact need a fix for this.
	// It probably makes the most sense to include a property in the NEXT_BLOCK relationship about the document this NEXT_BLOCK is in.
	// That might help with other things such as duplicate blocks and stuff.

	const wholeDocumentSave = async (
		currentBlock: BlockElements[],
		prevBlockId: string
	) => {
		if (currentBlock.length === 0) return;

		const firstBlock = currentBlock[0];
		const firstBlockId = firstBlock.type === 'node' ? 'Node' : 'Block';

		const result = await write(
			`
		MERGE (p {id: "${prevBlockId}"})
		MERGE (b:${firstBlock.type === 'node' ? 'Node' : 'Block'} {id: "${
				firstBlock.id
			}"})

		SET b.type = "${firstBlock.type}", b.children = $children
		MERGE (p)-[cr:CHILD_BLOCK]->(b)
		SET cr.documentId = "${prevBlockId}"
		RETURN b
		`,
			{
				children: JSON.stringify([firstBlock.children[0]]),
			}
		);

		wholeDocumentSave(
			firstBlock.children.splice(1) as BlockElements[],
			firstBlockId
		);

		prevBlockId = firstBlockId;

		for (let i = 1; i < currentBlock.length; i++) {
			const block = currentBlock[i];
			let cypherQuery = '';

			// if (
			// 	!(block.type === ELEMENT_BLOCK || block.type === ELEMENT_NODE)
			// ) {
			// 	console.log("this shouldn't ever happen");
			// 	return;
			// }

			// Use the existing ID for the block
			let blockId = block.type === 'node' ? block.nodeId : block.id;

			cypherQuery += `
			// Need to detach previous blocks 
			// In the future we will turn this to a transaction, and make it so that it connects the previous and next blocks
			OPTIONAL MATCH ({id: "${blockId}"})-[l:NEXT_BLOCK | CHILD_BLOCK {documentId: "${nodeId}"}]-()
			DELETE l
			`;

			if (block.type === 'node') {
				blockId = block.nodeId;
				cypherQuery += `
				MERGE (b:Node {id: "${blockId}"})
				SET b.children = $children
				`;
			} else {
				cypherQuery += `
				MERGE (b:Block {id: "${blockId}"})
				SET b.type = "${block.type}", b.children = $children
				`;
			}

			// Create a new node for the block

			// Connect the block to the previous block
			cypherQuery += `
			MERGE (p {id: "${prevBlockId}"})
			MERGE (p)-[r:NEXT_BLOCK]->(b)
			SET r.documentId = "${nodeId}"
		  	`;

			// If the block has children, recursively save them
			if (block.children && block.children.length > 1) {
				// Create the child block

				wholeDocumentSave(
					block.children.splice(2) as BlockElements[],
					block.id
				);
			} else {
				cypherQuery += `
				RETURN b
				`;
				const result = await write(cypherQuery, {
					children: JSON.stringify([block.children[0]]),
				});
			}

			// Update the previous block ID for the next iteration
			prevBlockId = blockId;
		}
	};

	if ('err' in data) {
		// console.log('huh');
		res.status(400).json({ data, cypher, params });
	} else {
		// console.log('else');
		const blockData = data[0].value;
		const document: Block[] = [
			{
				type: 'title',
				id: 'Node Title',
				children: [{ text: blockData.title }],
			} as MyTitleElement,
		];

		// console.log('document data');
		// console.log(JSON.stringify(blockData, null, 2));

		// all we do is pass in the level, and we push it using recursion.
		const traverseBlocks = (currLevel: Block[], obj: any) => {
			console.log('traverse');
			console.log(obj);

			// Pushes the current node onto the list
			let { _type, _id, next_block, child_block, children, ...rest } =
				obj;
			// console.log(children);
			if (children === undefined) children = '[]';

			if (_type === 'Node') {
				// Add a nodeLink
				currLevel.push({
					...rest,
					children: [
						{
							type: ELEMENT_NODETITLE,
							routeString: `/${params.username}/${obj.id}`,
							icon: obj.icon,
							id: obj.id + '1',
							children: [
								{
									text: obj.title ? obj.title : 'Untitled',
								},
							],
						},
					],
					nodeId: obj.id,
					routeString: '/' + params.username + '/' + obj.id,
					type: ELEMENT_NODE,
				});
			} else {
				currLevel.push({ ...rest, children: JSON.parse(children) });
			}

			// First child = children;
			// Go into CHILD_BLOCKs for next child
			if (obj.child_block) {
				traverseBlocks(
					currLevel[currLevel.length - 1].children as Block[],
					obj.child_block[0]
				);
			}

			// Go into NEXT_BLOCK to add to the document
			if (obj.next_block) {
				traverseBlocks(currLevel, obj.next_block[0]);
			}
		};

		if (blockData.next_block) {
			traverseBlocks(document, blockData.next_block[0]);
		} else {
			// Do I need to do anything? I think returning a blank document is okay because it's a valid document, and historyedit will automatically send it.
		}
		// if there are no blocks

		if (document.length === 1) {
			if (data[0].n.document) {
				const originalDoc = JSON.parse(data[0].n.document);
				const req = wholeDocumentSave(originalDoc, data[0].n.id);
			}
		}

		res.status(200).json([
			{
				n: data[0].n,
				connectedNodes: data[0].connectedNodes,
				document,
				resArray,
				resNodes,
			},
		]);
	}
}
