export const getConnections = async (nodeId: string, username: string) => {
  const res = await fetch(`/api/${username}/${nodeId}`)
    .then((res) => res.json())
    .then((json) => {
      console.log('connected Nodes');
      console.log(json);
      return json;
    });
  return res;
};
