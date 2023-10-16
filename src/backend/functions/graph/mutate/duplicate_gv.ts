import { GraphNodeData, NodeData } from '../../../../packages/graph/graphTypes';

type saveGraphViewInput = {
	username: string;
	nodeId: string;
	// nodeTitle: string;
	graphViewId: string;
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
};

export const saveGraphView = async ({
	username,
	nodeId,
	graphViewId,
	graphViewData,
	nodeData,
}: saveGraphViewInput) => {
	// const body = JSON.stringify({ ...nodeData, ...graphViewData });
	console.log('duplicateGV');
	// console.log(body);

	// return res;
};
