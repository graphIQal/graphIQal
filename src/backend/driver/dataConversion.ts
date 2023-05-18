// import {
// 	GraphNodeData,
// 	NodeData,
// } from '../../schemas/Data_structures/DS_schema';

import { GraphNodeData, NodeData } from '../../packages/graph/graphTypes';
import { Action } from '../../packages/graph/hooks/useHistoryState';

export const cypherToJson_graphView = () => {};

type graphViewInput = {
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
	graphViewId: string;
	nodeId: string;
	history: React.MutableRefObject<Action[]>;
	pointer: React.MutableRefObject<Number>;
};

const nodeAdd_cypher = (action: Action) => {
	console.log(action);
	return action;
};

export const jsonToCypher_graphView = ({
	graphViewData,
	nodeData,
	graphViewId,
	nodeId,
	history,
	pointer,
}: graphViewInput) => {
	let cypher = '';
	let relationship = 'r';
	let node = 'n';

	// Original
	// for (const key in graphViewData) {
	// 	cypher += `
	// 	MERGE (:GRAPH_VIEW {id: "${graphViewId}"})-[${relationship}:HAS]->(${node}: Node {id: "${key}"})
	// 	SET ${relationship}.x = ${graphViewData[key].x}, ${relationship}.y = ${graphViewData[key].y}, ${relationship}.height = ${graphViewData[key].height}, ${relationship}.width = ${graphViewData[key].width}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
	// 	SET ${node}.title = "${nodeData[key].title}"
	// 	`;
	// 	relationship += 'r';
	// 	node += 'n';
	// }

	const data: {
		[key: string]: {
			create?: boolean;
			delete?: boolean;
			set?: any;
			visualData?: any;
			connections?: { create?: any; delete?: any; set?: any };
		};
	} = {};

	const changeNodeProperties = (transaction: Action) => {
		if (!(transaction.id in data)) {
			data[transaction.id] = {};
		}

		if (data[transaction.id].create) return;

		data[transaction.id] = {
			...data[transaction.id],
			set: { ...transaction.value.new },
		};
	};

	const changeNodeVisuals = (transaction: Action) => {
		if (!(transaction.id in data)) {
			data[transaction.id] = {};
		}

		data[transaction.id] = {
			...data[transaction.id],
			visualData: { ...transaction.value.new },
		};
	};

	const transactionToData = {
		NODE_ADD: (transaction: Action) => {
			if (!(transaction.id in data)) {
				data[transaction.id] = {};
			}

			if (data[transaction.id].delete) {
				delete data[transaction.id].delete;
			}

			data[transaction.id].create = true;
			data[transaction.id].set = { ...nodeData[transaction.id] };
			data[transaction.id].visualData = {
				...graphViewData[transaction.id],
			};
		},
		NODE_DELETE: (transaction: Action) => {
			if (data[transaction.id].create) {
				delete data[transaction.id].create;
			}

			data[transaction.id].delete = true;
		},
		CONNECTION_ADD: (transaction: Action) => {},
		CONNECTION_DELETE: (transaction: Action) => {},
		CONNECTION_DIRECTION_ADD: (transaction: Action) => {},
		CONNECTION_TYPE: (transaction: Action) => {
			if (!(transaction.id in data)) {
				data[transaction.id] = {};
			}

			if (!('connections' in data[transaction.id])) {
				data[transaction.id].connections = {};
			}

			data[transaction.id].connections = {
				...data[transaction.id].connections,
			};

			const connection = {
				create: true,
				set: {},
			};
			// Add one connection
			// @ts-ignore
			data[transaction.id].connections.create = true;
			// @ts-ignore
		},
		CONNECTION_DIRECTION: (transaction: Action) => {},
		DRAG: (transaction: Action) => {
			changeNodeVisuals(transaction);
		},
		NODE_ICON: (transaction: Action) => {
			changeNodeVisuals(transaction);
		},
		NODE_COLOR: (transaction: Action) => {
			changeNodeVisuals(transaction);
		},
		NODE_TITLE: (transaction: Action) => {
			changeNodeProperties(transaction);
		},
		NODE_SIZE: (transaction: Action) => {
			changeNodeVisuals(transaction);
		},
	};

	for (let i = 0; i <= Number(pointer.current); i++) {
		const transaction = history.current[i];
		console.log(transaction);

		// add a cypher query by type
		cypher += transactionToData[transaction.type](transaction);
	}

	console.log(data);

	// Creating nodes
	// for (const key in graphViewData) {
	// 	cypher += `
	// 	OPTIONAL MATCH (${node}: Node {id: "${key}"})
	// 	MATCH (g:GRAPH_VIEW {id: "${graphViewId}"})
	// 	// When the node already exists
	// 	FOREACH(ignoreMe IN CASE WHEN ${node} is not NULL THEN [1] ELSE [] END |
	// 		MERGE (g)-[${relationship}:HAS]->(${node})
	// 		SET ${relationship}.x = ${graphViewData[key].x}, ${relationship}.y = ${graphViewData[key].y}, ${relationship}.height = ${graphViewData[key].height}, ${relationship}.width = ${graphViewData[key].width}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
	// 		SET ${node}.title = "${nodeData[key].title}"
	// 	)
	// 	// When the node doesn't exist yet
	// 	FOREACH(ignoreMe IN CASE WHEN NOT ${node} is not NULL THEN [1] ELSE [] END |
	// 		// Create Node and link to current graph view
	// 		MERGE (g)-[${relationship}:HAS]->(${node}a:Node {id: "${key}"})

	// 		// Create it's own graph view
	// 		// MERGE (${node}a)-[:VIEW]->(:GRAPH_VIEW {id: randomUuid(), title: "Graph View"})
	// 		// create blocks
	// 		MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
	// 		MERGE (${node}a)-[:NEXT_BLOCK]->(b)

	// 		MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
	// 		MERGE (b)-[:BLOCK_CHILD]->(p)
	// 		// connect to current node
	// 		MERGE (currentNode: Node {id: "${nodeId}"})
	// 		MERGE (currentNode)-[:HAS]->(${node}a)
	// 		SET ${relationship}.x = ${graphViewData[key].x}, ${relationship}.y = ${graphViewData[key].y}, ${relationship}.height = ${graphViewData[key].height}, ${relationship}.width = ${graphViewData[key].width}, ${relationship}.collapsed = ${graphViewData[key].collapsed}
	// 		SET ${node}a.title = "${nodeData[key].title}"
	// 	)
	// 	WITH count(*) as dummy`;
	// }

	// cypher = cypher.replace(/\n.*$/, '');

	// Adding relationships
	// for (const key in nodeData) {
	// 	for (const connectionKey in nodeData[key].connections) {
	// 		// console.log(nodeData[key].connections[connectionKey]);
	// 		const connection = nodeData[key].connections[connectionKey];
	// 		if (connection.startNode === nodeId) continue;

	// 		cypher += `

	// 		MATCH (s:Node {id: "${connection.startNode}"}), (e:Node {id: "${
	// 			connection.endNode
	// 		}"})
	// 		// LIMIT 1
	// 		MERGE (s)-[r:${connection.type}]->(e)
	// 		SET r.content = ${JSON.stringify(connection.content)}
	// 		WITH count(*) as dummy`;
	// 	}
	// }

	// return cypher;
	return cypher.replace(/\n.*$/, '');
};

export const duplicate_gv = (graphViewId: string) => {
	return `
		MATCH (g:GRAPH_VIEW {id:'${graphViewId}'})
		CALL apoc.refactor.cloneNodesWithRelationships([g])
		YIELD node RETURN node
	`;
};
