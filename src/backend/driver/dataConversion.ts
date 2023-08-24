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

export const jsonToCypher_graphView = ({
	graphViewData,
	nodeData,
	graphViewId,
	nodeId,
	history,
	pointer,
}: graphViewInput) => {
	let cypher = '';

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
			connections?: {
				[key: string]: { [key: string]: any };
			};
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

		if (!('visualData' in data[transaction.id])) {
			data[transaction.id] = {};
		}

		data[transaction.id] = {
			...data[transaction.id],
			visualData: {
				...transaction.value.new,
				...data[transaction.id].visualData,
			},
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
			delete data[transaction.id].set.connections;
			data[transaction.id].visualData = {
				...graphViewData[transaction.id],
			};
		},
		NODE_ADD_EXISTING: (transaction: Action) => {
			if (!(transaction.id in data)) {
				data[transaction.id] = {};
			}

			if (data[transaction.id].delete) {
				delete data[transaction.id].delete;
			}

			data[transaction.id].set = { ...nodeData[transaction.id] };
			delete data[transaction.id].set.connections;
			data[transaction.id].visualData = {
				...graphViewData[transaction.id],
			};
		},
		NODE_DELETE: (transaction: Action) => {
			if (!(transaction.id in data)) {
				data[transaction.id] = {};
			}

			if (data[transaction.id].create) {
				delete data[transaction.id].create;
			}

			data[transaction.id].delete = true;
		},
		CONNECTION_ADD: (transaction: Action) => {
			const connection = transaction.value.connection;

			if (!(connection.startNode in data)) {
				data[connection.startNode] = {};
			}

			if (!('connections' in data[connection.startNode])) {
				data[connection.startNode].connections = {};
			}

			if (
				// @ts-ignore
				!(connection.endNode in data[connection.startNode].connections)
			) {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode] = {};
			}

			if (
				!(
					connection.type in
					// @ts-ignore
					data[connection.startNode].connections[connection.endNode]
				)
			) {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode][
					connection.type
				] = { create: true, delete: false, ...connection };
			}
		},
		CONNECTION_DELETE: (transaction: Action) => {
			const connection = transaction.value.connection;

			if (!(connection.startNode in data)) {
				data[connection.startNode] = {};
			}

			if (!('connections' in data[connection.startNode])) {
				data[connection.startNode].connections = {};
			}

			if (
				// @ts-ignore
				!(connection.endNode in data[connection.startNode].connections)
			) {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode] = {};
			}

			if (
				!(
					connection.type in
					// @ts-ignore
					data[connection.startNode].connections[connection.endNode]
				)
			) {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode][
					connection.type
				] = { delete: true };
			} else {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode][
					connection.type
				].delete = true;
			}
		},
		CONNECTION_DIRECTION_ADD: (transaction: Action) => {},
		CONNECTION_TYPE: (transaction: Action) => {
			const value = transaction.value;

			if (!(value.startNode in data)) {
				data[value.startNode] = {};
			}

			if (!('connections' in data[value.startNode])) {
				data[value.startNode].connections = {};
			}
			// @ts-ignore
			if (!(value.endNode in data[value.startNode].connections)) {
				// @ts-ignore
				data[value.startNode].connections[value.endNode] = {};
			}

			if (
				!(
					value.new.type in
					// @ts-ignore
					data[value.startNode].connections[value.endNode]
				)
			) {
				// @ts-ignore
				data[value.startNode].connections[value.endNode][
					value.new.type
				] = { create: true, delete: false };
			}

			if (
				!(
					value.old.type in
					// @ts-ignore
					data[value.startNode].connections[value.endNode]
				)
			) {
				// @ts-ignore
				data[value.startNode].connections[value.endNode][
					value.old.type
				] = { create: false, delete: true };
			} else {
				// @ts-ignore
				data[value.startNode].connections[value.endNode][
					value.old.type
				].delete = true;
			}
		},
		CONNECTION_DIRECTION: (transaction: Action) => {
			const connection = transaction.value.oldConnection;

			if (!(connection.endNode in data)) {
				data[connection.endNode] = {};
			}

			if (!('connections' in data[connection.endNode])) {
				data[connection.endNode].connections = {};
			}

			if (
				// @ts-ignore
				!(connection.startNode in data[connection.endNode].connections)
			) {
				// @ts-ignore
				data[connection.endNode].connections[connection.startNode] = {};
			}

			if (
				!(
					connection.type in
					// @ts-ignore
					data[connection.endNode].connections[connection.startNode]
				)
			) {
				// @ts-ignore
				data[connection.endNode].connections[connection.startNode][
					connection.type
				] = { create: true, delete: false };
			}

			// Delete original connection
			if (!(connection.startNode in data)) {
				data[connection.startNode] = {};
			}

			if (!('connections' in data[connection.startNode])) {
				data[connection.startNode].connections = {};
			}

			if (
				// @ts-ignore
				!(connection.endNode in data[connection.startNode].connections)
			) {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode] = {};
			}

			if (
				!(
					// @ts-ignore
					(
						connection.type in
						// @ts-ignore
						data[connection.startNode].connections[
							connection.endNode
						]
					)
				)
			) {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode][
					connection.type
				] = { create: false, delete: true };
			} else {
				// @ts-ignore
				data[connection.startNode].connections[connection.endNode][
					connection.type
				].delete = true;
			}
		},
		DRAG: (transaction: Action) => {
			changeNodeVisuals(transaction);
		},
		NODE_ICON: (transaction: Action) => {
			changeNodeProperties(transaction);
		},
		NODE_COLOR: (transaction: Action) => {
			changeNodeProperties(transaction);
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

		transactionToData[transaction.type](transaction);
	}

	const setPropertiesCypher = (node: any) => {
		if (node.set && Object.values(node.set).length > 0) {
			let out = '';
			out += 'SET';
			for (const property in node.set) {
				if (property === 'document') continue;
				out += ' n.' + property + ' = "' + node.set[property] + '",';
			}
			out = out.slice(0, out.length - 1);
			return out;
		} else {
			return '';
		}
	};

	const setVisualDataCypher = (node: any) => {
		if (node.visualData) {
			let out = `
			// merge to graph view 
			MERGE (g: GRAPH_VIEW {id: "${graphViewId}"})
			MERGE (g)-[r:HAS]->(n)
			`;
			out += 'SET';
			for (const property in node.visualData) {
				if (typeof node.visualData[property] === 'string') {
					out +=
						' r.' +
						property +
						' = "' +
						node.visualData[property] +
						'",';
				} else {
					out +=
						' r.' +
						property +
						' = ' +
						node.visualData[property] +
						',';
				}
			}
			out = out.slice(0, out.length - 1);
			return out;
		} else if (node.delete) {
			let out = `
			MERGE (g: GRAPH_VIEW {id: "${graphViewId}"})
			MERGE (g)-[r:HAS]->(n)
			DELETE r
			`;
			return out;
		} else {
			return '';
		}
	};

	// Create cypher from data
	// delete doesn't work
	for (const nodeKey in data) {
		const node = data[nodeKey];

		cypher += `
		MERGE (n: Node {id: "${nodeKey}"})
		${setPropertiesCypher(node)}

		${setVisualDataCypher(node)}
		`;

		if (node.create) {
			cypher += `
			// merge to current node
			MERGE (currentNode: Node {id: "${nodeId}"})
			MERGE (currentNode)-[:HAS]->(n)

			// create block
			MERGE (b:BLOCK_ELEMENT {type: "block", id: randomUuid()})
			MERGE (n)-[:NEXT_BLOCK]->(b)

			MERGE (p:BLOCK_INLINE {type: "p", id: randomUuid(), children: ["{text: ''}"]})
			MERGE (b)-[:BLOCK_CHILD]->(p)
			`;
		} else if (node.delete) {
			// no delete
			cypher += `
			
			`;
		}

		// connections
		if (node.connections) {
			for (const endNode in node.connections) {
				for (const type in node.connections[endNode]) {
					// const endNode =
					// 	node.connections[connectedNode][type].endNode;

					// Right now, since we aren't editing any relationships we only do anything if a relationship is created
					// So we put the entire function into relationship.create

					// instead of deleting and recreating, we could maybe invert. But idk
					// https://neo4j.com/docs/apoc/5/overview/apoc.refactor/apoc.refactor.invert/
					if (node.connections[endNode][type].delete) {
						if (!node.connections[endNode][type].create) {
							cypher += `
							MERGE (endNode:Node {id: "${endNode}"})
							MERGE (n)-[rel:${type}]->(endNode)
							DELETE rel
							WITH count(*) as dummy`;
						}
					} else if (node.connections[endNode][type].create) {
						cypher += `
						// Merge Connection
						MERGE (endNode:Node {id: "${endNode}"})
						MERGE (n)-[rel:${type}]->(endNode)
						WITH count(*) as dummy`;

						if ('content' in node.connections[endNode]) {
							// No saving connection details
						}
					} else {
						cypher += `
						`;
					}
				}
			}
		}

		cypher = cypher.replace(/\n.*$/, '');

		cypher += `
		WITH count(*) as dummy`;
	}

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
