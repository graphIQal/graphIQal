export const getDocument = async (nodeId: string, username: string) => {
	console.log('getDocument');
	console.log(nodeId, username);

	const res = await fetch(`/api/${username}/${nodeId}`)
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
