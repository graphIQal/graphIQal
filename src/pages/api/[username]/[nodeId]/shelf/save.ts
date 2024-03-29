import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../../../backend/driver/helpers';
// import { write } from '../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const body = req.body;

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})
	SET n.shelf = $body
	RETURN n
	`;

	const result = await write(cypher, { ...params, body: body });

	res.status(200).json(result);
}
