import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import Circle from '../../components/atoms/Circle';
import { NodeData } from '../../gql/graphql';
import EditorComponent from '../../packages/editor/EditorComponent';
import ResizableBox from '../../packages/resizable/resizableBox';
import './graph.css';

export interface NodeProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;
  initialOffset?: any;
  size: number[];
  children: ReactNode;
  updateSize: (id: number, width: number, height: number) => void;
  startDraw: (event: any) => void;
  setLineAll: (x: any) => void;
  lines: any;
  isDrawing: boolean;
  setIsDrawing: (x: boolean) => void;
}
export const GraphNode: FC<NodeProps> = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  initialOffset = undefined,
  size,
  updateSize,
  setLineAll,
  lines,
  isDrawing,
  setIsDrawing,
  children,
}) => {
  //refs for the circles we're drawing with
  const circleRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    if (isDrawing) {
      setCanDrag(false);
      for (const ref in circleRefs) {
        (circleRefs[ref].current as any).addEventListener(
          'mouseup',
          handleEndPoint
        );
      }
    } else {
      setCanDrag(true);
    }
  }, [isDrawing]);

  let moreStyle = {};
  if (initialOffset)
    moreStyle = {
      position: 'absolute',
      left: initialOffset.x,
      top: initialOffset.y,
    };

  //can drag based on whether or not we're resizing
  const [canDrag, setCanDrag] = useState(true);
  const dragOn = () => {
    setCanDrag(true);
  };
  const dragOff = () => {
    setCanDrag(false);
  };

  //DND dragging hook
  const [{ isDragging }, drag] = useDrag(
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

  //When a circle is clicked
  const handleMouseDownCircle = (event: any) => {
    setIsDrawing(true);
    setCanDrag(false);
    const currentCoord = { x: event.clientX, y: event.clientY };
    setLineAll([...lines, { start: currentCoord, end: currentCoord }]);
  };

  //When mouse is released not on any circle
  const handleWrongEndpoint = () => {
    console.log('wrong endpoint!');
    setLineAll(lines.pop());
    document.removeEventListener('mousemove', handleDrawing);
    document.removeEventListener('mouseup', handleEndPoint);
    setCanDrag(true);
  };

  //On mouse move to draw the line (not doing anything rn)
  const handleDrawing = (event: any) => {
    console.log('drawing');
    const currentCoord = { x: event.clientX, y: event.clientY };
    if (lines.length == 0) {
      return;
    }
    const nextLines = lines.map((e: any, i: number) => {
      if (i === lines.length - 1) {
        return { start: e.start, end: currentCoord };
      } else {
        return e;
      }
    });

    setLineAll(nextLines);
  };

  //When mouse is released on another circle
  const handleEndPoint = (event: any) => {
    console.log('correct target!');
    // const currentCoord = { x: event.clientX, y: event.clientY };
    const currentCoord = { x: event.clientX, y: event.clientY };
    if (lines.length == 0) {
      return;
    }
    const nextLines = lines.map((e: any, i: number) => {
      if (i === lines.length - 1) {
        return { start: e.start, end: currentCoord };
        // return { start: circleRefs[0], end: circleRefs[1] };
      } else {
        return e;
      }
    });

    setLineAll(nextLines);
    document.removeEventListener('mousemove', handleDrawing);
    document.removeEventListener('mouseup', handleWrongEndpoint);
    setCanDrag(true);
    for (const ref in circleRefs) {
      (circleRefs[ref].current as any).removeEventListener(
        'mouseup',
        handleEndPoint
      );
    }
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
        </div>
      </div>
    </div>
  );
};
