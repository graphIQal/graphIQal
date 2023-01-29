import type { CSSProperties, FC, ReactNode } from 'react';
import { useDrag } from 'react-dnd';
import NodeCircle from '../../components/molecules/NodeCircle';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  children?: ReactNode;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'node',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      className='absolute cursor-move'
      ref={drag}
      style={{ left, top }}
      data-testid='box'
    >
      {children}
    </div>
  );
};
