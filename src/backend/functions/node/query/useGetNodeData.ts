import { type } from 'os';
import { fetcher, fetcherAll } from '../../../driver/fetcher';
import useSWR from 'swr';

export type getNodeData_type = {
	n: { [key: string]: string };
	connectedNodes: connectedNode_type[];
};

export type Connection = {
	type: string;
	[key: string]: string;
} & { fromNode: boolean };

export type connectedNode_type = {
	r: Connection;
	connected_node: { [key: string]: string };
};

export const useGetNodeData = (nodeId: string) => {
	// console.log('usegetNodeData ', nodeId);

	const { data: res } = useSWR(
		[nodeId ? `/api/username/${nodeId}` : null],
		fetcherAll,
		{ dedupingInterval: 4000 }
	);
	// const res = await fetch(`/api/${username}/${nodeId}`)
	// 	.then((res) => {
	// 		return res.json();
	// 	})
	// 	.then((json) => {
	// 		return json;
	// 	});

	return res && res[0] ? res[0][0] : null;
};
