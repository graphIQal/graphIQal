import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { PillMenu } from '../../../components/molecules/PillMenu';
import { nodesData } from '../../../schemas/Data_structures/DS_schema';
import DrawingContext, { DrawingContextInterface } from '../DrawingContext';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../GraphActionContext';
import { DragItemGraph } from '../graphTypes';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../GraphViewContext';
import { moveNodeCallback } from '../helpers/dragging';
import {
  handleDrawing,
  handleDrawingEnd,
  handleStartPoint,
} from '../helpers/drawing';
import { useResize } from '../helpers/resizing';
import { snapToGrid } from '../helpers/snapping';
import { useCanvas } from '../hooks/useCanvas';
import { useDropNode } from '../hooks/draggingHooks';
import { GraphMindMapView } from './GraphMindMapView';
import { useFiltering } from '../hooks/filteringHooks';
import { GraphAxisView } from './GraphAxisView';
import { Filtering } from './Filtering';
import {
  useDrawingCanvas,
  useDrawingEnd,
  useDrawingStart,
} from '../hooks/drawingHooks';

export const GraphContainer: React.FC = () => {
  const {
    // addAction,
  } = useContext(GraphActionContext) as GraphActionContextInterface;

  const {
    startNode,
    endNode,
    isPointInCanvasFuncs,
    numPointsInTriangleFuncs,
    drawingMode,
    setDrawingMode,
    setIsDrawing,
    isDrawing,
  } = useContext(DrawingContext) as DrawingContextInterface;

  const {
    lines,
    setLines,
    nodesDisplayed,
    setNodesDisplayed,
    nodesVisual,
    setNodesVisual,
    nodeInView,
    setNodeInView,
  } = useContext(GraphViewContext) as GraphViewContextInterface;

  useEffect(() => {
    setLines([...lines]);
  }, [nodesDisplayed]);

  //Handling drop event
  const startPos = useRef<{ left: number; top: number }>();
  const [, drop] = useDropNode(setIsDrawing);

  const canvas = useRef<any>();
  const { canvasRef, canvasWidth, canvasHeight, points, setPoints } =
    useCanvas();
  const context = useContext(GraphViewContext);
  //When box is resized
  const updateSize = useResize();

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
      // addAction({
      //   undo: { id: '', value: null, type: 'LINE' },
      //   redo: {
      //     id: '',
      //     value: { start: startNode.current, end: endNode.current },
      //     type: 'LINE',
      //   },
      // });
    }
  }, [endNode.current]);

  //Pill menu information for centered node
  const {
    xCategory,
    yCategory,
    getDropdownItemsX,
    getDropdownItemsY,
    getDropdownItems,
  } = useFiltering();

  const handleStartPoint = useDrawingStart();
  const handleDrawing = useDrawingCanvas();
  const handleDrawingEnd = useDrawingEnd();

  return (
    <div className='relative h-full w-full' ref={drop}>
      <Filtering
        xCategory={xCategory}
        yCategory={yCategory}
        getDropdownItems={getDropdownItems}
        getDropdownItemsX={getDropdownItemsX}
        getDropdownItemsY={getDropdownItemsY}
      />
      <GraphMindMapView
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        points={points}
        setPoints={setPoints}
        startPos={startPos}
        updateSize={updateSize}
      />
      {/* <GraphAxisView xCategory={xCategory} yCategory={yCategory} /> */}
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
                handleStartPoint('');
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
                handleDrawingEnd(points, setPoints);
              }
            : () => {
                if (!drawingMode) setDrawingMode(true);
              }
        }
      >
        <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      </div>
    </div>
  );
};
