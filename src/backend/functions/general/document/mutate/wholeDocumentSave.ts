import { write } from '@/backend/driver/helpers';
import { BlockElements } from '@/packages/editor/plateTypes';

export const wholeDocumentSave = async (
	currentBlock: BlockElements[],
	prevBlockId: string,
	nodeId: string
) => {
	if (currentBlock.length === 0) return;

	const firstBlock = currentBlock[0];

	let firstCypher = ``;

	if (firstBlock.type === 'node') {
		firstCypher += `
        OPTIONAL MATCH (Node {id: "${firstBlock.nodeId}"})-[l:NEXT_BLOCK {documentId: "${nodeId}"}]-()
        DELETE l
        `;
	} else {
		firstCypher += `
        OPTIONAL MATCH (Block {id: "${firstBlock.id}"})-[l:NEXT_BLOCK | CHILD_BLOCK]-()
        DELETE l
        `;
	}

	firstCypher += `
    MERGE (p {id: "${prevBlockId}"})
    MERGE (b:${firstBlock.type === 'node' ? 'Node' : 'Block'} {id: "${
		firstBlock.id
	}"})
    SET b.type = "${firstBlock.type}", b.children = $children
    MERGE (p)-[cr:CHILD_BLOCK]->(b)
    SET cr.documentId = "${prevBlockId}"
    RETURN b
    `;

	console.log(firstCypher);

	const result = await write(firstCypher, {
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
        RETURN b
          `;

		console.log(cypherQuery);
		const result = await write(cypherQuery, {
			children: JSON.stringify([block.children[0]]),
		});

		// If the block has children, recursively save them
		if (block.children && block.children.length > 1) {
			// Create the child block

			wholeDocumentSave(
				block.children.splice(2) as BlockElements[],
				block.id,
				nodeId
			);
		}

		// Update the previous block ID for the next iteration
		prevBlockId = blockId;
	}
};
