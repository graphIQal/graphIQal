import useSWR from 'swr';
import { fetcher } from '../../../driver/fetcher';
import { jsonToCypher_graphView } from '../../../driver/dataConversion';
import { GraphNodeData, NodeData } from '../../../../packages/graph/graphTypes';
import { Action } from '../../../../packages/graph/hooks/useHistoryState';

type saveGraphActionInput = {
	// username: string;
	// nodeId: string;
	// // nodeTitle: string;
	// graphViewId: string;
	// graphViewData: { [key: string]: GraphNodeData };
	// nodeData: { [key: string]: NodeData };
	// history: React.MutableRefObject<Action[]>;
	// pointer: React.MutableRefObject<Number>;
};

export const saveGraphAction = async ({}: // username,
// nodeId,
// graphViewId,
// graphViewData,
// nodeData,
// history,
// pointer,
saveGraphActionInput) => {
	// const body = jsonToCypher_graphView({
	// 	nodeData,
	// 	graphViewData,
	// 	graphViewId,
	// 	nodeId,
	// 	history,
	// 	pointer,
	// });
	// 	console.log('saveGraphAction');
	// 	console.log(body);
	// 	const res = await fetch(
	// 		`/api/${username}/${nodeId}/graph/${graphViewId}/save`,
	// 		{
	// 			method: 'POST',
	// 			body: body,
	// 		}
	// 	)
	// 		.then((res) => {
	// 			console.log('res ', res);
	// 			return res.json();
	// 		})
	// 		.then((json) => {
	// 			console.log('json: ', json);
	// 			return json;
	// 		});
	// 	return res;
};
