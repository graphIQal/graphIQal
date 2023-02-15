import {
  MutableRefObject,
  useCallback,
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
import { DragItemGraph, LineRefs } from '../graphTypes';
import { moveNodeCallback } from '../helpers/dragging';
import { updateSizeCallback } from '../helpers/resizing';
import { useCanvas } from '../hooks/useCanvas';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';

export interface ContainerProps {
  hideSourceOnDrag: boolean;
}

export const GraphContainer: React.FC<ContainerProps> = ({
  hideSourceOnDrag,
}) => {
  const createNode = CreateNode();
  const [nodesList, setNodesList] = useState(GetNodes(true).data?.nodeData);

  //Mock node data
  const [nodes, setNodes] = useState<{ [key: string]: GraphViewElement }>({
    a: { id: 'a', graphNode: { index: 0, x: 80, y: 20, size: [100, 100] } },
    b: { id: 'b', graphNode: { index: 0, x: 400, y: 20, size: [20, 100] } },
  });

  //Mock line data
  const [lines, setLines] = useState<LineRefs[]>([
    { start: Object.values(nodes)[0].id, end: Object.values(nodes)[1].id },
  ]);

  useEffect(() => {
    setLines([...lines]);
  }, [nodes]);

  //Resize stuff

  const updateSize = useCallback(updateSizeCallback, [nodes, setNodes]);

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
  const [lastZoomCenter, setLastZoomCenter] = useState({ x: 0, y: 0 });
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
  const [drawingMode, setDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  useEffect(() => {
    console.log('is drawing' + isDrawing);
  });

  const canvas = useRef<any>();
  const {
    setStartCoordinate,
    setEndCoordinate,
    canvasRef,
    canvasWidth,
    canvasHeight,
  } = useCanvas();

  useEffect(() => {
    const canvasEle = canvas.current;
    if (canvasEle) {
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
    }
  });

  const startNode = useRef<string>('');
  const endNode = useRef<string>('');
  console.log(startNode.current);
  useEffect(() => {
    if (!startNode || !endNode) {
      return;
    }
    if (startNode.current !== '' && endNode.current !== '') {
      console.log('here' + startNode.current + endNode.current);
      setLines([...lines, { start: startNode.current, end: endNode.current }]);
    }
    console.log('lines ' + JSON.stringify(lines));
  }, [endNode.current]);

  return (
    <div
      // onPointerDown={(event:PointerEvent) => onPointDown(event, pointersDown, setPointersDown)}
      className='w-screen h-screen border-solid border relative'
      ref={drop}
    >
      <div className='absolute bottom-10 right-10'>
        <IconCircleButton onClick={() => setDrawingMode(!drawingMode)} />
      </div>
      {lines.map(function (line, i) {
        console.log('drawing line');
        console.log(document.getElementById(line.start));
        console.log(document.getElementById(line.end));

        console.log(i);
        return <LineTo key={i} from={line.start} to={line.end} />;
      })}
      {Object.values(nodes).map((node) => {
        return (
          <div className={node.id} key={node.id}>
            <GraphNode
              key={node.id}
              left={node.graphNode?.x == undefined ? 0 : node.graphNode?.x}
              top={node.graphNode?.y == undefined ? 0 : node.graphNode?.y}
              hideSourceOnDrag={hideSourceOnDrag}
              id={node.id}
              size={
                node.graphNode?.size == undefined
                  ? [100, 100]
                  : node.graphNode.size
              }
              updateSize={(
                id: number,
                width: number,
                height: number,
                tag?: string
              ) => updateSize(id, width, height, nodes, setNodes, tag)}
              setLineAll={setLines}
              lines={lines}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
              drawingMode={drawingMode}
              setDrawingMode={setDrawingMode}
              setStartCoordinate={setStartCoordinate}
              setEndCoordinate={setEndCoordinate}
              startNode={startNode}
              endNode={endNode}
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
