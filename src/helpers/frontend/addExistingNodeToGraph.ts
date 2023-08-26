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

	const node: NodeData = {
		//node is the node that you get from the database with the given ID
		...nodeToAdd,
		color: 'black',
		icon: 'block',
		connections: await fetch(`/api/${username}/${nodeToAdd.id}`)
			.then((res) => {
				return res.json();
			})
			.then((result: any) => {
				let connections: { [key: string]: ConnectionData } = {};
				result[0].connectedNodes.map((connection: any) => {
					if (connection.connected_node) {
						connections[connection.connected_node.id] = {
							type: connection.r.type,
							startNode: nodeToAdd.id,
							endNode: connection.connected_node.id,
							content: [],
						};
					}
				});
				return connections;
			}),
	};

	addAction(nodeToAdd.id, 'NODE_ADD_EXISTING', {
		newNode: node,
	});
};
