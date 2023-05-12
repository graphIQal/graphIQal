import React from 'react';
import { GraphViewContextInterface } from '../context/GraphViewContext';
import { getTypedConnections } from '../../../helpers/frontend/getTypedConnections';

export const setCollapsedNode = (
  id: string,
  context: GraphViewContextInterface
) => {
  let newData = { ...context.nodeVisualData_Graph };
  let newNodesShowing = { ...context.nodeData_Graph };
  newData[id].collapsed = !newData[id].collapsed;
  const connections = getTypedConnections(context, id, 'IN');
  // for (let node in connections) {
  //   console.log('deleting ' + node);
  //   delete newNodesShowing[connections[node as any]];
  // }
  context.setnodeVisualData_Graph(newData);
  // context.setnodeData_Graph(newNodesShowing);

  context.setAlert('Showing nodes IN ' + context.nodeData_Graph[id].title);
};
