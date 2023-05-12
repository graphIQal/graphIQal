import useSWR from 'swr';
import { fetcher } from '../../driver/fetcher';
import {
	GraphNodeData,
	NodeData,
	VisualData,
} from '../../../schemas/Data_structures/DS_schema';
import { jsonToCypher_graphView } from '../../driver/dataConversion';

type saveGraphViewInput = {
	username: string;
	nodeId: string;
	// nodeTitle: string;
	graphViewId: string;
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
};

export const saveGraphView = async ({
	username,
	nodeId,
	graphViewId,
	graphViewData,
	nodeData,
}: saveGraphViewInput) => {
	const body = jsonToCypher_graphView({
		nodeData,
		graphViewData,
		graphViewId,
		nodeId,
	});
	// const body = JSON.stringify({ ...nodeData, ...graphViewData });
	console.log(body);

	const res = await fetch(
		`/api/${username}/${nodeId}/graph/${graphViewId}/save`,
		{
			method: 'POST',
			body: body,
		}
	)
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
