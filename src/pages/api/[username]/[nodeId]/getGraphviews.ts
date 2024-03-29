import type { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})-[:VIEW]-(g: GRAPH_VIEW)
	RETURN g
	`;

	// RETURN r, b { .*, parentNodeId: $nodeId}

	const result = await read(cypher, params);

	// console.log(result);

	if ('err' in result) {
		res.status(400).json(result);
	} else {
		res.status(200).json(result);
	}
	// if (result.length === 0) {
	// 	res.status(404);
	// } else if (result.length > 1) {
	// 	// Handle 2 accounts having the same email and same username
	// 	// res.status(200).json(result[0].u.properties.username);
	// }
}
