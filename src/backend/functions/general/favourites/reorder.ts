export const reorderFavourite = async ({
	favouritesId,
	favourites,
}: {
	favouritesId: string;
	favourites: string[];
}) => {
	const res = await fetch(
		`/api/general/user/favourites/add?favouritesId=${favouritesId}`,
		{
			method: 'POST',
			body: JSON.stringify(favourites),
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
