type detachNodeInput = {
	nodeId: string;
};

export const detachNode = async ({ nodeId }: detachNodeInput) => {
	const body = `
        OPTIONAL MATCH (n: Node {id: "${nodeId}"})-[r]-()
		DELETE r
	`;

	const res = await fetch(`/api/general/nodes/mutate/deleteDetachNode`, {
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
