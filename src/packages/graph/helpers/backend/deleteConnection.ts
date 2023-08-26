import { KeyedMutator } from 'swr';
import { API, State } from '../../context/GraphViewContext';
import { deleteConnectionAPI } from '@/backend/functions/node/mutate/deleteConnection';

export const deleteConnection = (
	startNode: string,
	endNode: string,
	viewContext: Partial<State & API>
) => {
	const { changeAlert, nodeData_Graph, addAction, changeNodeData_Graph } =
		viewContext;
	if (!changeAlert || !nodeData_Graph || !addAction || !changeNodeData_Graph)
		return;

	addAction(startNode, 'CONNECTION_DELETE', {
		startNode,
		endNode,
		connection: nodeData_Graph[startNode].connections[endNode],
	});
};
