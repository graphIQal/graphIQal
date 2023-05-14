import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { ConnectionTypesMap } from '../../packages/graph/graphTypes';

export const getTypedConnections = (
	context: GraphViewContextInterface,
	id: string,
	type: string
) => {
	if (!Object.keys(ConnectionTypesMap).includes(type)) {
		console.log('Invalid connection type');
		return;
	}
	let connections = context.nodeData_Graph[id].connections;
	return Object.keys(connections).filter(
		(nodeID, i) => connections[nodeID].type == type
	);
};
