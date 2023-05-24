import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export const deleteNode = (
  id: string,
  viewContext: GraphViewContextInterface
) => {
  let newnodeData_Graph = { ...viewContext.nodeData_Graph };
  let newVisualNodes = { ...viewContext.nodeVisualData_Graph };

  viewContext.setAlert('Removed node: ' + newnodeData_Graph[id].title);
  viewContext.addAction(id, 'NODE_DELETE', {
    deletedNode: newnodeData_Graph[id],
    deletedVisualNode: newVisualNodes[id],
  });

  delete newnodeData_Graph[id];
  delete newVisualNodes[id];

  viewContext.setnodeData_Graph(newnodeData_Graph);
  viewContext.setnodeVisualData_Graph(newVisualNodes);
};
