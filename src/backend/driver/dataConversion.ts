import {
	GraphNodeData,
	NodeData,
} from '../../schemas/Data_structures/DS_schema';

export const cypherToJson_graphView = () => {};

type graphViewInput = {
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
	graphViewId: string;
	nodeId: string;
};
export const jsonToCypher_graphView = ({
	graphViewData,
	nodeData,
	graphViewId,
	nodeId,
}: graphViewInput) => {
	console.log(graphViewData);
	console.log(nodeData);
	let cypher = '';
	let relationship = 'r';
	let node = 'n';

	// Original
	// for (const key in graphViewData) {
	// 	cypher += `
	// 	MERGE (:GRAPH_VIEW {id: "${graphViewId}"})-[${relationship}:IN]->(${node}: Node {id: "${key}"})
	// 	SET ${relationship}.x = ${graphViewData[key].x}, ${relationship}.y = ${graphViewData[key].y}, ${relationship}.height = ${graphViewData[key].height}, ${relationship}.width = ${graphViewData[key].width}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
	// 	SET ${node}.title = "${nodeData[key].title}"
	// 	`;
	// 	relationship += 'r';
	// 	node += 'n';
	// }

	for (const key in graphViewData) {
		console.log(graphViewData[key].height);
		cypher += `
		OPTIONAL MATCH (${node}: Node {id: "${key}"})
		MATCH (g:GRAPH_VIEW {id: "${graphViewId}"})
		// When the node already exists
		FOREACH(ignoreMe IN CASE WHEN ${node} is not NULL THEN [1] ELSE [] END | 
			MERGE (g)-[${relationship}:IN]->(${node})
			SET ${relationship}.x = ${graphViewData[key].x}, ${relationship}.y = ${graphViewData[key].y}, ${relationship}.height = ${graphViewData[key].height}, ${relationship}.width = ${graphViewData[key].width}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
			SET ${node}.title = "${nodeData[key].title}"
		)
		// When the node doesn't exist yet
		FOREACH(ignoreMe IN CASE WHEN NOT ${node} is not NULL THEN [1] ELSE [] END | 
			// Create Node and link to current graph view
			MERGE (g)-[${relationship}:IN]->(${node}a:Node {id: "${key}"})
			
			// Create it's own graph view
			MERGE (${node}a)-[:VIEW]->(:GRAPH_VIEW {id: randomUuid(), title: "Graph View"})
			// create blocks 
			MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
			MERGE (${node}a)-[:NEXT_BLOCK]->(b)

			MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
			MERGE (b)-[:BLOCK_CHILD]->(p)
			// connect to current node
			MERGE (currentNode: Node {id: "${nodeId}"})
			MERGE (currentNode)-[:IN]->(${node}a)
			SET ${relationship}.x = ${graphViewData[key].x}, ${relationship}.y = ${graphViewData[key].y}, ${relationship}.height = ${graphViewData[key].height}, ${relationship}.width = ${graphViewData[key].width}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
			SET ${node}a.title = "${nodeData[key].title}"
		)
		WITH count(*) as dummy`;
		relationship += 'r';
		node += 'n';
	}

	// cypher += '\nRETURN g, r, n';

	return cypher.replace(/\n.*$/, '');
};
