import { createConnection } from '@/backend/functions/node/mutate/createConnection';
import { KeyedMutator } from 'swr';
import { API, State } from '../../context/GraphViewContext';

export const addConnection = (
	startNode: string,
	endNode: string,
	mutateGraphData: KeyedMutator<any>,
	context: Partial<State & API>
) => {
	const { nodeData_Graph, nodeVisualData_Graph, addAction, changeAlert } =
		context;

	if (!changeAlert || !nodeData_Graph || !addAction || !nodeVisualData_Graph)
		return;

	// Now mutating in the cache
	// mutateGraphData(createConnection({ startNode, endNode, type: 'RELATED' }), {
	// 	optimisticData: {
	// 		visualData: nodeVisualData_Graph,
	// 		nodeData: newnodeData_Graph,
	// 	},
	// 	populateCache: false,
	// 	revalidate: false,
	// });

	addAction(startNode, 'CONNECTION_ADD', {
		startNode: startNode,
		endNode: endNode,
		connection: {
			// ...newnodeData_Graph[startNode].connections[endNode],
			type: 'RELATED',
		},
	});
};
