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
import GraphContext, { GraphContextInterface } from '../GraphContext';
import { useDragNode } from '../hooks/useDrag';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  size: number[];
  children: ReactNode;
  updateStartPos: (val: { left: number; top: number }) => void;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  size,
  children,
  updateStartPos,
}) => {
  const { drawingMode, canDrag, setCanDrag, hideSourceOnDrag, addAction } =
    useContext(GraphContext) as GraphContextInterface;

  //refs for the circles we're drawing with
  const circleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
        className='absolute'
        style={{
          left,
          top,
          width: size[0],
          height: size[1],
        }}
        ref={preview}
        id={id}
      >
        <div onMouseDown={() => updateStartPos({ left, top })} ref={drag}>
          <Handle />
        </div>
        <ResizableBox
          classes='p-sm overflow-hidden h-full w-full'
          style={{
            width: size[0],
            height: size[1],
          }}
          id={id}
        >
          {size[0] > 205 || size[1] > 80 ? (
            <EditorComponent />
          ) : (
            <CollapsedGraphNode />
          )}
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
    </div>
  );
};
