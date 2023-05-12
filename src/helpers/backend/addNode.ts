import { v4 as uuidv4 } from 'uuid';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export const addNode = (
  context: GraphViewContextInterface | null,
  size: number[],
  x: number,
  y: number
) => {
  if (context == null) {
    return;
  }
  let newNodes = { ...context.nodeVisualData_Graph };
  let id = uuidv4();

  newNodes[id] = {
    x: {
      low: x,
    },
    y: {
      low: y,
    },
    width: {
      low: size[0],
    },
    height: {
      low: size[1],
    },
    collapsed: true,
    categorizing_node: id,
  };

  let newnodeData_Graph = { ...context.nodeData_Graph };
  newnodeData_Graph[id] = {
    id: id,
    title: 'New Node',
    connections: {},
    icon: 'block',
    color: 'black',
  };

  context.setAlert('Created new node: ' + newnodeData_Graph[id].title);

  context.setnodeVisualData_Graph(newNodes);
  context.setnodeData_Graph(newnodeData_Graph);
};
