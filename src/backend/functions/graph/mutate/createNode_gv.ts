export {};
// {
// 	type createNode_gv_Input = {
// 		userId: string;
// 		currentNodeId: string;
// 		nodeTitle: string;
// 		graphViewId: string;
// 		x_cell: number;
// 		y_cell: number;
// 		x_size: number;
// 		y_size: number;
// 	};
// 	import useSWR from 'swr';
// 	import { fetcher } from '../../driver/fetcher';

// 	export const createNode = async ({
// 		userId,
// 		currentNodeId,
// 		nodeTitle,
// 		graphViewId,
// 		x_cell,
// 		y_cell,
// 		x_size,
// 		y_size,
// 	}: createNode_gv_Input) => {
// 		console.log('create Node ');

// 		const { data: orders } = useSWR(
// 			{
// 				url: `/api/${userId}/${currentNodeId}/graph/${graphViewId}/create`,
// 				// args: user,
// 			},
// 			fetcher
// 		);

// 		// const res = await fetch(
// 		// 	// `/api/${userId}/${currentNodeId}/create?nodeTitle=${nodeTitle}&x_cell=${x_cell}&y_cell=${y_cell}&x_size=${x_size}&y_size=${y_size}`
// 		// `/api/${userId}/${currentNodeId}/graph/${graphViewId}/create`,
// 		// 	{
// 		// 		body: {
// 		// 		}
// 		// 	}
// 		// )
// 		// 	.then((res) => {
// 		// 		console.log('res ', res);
// 		// 		return res.json();
// 		// 	})
// 		// 	.then((json) => {
// 		// 		console.log('json: ', json);
// 		// 		return json;
// 		// 	});

// 		// return res;
// 	};
// }
