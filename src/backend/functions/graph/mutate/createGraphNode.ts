import { GraphNodeData } from '../../../../packages/graph/graphTypes';

type createGraphNodeInput = {
	id: string;
	nodeId: string;
	nodeVisualData: GraphNodeData;
	graphViewId: string;
};

export const createGraphNode = async ({
	id,
	nodeId,
	nodeVisualData,
	graphViewId,
}: createGraphNodeInput) => {
	// nodeVisualData[id] = {
	// 	x: x,
	// 	y: y,
	// 	width: size[0],
	// 	height: size[1],
	// 	collapsed: true,
	// 	categorizing_node: id,
	// };

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
		MERGE (n: Node {id: "${id}"})
		SET n.title = 'Untitled', n.icon = 'node', n.color = 'black'

		MERGE (currentNode: Node {id: "${nodeId}"})
		MERGE (currentNode)-[:HAS]->(n)

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
			console.log('json: ', json);
			return json;
		});

	return res;
};
