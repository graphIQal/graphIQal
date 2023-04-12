import {
  ConnectionData,
  graphNodes,
  nodesData,
} from '../../../schemas/Data_structures/DS_schema';
import { GraphActionContextInterface } from '../GraphActionContext';
import { GraphViewContextInterface } from '../GraphViewContext';
import { snapToGrid } from './snapping';

export type Update = 'resize' | 'drag';

export const updateNode = (
  type: Update,
  newVal: any,
  nodeID: string | number,
  context: GraphViewContextInterface | null
) => {
  switch (type) {
    case 'drag':
      graphNodes[nodeID].x = newVal.x;
      graphNodes[nodeID].y = newVal.y;
      context?.setNodesVisual({ ...graphNodes });

      break;
    case 'resize':
      const newSize = [newVal.width, newVal.height];
      if (newVal.tag === 'top') {
        const val =
          graphNodes[nodeID].y + graphNodes[nodeID].size[1] - newSize[1];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].y = val;
        }
      }
      if (newVal.tag === 'left') {
        const val =
          graphNodes[nodeID].x + graphNodes[nodeID].size[0] - newSize[0];
        if (Number.isFinite(val)) graphNodes[nodeID].x = val;
      }
      graphNodes[nodeID].size = newSize;

      context?.setNodesVisual({ ...graphNodes });
      break;
  }
};

export const addNode = (
  context: GraphViewContextInterface | null,
  size: number[],
  x: number,
  y: number
) => {
  const ids = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
  ];
  if (context == null) {
    return;
  }
  let newNodes = { ...context.nodesVisual };
  let id = ids[Object.keys(context.nodesDisplayed).length + 1];

  newNodes[id] = {
    x: x,
    y: y,
    size: size,
    collapsed: true,
  };

  let newData = { ...context.nodesDisplayed };
  newData[id] = {
    content: [],
    type: '',
  };
  context.setNodesDisplayed(newData);
  context.setNodesVisual(newNodes);
};
