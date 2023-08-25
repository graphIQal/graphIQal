import useSWR from 'swr';
import { fetcher } from '../../../driver/fetcher';
import { jsonToCypher_graphView } from '../../../driver/dataConversion';
import { GraphNodeData, NodeData } from '../../../../packages/graph/graphTypes';
import { Action } from '../../../../packages/graph/hooks/useHistoryState';

type reverseConnectionInput = {
	startNode: string;
	endNode: string;
	type: string;
};

export const reverseConnection = async ({
	startNode,
	endNode,
	type,
}: reverseConnectionInput) => {
	const body = `
		MATCH (n:Node {id:"${startNode}"})-[r:${type}]->(m:Node {id:"${endNode}"})
		CALL apoc.refactor.invert(r)
        yield input, output
        RETURN n
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
