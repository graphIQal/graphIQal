export const createGraphView = async (username: string, nodeId: string) => {
  const res = await fetch(`/api/${username}/${nodeId}/graph/create`, {
    method: 'POST',
  })
    .then((res) => {
      console.log('res create', res);
      return res.json();
    })
    .then((json) => {
      console.log('json create: ', json);
      return json;
    });

  return res;
};
