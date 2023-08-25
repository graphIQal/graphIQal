import { v4 as uuidv4 } from 'uuid';
import { API, State } from '../../packages/graph/context/GraphViewContext';

export const addNode = (
	context: Partial<State & API>,
	size: number[],
	x: number,
	y: number
) => {
	const {
		nodeVisualData_Graph,
		changeAlert,
		changeVisualData_Graph,
		addAction,
		changeNodeData_Graph,
		nodeData_Graph,
	} = context;

	if (
		!nodeVisualData_Graph ||
		!changeAlert ||
		!changeVisualData_Graph ||
		!addAction ||
		!changeNodeData_Graph ||
		!nodeData_Graph
	)
		return;

	let newNodes = { ...nodeVisualData_Graph };
	let id = uuidv4();

	newNodes[id] = {
		x: x,
		y: y,
		width: size[0],
		height: size[1],
		collapsed: true,
		categorizing_node: id,
	};

	let newnodeData_Graph = { ...nodeData_Graph };
	newnodeData_Graph[id] = {
		id: id,
		title: '',
		connections: {},
		icon: 'node',
		color: 'black',
	};

	changeAlert('Created new node');

	changeVisualData_Graph(newNodes);
	changeNodeData_Graph(newnodeData_Graph);
	addAction(id, 'NODE_ADD', {
		new: {
			node_data: newnodeData_Graph[id],
			node_visual: newNodes[id],
		},
		old: {},
	});
};
