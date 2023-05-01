import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { write } from '../../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	// Add Hash for password}
	const cypher = `
	MATCH (o:Node {id: $nodeId})
	MATCH (g:GRAPH_VIEW {id: $graphViewId})-[r:IN*0..]-(p)

	RETURN g, r, p
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json(result);
}
