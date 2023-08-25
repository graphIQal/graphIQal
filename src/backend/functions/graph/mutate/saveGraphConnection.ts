import useSWR from 'swr';
import { fetcher } from '../../../driver/fetcher';
import { jsonToCypher_graphView } from '../../../driver/dataConversion';
import { GraphNodeData, NodeData } from '../../../../packages/graph/graphTypes';
import { Action } from '../../../../packages/graph/hooks/useHistoryState';

type saveGraphConnectionInput = {
	node1: string;
	node2: string;
	type: string;
};

export const saveGraphConnection = async ({
	node1,
	node2,
	type,
}: saveGraphConnectionInput) => {
	const body = `
		MATCH (n:Node {id: "${node1}"})
		MATCH (endNode:Node {id: "${node2}"})
		MERGE (n)-[rel:${type}]->(endNode)
	`;

	const res = await fetch(`/api/general/nodes/mutate/newConnection`, {
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
