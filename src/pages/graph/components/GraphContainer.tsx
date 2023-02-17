import {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import IconCircleButton from '../../../components/molecules/IconCircleButton';
import { GraphViewElement } from '../../../gql/graphql';
import { CreateNode, GetNodes } from '../../../helpers/backend/nodeHelpers';
import LineTo from '../../../packages/lineto';
import GraphContext, { GraphContextInterface } from '../GraphContext';
import { DragItemGraph, LineRefs } from '../graphTypes';
import { moveNodeCallback } from '../helpers/dragging';
import {
  Coord,
  handleCircleDrawing,
  handleDrawing,
  handleEndPoint,
  handleStartPoint,
  isCircle,
} from '../helpers/drawing';
import { useCanvas } from '../hooks/useCanvas';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';

export const GraphContainer: React.FC = () => {
  const {
    drawingMode,
    setDrawingMode,
    nodes,
    setNodes,
    lines,
    setLines,
    createNode,
  } = useContext(GraphContext) as GraphContextInterface;

  useEffect(() => {
    setLines([...lines]);
  }, [nodes]);

  //Zoom stuff

  // useEffect(() => {
  //   document.addEventListener('pointerdown', (event: PointerEvent) =>
  //     onPointDown(event)
  //   );
  //   document.addEventListener('pointermove', (event: PointerEvent) =>
  //     onPointMove(event)
  //   );
  //   document.addEventListener('pointerup', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  //   document.addEventListener('pointercancel', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  //   document.addEventListener('pointerout', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  //   document.addEventListener('pointerleave', (event: PointerEvent) =>
  //     pointerUp(event)
  //   );
  // }, []);

  const [zoomFactor, setZoomFactor] = useState(1);
  const theta = 0.1;
  const [lastZoomCenter, setLastZoomCenter] = useState(null);
  const [pointersDown, setPointersDown] = useState<PointerEvent[]>([]);

  //DND stuff

  //When box is dragged
  const moveNode = useCallback(
    moveNodeCallback,

    [nodes, setNodes]
  );

  //Handling drop event
  const [, drop] = useDrop(
    () => ({
      accept: 'node',
      drop(item: DragItemGraph, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveNode(item.id, left, top, nodes, setNodes);

        return undefined;
      },
    }),
    [moveNode, nodes, setNodes]
  );

  //drawing stuff
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const canvas = useRef<any>();
  const { canvasRef, canvasWidth, canvasHeight, points, setPoints } =
    useCanvas();

  useEffect(() => {
    const canvasEle = canvas.current;
    if (canvasEle) {
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
    }
  });

  const startNode = useRef<string>('');
  const endNode = useRef<string>('');
  useEffect(() => {
    if (!startNode || !endNode) {
      return;
    }
    if (startNode.current !== '' && endNode.current !== '') {
      setLines([...lines, { start: startNode.current, end: endNode.current }]);
    }
  }, [endNode.current]);

  return (
    <div
      // onPointerDown={(event:PointerEvent) => onPointDown(event, pointersDown, setPointersDown)}
      className='w-screen h-screen border-solid border relative'
      onMouseDown={
        drawingMode
          ? (event: any) => handleStartPoint(event, '', startNode, setIsDrawing)
          : () => {
              return null;
            }
      }
      onMouseMove={
        isDrawing
          ? (event: any) => {
              handleDrawing(event, points, setPoints);
            }
          : () => {
              return null;
            }
      }
      onMouseUp={
        isDrawing
          ? (event: any) => {
              handleCircleDrawing(
                event,
                setIsDrawing,
                points,
                setPoints,
                nodes,
                setNodes
              );
            }
          : () => {
              return null;
            }
      }
      ref={drop}
    >
      <div className='absolute bottom-10 right-10'>
        <IconCircleButton src='plus' onClick={() => createNode} />
        <IconCircleButton
          src='draw'
          onClick={() => setDrawingMode(!drawingMode)}
          selected={drawingMode}
        />
      </div>
      {lines.map(function (line, i) {
        return <LineTo key={i} from={line.start} to={line.end} />;
      })}
      {Object.values(nodes).map((node) => {
        return (
          <div
            className={node.id}
            key={node.id}
            onMouseDown={
              drawingMode
                ? (event: any) =>
                    handleStartPoint(
                      event,
                      node.id,

                      startNode,
                      setIsDrawing
                    )
                : () => {
                    return null;
                  }
            }
            onMouseUp={
              isDrawing
                ? (event: any) =>
                    handleEndPoint(
                      event,
                      node.id,

                      endNode,
                      setIsDrawing,
                      setPoints
                    )
                : () => {
                    return null;
                  }
            }
          >
            <GraphNode
              key={node.id}
              left={node.graphNode?.x == undefined ? 0 : node.graphNode?.x}
              top={node.graphNode?.y == undefined ? 0 : node.graphNode?.y}
              id={node.id}
              size={
                node.graphNode?.size == undefined
                  ? [100, 100]
                  : node.graphNode.size
              }
            >
              <GraphEditor />
            </GraphNode>
          </div>
        );
      })}
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </div>
  );
};
