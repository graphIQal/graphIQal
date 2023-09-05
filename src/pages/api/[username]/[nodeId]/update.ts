import { write } from '@/backend/driver/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	params.fields = JSON.parse(req.body);

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})
    SET n += $fields
	RETURN n
	`;

	// res.status(200).json({ cypher, params });
	// return;
	const result = await write(cypher, params);

	// console.log(result, cypher);

	if ('err' in result) {
		res.status(400).json(result);
	} else {
		res.status(200).json({ ...result, ...params });
	}
	// if (result.length === 0) {
	// 	res.status(404);
	// } else if (result.length > 1) {
	// 	// Handle 2 accounts having the same email and same username
	// 	// res.status(200).json(result[0].u.properties.username);
	// }
}
