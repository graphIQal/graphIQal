import type { NextApiRequest, NextApiResponse } from 'next';
import { read } from '../../../../../backend/driver/helpers';

// import { write } from '../../../src/backend/driver/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body;

	const result: any = await read(body as string);

	res.status(200).json(result);
}
