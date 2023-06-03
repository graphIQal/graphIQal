import {
	ConnectionData,
	ConnectionTypes,
} from '../../packages/graph/graphTypes';

type Context = {};
type CypherGenerator = { cypher: string; context: Object };

export const GenerateCypher = (functions: Array<Function>) => {
	let finalCypher = '';
	let params = {};
	functions.forEach((fn) => {
		const { cypher, context } = fn();
		params = { ...params, ...context };
	});
	return finalCypher;
};

export const customCypher = (cypher: string): string => {
	return cypher;
};

export const returnCypher = (params: Object = {}) => {
	let returnString = '';

	Object.keys(params).forEach((param) => {
		returnString += param + ', ';
	});

	return '\nRETURN ' + returnString;
};

type createNewNodeCypher_Input = {
	properties?: {
		[key: string]: string | number | boolean;
	};
	connections?: {
		connectionNodeProperties: { [key: string]: string };
		type: ConnectionTypes;
		properties?: {
			[key: string]: string | number | boolean;
		};
		direction_away?: boolean;
	}[];
};

export const mergeNodeCypher = (node: createNewNodeCypher_Input): string => {
	let cypher = `MERGE (n: Node {`;

	// create/find the current node
	if (node.properties) {
		if ('id' in node.properties) delete node.properties.id;

		for (const key in node.properties) {
			cypher += key + `:'${node.properties[key]}',`;
		}

		cypher = cypher.slice(0, -1);
		cypher += '})';
		cypher += '\n SET n.id = randomUuid()';
	}

	// Create all connections, this is currently directionless
	if (node.connections) {
		for (const i in node.connections) {
			const connection = node.connections[i];
			cypher += `
			MERGE (a {`;

			for (const key in connection.connectionNodeProperties) {
				cypher +=
					key + `:'${connection.connectionNodeProperties[key]}',`;
			}

			cypher = cypher.slice(0, -1);

			if (connection.direction_away) {
				cypher += `})
				MERGE (n)-[r:${connection.type}]->(a)`;
			} else {
				cypher += `})
				MERGE (n)<-[r:${connection.type}]-(a)`;
			}
		}
	}

	console.log(cypher);
	return cypher;
};

export const deleteNodeCypher = (node: createNewNodeCypher_Input): string => {
	let cypher = `MATCH (n: Node {`;

	// create/find the current node
	if (node.properties) {
		if ('id' in node.properties) delete node.properties.id;

		for (const key in node.properties) {
			cypher += key + `:'${node.properties[key]}',`;
		}

		cypher = cypher.slice(0, -1);
		cypher += '})';
		cypher += '\nDETACH DELETE n';
	}

	return cypher;
};

export const getNodeData_cypher = (nodeId: string) => {
	return `
	MATCH (n: Node {id: "${nodeId}"})-[r]-(c:Node)
	RETURN n {.*}, collect({r:r {.*, type: type(r)}, connected_node:c {.*}}) AS connectedNodes
	// RETURN r {.*, type: type(r)}, c {.*} 
	`;
};

export const chainCypher = (cypher: string): string => {
	return cypher;
};
