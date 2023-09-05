export const fetcher = (url: string) =>
	fetch(url)
		.then((res) => {
			// console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			console.log(json);
			return json;
		});

export const fetcherSingleReturn = (url: string) =>
	fetch(url)
		.then((res) => {
			// console.log('res ', res);
			return res.json();
		})
		.then((json) => {
			// console.log('json: ', json);

			if (json.length > 0) return json[0];

			return null;
		});

export const fetcherAll = (urls: string[]) =>
	Promise.all(
		urls.map((url) =>
			fetch(url).then(async (res) => {
				// console.log('in fetcher');
				// console.log(res);
				const json = await res.json();
				return json;
			})
		)
	);
//

// export const subscribe = () => {};

// ({ url, ids }) =>
//   Promise.all(
//     ids.map((id) =>
//       fetch(`https://swapi.dev/api${url}/${id}`).then(async (response) => {
//         // do something in here
//         const { name } = await response.json()
//         return { name: name.toUpperCase() }
//       })
//     )
//   )
