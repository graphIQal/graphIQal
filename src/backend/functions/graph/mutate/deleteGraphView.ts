import useSWR from 'swr';
import { fetcher } from '../../../driver/fetcher';
import { jsonToCypher_graphView } from '../../../driver/dataConversion';
import { Action } from '../../../../packages/graph/hooks/useHistoryState';

type deleteGraphViewInput = {
	graphViewId: string;
};

export const deleteGraphView = async ({
	graphViewId,
}: deleteGraphViewInput) => {
	const body = `
		MATCH (g:GRAPH_VIEW {id: "${graphViewId}"})
		DETACH DELETE g
	`;

	const res = await fetch(`/api/general/views/${graphViewId}/update`, {
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
