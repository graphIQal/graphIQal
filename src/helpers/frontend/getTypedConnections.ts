import { API, State } from '../../packages/graph/context/GraphViewContext';
import { ConnectionTypes } from '../../packages/graph/graphTypes';

export const getTypedConnections = (
  context: Partial<State & API>,
  id: string,
  type: string
) => {
  const { nodeData_Graph } = context;
  if (!nodeData_Graph) return;
  if (!Object.keys(ConnectionTypes).includes(type)) {
    console.log('Invalid connection type');
    return;
  }
  let connections = nodeData_Graph[id].connections;
  return Object.keys(connections).filter(
    (nodeID, i) => connections[nodeID].type == type
  );
};
