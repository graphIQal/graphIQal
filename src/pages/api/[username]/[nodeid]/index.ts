import type { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../../backend/driver/helpers';

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

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})-[r:NEXT_BLOCK|BLOCK_CHILD*0..]->(b:BLOCK_ELEMENT|BLOCK_INLINE)
	MATCH (n)-[:VIEW]-(g: GRAPH_VIEW)
	RETURN r, b, g
	`;
	// RETURN r, b { .*, parentNodeId: $nodeId}

	const result = await read(cypher, params);

	// if (result.length === 0) {
	// 	res.status(404);
	// } else if (result.length > 1) {
	// 	// Handle 2 accounts having the same email and same username
	// 	// res.status(200).json(result[0].u.properties.username);
	// }

	res.status(200).json(result);
}
