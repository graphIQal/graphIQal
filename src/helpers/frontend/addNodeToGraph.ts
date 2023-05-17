import { getNodeData } from '../../backend/functions/node/query/getNodeData';
// import { getNodeData } from '../../backend/functions/node/query/getNodeData';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { GraphNodeData, NodeData } from '../../packages/graph/graphTypes';

export const addNodeToGraph = async (
	result: any,
	context: GraphViewContextInterface,
	username: string
) => {
	const node: NodeData = {
		//node is the node that you get from the database with the given ID
		id: result.id,
		title: result.title,
		color: 'black',
		icon: 'block',
		connections: await getNodeData(result.id, username).then((result) => {
			console.log('result of ' + JSON.stringify(result));
			return result.map((connection: any) => {
				return connection.c;
			});
		}),
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

	context.setnodeData_Graph(newNodes);
	context.setnodeVisualData_Graph(newVisualNodes);
};
