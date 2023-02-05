import { getElementAbsolutePosition } from '@udecode/plate';
import { CSSProperties, FC, ReactNode, useRef, useState } from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import NodeCircle from '../../components/molecules/NodeCircle';
import { useXarrow } from '../../packages/arrow_drawer';
import { getElemPos } from '../../packages/arrow_drawer/Xarrow/utils';
import { getPosition } from '../../packages/arrow_drawer/Xarrow/utils/GetPosition';
import { Rnd } from '../../packages/draggable-resizable';
import EditorComponent from '../../packages/editor/EditorComponent';
import { Resizable } from '../../packages/resizable';
import ResizableBox from '../../packages/resizable/resizableBox';

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
  let moreStyle = {};
  if (initialOffset)
    moreStyle = {
      position: 'absolute',
      left: initialOffset.x,
      top: initialOffset.y,
    };

  const [canDrag, setCanDrag] = useState(true);
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'node',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: canDrag,
    }),
    [id, left, top]
  );
  const style1: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    width: '20rem',
  };

  const dragOn = () => {
    console.log('here');
    setCanDrag(true);
  };
  const dragOff = () => {
    console.log('here2');
    setCanDrag(false);
  };

  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      className='absolute cursor-move'
      ref={drag}
      id={id}
      style={{ ...moreStyle, left, top }}
      data-testid='box'
    >
      <ResizableBox
        dragOn={dragOn}
        dragOff={dragOff}
        classes='p-sm overflow-hidden h-full w-full'
      >
        <EditorComponent />
      </ResizableBox>
    </div>
  );
  // return (
  //   <ResizableBox
  //     style={{ left, top }}
  //     classes='overflow-hidden h-full w-full'
  //     data-testid='box'
  //     id={id}
  //   >
  //     <div
  //       data-testid='box'
  //       id={id}
  //       className='absolute cursor-move h-full w-full p-sm'
  //       ref={drag}
  //     >
  //       <EditorComponent />
  //     </div>

  //     {/* <Resizable style={style} defaultSize={{ width: 200, height: 200 }}>
  //       {children}
  //     </Resizable> */}
  //     {/* <Rnd
  //       default={{
  //         x: 0,
  //         y: 0,
  //         width: 320,
  //         height: 200,
  //       }}
  //     />
  //     {children}  */}
  //     {/* <div ref={dragPreview} style={{ ...style1, opacity }}>
  //       <div ref={drag} style={handleStyle} />
  //     </div> */}
  //   </ResizableBox>
  // );
};
