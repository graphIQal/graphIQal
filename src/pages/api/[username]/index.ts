import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { pid } = req.query;

	// get username's home node.

	// redirect to usernode
	res.status(200).json({ name: 'John Doe' });
}
