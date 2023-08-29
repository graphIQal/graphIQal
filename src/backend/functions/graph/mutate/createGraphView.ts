export const createGraphView = async ({
	graphViewId,
	nodeId,
	username,
}: {
	username: string;
	graphViewId: string;
	nodeId: string;
}) => {
	console.log('createGraphView');

	const res = await fetch(
		`/api/${username}/${nodeId}/graph/${graphViewId}/create`,
		{
			method: 'POST',
		}
	)
		.then((res) => {
			console.log('res create', res);
			return res.json();
		})
		.then((json) => {
			console.log('json create: ', json);
			return json;
		});

	return res;
};
