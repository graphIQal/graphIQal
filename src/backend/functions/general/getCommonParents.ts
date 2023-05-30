// get data of nodes (title, ID, icon, color) of the nodes n that have a relationship HAS with a node in nodeIDs where n HAS one of the nodeIDs

import { NodeData } from '../../../packages/graph/graphTypes';

// if possible, sort by the ones that are the parent of the most nodes in nodeIDs
export const getCommonParents = async (nodeIDs: string[]) => {
	// const cypher = `
	// WITH ['Keanu Reeves', 'Hugo Weaving', 'Emil Eifrem'] as names
	// MATCH (p:Person)-[:ACTED_IN]->(m:Movie)
	// WHERE p.name in names
	// RETURN m
	// `

	const cypher = `
  MATCH (u1:Node)<-[r:HAS]-(i:Node)-[r2:HAS]->(u2:Node)
  WHERE u1.id in ${JSON.stringify(nodeIDs)} AND u2.id in ${JSON.stringify(
		nodeIDs
	)}
  RETURN i {.*}, collect(DISTINCT {r: r {.*, type: type(r)}, u: u1 {.*}}) AS connections,  count(i)
  ORDER BY count(i) DESC`;

	console.log(cypher);

	const res = await fetch(`/api/general/nodes/query/getCommonParentsAPI`, {
		method: 'POST',
		body: cypher,
	})
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

	console.log('res');
	console.log(res);

	return res;
};
