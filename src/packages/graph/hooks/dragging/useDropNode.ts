/**
 * Hooks for dragging and dropping nodes: useDragNode and useDropNode
 */
import { useCallback, useContext } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import DrawingContext, {
  DrawingContextInterface,
} from '../../context/GraphDrawingContext';
import { DragItemGraph } from '../../graphTypes';
import { moveNodeCallback } from '../../helpers/moveNodeCallback';
import { snapToGrid } from '../../helpers/snapToGrid';
import {
  useGraphViewAPI,
  useGraphViewData,
} from '../../context/GraphViewContext';

export const useDropNode = (
  setIsDrawing: (val: boolean) => void,
  translateX: number,
  translateY: number,
  scale: number
) => {
  const { nodeData_Graph, nodeVisualData_Graph, addAction } =
    useGraphViewData();

  const { changeNodeData_Graph, changeVisualData_Graph } = useGraphViewAPI();

  const { setDrawingMode } = useContext(
    DrawingContext
  ) as DrawingContextInterface;
  const moveNode = useCallback(moveNodeCallback, [
    nodeVisualData_Graph,
    changeVisualData_Graph,
  ]);
  return useDrop(
    () => ({
      accept: 'node',
      drop(item: DragItemGraph, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        [left, top] = snapToGrid(
          (left + translateX) / scale,
          (top + translateY) / scale
        );
        // left = (left + translateX) / scale;
        // top = (top + translateY) / scale;
        moveNode(item.id, left, top, {
          addAction,
          changeVisualData_Graph,
          nodeVisualData_Graph,
          nodeData_Graph,
          changeNodeData_Graph,
        });
        setDrawingMode(true);
        setIsDrawing(false);

        return undefined;
      },
    }),
    [
      moveNode,
      nodeData_Graph,
      changeNodeData_Graph,
      translateX,
      translateY,
      scale,
    ]
  );
};
