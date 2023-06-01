import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const body = req.body;

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})
	SET n.content = ${body}
	RETURN n
	`;
	// RETURN r, b { .*, parentNodeId: $nodeId}

	const result = await write(cypher, params);

	res.status(200).json(result);
}
