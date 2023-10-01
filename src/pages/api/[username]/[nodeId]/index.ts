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
		for (const block of currentBlock) {
			let cypherQuery = '';

			// if (
			// 	!(block.type === ELEMENT_BLOCK || block.type === ELEMENT_NODE)
			// ) {
			// 	console.log("this shouldn't ever happen");
			// 	return;
			// }

			// Use the existing ID for the block
			let blockId = block.id;

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
		  `;

			// If the block has children, recursively save them
			if (block.children && block.children.length > 1) {
				// Create the child block

				const firstChildBlock: BlockElements = block
					.children[1] as BlockElements;

				cypherQuery += `
				MERGE (c:Block {id: "${firstChildBlock.id}"})
				SET c.type = "${firstChildBlock.type}", c.children = $firstBlockChildren
				MERGE (b)-[cr:CHILD_BLOCK]->(c)
				RETURN b
				`;

				console.log('write: ', cypherQuery);
				resArray.push(cypherQuery);
				const result = await write(cypherQuery, {
					firstBlockChildren: JSON.stringify(
						firstChildBlock.children
					),
					children: JSON.stringify([block.children[0]]),
				});
				console.log(result);
				resNodes.push(result);

				wholeDocumentSave(
					block.children.splice(2) as BlockElements[],
					firstChildBlock.id
				);
			} else {
				console.log('write: ', cypherQuery);
				cypherQuery += `
				RETURN b
				`;
				resArray.push(cypherQuery);
				const result = await write(cypherQuery, {
					children: JSON.stringify([block.children[0]]),
				});
				console.log(result);
				resNodes.push(result);
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
			// console.log('traverse');
			// console.log(obj);

			// Pushes the current node onto the list
			const { _type, _id, next_block, child_block, children, ...rest } =
				obj;
			// console.log(children);

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

			// console.log('current document');
			// console.log(document);
		};

		if (blockData.next_block) {
			traverseBlocks(document, blockData.next_block[0]);
		} else {
			// Do I need to do anything? I think returning a blank document is okay because it's a valid document, and historyedit will automatically send it.
		}

		console.log('output document');
		console.log(JSON.stringify(document, null, 2));

		// if there are no blocks

		// if (document.length === 1) {
		// 	if (data[0].n.document) {
		// 		const originalDoc = JSON.parse(data[0].n.document);
		// 		const cypher = wholeDocumentSave(originalDoc, data[0].n.id);
		// 		// console.log('conversion cypher');
		// 		// console.log(cypher);
		// 	}
		// }

		// console.log('data');
		// console.log({
		// 	n: data[0].n,
		// 	document,
		// });

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
