/**
 * Container for node on graph.
 */

import { FC, ReactNode, useContext, useEffect } from 'react';
import CollapsedGraphNode from '../../../components/organisms/CollapsedGraphNode';
import { DragHandle } from '../../../packages/dnd-editor/components/Draggable';
import ResizableBox from '../../../packages/resizable/resizableBox';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import '../graph.css';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../context/GraphActionContext';
import { OFFSET } from '../hooks/drawingHooks';
import { useDragNode } from '../hooks/draggingHooks';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  size: number[];
  children: ReactNode;
  title: string;
  updateStartPos: (val: { left: number; top: number }) => void;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  size,
  title,
  children,
  updateStartPos,
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

  //disables dragging if we're drawing
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
        classes='p-sm overflow-hidden h-full w-full bg-base_white min-w-[10rem]  h-12 rounded-sm border-grey border-[1px] flex flex-row items-center align-middle z-10 p-3 gap-x-3 '
        style={{
          width: size[0],
          height: size[1],

          left,
          top,
        }}
        id={id}
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
    </div>
  );
};
