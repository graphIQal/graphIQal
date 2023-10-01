import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../../backend/driver/helpers';
import {
	Block,
	BlockElements,
	MyBlockElement,
} from '@/packages/editor/plateTypes';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const document = JSON.parse(req.body);

	const { nodeId } = params;

	const wholeDocumentSave = async (
		currentBlock: BlockElements[],
		prevBlockId: string
	) => {
		if (currentBlock.length === 0) return;

		const firstBlock = currentBlock[0];
		const firstBlockId = firstBlock.type === 'node' ? 'Node' : 'Block';

		const result = await write(
			`
		OPTIONAL MATCH ({id: "${firstBlockId}"})-[l:NEXT_BLOCK | CHILD_BLOCK {documentId: "${nodeId}"}]-()
		DELETE l
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

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})
	SET n.title = $title
	RETURN n
	`;

	try {
		const title = write(cypher, params);
		const result = await wholeDocumentSave(document, nodeId as string);
		res.status(200).json({ result });
		// res.status(200).json({ result: 'nothing yet' });
	} catch (e) {
		res.status(400).json(e);
	}

	// res.status(200).json(result);

	// res.status(200).json({ cypher, params });
}
