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
		password: $password,
		email: $email
	})
	SET u.favourites = []
	RETURN u
	`;

	const result: any = await write(cypher, params);

	res.status(200).json(result[0]);
}
