import { write } from '@/backend/driver/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const body = req.body;

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})
	SET n.inbox = $body
	RETURN n
	`;

	// RETURN r, b { .*, parentNodeId: $nodeId}
	const result = await write(cypher, { ...params, body });

	// console.log('result: ', result);
	res.status(200).json(result);
	// res.status(200).json({ cypher, params, body });
}
