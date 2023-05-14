import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export const addConnection = (
  node1: string,
  node2: string,
  viewContext: GraphViewContextInterface | null
) => {
  if (!viewContext) return;
  let newnodeData_Graph = { ...viewContext.nodeData_Graph };
  newnodeData_Graph[node1].connections[node2] = {
    startNode: node1,
    endNode: node2,
    content: [],
    type: 'RELATED',
  };
  viewContext.setAlert(
    'Connection of type RELATED added between ' +
      newnodeData_Graph[node1].title +
      ' and ' +
      newnodeData_Graph[node2].title
  );
  viewContext.setnodeData_Graph(newnodeData_Graph);
  viewContext.addAction(node1, 'CONNECTION_ADD', {
    endNode: node2,
    connection: newnodeData_Graph[node1].connections[node2],
  });
};
