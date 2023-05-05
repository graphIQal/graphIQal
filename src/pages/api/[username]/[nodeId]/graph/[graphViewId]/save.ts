import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { write } from '../../../../../../backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;

	// Add Hash for password}
	// const cypher = `
	// MATCH (o:Node {id: $currentNodeId})
	// MATCH (g:GRAPH_VIEW {id: $graphViewId})

	// MERGE (o)-[r:IN]->(n:Node {title: $nodeTitle, id: randomUuid()})<-[r:IN {
	// 	x_size: $x_size,
	// 	y_size: $y_size,
	// 	x_cell: $x_cell,
	// 	y_cell: $y_cell,
	// 	collapsed: "true
	// }]-(g)

	// RETURN n, g
	// `;

	const result: any = await write(body as string);

	res.status(200).json({ ...result });
}
