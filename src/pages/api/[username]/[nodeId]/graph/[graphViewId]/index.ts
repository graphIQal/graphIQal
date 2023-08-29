import type { NextApiRequest, NextApiResponse } from 'next';

import { write } from '../../../../../../backend/driver/helpers';
import {
	ConnectionData,
	GraphNodeData,
	NodeData,
} from '@/packages/graph/graphTypes';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const params = req.query;

	// Find all graph data
	// I don't know why I have (node)-[r]-(d:Node). Why is this node connected to another node?
	const cypher = `
	MATCH (g:GRAPH_VIEW {id: $graphViewId})-[relationship:HAS]-(node), (node)-[r]-(d:Node)

	RETURN node {.*}, relationship {.*}, collect(r {startNode: startNode(r).id, endNode: endNode(r).id, type: type(r)}) AS connections
	`;

	const data = await write(cypher as string, params);

	if ('err' in data) {
		console.log('huh');
		res.status(400).json(data);
	} else {
		console.log('else');
		let nodeData = {} as { [key: string]: NodeData };
		let visualData = {} as { [key: string]: GraphNodeData };

		if (data.length === 0) return { nodeData, visualData };

		for (let node in data) {
			const nodeDataResponse = data;
			let nodeConnections: { [key: string]: ConnectionData } = {};
			for (let connection in nodeDataResponse[node].connections) {
				nodeConnections[
					nodeDataResponse[node].connections[connection].endNode
				] = {
					...nodeDataResponse[node].connections[connection],
					content: [],
				};
			}
			nodeData[nodeDataResponse[node].node.id] = {
				...nodeDataResponse[node].node,
				connections: nodeConnections,
			};

			visualData[nodeDataResponse[node].node.id] =
				nodeDataResponse[node].relationship;
		}

		console.log('data: ', { nodeData, visualData });
		res.status(200).json({ nodeData, visualData });
	}
}
