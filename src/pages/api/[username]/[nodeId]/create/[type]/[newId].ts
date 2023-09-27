import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	// const cypher: string = `
	// MATCH (n:Node {id: $nodeId})
	// MATCH (n)-[r:NEXT_BLOCK*0..]->(b:BLOCK_ELEMENT)
	// MATCH (b)-[children:BLOCK_CHILD*0..]->(text:BLOCK_INLINE)
	// RETURN n, r, b, children, text
	// `;

	// const cypher: string = `
	// MATCH (n:Node {id: $nodeId})-[r:NEXT_BLOCK|BLOCK_CHILD*0..]->(b:BLOCK_ELEMENT|BLOCK_INLINE)
	// MATCH (n)-[:VIEW]-(g: GRAPH_VIEW)
	// RETURN r, b, g
	// `;

	const cypher = `
			MATCH (currentNode: Node {id: $nodeId})
			MERGE (n: Node {id: $newId, title: "Untitled"})
			SET n.icon = 'node'
			MERGE (currentNode)-[:${params.type}]->(n)
			RETURN n
			`;

	// RETURN r, b { .*, parentNodeId: $nodeId}

	const result = await write(cypher, params);

	res.status(200).json(result);
}
