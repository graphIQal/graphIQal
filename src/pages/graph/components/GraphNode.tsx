import {
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Handle from '../../../components/atoms/Handle';
import NodeCircle from '../../../components/molecules/NodeCircle';
import CollapsedGraphNode from '../../../components/organisms/CollapsedGraphNode';
import EditorComponent from '../../../packages/editor/EditorComponent';
import ResizableBox from '../../../packages/resizable/resizableBox';
import '../graph.css';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../GraphActionContext';
import { OFFSET } from '../helpers/drawing';
import { useDragNode } from '../hooks/useDrag';
import { Cube } from '@styled-icons/boxicons-solid/Cube';
import { DragHandle } from '../../../packages/dnd-editor/components/Draggable';
import DrawingContext, { DrawingContextInterface } from '../DrawingContext';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  size: number[];
  children: ReactNode;
  title: string;
  updateStartPos: (val: { left: number; top: number }) => void;
  updateSize: (
    id: string | number,
    width: number,
    height: number,
    tag?: string | undefined
  ) => void;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  size,
  title,
  children,
  updateStartPos,
  updateSize,
}) => {
  const {
    canDrag,
    setCanDrag,
    hideSourceOnDrag,
    // addAction,
  } = useContext(GraphActionContext) as GraphActionContextInterface;

  const { drawingMode, setDrawingMode } = useContext(
    DrawingContext
  ) as DrawingContextInterface;

  //attach listeners to circles for release if drawing

  useEffect(() => {
    if (drawingMode) {
      setCanDrag(false);
    } else {
      setCanDrag(true);
    }
  }, [drawingMode]);

  //DND dragging hook
  const [{ isDragging }, drag, preview] = useDragNode(
    id,
    left,
    top,
    size[0],
    size[1],
    canDrag
  );

  if (isDragging && hideSourceOnDrag) {
    return (
      <div
        style={{
          left,
          top,
        }}
        className='absolute'
      />
    );
  }

  return (
    <div>
      <div
        className=' h-[30px] w-[30px] absolute z-10'
        style={{ left: left - OFFSET / 2, top: top - OFFSET / 2 }}
        onMouseDown={() => {
          updateStartPos({ left, top });
          setDrawingMode(false);
        }}
        ref={drag}
      >
        <DragHandle />
      </div>
      {/* This div and the resizable box must remain siblings for the line drawing */}
      <div
        className='absolute flex flex-row justify-center align-middle items-center hover:bg-selected_white pointer-pencil rounded-md'
        style={{
          left: left - OFFSET / 2,
          top: top - OFFSET / 2,
          width: size[0] + OFFSET,
          height: size[1] + OFFSET,
        }}
        ref={preview}
        id={id}
      ></div>
      <ResizableBox
        classes='p-sm overflow-hidden h-full w-full'
        style={{
          width: size[0],
          height: size[1],
          left,
          top,
        }}
        id={id}
        updateSize={updateSize}
      >
        {/* {size[0] > 205 || size[1] > 80 ? (
          <div className='bg-base_white h-full'>
            <EditorComponent />
            <Cube className='absolute right-sm top-sm' size={'1.5em'} />
          </div>
        ) : ( */}
        <CollapsedGraphNode title={title} />
        {/* )} */}
      </ResizableBox>
      {/* <div
          style={{ left: size[0] / 2 }}
          className='draw-circle draw-circle-t'
          onMouseDown={handleMouseDownCircle}
          ref={circleRefs[3]}
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
        <div
          style={{ left: size[0] / 2, bottom: 0 }}
          className='draw-circle draw-circle-b'
          onMouseDown={handleMouseDownCircle}
          ref={circleRefs[2]}
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
        <div
          style={{ top: size[1] / 2, left: 0 }}
          className='draw-circle draw-circle-l'
          onMouseDown={handleMouseDownCircle}
          ref={circleRefs[1]}
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div>
        <div
          style={{ top: size[1] / 2, right: 0 }}
          className='draw-circle draw-circle-r'
          onMouseDown={handleMouseDownCircle}
          ref={circleRefs[0]}
        >
          <Circle diameter={10} backgroundClass='bg-node' />
        </div> */}
    </div>
  );
};
