import type { NextApiRequest, NextApiResponse } from 'next';
import { read, write } from '../../../../../backend/driver/helpers';
// import { read, read_subscribe } from '../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { favouritesId, nodeId } = req.query;

	const cypher: string = `
	MATCH (n: Node {id: "${favouritesId}"})-[r:HAS]-(u: Node {id: "${nodeId}"})
	SET n.array = [x IN n.some_array WHERE x <> "${nodeId}"];
	MERGE (n)-[r:HAS]->(u)
	DELETE r
    RETURN n, u;
	`;

	// const result = await write(cypher as string);

	res.status(200).json(cypher);
}
