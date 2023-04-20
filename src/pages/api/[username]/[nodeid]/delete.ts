import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { read } from '../../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// res.status(200).json({
	// 	total: parseInt(result[0]?.count) || 0,
	// 	data: result.map((record) => record.movie),
	// });
}
