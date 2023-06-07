import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../backend/driver/helpers';
// import { write } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { username, password, email } = req.query;

	const cypher: string = `
	MATCH (u:User {username: "${username}", password: "${password}", email: "${email}" })-[*0..]->(n)
	DETACH DELETE u, n
	`;

	const result: any = await write(cypher as string);

	res.status(200).json({ ...result });

	// res.status(400);
}
