export const deleteFavourite = async ({
	favouritesId,
	nodeId,
}: {
	favouritesId: string;
	nodeId: string;
}) => {
	const res = await fetch(
		`/api/general/user/favourites/delete?favouritesId=${favouritesId}&nodeId=${nodeId}`,
		{
			method: 'POST',
		}
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
