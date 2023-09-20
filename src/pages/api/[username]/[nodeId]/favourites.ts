import { read } from '../../../../backend/driver/helpers';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	// Find all relevant data to the node

	const cypher = `
    MATCH (n: Node {id: $nodeId})
    OPTIONAL MATCH (n)-[r]-(c:Node)
    RETURN n {.*}, collect({r:r {.*, type: type(r), fromNode:(startNode(r) = n)}, connected_node:c {.*}}) AS connectedNodes
    `;

	const nodeConnections: any = await read(cypher, params);

	res.status(200).json(nodeConnections);
}
