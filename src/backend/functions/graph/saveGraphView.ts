type createNodeInput = {
	userId: string;
	currentNodeId: string;
	nodeTitle: string;
	graphViewId: string;
	nodes: Array<NodesInGraphData>;
};

// Move this into graph
type NodesInGraphData = {};

export const createNode = async ({
	userId,
	currentNodeId,
	graphViewId,
	nodes,
}: createNodeInput) => {
	console.log('login attempted ');

	const res = await fetch(
		`/api/${userId}/${currentNodeId}/graph/${graphViewId}/save`,
		{}
	)
		.then((res) => {
			console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			console.log('json: ', json);
			return json;
		});

	return res;
};
