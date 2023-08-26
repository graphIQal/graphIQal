import { API, State } from '../../context/GraphViewContext';

export const deleteNode = (id: string, viewContext: Partial<State & API>) => {
	let newnodeData_Graph = { ...viewContext.nodeData_Graph };
	let newVisualNodes = { ...viewContext.nodeVisualData_Graph };
	const {
		changeAlert,
		addAction,
		changeNodeData_Graph,
		changeVisualData_Graph,
	} = viewContext;

	if (
		!changeAlert ||
		!addAction ||
		!changeNodeData_Graph ||
		!changeVisualData_Graph
	)
		return;

	addAction(id, 'NODE_DELETE', {
		deletedNode: newnodeData_Graph[id],
		deletedVisualNode: newVisualNodes[id],
	});
};
