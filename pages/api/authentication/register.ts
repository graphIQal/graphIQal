import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../src/backend/driver/helpers';

type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const params = req.query;

	// Add Hash for password
	const cypher = `
    CREATE (u:User {
    userId: randomUuid(),
    email: $email,
    password: $encrypted,
    name: $name
    })
    RETURN u
`;
	console.log(params);

	// const result = await write(cypher as string, params);

	res.status(200).json({ name: 'John Doe', ...params });
}
