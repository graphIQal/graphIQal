import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	const body = req.body;

	const cypher: string = `
	MATCH (n:Node {id: $nodeId})
	SET n.document = $body
	SET n.title = $title
	RETURN n
	`;

	// RETURN r, b { .*, parentNodeId: $nodeId}
	console.log('fetch');
	const result = await write(cypher, { ...params, body });

	console.log('result: ', result);
	res.status(200).json(result);
	// res.status(200).json({ cypher, params, body });
}
