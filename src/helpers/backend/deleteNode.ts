import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export const deleteNode = (
  id: string,
  viewContext: GraphViewContextInterface
) => {
  let newNodes = { ...viewContext.nodeData_Graph };
  delete newNodes[id];
  viewContext.setnodeData_Graph(newNodes);
};
