import { GraphContextInterface } from '../GraphContext';
import { updateNode } from './updateNodeHelper';

//called when the node is dropped in a new place to update x and y values
export const moveNodeCallback = (
  id: string,
  x: number,
  y: number,
  context: GraphContextInterface | null
) => {
  // let newNodes: any = {};
  // for (const node in nodes) {
  //   newNodes[node] = nodes[node];
  // }
  // newNodes[id].graphNode.x = x;
  // newNodes[id].graphNode.y = y;
  // setNodes(newNodes);
  updateNode('drag', { x: x, y: y }, id, context);
};
