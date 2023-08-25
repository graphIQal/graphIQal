import { KeyedMutator } from 'swr';
import { API, State } from '../../context/GraphViewContext';
import { deleteConnectionAPI } from '@/backend/functions/node/mutate/deleteConnection';

export const deleteConnection = (
	startNode: string,
	endNode: string,
	viewContext: Partial<State & API>,
	mutateGraphData: KeyedMutator<any>
) => {
	const { changeAlert, nodeData_Graph, addAction, changeNodeData_Graph } =
		viewContext;
	if (!changeAlert || !nodeData_Graph || !addAction || !changeNodeData_Graph)
		return;

	addAction(startNode, 'CONNECTION_DELETE', {
		startNode,
		endNode,
		// connection: newNodes[start].connections[end],
	});
};
