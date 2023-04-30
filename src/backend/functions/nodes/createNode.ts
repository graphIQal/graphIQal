type createNodeInput = {
	userId: string;
	currentNodeId: string;
	nodeTitle: string;
};

export const createNode = async ({
	userId,
	currentNodeId,
	nodeTitle,
}: createNodeInput) => {
	console.log('login attempted ');

	const res = await fetch(
		`/api/${userId}/${currentNodeId}/create?nodeTitle=${nodeTitle}`
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
