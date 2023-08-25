import { v4 as uuidv4 } from 'uuid';
// import { API, State } from '../../packages/graph/context/GraphViewContext';
import { KeyedMutator } from 'swr';
import { createGraphNode } from '@/backend/functions/graph/mutate/createGraphNode';
import { API, State } from '../../context/GraphViewContext';

export const addNode = (
	context: Partial<State & API & { nodeId: string }>,
	mutateGraphData: KeyedMutator<any>,
	size: number[],
	x: number,
	y: number
) => {
	const {
		graphViewId,
		nodeVisualData_Graph,
		changeAlert,
		addAction,
		nodeData_Graph,
		nodeId,
	} = context;

	if (
		!nodeVisualData_Graph ||
		!changeAlert ||
		!addAction ||
		!nodeData_Graph ||
		!graphViewId ||
		!nodeId
	)
		return;

	let newGraphData = { ...nodeVisualData_Graph };
	let id = uuidv4();

	newGraphData[id] = {
		x: x,
		y: y,
		width: size[0],
		height: size[1],
		collapsed: true,
		categorizing_node: id,
	};

	let newNodeData = { ...nodeData_Graph };

	newNodeData[id] = {
		id: id,
		title: '',
		connections: {},
		icon: 'node',
		color: 'black',
	};

	changeAlert('Created new node');

	mutateGraphData(
		createGraphNode({
			id,
			nodeId,
			nodeVisualData: newGraphData[id],
			graphViewId,
		}),
		{
			optimisticData: {
				visualData: newGraphData,
				nodeData: newNodeData,
			},
			populateCache: false,
			revalidate: false,
		}
	);

	addAction(id, 'NODE_ADD', {
		new: {
			node_data: newNodeData[id],
			node_visual: newGraphData[id],
		},
		old: {},
	});
};
