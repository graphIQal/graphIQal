import { API, State } from '../../packages/graph/context/GraphViewContext';
import { NodeData } from '../../packages/graph/graphTypes';
import { ActionChanges } from '../../packages/graph/hooks/useHistoryState';

export const addConnection = (
  node1: string,
  node2: string,
  context: Partial<State & API>
) => {
  const { nodeData_Graph, addAction, changeAlert, changeNodeData_Graph } =
    context;
  if (!changeAlert || !changeNodeData_Graph || !nodeData_Graph || !addAction)
    return;
  let newnodeData_Graph = { ...nodeData_Graph };
  newnodeData_Graph[node1].connections[node2] = {
    startNode: node1,
    endNode: node2,
    content: [],
    type: 'RELATED',
  };
  changeAlert(
    'Connection of type RELATED added between ' +
      newnodeData_Graph[node1].title +
      ' and ' +
      newnodeData_Graph[node2].title
  );
  changeNodeData_Graph(newnodeData_Graph);
  addAction(node1, 'CONNECTION_ADD', {
    endNode: node2,
    connection: {
      ...newnodeData_Graph[node1].connections[node2],
      type: 'RELATED',
    },
  });
};
