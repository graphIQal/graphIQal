export const createNodeInDocument = async (
	nodeId: string,
	username: string,
	connectionType: string,
	newId: string
) => {
	const res = await fetch(
		`/api/${username}/${nodeId}/create/${connectionType}/${newId}`,
		{
			method: 'POST',
		}
	)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			return json;
		});

	return res;
};
