export type getNodeData_type = {
	n: { [key: string]: string };
	connectedNodes: connectedNode_type[];
};

export type connectedNode_type = {
	r: { type: string; [key: string]: string };
	connected_node: { [key: string]: string };
};

export const getNodeData = async (nodeId: string, username: string) => {
	const res = await fetch(`/api/${username}/${nodeId}`)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			return json;
		});

	return res;
};
