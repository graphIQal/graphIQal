// get data of nodes (title, ID, icon, color) of the nodes n that have a relationship HAS with a node in nodeIDs where n HAS one of the nodeIDs

import { DirectionalConnectionTypes, NodeDataType } from '@/backend/schema';

// if possible, sort by the ones that are the parent of the most nodes in nodeIDs
export const filterSearch = async (filters: {
	[key in DirectionalConnectionTypes]: NodeDataType[];
}) => {
	if (
		Object.values(filters).reduce((acc, curr) => acc + curr.length, 0) === 0
	)
		return [];

	const res = await fetch(`/api/general/nodes/query/filterSearch`, {
		method: 'POST',
		body: JSON.stringify(filters),
	})
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			// console.log(json);
			return json;
		});

	return res;
};
