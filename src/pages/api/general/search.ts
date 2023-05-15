import type { NextApiRequest, NextApiResponse } from 'next';
import { read_subscribe } from '../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { username, password, email } = req.query;

	const cypher: string = `
	MATCH (u:User {username: "${username}", password: "${password}", email: "${email}" })-[*0..]->(n)
	DETACH DELETE u, n
	`;

	const result: any = await read_subscribe(cypher as string);

	res.status(200).json({ ...result });
}
