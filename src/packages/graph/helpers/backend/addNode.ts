import { v4 as uuidv4 } from 'uuid';
// import { API, State } from '../../packages/graph/context/GraphViewContext';
import { defaultDocument } from '@/packages/editor/plateTypes';
import { mutate } from 'swr';
import { API, State } from '../../context/GraphViewContext';

export const addNode = (
	context: Partial<State & API & { nodeId: string }>,
	// mutate: ScopedMutator<any>,
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

	let id = uuidv4();

	const newNodeVisualData = {
		x: x,
		y: y,
		width: size[0],
		height: size[1],
		collapsed: true,
		categorizing_node: id,
	};

	const newNode = {
		id: id,
		title: 'Untitled',
		icon: 'node',
		color: 'black',
		connections: {},
		document: defaultDocument,
	};

	console.log(` mutate /api/username/${id}`);

	// mutate(
	// 	`/api/username/${id}`,
	addAction(id, 'NODE_ADD', {
		newNode,
		newNodeVisualData,
		// newNodeid: id,
		nodeId,
	});
	// {
	// optimisticData: {
	// 	n: {
	// 		id: id,
	// 		title: '',
	// 		icon: 'node',
	// 		color: 'black',
	// 		document: defaultDocument,
	// 	},
	// 	connections: [],
	// },
	// populateCache: () => {
	// 	console.log('populating cache');
	// 	return {
	// 		n: {
	// 			id: id,
	// 			title: '',
	// 			icon: 'node',
	// 			color: 'black',
	// 			document: defaultDocument,
	// 		},
	// 		connections: [],
	// 	};
	// },
	// }
	// );
};
