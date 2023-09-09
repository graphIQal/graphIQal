import { NodeData } from '../../../../packages/graph/graphTypes';

type updateNodeInput = {
	nodeId: string;
	nodeData: Partial<NodeData>;
};

export const updateNode = async ({ nodeId, nodeData }: updateNodeInput) => {
	let out = 'SET';

	for (const property in nodeData) {
		if (property in nodeData) {
			if (typeof nodeData[property as keyof NodeData] === 'string') {
				out +=
					' n.' +
					property +
					' = "' +
					nodeData[property as keyof NodeData] +
					'",';
			} else {
				out +=
					' n.' +
					property +
					' = ' +
					nodeData[property as keyof NodeData] +
					',';
			}
		}
	}

	out = out.slice(0, out.length - 1);

	const body = `
        MERGE (n: Node {id: "${nodeId}"})
		${out}
	`;

	const res = await fetch(`/api/general/nodes/mutate/updateNodeProperties`, {
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
