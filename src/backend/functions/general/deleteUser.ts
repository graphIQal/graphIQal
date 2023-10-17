type saveGraphViewInput = {
	username: string;
	email: string;
	password: string;
};

export const deleteUser = async ({
	username,
	email,
	password,
}: saveGraphViewInput) => {
	const res = await fetch(
		`/api/general/deleteUser?email=${email}&username=${username}&password=${password}&`,
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
