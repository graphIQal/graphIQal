import useSWR from 'swr';
import { fetcher } from '../../../driver/fetcher';
import { jsonToCypher_graphView } from '../../../driver/dataConversion';
import { Action } from '../../../../packages/graph/hooks/useHistoryState';

type updateGraphViewInput = {
	graphViewId: string;
	graphViewData: any;
};

export const updateGraphView = async ({
	graphViewId,
	graphViewData,
}: updateGraphViewInput) => {
	let out = 'SET';

	for (const property in graphViewData) {
		if (property in graphViewData) {
			if (typeof graphViewData[property] === 'string') {
				out +=
					' g.' + property + ' = "' + graphViewData[property] + '",';
			} else {
				out += ' g.' + property + ' = ' + graphViewData[property] + ',';
			}
		}
	}

	out = out.slice(0, out.length - 1);

	const body = `
		MATCH (g:GRAPH_VIEW {id: "${graphViewId}"})
		${out}
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
