import {
  FC,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import ResizableBox from '../../../packages/resizable/resizableBox';
import '../graph.css';
import { handleEndPoint } from '../helpers/drawing';
import { useDragNode } from '../hooks/useDrag';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  size: number[];
  children: ReactNode;
  updateSize: (id: number, width: number, height: number, tag?: string) => void;
  setLineAll: (x: any) => void;
  lines: any;
  isDrawing: boolean;
  setIsDrawing: (x: boolean) => void;
  setStartCoordinate: (val: any) => void;
  setEndCoordinate: (val: any) => void;
  drawingMode: boolean;
  setDrawingMode: (val: any) => void;
  startNode: MutableRefObject<string>;
  endNode: MutableRefObject<string>;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  size,
  updateSize,
  setLineAll,
  lines,
  isDrawing,
  setIsDrawing,
  children,
  setStartCoordinate,
  setEndCoordinate,
  drawingMode,
  setDrawingMode,
  startNode,
  endNode,
}) => {
  //refs for the circles we're drawing with
  const circleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  //attach listeners to circles for release if drawing
  useEffect(() => {
    if (drawingMode) {
      setCanDrag(false);
      // for (const ref in circleRefs) {
      //   (circleRefs[ref].current as any).addEventListener(
      //     'mouseup',
      //     (event: MouseEvent) =>
      //       handleEndPoint(event, setCanDrag, lines, setLineAll, circleRefs)
      //   );
      // }
    } else {
      setCanDrag(true);
    }
  }, [drawingMode]);

  //can drag based on whether or not we're resizing
  const [canDrag, setCanDrag] = useState(true);
  const dragOn = () => {
    setCanDrag(true);
  };
  const dragOff = () => {
    setCanDrag(false);
  };

  //DND dragging hook
  const [{ isDragging }, drag, preview] = useDragNode(
    id,
    left,
    top,
    size[0],
    size[1],
    canDrag
  );

  // useEffect(() => {
  //   preview(getEmptyImage(), { captureDraggingState: true });
  // }, []);

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

  //drawing functions
  const handleStartPoint = (event: any) => {
    console.log('in node ' + id);
    setStartCoordinate({ x: event.clientX, y: event.clientY });
    startNode.current = id;
    document.addEventListener('mousemove', handleDrawing);
    document.addEventListener('mouseup', handleEndPoint);
  };
  const handleDrawing = (event: MouseEvent) => {
    setEndCoordinate({ x: event.clientX, y: event.clientY });
  };
  const handleEndPoint = (event: any) => {
    console.log('out of node ' + id);
    setEndCoordinate({ x: event.clientX, y: event.clientY });
    endNode.current = id;
    document.removeEventListener('mousemove', handleDrawing);
    document.removeEventListener('mouseup', handleEndPoint);
  };

  return (
    <div>
      <div
        className='absolute cursor-move'
        style={{
          left,
          top,
          width: size[0],
          height: size[1],
        }}
        ref={drag}
        id={id}
        onMouseDown={
          drawingMode
            ? handleStartPoint
            : () => {
                return null;
              }
        }
      >
        <ResizableBox
          dragOn={dragOn}
          dragOff={dragOff}
          classes='p-sm overflow-hidden h-full w-full'
          style={{
            width: size[0],
            height: size[1],
          }}
          updateSize={(width: number, height: number, tag?: string) =>
            updateSize(id, width, height, tag)
          }
        >
          <EditorComponent />
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
