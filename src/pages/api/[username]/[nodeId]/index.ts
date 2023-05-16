import { getConnectedNodes_Cypher } from '../../../../backend/cypher-generation/cypherGenerators';
import { read } from '../../../../backend/driver/helpers';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	// Find all relevant data to the node
	const nodeConnections: any = await read(
		getConnectedNodes_Cypher(params.nodeId as string)
	);

	res.status(200).json(nodeConnections);
}
