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

export const createNewNode = (
	title: string,
	connectedNode: string,
	connectionType: string
): CypherGenerator => {
	const res: CypherGenerator = { cypher: '', context: '' };
	res.cypher = `
	MERGE (b:Block {blocks:})
	MERGE (${title})-[r:BLOCK_CHILD]-()
	ON CREATE sET b.id = randomUuid()
	MERGE (n)-[:BLOCK_CHILD]->(b)
	`;
	res.context = { r: '' };
	return res;
};

export const getConnectedNodes = (nodeId: string) => {
	return `
	MATCH (n: Node {id: "${nodeId}"})-[r]->(c:Node)
	// RETURN n, collect([r, c]) AS connectedNodes
	RETURN n, r, c
	`;
};
