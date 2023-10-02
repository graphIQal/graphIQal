import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../../backend/driver/helpers';
import {
	Block,
	BlockElements,
	MyBlockElement,
} from '@/packages/editor/plateTypes';
// import { wholeDocumentSave } from '@/backend/functions/general/document/mutate/wholeDocumentSave';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const document = JSON.parse(req.body);

	const { nodeId } = params;

	const cypher: string = `
	OPTIONAL MATCH (n:Node {id: $nodeId})-[r:CHILD_BLOCK]-(p)
	SET n.title = $title
	DELETE r
	RETURN n
	`;

	const resArray: any[] = [];

	const wholeDocumentSave = async (
		currentBlock: BlockElements[],
		prevBlockId: string,
		nodeId: string
	) => {
		if (currentBlock.length === 0) return;

		const firstBlock = currentBlock[0];

		let cypherQuery = ``;

		if (firstBlock.type === 'node') {
			cypherQuery += `
			OPTIONAL MATCH (Node {id: "${firstBlock.nodeId}"})-[l:NEXT_BLOCK {documentId: "${nodeId}"}]-()
			DELETE l
			`;
			nodeId = firstBlock.nodeId as string;
		} else {
			cypherQuery += `
			OPTIONAL MATCH (Block {id: "${firstBlock.id}"})-[l:NEXT_BLOCK | CHILD_BLOCK]-()
			DELETE l
			`;
		}

		cypherQuery += `
		MERGE (p {id: "${prevBlockId}"})
		MERGE (b:${firstBlock.type === 'node' ? 'Node' : 'Block'} {id: "${
			firstBlock.id
		}"})
		SET b.type = "${firstBlock.type}", b.children = $children
		MERGE (p)-[cr:CHILD_BLOCK]->(b)
		SET cr.documentId = "${nodeId}"
		RETURN b
		`;

		resArray.push(cypherQuery);
		const result = await write(cypherQuery, {
			children: JSON.stringify([firstBlock.children[0]]),
		});

		wholeDocumentSave(
			firstBlock.children.splice(1) as BlockElements[],
			firstBlock.id,
			nodeId
		);

		prevBlockId = firstBlock.id;

		for (let i = 1; i < currentBlock.length; i++) {
			const block = currentBlock[i];
			cypherQuery = '';

			// if (
			// 	!(block.type === ELEMENT_BLOCK || block.type === ELEMENT_NODE)
			// ) {
			// 	console.log("this shouldn't ever happen");
			// 	return;
			// }

			// Use the existing ID for the block
			let blockId = block.type === 'node' ? block.nodeId : block.id;

			if (block.type === 'node') {
				blockId = block.nodeId;
				nodeId = block.nodeId as string;

				cypherQuery += `
				OPTIONAL MATCH (Node {id: "${block.nodeId}"})-[l:NEXT_BLOCK {documentId: "${nodeId}"}]-()
				DELETE l
				MERGE (b:Node {id: "${blockId}"})
				SET b.children = $children
				`;
			} else {
				cypherQuery += `
				OPTIONAL MATCH (Block {id: "${block.id}"})-[l:NEXT_BLOCK | CHILD_BLOCK]-()
				DELETE l
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
			RETURN b
			  `;

			console.log(cypherQuery);
			resArray.push(cypherQuery);
			const result = await write(cypherQuery, {
				children: JSON.stringify([block.children[0]]),
			});

			// If the block has children, recursively save them
			if (block.children && block.children.length > 1) {
				// Create the child block

				wholeDocumentSave(
					block.children.splice(1) as BlockElements[],
					block.id,
					nodeId
				);
			}

			// Update the previous block ID for the next iteration
			prevBlockId = blockId;
		}
	};

	try {
		const title = write(cypher, params);
		const result = await wholeDocumentSave(
			document,
			nodeId as string,
			nodeId as string
		);
		res.status(200).json({ result, resArray });
		// res.status(200).json({ result: 'nothing yet' });
	} catch (e) {
		res.status(400).json(e);
	}

	// res.status(200).json(result);

	// res.status(200).json({ cypher, params });
}
