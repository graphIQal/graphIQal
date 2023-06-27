import type { NextApiRequest, NextApiResponse } from 'next';
import { write } from '../../../backend/driver/helpers';
// import { write } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	params.hometitle = params.username + "'s Home Node";
	params.homeless = params.username + "'s Homeless Node";

	// Add Hash for password
	const cypher = `
	MERGE (u:User {
	  email: $email,
	  password: $password,
	  username: $username
	})
	ON CREATE SET u.id = randomUuid(), u.favourites = []
	MERGE (n:Node {title: $hometitle})
	ON CREATE SET n.id = randomUuid()
	MERGE (u)-[r:HAS]->(n)

	MERGE (h:Node {title: $homeless})
	ON CREATE SET h.id = randomUuid()
	MERGE (n)-[:RELATED]-(h)
	
	MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
	MERGE (n)-[:NEXT_BLOCK]->(b)

	MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
	MERGE (b)-[:BLOCK_CHILD]->(p)

	MERGE (g:GRAPH_VIEW {title: "Graph View"})<-[:VIEW]-(n)
	ON CREATE SET g.id = randomUuid()
	RETURN u, n, b
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json({ ...result, ...params, cypher });
}
