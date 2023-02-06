import { getElementAbsolutePosition } from '@udecode/plate';
import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDrag, useDragLayer } from 'react-dnd';
import Circle from '../../components/atoms/Circle';
import NodeCircle from '../../components/molecules/NodeCircle';
import { NodeData } from '../../gql/graphql';
import { useXarrow } from '../../packages/arrow_drawer';
import { getElemPos } from '../../packages/arrow_drawer/Xarrow/utils';
import { getPosition } from '../../packages/arrow_drawer/Xarrow/utils/GetPosition';
import { Rnd } from '../../packages/draggable-resizable';
import EditorComponent from '../../packages/editor/EditorComponent';
import { Resizable } from '../../packages/resizable';
import ResizableBox from '../../packages/resizable/resizableBox';
import './graph.css';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  children?: ReactNode;
  initialOffset?: any;
  reference?: number;
  node: NodeData;
  size: number[];
  updateSize: (id: number, width: number, height: number) => void;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  children,
  initialOffset = undefined,
  reference,
  node,
  size,
  updateSize,
}) => {
  console.log('props ' + size + ' ' + top);
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
    [id, left, top, canDrag]
  );

  const dragOn = () => {
    setCanDrag(true);
  };
  const dragOff = () => {
    setCanDrag(false);
  };

  const connectionPoint = (top: number, left: number) => {
    console.log(id, top, left);
  };

  if (isDragging && hideSourceOnDrag) {
    return (
      <div
        style={{
          left,
          top,
          ...moreStyle,
        }}
        className='absolute'
        ref={drag}
      />
    );
  }
  return (
    <div>
      <div
        className='absolute cursor-move'
        style={{
          left,
          top,
          ...moreStyle,
          width: size[0],
          height: size[1],
        }}
        ref={drag}
        id={id}
        data-testid='box'
      >
        <ResizableBox
          dragOn={dragOn}
          dragOff={dragOff}
          classes='p-sm overflow-hidden h-full w-full'
          style={{
            width: size[0],
            height: size[1],
          }}
          updateSize={(width: number, height: number) =>
            updateSize(id, width, height)
          }
        >
          <EditorComponent />
        </ResizableBox>
        <div
          style={{ left: size[0] / 2 }}
          className='draw-circle draw-circle-t'
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
        <div
          style={{ left: size[0] / 2, bottom: 0 }}
          className='draw-circle draw-circle-b'
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
        <div
          style={{ top: size[1] / 2, left: 0 }}
          className='draw-circle draw-circle-l'
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
        <div
          style={{ top: size[1] / 2, right: 0 }}
          className='draw-circle draw-circle-r'
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
      </div>
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
