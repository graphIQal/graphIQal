import { randomUUID } from 'crypto';
import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import {
  ConnectionData,
  GraphView,
} from '../../schemas/Data_structures/DS_schema';
import {
  calculateCellFromPixelX,
  calculateCellFromPixelY,
} from '../../schemas/Data_structures/helpers';
import { v4 as uuidv4 } from 'uuid';
import { snapToGrid } from '../../packages/graph/helpers/snapping';

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

  let newnodesDisplayed = { ...viewContext.nodesDisplayed };
  newnodesDisplayed[node1].connections[node2] = {
    content: [],
    type: 'includes',
  };
  newnodesDisplayed[node2].connections[node1] = {
    content: [],
    type: 'included',
  };
  viewContext.setnodesDisplayed(newnodesDisplayed);
};

export type NodeUpdate = 'resize' | 'drag' | 'title';

export const updateNode = (
  type: NodeUpdate,
  newVal: any,
  nodeID: string | number,
  context: GraphViewContextInterface | null
) => {
  let graphNodes = context?.nodesVisual;
  let nodeData = context?.nodesDisplayed;
  if (!graphNodes || !nodeData) return;

  switch (type) {
    case 'drag':
      const [x, y] = snapToGrid(newVal.x, newVal.y);
      graphNodes[nodeID].x.low = x;
      graphNodes[nodeID].y.low = y;

      context?.setNodesVisual({ ...graphNodes });

      break;
    case 'resize':
      const [xNew, yNew] = snapToGrid(newVal.x, newVal.y);
      if (!graphNodes[nodeID].y || !graphNodes[nodeID].x) return;
      const newSize = [newVal.width, newVal.height];
      if (newVal.tag === 'top') {
        const val =
          graphNodes[nodeID].y.low + graphNodes[nodeID].height.low - newSize[1];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].y.low = calculateCellFromPixelY(val, document);
        }
      }
      if (newVal.tag === 'left') {
        const val =
          graphNodes[nodeID].x + graphNodes[nodeID].size[0] - newSize[0];
        if (Number.isFinite(val))
          graphNodes[nodeID].xCell = calculateCellFromPixelX(val, document);
      }
      graphNodes[nodeID].size = newSize;
      context?.setNodesVisual({ ...graphNodes });
      break;

    case 'title':
      nodeData[nodeID].title = newVal;
      context?.setnodesDisplayed({ ...nodeData });
  }

  console.log(nodeData['array']);
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
  if (context == null) {
    return;
  }
  let newNodes = { ...context.nodesVisual };
  let id = uuidv4();

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

  let newnodesDisplayed = { ...context.nodesDisplayed };
  newnodesDisplayed[id] = {
    id: id,
    title: 'New Node',
    connections: {},
    blocks: [],
  };

  context.setNodesDisplayed(newData);
  context.setNodesVisual(newNodes);
  context.setnodesDisplayed(newnodesDisplayed);
};

export const changeConnectionType = (
  start: string,
  end: string,
  type: string,
  viewContext: GraphViewContextInterface
) => {
  const newNodes = { ...viewContext.nodesDisplayed };
  if (newNodes[start].connections[end].type == type) return;
  newNodes[start].connections[end].type = type;
  newNodes[end].connections[start].type = type;

  viewContext.setnodesDisplayed(newNodes);

  for (let node in viewContext.nodesDisplayed) {
    if (Object.keys(viewContext.nodesDisplayed).includes(node)) {
      console.log('node ' + JSON.stringify(viewContext.nodesDisplayed[node]));
    }
  }
};

export const deleteConnection = (
  start: string,
  end: string,
  viewContext: GraphViewContextInterface
) => {
  let newNodes = { ...viewContext.nodesDisplayed };
  delete newNodes[start].connections[end];
  delete newNodes[end].connections[start];

  viewContext.setnodesDisplayed(newNodes);
};
