import { createConnection } from '@/backend/functions/node/mutate/createConnection';
import { KeyedMutator } from 'swr';
import { API, State } from '../../packages/graph/context/GraphViewContext';

export const addConnection = (
	node1: string,
	node2: string,
	mutateGraphData: KeyedMutator<any>,
	context: Partial<State & API>
) => {
	const { nodeData_Graph, nodeVisualData_Graph, addAction, changeAlert } =
		context;

	if (!changeAlert || !nodeData_Graph || !addAction || !nodeVisualData_Graph)
		return;

	let newnodeData_Graph = { ...nodeData_Graph };
	newnodeData_Graph[node1].connections[node2] = {
		startNode: node1,
		endNode: node2,
		content: [],
		type: 'RELATED',
	};

	changeAlert(
		'Connection of type RELATED added between ' +
			newnodeData_Graph[node1].title +
			' and ' +
			newnodeData_Graph[node2].title
	);

	// Now mutating in the cache
	mutateGraphData(createConnection({ node1, node2, type: 'related' }), {
		optimisticData: {
			visualData: nodeVisualData_Graph,
			nodeData: newnodeData_Graph,
		},
		populateCache: false,
		revalidate: false,
	});

	addAction(node1, 'CONNECTION_ADD', {
		endNode: node2,
		connection: {
			...newnodeData_Graph[node1].connections[node2],
			type: 'RELATED',
		},
	});
};
