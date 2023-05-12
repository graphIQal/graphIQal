/**
 * Hooks for dragging and dropping nodes: useDragNode and useDropNode
 */
import { useCallback, useContext } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import DrawingContext, {
  DrawingContextInterface,
} from '../../context/GraphDrawingContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../context/GraphViewContext';
import { DragItemGraph } from '../../graphTypes';
import { moveNodeCallback } from '../../helpers/moveNodeCallback';
import { snapToGrid } from '../../helpers/snapToGrid';

export const useDropNode = (
  setIsDrawing: (val: boolean) => void,
  translateX: number,
  translateY: number,
  scale: number
) => {
  const {
    nodeData_Graph,
    setnodeData_Graph,
    nodeVisualData_Graph,
    setnodeVisualData_Graph,
  } = useContext(GraphViewContext) as GraphViewContextInterface;

  const { setDrawingMode } = useContext(
    DrawingContext
  ) as DrawingContextInterface;
  const moveNode = useCallback(moveNodeCallback, [
    nodeVisualData_Graph,
    setnodeVisualData_Graph,
  ]);
  const context = useContext(GraphViewContext);
  return useDrop(
    () => ({
      accept: 'node',
      drop(item: DragItemGraph, monitor) {
        console.log('translate x in func ' + translateX);
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        [left, top] = snapToGrid(
          (left + translateX) / scale,
          (top + translateY) / scale
        );
        // left = (left + translateX) / scale;
        // top = (top + translateY) / scale;
        moveNode(item.id, left, top, context);
        setDrawingMode(true);
        setIsDrawing(false);
        // addAction({
        //   undo: { id: item.id, type: 'DRAG', value: startPos.current },
        //   redo: { id: item.id, type: 'DRAG', value: { left, top } },
        // });
        return undefined;
      },
    }),
    [moveNode, nodeData_Graph, setnodeData_Graph, translateX, translateY, scale]
  );
};
