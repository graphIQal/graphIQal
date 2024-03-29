import type { NextApiRequest, NextApiResponse } from 'next';
import { read, read_subscribe } from '../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { homenodeId, search } = req.query;

	const cypher: string = `
	MATCH (u: Node {id: "${homenodeId}"})-[*0..]->(n:Node)
    WHERE toLower(n.title) CONTAINS toLower("${search}")
    RETURN DISTINCT n {.*, key: n.id, text: n.title}
    LIMIT 25
	`;

	const result: any = await read(cypher as string);

	// console.log('Search Result: ' + search);
	// console.log(result);
	// console.log(cypher);
	res.status(200).json(result);
}
