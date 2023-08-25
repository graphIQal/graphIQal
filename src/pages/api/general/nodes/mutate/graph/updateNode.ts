import type { NextApiRequest, NextApiResponse } from 'next';

import { int } from 'neo4j-driver';
import { write } from '@/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;

	const result: any = await write(body as string);

	res.status(200).json(result);
	// res.status(200).json({ body });
}
