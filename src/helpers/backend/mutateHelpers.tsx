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

  let newnodeData_Graph = { ...viewContext.nodeData_Graph };
  newnodeData_Graph[node1].connections[node2] = {
    content: [],
    type: 'includes',
  };
  newnodeData_Graph[node2].connections[node1] = {
    content: [],
    type: 'included',
  };
  viewContext.setnodeData_Graph(newnodeData_Graph);
};

export type NodeUpdate = 'resize' | 'drag' | 'title';

export const updateNode = (
  type: NodeUpdate,
  newVal: any,
  nodeID: string | number,
  context: GraphViewContextInterface | null
) => {
  let graphNodes = context?.nodeVisualData_Graph;
  let nodeData = context?.nodeData_Graph;
  if (!graphNodes || !nodeData) return;

  switch (type) {
    case 'drag':
      const [x, y] = [newVal.x, newVal.y];
      graphNodes[nodeID].x.low = x;
      graphNodes[nodeID].y.low = y;

      context?.setnodeVisualData_Graph({ ...graphNodes });

      break;
    case 'resize':
      if (!graphNodes[nodeID].y || !graphNodes[nodeID].x) return;
      const newSize = [newVal.width, newVal.height];
      if (newVal.tag === 'top') {
        const val =
          graphNodes[nodeID].y.low + graphNodes[nodeID].height.low - newSize[1];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].y.low = val;
        }
      }
      if (newVal.tag === 'left') {
        const val =
          graphNodes[nodeID].x.low + graphNodes[nodeID].width.low - newSize[0];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].x.low = val;
        }
      }
      graphNodes[nodeID].width.low = newSize[0];
      graphNodes[nodeID].height.low = newSize[1];
      context?.setnodeVisualData_Graph({ ...graphNodes });
      break;

    case 'title':
      nodeData[nodeID].title = newVal;
      context?.setnodeData_Graph({ ...nodeData });
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
  };

  let newnodeData_Graph = { ...context.nodeData_Graph };
  newnodeData_Graph[id] = {
    id: id,
    title: 'New Node',
  };

  context.setnodeVisualData_Graph(newNodes);
  context.setnodeData_Graph(newnodeData_Graph);
};

export const changeConnectionType = (
  start: string,
  end: string,
  type: string,
  viewContext: GraphViewContextInterface
) => {
  const newNodes = { ...viewContext.nodeData_Graph };
  if (newNodes[start].connections[end].type == type) return;
  newNodes[start].connections[end].type = type;
  newNodes[end].connections[start].type = type;

  viewContext.setnodeData_Graph(newNodes);

  for (let node in viewContext.nodeData_Graph) {
    if (Object.keys(viewContext.nodeData_Graph).includes(node)) {
      console.log('node ' + JSON.stringify(viewContext.nodeData_Graph[node]));
    }
  }
};

export const deleteConnection = (
  start: string,
  end: string,
  viewContext: GraphViewContextInterface
) => {
  let newNodes = { ...viewContext.nodeData_Graph };
  delete newNodes[start].connections[end];
  delete newNodes[end].connections[start];

  viewContext.setnodeData_Graph(newNodes);
};

export const deleteNode = (
  id: string,
  viewContext: GraphViewContextInterface
) => {
  let newNodes = { ...viewContext.nodeData_Graph };
  delete newNodes[id];
  viewContext.setnodeData_Graph(newNodes);
};
