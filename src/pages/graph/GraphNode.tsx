import { CSSProperties, FC, ReactNode, useRef, useState } from 'react';
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
  const [suspended, setSuspended] = useState<boolean>(false);
  const lineRef = useRef<any>();
  const onClick = (event: any) => {
    let currentTargetRect = event.currentTarget.getBoundingClientRect();
    const event_offsetX = event.pageX - currentTargetRect.left,
      event_offsetY = event.pageY - currentTargetRect.top;
    console.log('coords ' + event_offsetX, event_offsetY);
    if (event_offsetX < 10 && event_offsetY < 10) {
      setSuspended(true);
    } else {
      setSuspended(false);
    }
  };
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
      onClick={onClick}
      ref={!suspended ? drag : null}
      style={{ left, top }}
      data-testid='box'
    >
      {children}
    </div>
  );
};
