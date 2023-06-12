import { API, State } from '../../packages/graph/context/GraphViewContext';

export const deleteNode = (id: string, viewContext: Partial<State & API>) => {
  let newnodeData_Graph = { ...viewContext.nodeData_Graph };
  let newVisualNodes = { ...viewContext.nodeVisualData_Graph };
  const {
    changeAlert,
    addAction,
    changeNodeData_Graph,
    changeVisualData_Graph,
  } = viewContext;

  if (
    !changeAlert ||
    !addAction ||
    !changeNodeData_Graph ||
    !changeVisualData_Graph
  )
    return;
  changeAlert('Removed node: ' + newnodeData_Graph[id].title);
  addAction(id, 'NODE_DELETE', {
    deletedNode: newnodeData_Graph[id],
    deletedVisualNode: newVisualNodes[id],
  });

  delete newnodeData_Graph[id];
  delete newVisualNodes[id];

  changeNodeData_Graph(newnodeData_Graph);
  changeVisualData_Graph(newVisualNodes);
};
