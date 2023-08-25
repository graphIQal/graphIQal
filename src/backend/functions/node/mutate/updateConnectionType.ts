import useSWR from 'swr';
import { fetcher } from '../../../driver/fetcher';
import { jsonToCypher_graphView } from '../../../driver/dataConversion';
import { GraphNodeData, NodeData } from '../../../../packages/graph/graphTypes';
import { Action } from '../../../../packages/graph/hooks/useHistoryState';

type changeConnectionTypeInput = {
	startNode: string;
	endNode: string;
	oldType: string;
	newType: string;
};

export const changeConnectionType = async ({
	startNode,
	endNode,
	oldType,
	newType,
}: changeConnectionTypeInput) => {
	const body = `
		MATCH (n:Node {id:"${startNode}"})-[r:${oldType}]->(m:Node {id:"${endNode}"})
		CREATE (n)-[r2:${newType}]->(m)
		SET r2 = properties(r)
		WITH r
		DELETE r
	`;

	const res = await fetch(`/api/general/nodes/mutate/connection`, {
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
