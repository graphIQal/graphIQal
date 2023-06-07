import { API, State } from '../../packages/graph/context/GraphViewContext';

export type NodeUpdate = 'resize' | 'drag' | 'title' | 'icon' | 'color';

export const updateNode = (
  type: NodeUpdate,
  newVal: any,
  nodeID: string,
  context: Partial<State & API>
) => {
  const {
    addAction,
    changeVisualData_Graph,
    nodeVisualData_Graph,
    nodeData_Graph,
    changeNodeData_Graph,
  } = context;
  if (
    !addAction ||
    !changeVisualData_Graph ||
    !nodeVisualData_Graph ||
    !nodeData_Graph ||
    !changeNodeData_Graph
  )
    return;
  let graphNodes = nodeVisualData_Graph;
  let nodeData = nodeData_Graph;
  if (!graphNodes || !nodeData) return;

  switch (type) {
    case 'drag':
      const [x, y] = [newVal.x, newVal.y];
      addAction(nodeID, 'DRAG', {
        new: {
          x: x,
          y: y,
        },
        old: {
          x: graphNodes[nodeID].x,
          y: graphNodes[nodeID].y,
        },
      });
      graphNodes[nodeID].x = x;
      graphNodes[nodeID].y = y;

      changeVisualData_Graph({ ...graphNodes });

      break;
    case 'resize':
      if (!graphNodes[nodeID].y || !graphNodes[nodeID].x) return;
      const newSize = [newVal.width, newVal.height];
      const oldX = graphNodes[nodeID].x;
      const oldY = graphNodes[nodeID].y;
      let valX;
      let valY;
      if (newVal.tag === 'top') {
        valY = graphNodes[nodeID].y + graphNodes[nodeID].height - newSize[1];
        if (Number.isFinite(valY)) {
          graphNodes[nodeID].y = valY;
        }
      }
      if (newVal.tag === 'left') {
        valX = graphNodes[nodeID].x + graphNodes[nodeID].width - newSize[0];
        if (Number.isFinite(valX)) {
          graphNodes[nodeID].x = valX;
        }
      }
      if (newVal.done) {
        addAction(nodeID, 'NODE_SIZE', {
          new: {
            width: graphNodes[nodeID].width,
            height: graphNodes[nodeID].height,
            x: valX ? valX : oldX,
            y: valY ? valY : oldY,
          },
          old: {
            width: newVal.width,
            height: newVal.height,
            x: oldX,
            y: oldY,
          },
        });
        return;
      }

      graphNodes[nodeID].width = newSize[0];
      graphNodes[nodeID].height = newSize[1];
      changeVisualData_Graph({ ...graphNodes });
      break;

    case 'title':
      addAction(nodeID, 'NODE_TITLE', {
        old: { title: nodeData[nodeID].title },
        new: { title: newVal },
      });
      nodeData[nodeID].title = newVal;

      changeNodeData_Graph({ ...nodeData });
      break;
    case 'icon':
      addAction(nodeID, 'NODE_ICON', {
        new: { icon: newVal },
        old: { icon: nodeData[nodeID].icon },
      });
      nodeData[nodeID].icon = newVal;
      changeNodeData_Graph({ ...nodeData });
      break;
    case 'color':
      addAction(nodeID, 'NODE_COLOR', {
        new: { color: newVal },
        old: { color: nodeData[nodeID].color },
      });
      nodeData[nodeID].color = newVal;
      changeNodeData_Graph({ ...nodeData });
      break;
  }
};
