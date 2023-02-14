//called when the node is dropped in a new place to update x and y values
export const moveNodeCallback = (
  id: string,
  x: number,
  y: number,
  nodes: any,
  setNodes: (val: any) => void
) => {
  let newNodes: any = {};
  for (const node in nodes) {
    newNodes[node] = nodes[node];
  }
  newNodes[id].graphNode.x = x;
  newNodes[id].graphNode.y = y;
  setNodes(newNodes);
};
