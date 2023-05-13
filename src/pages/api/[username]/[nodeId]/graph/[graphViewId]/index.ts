import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { write } from '../../../../../../backend/driver/helpers';
import { getConnectedNodes } from '../../../../../../backend/cypher-generation/cypherGenerators';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	// Find all graph data
	const cypher = `
	MATCH (g:GRAPH_VIEW {id: $graphViewId})-[relationship:IN]-(node), (node)-[r]-(d:Node)

	RETURN node {.*}, relationship {.*}, collect(r {startNode: startNode(r).id, endNode: endNode(r).id, type: type(r)}) AS connections
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json(result);
}
