import { fetcherSingleReturn } from '@/backend/driver/fetcher';
import { API, State } from '../../packages/graph/context/GraphViewContext';
import {
	ConnectionData,
	GraphNodeData,
	NodeData,
} from '../../packages/graph/graphTypes';

export const addExistingNodeToGraph = async (
	graphContext: Partial<State & API>,
	username: string,
	nodeToAdd: { id: string; title: string }
) => {
	const {
		nodeData_Graph,
		nodeVisualData_Graph,
		changeNodeData_Graph,
		changeVisualData_Graph,
		changeAlert,
		addAction,
	} = graphContext;
	if (
		!nodeData_Graph ||
		!nodeVisualData_Graph ||
		!changeNodeData_Graph ||
		!changeVisualData_Graph ||
		!changeAlert ||
		!addAction
	)
		return;

	if (nodeToAdd.id in nodeData_Graph) return;
	console.log('made it');

	// const node = await fetcherSingleReturn(`/api/${username}/${nodeToAdd.id}`);

	// console.log('fetchedNode: ', node);

	// if(node === null)

	// We don't have to fetch. We pass in the default data, mutate it in addActions, and ask useSWR to revalidate to fetch its true colours
	const node: NodeData = {
		//node is the node that you get from the database with the given ID
		...nodeToAdd,
		color: 'black',
		icon: 'block',
		connections: {},
	};

	addAction(nodeToAdd.id, 'NODE_ADD_EXISTING', {
		newNode: node,
	});
};
