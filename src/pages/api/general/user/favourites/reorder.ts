import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../backend/driver/helpers';
// import { read, read_subscribe } from '../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { favouritesId, favourites } = req.query;

	const cypher: string = `
	MATCH (n: Node {id: "${favouritesId}"})
    SET n.favourites = favourites
    RETURN n;
	`;

	const result = await write(cypher as string);

	res.status(200).json(result);
}
