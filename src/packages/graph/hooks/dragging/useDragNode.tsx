import { useDrag } from 'react-dnd';
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
