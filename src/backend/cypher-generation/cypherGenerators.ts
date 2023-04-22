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

export const addBlockOnNodeCreation = (
	nodeVariable: string,
	blockTitle: string
): CypherGenerator => {
	const res: CypherGenerator = { cypher: '', context: '' };
	res.cypher = `
	MERGE (b:Block {blocks:})
	MERGE (${nodeVariable})-[r:BLOCK_CHILD]-()
	ON CREATE sET b.id = randomUuid()
	MERGE (n)-[:BLOCK_CHILD]->(b)
	`;
	res.context = { r: '' };
	return res;
};
