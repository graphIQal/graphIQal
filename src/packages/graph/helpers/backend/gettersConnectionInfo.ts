import { resources } from '@/schemas/Data_structures/DS_schema';
import { API, State } from '../../context/GraphViewContext';
import { ConnectionData, ConnectionTypes } from '../../graphTypes';

export const getLineEndpointData = (
	context: Partial<State & API>,
	lineID: string
) => {
	const { nodeVisualData_Graph } = context;
	if (!nodeVisualData_Graph) return {};
	const nodes = lineID.split('_');
	const node1 = nodes[0];
	const data1 = nodeVisualData_Graph[node1];

	const node2 = nodes[1];
	const data2 = nodeVisualData_Graph[node2];

	return {
		x1: data1?.x,
		x2: data2?.x,
		y1: data1?.y,
		y2: data2?.y,
		node1: node1,
		node2: node2,
	};
};

//gets nodes that current node is "included" in as tags
// export const getTags = (nodeData: { [key: string]: NodeData }) => {
//   //each entry in array is a tag, where the key represents that node's ID and the value represents all the nodes on the screen that are connected to it
//   //ordered by frequency of connection
//   const to_return: { [key: string]: Set<string> }[] = [];

//   const parents = getCommonParents([]);
//   for (parent)

//   return to_return;
// };

export const isLineDirectional = (connection: ConnectionData) => {
	return (
		connection.type == ConnectionTypes.HAS ||
		connection.type == ConnectionTypes.NEEDS ||
		connection.type == ConnectionTypes.FOLLOWS ||
		connection.type == ConnectionTypes.IS
	);
};

export const getConnectionType = (
	from: string,
	to: string,
	context: Partial<State & API>
) => {
	const { nodeData_Graph } = context;
	if (!nodeData_Graph) return;
	return nodeData_Graph[from].connections[to].type;
};

export const getIconAndColor = (
	viewContext: Partial<State & API>,
	node: string
) => {
	const { nodeVisualData_Graph, nodeData_Graph, tags } = viewContext;
	if (!nodeVisualData_Graph || !nodeData_Graph || !tags)
		return { icon: '', color: '' };
	let color = '';
	let icon = '';
	let categorizing_node = nodeVisualData_Graph[node].categorizing_node;
	if (!categorizing_node) {
		icon = nodeData_Graph[node].icon;
		color = nodeData_Graph[node].color;
	} else if (categorizing_node != node) {
		for (node in viewContext.tags) {
			if (tags[node as any].id == categorizing_node) {
				icon = tags[node as any].icon;
				color = tags[node as any].color;
			}
		}
	} else {
		icon = nodeData_Graph[node].icon ? nodeData_Graph[node].icon : 'node';
		color = nodeData_Graph[node].color
			? nodeData_Graph[node].color
			: 'black';
	}

	return {
		icon: icon,
		color: color,
	};
};

//gets connection information from nodeInView -> currNode
export const getConnectionInfo = (
	nodeInView: string,
	currNode: string,
	context: Partial<State & API>
) => {
	const { nodeData_Graph } = context;
	if (!nodeData_Graph) return;
	let content = '';
	let queryNodes = nodeData_Graph[nodeInView].connections;
	if (!queryNodes) return;
	if (queryNodes[currNode] == undefined) return '';
	let nodeContentToShow = queryNodes[currNode].content;
	let nodeData = nodeData_Graph[currNode];
	//who does the content belong to?
	//It's stored in arraylist, but homework is trying to render it
	for (let item in nodeContentToShow) {
		let block = resources[nodeContentToShow[item]];
		content += block.content;
	}
	return content;
};
