import { GraphViewContextInterface } from '../../pages/graph/context/GraphViewContext';

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
