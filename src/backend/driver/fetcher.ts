export const fetcher = (url: string) =>
	fetch(url).then((res) => {
		console.log('res ', res);
		return res.json();
	});
