import { API, State } from '../../packages/graph/context/GraphViewContext';
import {
  ConnectionData,
  GraphNodeData,
  NodeData,
} from '../../packages/graph/graphTypes';

export const addExistingNodeToGraph = async (
  graphContext: Partial<State & API>,
  username: string,
  id: string,
  nodeToAdd: { id: string; title: string }
) => {
  const {
    nodeData_Graph,
    nodeVisualData_Graph,
    changeNodeData_Graph,
    changeVisualData_Graph,
    changeAlert,
    addAction,
  } = graphContext;
  if (
    !nodeData_Graph ||
    !nodeVisualData_Graph ||
    !changeNodeData_Graph ||
    !changeVisualData_Graph ||
    !changeAlert ||
    !addAction
  )
    return;

  if (nodeToAdd.id in nodeData_Graph) return;
  const node: NodeData = {
    //node is the node that you get from the database with the given ID
    ...nodeToAdd,
    color: 'black',
    icon: 'block',
    connections: await fetch(`/api/${username}/${nodeToAdd.id}`)
      .then((res) => {
        return res.json();
      })
      .then((result: any) => {
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

  let newNodes = { ...nodeData_Graph };

  let oldData = newNodes[id];
  delete newNodes[id];
  newNodes[nodeToAdd.id] = node;

  let newVisualNodes = { ...nodeVisualData_Graph };

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
  changeNodeData_Graph(newNodes);
  changeVisualData_Graph(newVisualNodes);
  changeAlert('Added node: ' + nodeToAdd.title);
  addAction(nodeToAdd.id, 'NODE_ADD_EXISTING', {
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
