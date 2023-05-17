import { getNodeData } from '../../backend/functions/node/query/getNodeData';
import { ViewContextInterface } from '../../components/context/ViewContext';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import {
  ConnectionData,
  GraphNodeData,
  NodeData,
} from '../../packages/graph/graphTypes';

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
    connections: await getNodeData(nodeToAdd.id, username).then((result) => {
      console.log('RESULT OF QUERY ' + JSON.stringify(result));
      let connections: { [key: string]: ConnectionData } = {};
      result[0].connectedNodes.map((connection: any) => {
        if (connection.connected_node) {
          connections[connection.connected_node.id] = {
            type: connection.r.type,
            startNode: nodeToAdd.id,
            endNode: connection.connected_node.id,
            content: [],
          };
        }
      });
      return connections;
    }),
  };

  console.log('NOde adding ' + JSON.stringify(node));

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
