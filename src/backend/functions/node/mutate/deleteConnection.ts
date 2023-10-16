type deleteConnectionAPIInput = {
	startNode: string;
	endNode: string;
	type: string;
};

export const deleteConnectionAPI = async ({
	startNode,
	endNode,
	type,
}: deleteConnectionAPIInput) => {
	const body = `
		MATCH (n:Node {id:"${startNode}"})-[r:${type}]->(m:Node {id:"${endNode}"})
        DELETE r
	`;

	const res = await fetch(`/api/general/nodes/mutate/connection`, {
		method: 'POST',
		body: body,
	})
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
