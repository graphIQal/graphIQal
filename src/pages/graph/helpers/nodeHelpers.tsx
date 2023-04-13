import GraphViewContext, {
  GraphViewContextInterface,
} from '../GraphViewContext';
import { snapToGrid } from './snapping';

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

export const addLine = (
  context: GraphViewContextInterface | null,
  startNode: string,
  endNode: string,
  arrowStart: string
) => {};

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

export const getLineDataEndpoints = (
  context: GraphViewContextInterface | null,
  lineID: string
) => {
  const node1 = context?.lines[lineID as any].start;
  const data1 = context?.nodesVisual[node1 as any];

  const node2 = context?.lines[lineID as any].end;
  const data2 = context?.nodesVisual[node2 as any];

  return {
    x1: data1?.x,
    x2: data2?.x,
    y1: data1?.y,
    y2: data2?.y,
    node1: node1,
    node2: node2,
  };
};
