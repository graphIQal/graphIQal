import useSWR from 'swr';
import { fetcher } from '../../driver/fetcher';
import {
	GraphNodeData,
	NodeData,
	VisualData,
} from '../../../schemas/Data_structures/DS_schema';

type saveGraphViewInput = {
	userId: string;
	nodeId: string;
	// nodeTitle: string;
	graphViewId: string;
	graphViewData: { [key: string]: GraphNodeData };
	nodeData: { [key: string]: NodeData };
};

export const saveGraphView = async ({
	userId,
	nodeId,
	graphViewId,
	graphViewData,
	nodeData,
}: saveGraphViewInput) => {
	console.log('login attempted ');

	const { data: orders } = useSWR(
		{
			url: `/api/${userId}/${nodeId}/graph/${graphViewId}/create`,
			// args: user,
		},
		fetcher
	);

	const body = JSON.stringify(nodes);

	const res = await fetch(
		`/api/${userId}/${nodeId}/graph/${graphViewId}/save`,
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
