import {
	Block,
	BlockElements,
	ELEMENT_NODE,
	ELEMENT_NODETITLE,
	MyTitleElement,
} from '@/packages/editor/plateTypes';
import { read, write } from '../../../../../backend/driver/helpers';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	// Find all relevant data to the node
	const { cypher, children } = JSON.parse(req.body);

	const result = await write(cypher, {
		...params,
		children: children,
	});

	res.status(200).json(result);
	// res.status(200).json({ cypher, children });
}
