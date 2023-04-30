type createNodeInput = {
	userId: string;
	currentNodeId: string;
	nodeTitle: string;
	graphViewId: string;
	x_cell: number;
	y_cell: number;
	x_size: number;
	y_size: number;
};

export const getGraphViews = async ({
	userId,
	currentNodeId,
	nodeTitle,
	graphViewId,
	x_cell,
	y_cell,
	x_size,
	y_size,
}: createNodeInput) => {
	console.log('login attempted ');

	const res = await fetch(
		`/api/${userId}/${currentNodeId}/create?nodeTitle=${nodeTitle}&x_cell=${x_cell}&y_cell=${y_cell}&x_size=${x_size}&y_size=${y_size}`
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
