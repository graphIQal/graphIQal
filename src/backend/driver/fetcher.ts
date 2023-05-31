export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    console.log('res ', res);
    return res.json();
  });

export const fetcherAll = (urls: string[]) =>
  Promise.all(
    urls.map((url) =>
      fetch(url).then(async (res) => {
        console.log('in fetcher');
        const json = await res.json();
        return json;
      })
    )
  );
//

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
