type createNodeInput = {
	userId: string;
	currentNodeId: string;
	nodeTitle: string;
	graphViewId: string;
	nodes: Array<VisualData>;
};

// Move this into graph
type NodesInGraphData = {};

import useSWR from 'swr';
import { fetcher } from '../../driver/fetcher';
import { VisualData } from '../../../schemas/Data_structures/DS_schema';

export const saveGraphView = async ({
	userId,
	currentNodeId,
	graphViewId,
	nodes,
}: createNodeInput) => {
	console.log('login attempted ');

	const { data: orders } = useSWR(
		{
			url: `/api/${userId}/${currentNodeId}/graph/${graphViewId}/create`,
			// args: user,
		},
		fetcher
	);

	const res = await fetch(
		`/api/${userId}/${currentNodeId}/graph/${graphViewId}/save`,
		{}
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
