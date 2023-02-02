import { CSSProperties, FC, ReactNode, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import NodeCircle from '../../components/molecules/NodeCircle';
import { useXarrow } from '../../packages/arrow_drawer';
import { getPosition } from '../../packages/arrow_drawer/Xarrow/utils/GetPosition';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  children?: ReactNode;
  initialOffset?: any;
  reference?: number;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
  initialOffset = undefined,
  reference,
}) => {
  const updateXarrow = useXarrow();
  console.log('offset' + initialOffset);

  let moreStyle = {};
  if (initialOffset)
    moreStyle = {
      position: 'absolute',
      left: initialOffset.x,
      top: initialOffset.y,
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
    <div className='border max-w-[50px] max-h-[50px]'>
      <div
        className='absolute cursor-move'
        ref={drag}
        id={id}
        style={{ ...moreStyle, left, top }}
        onDragEnter={updateXarrow}
        onDragExit={updateXarrow}
        data-testid='box'
      >
        {children}
      </div>
    </div>
  );
};
