import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export type NodeUpdate = 'resize' | 'drag' | 'title' | 'icon' | 'color';

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
      break;
    case 'icon':
      nodeData[nodeID].icon = newVal;
      context?.setnodeData_Graph({ ...nodeData });
      break;
    case 'color':
      nodeData[nodeID].color = newVal;
      context?.setnodeData_Graph({ ...nodeData });
  }
};
