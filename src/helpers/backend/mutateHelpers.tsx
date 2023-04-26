import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import {
  calculateCellFromPixelX,
  calculateCellFromPixelY,
} from '../../schemas/Data_structures/helpers';

export const addLine = (
  node1: string,
  node2: string,
  startNode: string | null,
  viewContext: GraphViewContextInterface | null
) => {
  if (!viewContext) return;
  viewContext.setLines([
    ...viewContext.lines,
    {
      start: node1,
      end: node2,
      arrowStart: startNode,
    },
  ]);
};

export type NodeUpdate = 'resize' | 'drag';

export const updateNode = (
  type: NodeUpdate,
  newVal: any,
  nodeID: string | number,
  context: GraphViewContextInterface | null
) => {
  let graphNodes = context?.nodesVisual;
  if (!graphNodes) return;
  switch (type) {
    case 'drag':
      console.log('node to display' + JSON.stringify(newVal));
      graphNodes[nodeID].xCell = calculateCellFromPixelX(newVal.x, document);
      graphNodes[nodeID].yCell = calculateCellFromPixelY(newVal.y, document);
      context?.setNodesVisual({ ...graphNodes });

      break;
    case 'resize':
      if (!graphNodes[nodeID].y || !graphNodes[nodeID].x) return;
      const newSize = [newVal.width, newVal.height];
      if (newVal.tag === 'top') {
        const val =
          graphNodes[nodeID].y + graphNodes[nodeID].size[1] - newSize[1];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].y = calculateCellFromPixelY(val, document);
        }
      }
      if (newVal.tag === 'left') {
        const val =
          graphNodes[nodeID].x + graphNodes[nodeID].size[0] - newSize[0];
        if (Number.isFinite(val))
          graphNodes[nodeID].x = calculateCellFromPixelX(val, document);
      }
      graphNodes[nodeID].size = newSize;

      context?.setNodesVisual({ ...graphNodes });
      break;
  }
};

type LineUpdate = 'arrowAdd';

export const updateLine = (
  context: GraphViewContextInterface | null,
  type: LineUpdate,
  lineID: string | number,
  newVal: any
) => {
  const { lines, setLines } = context as GraphViewContextInterface;
  switch (type) {
    case 'arrowAdd':
      const newLines = [...lines];
      newLines[lineID as number].arrowStart = newVal.arrowStart;
      setLines(newLines);
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
  let id = ids[Object.keys(context.allNodes).length + 1];

  newNodes[id] = {
    x: x,
    y: y,
    size: size,
    collapsed: true,
    xCell: 0,
    yCell: 0,
  };

  let newData = { ...context.nodesDisplayed };
  newData[id] = {
    content: [],
    type: '',
  };

  let newAllNodes = { ...context.allNodes };
  newAllNodes[id] = {
    id: id,
    title: 'New Node',
    connections: {},
    blocks: [],
  };

  context.setNodesDisplayed(newData);
  context.setNodesVisual(newNodes);
  context.setAllNodes(newAllNodes);
};
