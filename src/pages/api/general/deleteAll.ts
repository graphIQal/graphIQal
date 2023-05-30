import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../backend/driver/helpers';
// import { write } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const cypher = `
	MATCH (n)
	DETACH DELETE n
	`;

	// const result: any = await write(cypher as string);

	// res.status(200).json({ ...result });
	res.status(400);
}
