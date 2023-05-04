/**
 * Hooks for dragging and dropping nodes: useDragNode and useDropNode
 */
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { DragItemGraph } from '../graphTypes';
import { useCallback, useContext } from 'react';
import { moveNodeCallback } from '../helpers/dragging';
import { snapToGrid } from '../helpers/snapping';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';

//use drag hook for graph node
export const useDragNode = (
  id: string,
  left: number,
  top: number,
  width: number,
  height: number,
  canDrag: boolean
) =>
  useDrag(
    () => ({
      type: 'node',
      item: { id, left, top, width: width, height: height },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: canDrag,
    }),
    [id, left, top, canDrag]
  );

export const useDropNode = (
  setIsDrawing: (val: boolean) => void,
  translateX: number,
  translateY: number,
  scale: number
) => {
  const { nodesDisplayed, setNodesDisplayed } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const { setDrawingMode } = useContext(
    DrawingContext
  ) as DrawingContextInterface;
  const moveNode = useCallback(moveNodeCallback, [
    nodesDisplayed,
    setNodesDisplayed,
  ]);
  const context = useContext(GraphViewContext);
  return useDrop(
    () => ({
      accept: 'node',
      drop(item: DragItemGraph, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        [left, top] = snapToGrid(
          (left + translateX) * scale,
          (top + translateY) * scale
        );
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
    [moveNode, nodesDisplayed, setNodesDisplayed]
  );
};
