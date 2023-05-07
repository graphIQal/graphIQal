import useSWR from 'swr';
import { fetcher } from '../../driver/fetcher';
import {
	GraphNodeData,
	NodeData,
	VisualData,
} from '../../../schemas/Data_structures/DS_schema';
import { jsonToCypher_graphView } from '../../driver/dataConversion';

export const createGraphView = async (username: string, nodeId: string) => {
	const res = await fetch(`/api/${username}/${nodeId}/graph/create`, {
		method: 'POST',
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
