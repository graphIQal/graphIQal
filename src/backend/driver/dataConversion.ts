import {
	GraphNodeData,
	NodeData,
} from '../../schemas/Data_structures/DS_schema';

export const cypherToJson_graphView = () => {};

type graphViewInput = {
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
	graphViewId: string;
};
export const jsonToCypher_graphView = ({
	graphViewData,
	nodeData,
	graphViewId,
}: graphViewInput) => {
	console.log(graphViewData);
	console.log(nodeData);
	let cypher = '';
	let relationship = 'r';
	let node = 'n';

	for (const key in graphViewData) {
		cypher += `
		MERGE (:GRAPH_VIEW {id: "${graphViewId}"})-[${relationship}:IN]->(${node}: Node {id: "${key}"})
		SET ${relationship}.x = ${graphViewData[key].x.low}, ${relationship}.y = ${graphViewData[key].y.low}, ${relationship}.height = ${graphViewData[key].height.low}, ${relationship}.width = ${graphViewData[key].width.low}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
		SET ${node}.title = "${nodeData[key].title}"
		`;
		relationship += 'r';
		node += 'n';
	}

	// cypher += '\nRETURN g, r, n';

	return cypher;
};
