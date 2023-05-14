import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export type NodeUpdate = 'resize' | 'drag' | 'title' | 'icon' | 'color';

export const updateNode = (
  type: NodeUpdate,
  newVal: any,
  nodeID: string,
  context: GraphViewContextInterface | null
) => {
  let graphNodes = context?.nodeVisualData_Graph;
  let nodeData = context?.nodeData_Graph;
  if (!graphNodes || !nodeData) return;

  switch (type) {
    case 'drag':
      const [x, y] = [newVal.x, newVal.y];
      context?.addAction(nodeID, 'DRAG', {
        x,
        y,
        oldX: graphNodes[nodeID].x,
        oldY: graphNodes[nodeID].y,
      });
      graphNodes[nodeID].x = x;
      graphNodes[nodeID].y = y;

      context?.setnodeVisualData_Graph({ ...graphNodes });

      break;
    case 'resize':
      if (!graphNodes[nodeID].y || !graphNodes[nodeID].x) return;
      const newSize = [newVal.width, newVal.height];
      if (newVal.tag === 'top') {
        const val =
          graphNodes[nodeID].y + graphNodes[nodeID].height - newSize[1];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].y = val;
        }
      }
      if (newVal.tag === 'left') {
        const val =
          graphNodes[nodeID].x + graphNodes[nodeID].width - newSize[0];
        if (Number.isFinite(val)) {
          graphNodes[nodeID].x = val;
        }
      }
      if (newVal.done) {
        console.log('adding action');
        context?.addAction(nodeID, 'SIZE', {
          width: newSize[0],
          height: newSize[1],
          oldWidth: graphNodes[nodeID].width,
          oldHeight: graphNodes[nodeID].height,
        });
        return;
      }

      graphNodes[nodeID].width = newSize[0];
      graphNodes[nodeID].height = newSize[1];
      context?.setnodeVisualData_Graph({ ...graphNodes });
      break;

    case 'title':
      context?.addAction(nodeID, 'NODE_TITLE', {
        oldTitle: nodeData[nodeID].title,
        title: newVal,
      });
      nodeData[nodeID].title = newVal;

      context?.setnodeData_Graph({ ...nodeData });
      break;
    case 'icon':
      context?.addAction(nodeID, 'NODE_ICON', {
        icon: newVal,
        oldIcon: nodeData[nodeID].icon,
      });
      nodeData[nodeID].icon = newVal;
      context?.setnodeData_Graph({ ...nodeData });
      break;
    case 'color':
      context?.addAction(nodeID, 'NODE_COLOR', {
        color: newVal,
        oldColor: nodeData[nodeID].color,
      });
      nodeData[nodeID].color = newVal;
      context?.setnodeData_Graph({ ...nodeData });
      break;
  }
};
