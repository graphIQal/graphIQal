import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../../backend/driver/helpers';
// import { read } from '../../../backend/driver/helpers';
// import { read } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	const cypher: string = `
	MATCH (u:User {
		username: $username, 
	})
	MATCH (u)-[r:HAS]->(n)
	RETURN u,r,n;
	`;

	const result: any = await write(cypher, params);

	if (result.length === 0) {
		res.status(404);
	} else if (result.length > 1) {
		// Handle 2 accounts having the same email and same username
		// res.status(200).json(result[0].u.properties.username);
	}
	// res.redirect('/' + result[0].u.properties.username);

	res.status(200).json(result[0]);
}
