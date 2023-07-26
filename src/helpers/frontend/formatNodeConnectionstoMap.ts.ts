import { getNodeData_type } from '../../backend/functions/node/query/useGetNodeData';

export const formatNodeConnectionstoMap = (nodeData: getNodeData_type) => {
	const connectionMap: any = {};

	nodeData.connectedNodes.forEach((row) => {
		connectionMap[row.connected_node.id] = {
			r: row.r,
			...row.connected_node,
		};
	});

	return connectionMap;
};
