import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { write } from '../../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	const cypher = `
	MATCH (n:Node {id: $nodeId})
    MERGE (n)-[r:VIEW]-(g:GRAPH_VIEW {title: "Graph View", id: $graphViewId})

	RETURN n, g
	`;

	const result: any = await write(cypher as string, params);

	res.status(200).json(result);
	// res.status(200).json({ cypher, params });
}
