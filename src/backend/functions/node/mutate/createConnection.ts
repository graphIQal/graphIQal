type createConnectionInput = {
	startNode: string;
	endNode: string;
	type: string;
	content?: string[];
};

export const createConnection = async ({
	startNode,
	endNode,
	type,
	content = [],
}: createConnectionInput) => {
	const body = `
		MATCH (n:Node {id: "${startNode}"})
		MATCH (endNode:Node {id: "${endNode}"})
		MERGE (n)-[rel:${type}]->(endNode)
		`;
	// SET rel.content = ${content}

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
