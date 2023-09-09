type updateConnectionInput = {
	startNode: string;
	endNode: string;
	type: string;
	properties: { [key: string]: any };
};

export const updateConnection = async ({
	startNode,
	endNode,
	type,
	properties,
}: updateConnectionInput) => {
	let out = 'SET';

	for (const property in properties) {
		if (property in properties) {
			if (typeof properties[property] === 'string') {
				out += ' r.' + property + ' = "' + properties[property] + '",';
			} else {
				out += ' r.' + property + ' = ' + properties[property] + ',';
			}
		}
	}

	out = out.slice(0, out.length - 1);

	const body = `
		MATCH (n:Node {id:"${startNode}"})-[r:${type}]->(m:Node {id:"${endNode}"})
		${out}
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
