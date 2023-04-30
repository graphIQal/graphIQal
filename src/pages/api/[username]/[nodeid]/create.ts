import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { write } from '../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	// Add Hash for password
	const cypher = `
	MATCH (n:Node {id: $currentNodeId})
	MERGE (n:Node {title: $nodeTitle})
	ON CREATE SET n.id = randomUuid()
	MERGE (u)-[r:HOMENODE]->(n)
	
	MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
	MERGE (n)-[:NEXT_BLOCK]->(b)

	MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
	MERGE (b)-[:BLOCK_CHILD]->(p)
	RETURN u, n, b
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json({ ...result, ...params });
}
