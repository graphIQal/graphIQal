import { GraphNodeData } from '../../../../packages/graph/graphTypes';

type updateGraphNodeInput = {
	nodeId: string;
	nodeVisualData: Partial<GraphNodeData>;
	graphViewId: string;
};

export const updateGraphNode = async ({
	nodeId,
	nodeVisualData,
	graphViewId,
}: updateGraphNodeInput) => {
	let out = 'SET';

	for (const property in nodeVisualData) {
		if (property in nodeVisualData) {
			if (
				typeof nodeVisualData[property as keyof GraphNodeData] ===
				'string'
			) {
				out +=
					' r.' +
					property +
					' = "' +
					nodeVisualData[property as keyof GraphNodeData] +
					'",';
			} else {
				out +=
					' r.' +
					property +
					' = ' +
					nodeVisualData[property as keyof GraphNodeData] +
					',';
			}
		}
	}

	out = out.slice(0, out.length - 1);

	const body = `
        MERGE (n: Node {id: "${nodeId}"})
        MERGE (g: GRAPH_VIEW {id: "${graphViewId}"})
        MERGE (g)-[r:HAS]->(n)
		${out}
	`;

	const res = await fetch(`/api/general/nodes/mutate/graphView`, {
		method: 'POST',
		body: body,
	})
		.then((res) => {
			console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			// console.log('json: ', json);
			return json;
		});

	return res;
};
