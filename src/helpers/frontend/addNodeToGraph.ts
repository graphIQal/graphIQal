// import { getNodeData } from '../../backend/functions/node/query/getNodeData';
import { useGetNodeData } from '../../backend/functions/node/query/useGetNodeData';
import { API, State } from '../../packages/graph/context/GraphViewContext';
import { GraphNodeData, NodeData } from '../../packages/graph/graphTypes';

export const addNodeToGraph = async (
	result: any,
	context: Partial<State & API>,
	username: string
) => {
	const { changeNodeData_Graph, changeVisualData_Graph } = context;
	if (!changeNodeData_Graph || !changeVisualData_Graph) return;

	console.log('addNodetoGraph');
	// Nahhh you gotta change this. What?
	const node: NodeData = {
		//node is the node that you get from the database with the given ID
		id: result.id,
		title: result.title,
		color: 'black',
		icon: 'block',
		connections: await useGetNodeData(result.id, username).then(
			(result) => {
				return result.map((connection: any) => {
					return connection.c;
				});
			}
		),
	};

	const visualNode: GraphNodeData = {
		width: 200,
		height: 100,
		x: 200,
		y: 200,
		categorizing_node: result.id,
		collapsed: true,
	};

	const newNodes = { ...context.nodeData_Graph };
	newNodes[result.id] = node;
	const newVisualNodes = { ...context.nodeVisualData_Graph };
	newVisualNodes[result.id] = visualNode;

	changeNodeData_Graph(newNodes);
	changeVisualData_Graph(newVisualNodes);
};
