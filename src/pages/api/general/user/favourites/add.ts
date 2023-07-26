import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../backend/driver/helpers';
// import { read, read_subscribe } from '../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { favouritesId, nodeId } = req.query;

	const cypher: string = `
	MATCH (n: Node {id: "${favouritesId}"})
	MATCH (u: Node {id: "${nodeId}"})
	MERGE (n)-[r:HAS]->(u)
	SET n.favourites = coalesce(n.favourites, []) + "${nodeId}"
    RETURN n, r, u;
	`;

	const result = await write(cypher as string);

	res.status(200).json(result);
}
