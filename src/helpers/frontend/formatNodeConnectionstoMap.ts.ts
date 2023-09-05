import { NodeData } from '@/packages/graph/graphTypes';
import { getNodeData_type } from '../../backend/functions/node/query/useGetNodeData';

export type connectionMapType = {
	[key: string]: { r: any; [key: string]: any };
};
export const formatNodeConnectionstoMap = (nodeData: getNodeData_type) => {
	const connectionMap: connectionMapType = {};

	nodeData.connectedNodes.forEach((row) => {
		connectionMap[row.connected_node.id] = {
			r: row.r,
			...row.connected_node,
		};
	});

	return connectionMap;
};
