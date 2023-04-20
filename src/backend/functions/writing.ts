export const deleteAll = () => {
	console.log('deleteAll ');

	fetch(`/api/general/deleteAll`)
		.then((res) => {
			console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			console.log('json: ', json);
			return json;
		});
};
