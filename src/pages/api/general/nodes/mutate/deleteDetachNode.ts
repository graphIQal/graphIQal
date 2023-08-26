import type { NextApiRequest, NextApiResponse } from 'next';

import { write } from '@/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;

	const result: any = await write(body as string);

	res.status(200).json(result);
}
