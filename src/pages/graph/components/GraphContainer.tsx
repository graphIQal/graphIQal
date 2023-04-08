import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import IconCircleButton from '../../../components/molecules/IconCircleButton';
import { PillMenu } from '../../../components/molecules/PillMenu';
import LineTo from '../../../packages/lineto';
import {
  graphNodes,
  nodesData,
} from '../../../schemas/Data_structures/DS_schema';
import GraphContext, { GraphContextInterface } from '../GraphContext';
import { DragItemGraph } from '../graphTypes';
import { moveNodeCallback } from '../helpers/dragging';
import {
  handleDrawing,
  handleDrawingEnd,
  handleEndPoint,
  handleStartPoint,
} from '../helpers/drawing';
import { snapToGrid } from '../helpers/snapping';
import { useCanvas } from '../hooks/useCanvas';
import { GraphAxisView } from './GraphAxisView';
import GraphEditor from './GraphEditor';
import { GraphMindMapView } from './GraphMindMapView';
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
    startNode,
    endNode,
    addAction,
    isPointInCanvasFuncs,
    numPointsInTriangleFuncs,
    nodesDisplayed,
    nodeInView,
    setNodeInView,
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
  const moveNode = useCallback(moveNodeCallback, [nodes, setNodes]);
  const context = useContext(GraphContext);
  //Handling drop event
  const startPos = useRef<{ left: number; top: number }>();
  const [, drop] = useDrop(
    () => ({
      accept: 'node',
      drop(item: DragItemGraph, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        [left, top] = snapToGrid(left, top);
        moveNode(item.id, left, top, context);
        setDrawingMode(true);
        setIsDrawing(false);
        addAction({
          undo: { id: item.id, type: 'DRAG', value: startPos.current },
          redo: { id: item.id, type: 'DRAG', value: { left, top } },
        });
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

  useEffect(() => {
    if (
      !startNode ||
      !endNode ||
      startNode.current == '' ||
      endNode.current == ''
    ) {
      return;
    }

    if (
      startNode.current !== '' &&
      endNode.current !== '' &&
      startNode.current != endNode.current
    ) {
      setLines([
        ...lines,
        { start: startNode.current, end: endNode.current, arrowStart: null },
      ]);
      addAction({
        undo: { id: '', value: null, type: 'LINE' },
        redo: {
          id: '',
          value: { start: startNode.current, end: endNode.current },
          type: 'LINE',
        },
      });
    }
  }, [endNode.current]);

  //Pill menu information for centered node
  const getDropdownItems = () => {
    let items = [];
    for (let node in nodesData) {
      items.push({
        text: node,
        onPress: () => {
          setNodeInView(node);
        },
      });
    }
    return items;
  };

  //Pill menu information for x-axis node
  const [xCategory, setXCategory] = useState('study_categories');
  const [yCategory, setYCategory] = useState('data_structures');

  const getDropdownItemsX = () => {
    let items = [];
    for (let node in nodesData) {
      items.push({
        text: node,
        onPress: () => {
          setXCategory(node);
        },
      });
    }
    return items;
  };
  const getDropdownItemsY = () => {
    let items = [];
    for (let node in nodesData) {
      items.push({
        text: node,
        onPress: () => {
          setYCategory(node);
        },
      });
    }
    return items;
  };

  return (
    <div className='relative h-full w-full' ref={drop}>
      {/* <div className='absolute'>{nodeInView}</div> */}
      <div className='ml-3 mt-3 flex flex-row gap-x-3 mb-3'>
        <PillMenu
          label='In View: '
          value={nodeInView}
          dropdownItems={getDropdownItems()}
        />
        <PillMenu
          label='X-Axis: '
          value={xCategory}
          dropdownItems={getDropdownItemsX()}
        />
        <PillMenu
          label='Y-Axis: '
          value={yCategory}
          dropdownItems={getDropdownItemsY()}
        />
      </div>
      <GraphMindMapView
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        points={points}
        setPoints={setPoints}
        startPos={startPos}
      />
      {/* <div className=' absolute  flex-row w-10'>
        <IconCircleButton
          src='draw'
          onClick={() => setDrawingMode(!drawingMode)}
          selected={drawingMode}
        />
        <IconCircleButton src='undo' onClick={() => {}} selected={false} />
        <IconCircleButton src='redo' onClick={() => {}} selected={false} />
      </div> */}

      <div
        onMouseDown={
          drawingMode
            ? (event: any) => {
                handleStartPoint('', startNode, setIsDrawing);
              }
            : () => {
                return null;
              }
        }
        onMouseMove={
          isDrawing && drawingMode
            ? (event: any) => {
                handleDrawing(event, points, setPoints);
              }
            : () => {
                return null;
              }
        }
        onMouseUp={
          isDrawing && drawingMode
            ? (event: any) => {
                handleDrawingEnd(
                  setIsDrawing,
                  points,
                  setPoints,
                  nodes,
                  setNodes,
                  addAction,
                  isPointInCanvasFuncs,
                  numPointsInTriangleFuncs,
                  lines,
                  setLines
                );
              }
            : () => {
                if (!drawingMode) setDrawingMode(true);
              }
        }
      >
        {/* <GraphAxisView xCategory={xCategory} yCategory={yCategory} /> */}
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
    </div>
  );
};
