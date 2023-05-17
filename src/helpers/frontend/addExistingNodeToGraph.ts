import { getConnections } from '../../backend/functions/general/getConnections';
import { ViewContextInterface } from '../../components/context/ViewContext';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { GraphNodeData, NodeData } from '../../packages/graph/graphTypes';

export const addExistingNodeToGraph = async (
  context: GraphViewContextInterface,
  username: string,
  id: string,
  nodeToAdd: { id: string; title: string }
) => {
  const node: NodeData = {
    //node is the node that you get from the database with the given ID
    ...nodeToAdd,
    color: 'black',
    icon: 'block',
    connections: await getConnections(nodeToAdd.id, username).then((result) => {
      return result.map((connection: any) => {
        return connection.c;
      });
    }),
  };

  let newNodes = { ...context.nodeData_Graph };
  delete newNodes[id];
  newNodes[nodeToAdd.id] = node;
  let x: GraphNodeData;
  let newVisualNodes = { ...context.nodeVisualData_Graph };
  newVisualNodes[nodeToAdd.id] = {
    ...newVisualNodes[id],
    categorizing_node: nodeToAdd.id,
  };
  delete newVisualNodes[id];

  context.setnodeData_Graph(newNodes);
  context.setnodeVisualData_Graph(newVisualNodes);
};
