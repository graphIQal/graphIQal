export const searchForNode = async (
  username: string,
  titleToSearch: string
) => {
  const res = await fetch(
    `/api/general/search?username=${username}&search=${titleToSearch}`
  ).then(async (res) => {
    const json = await res.json().then((json) => {
      console.log('Json ' + json);
      return json;
    });
  });
  return res;
};
