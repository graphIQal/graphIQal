import type { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	const cypher = `MATCH (u:User)
	RETURN u;
	`;

	const result: any = await read(cypher as string);

	res.status(200).json({ ...result });
}
