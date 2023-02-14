import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { DragItemGraph } from '../graphTypes';
import { useCallback } from 'react';
import { moveNodeCallback } from '../helpers/dragging';

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
