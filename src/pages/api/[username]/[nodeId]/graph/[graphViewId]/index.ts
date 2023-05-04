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
	MATCH (o:Node {id: $nodeId}), (g:GRAPH_VIEW {id: $graphViewId})-[relationship:IN]-(node), (node)-[r]-(d)

	RETURN node {.*}, relationship {.*}, collect(r {startNode: startNode(r).id, endNode: endNode(r).id, type: type(r)}) AS connections
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json(result);
}
