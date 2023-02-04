import { getElementAbsolutePosition } from '@udecode/plate';
import { CSSProperties, FC, ReactNode, useRef, useState } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import NodeCircle from '../../components/molecules/NodeCircle';
import { useXarrow } from '../../packages/arrow_drawer';
import { getElemPos } from '../../packages/arrow_drawer/Xarrow/utils';
import { getPosition } from '../../packages/arrow_drawer/Xarrow/utils/GetPosition';

const CustomDragLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));
};

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
  // const updateXarrow = useXarrow();

  // console.log('offset' + initialOffset);
  const [width, setWidth] = useState<number | undefined>(100);
  const [height, setHeight] = useState<number | undefined>(40);

  let moreStyle = {};
  if (initialOffset)
    moreStyle = {
      position: 'absolute',
      left: initialOffset.x,
      top: initialOffset.y,
    };

  const styles = {
    height: height,
    width: width,
    minWidth: width,
    maxWidth: width,
    minHeight: height,
    maxHeight: height,
  };
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'node',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        console.log('post ' + document.getElementById('1'));
      },
    }),
    [id, left, top]
  );

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  const getNewSize = () => {
    var rect = document.getElementById(id);
    var newWidth = rect?.offsetWidth;
    var newHeight = rect?.offsetHeight;
    if (height != newHeight) {
      setHeight(newHeight);
    }
    if (width != newWidth) {
      setWidth(newWidth);
    }
  };

  return (
    <div className='border max-w-[50px] max-h-[50px]'>
      <div
        className='absolute cursor-move min-h-[40px]'
        onClick={getNewSize}
        ref={drag}
        id={id}
        style={{ ...moreStyle, left, top, ...styles }}
        data-testid='box'
      >
        {children}
      </div>
    </div>
  );
};
