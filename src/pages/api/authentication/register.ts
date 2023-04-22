import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../backend/driver/helpers';
// import { write } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	params.hometitle = params.username + "'s Home Node";

	// Add Hash for password
	const cypher = `
	MERGE (u:User {
	  email: $email,
	  password: $password,
	  username: $username
	})
	ON CREATE SET u.userId = randomUuid()
	MERGE (n:Node {title: $hometitle})
	ON CREATE SET n.nodeId = randomUuid()
	MERGE (u)-[r:HOMENODE]->(n)
	MERGE (b:Block {blocks: [{'hey'}]})
	ON CREATE sET b.id = randomUuid()
	MERGE (n)-[:BLOCK_CHILD]->(b)
	RETURN u, r, n, b
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json({ ...result, ...params });
}
