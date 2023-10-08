import {
	Block,
	BlockElements,
	ELEMENT_NODE,
	ELEMENT_NODETITLE,
	MyTitleElement,
} from '@/packages/editor/plateTypes';
import { read } from '../../../../../backend/driver/helpers';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;
	// Find all relevant data to the node
	const cypher = `
    MATCH (n: Node {id: $nodeId})-[r:INBOX]-(inboxItem)
    RETURN r {.*}, inboxItem {.*, labels: labels(inboxItem)}
    `;

	const result = await read(cypher, params);

	console.log(cypher);
	console.log(params);

	res.status(200).json(result);
	// res.status(200).json({ cypher, children });
}
