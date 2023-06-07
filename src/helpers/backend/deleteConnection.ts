import { API, State } from '../../packages/graph/context/GraphViewContext';

export const deleteConnection = (
  start: string,
  end: string,
  viewContext: Partial<State & API>
) => {
  const { changeAlert, nodeData_Graph, addAction, changeNodeData_Graph } =
    viewContext;
  if (!changeAlert || !nodeData_Graph || !addAction || !changeNodeData_Graph)
    return;
  changeAlert(
    'Deleted connection from ' +
      nodeData_Graph[start].title +
      ' to ' +
      nodeData_Graph[end].title
  );
  let newNodes = { ...viewContext.nodeData_Graph };

  addAction(start, 'CONNECTION_DELETE', {
    endNode: end,
    connection: newNodes[start].connections[end],
  });

  delete newNodes[start].connections[end];
  delete newNodes[end].connections[start];

  changeNodeData_Graph(newNodes);
};
