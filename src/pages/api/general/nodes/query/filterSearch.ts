import type { NextApiRequest, NextApiResponse } from 'next';
import { read, read_subscribe } from '../../../../../backend/driver/helpers';
import {
	DirectionalConnectionTypes,
	getConnectionDirection,
	NodeDataType,
	convertToConnectionType,
	isTransitive,
} from '@/backend/schema';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const filters: {
		[key in DirectionalConnectionTypes]: NodeDataType[];
	} = JSON.parse(req.body);

	let matchClauses = Object.keys(filters)
		.flatMap((key) => {
			return filters[key as DirectionalConnectionTypes].map((node) => {
				let direction = getConnectionDirection(
					key as DirectionalConnectionTypes
				);

				return `(n:Node)${
					direction == 'to' ? '<' : ''
				}-[:${convertToConnectionType(
					key as DirectionalConnectionTypes
				)}${
					isTransitive(
						convertToConnectionType(
							key as DirectionalConnectionTypes
						)
					)
						? '*1..5'
						: ''
				}]-${direction == 'from' ? '>' : ''}(:Node {id: "${node.id}"})`;
			});
		})
		.join(', ');

	const cypher: string = `
			MATCH ${matchClauses}
			RETURN DISTINCT n {.*, key: n.id}
		  `;

	console.log(cypher);
	const result: any = await read(cypher as string);
	res.status(200).json(result);
	// res.status(200).json(cypher);
}
