import type { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../../backend/driver/helpers';
// import { read, read_subscribe } from '../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userId } = req.query;

	const cypher: string = `
	MATCH (u: User {id: "${userId}"})
    RETURN  n {.*}
	`;

	const result = await read(cypher as string);

	res.status(200).json(result);
}
