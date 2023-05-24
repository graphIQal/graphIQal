import { getNodeData } from '../../backend/functions/node/query/getNodeData';
import { ViewContextInterface } from '../../components/context/ViewContext';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import {
  ConnectionData,
  GraphNodeData,
  NodeData,
} from '../../packages/graph/graphTypes';

export const addExistingNodeToGraph = async (
  graphContext: GraphViewContextInterface,
  username: string,
  id: string,
  nodeToAdd: { id: string; title: string }
) => {
  if (nodeToAdd.id in graphContext.nodeData_Graph) return;
  const node: NodeData = {
    //node is the node that you get from the database with the given ID
    ...nodeToAdd,
    color: 'black',
    icon: 'block',
    connections: await getNodeData(nodeToAdd.id, username).then((result) => {
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

  let newNodes = { ...graphContext.nodeData_Graph };

  let oldData = newNodes[id];
  delete newNodes[id];
  newNodes[nodeToAdd.id] = node;

  let newVisualNodes = { ...graphContext.nodeVisualData_Graph };

  if (id == '') {
    newVisualNodes[nodeToAdd.id] = {
      x: 20,
      y: 20,
      width: 200,
      height: 100,
      categorizing_node: nodeToAdd.id,
    };
  } else {
    newVisualNodes[nodeToAdd.id] = {
      ...newVisualNodes[id],
      categorizing_node: nodeToAdd.id,
    };
  }

  let oldVisualData = newVisualNodes[id];
  delete newVisualNodes[id];
  // console.log('data nodes ' + JSON.stringify(newNodes));
  // console.log('visual nodes ' + JSON.stringify(newVisualNodes));
  graphContext.setnodeData_Graph(newNodes);
  graphContext.setnodeVisualData_Graph(newVisualNodes);
  graphContext.setAlert('Added node: ' + nodeToAdd.title);
  graphContext.addAction(nodeToAdd.id, 'NODE_ADD_EXISTING', {
    new: {
      node_data: newNodes[nodeToAdd.id],
      node_visual: newVisualNodes[nodeToAdd.id],
    },
    old: {
      node_data: oldData,
      node_visual: oldVisualData,
    },
  });
};
