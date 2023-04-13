/**
 * Container for Graph; renders either "Mind map" view or "Axis" view
 * Sets information for Context wrapper that deals with actions like dragging, undo/redo, resize
 */

import { useContext, useEffect, useRef, useState } from 'react';
import { addLine } from '../../../helpers/backend/mutateHelpers';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphActionContext from '../context/GraphActionContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';
import { useResize } from '../hooks/useResize';
import { useDropNode } from '../hooks/draggingHooks';
import {
  useDrawingCanvas,
  useDrawingEnd,
  useDrawingStart,
} from '../hooks/drawingHooks';
import { useFiltering } from '../hooks/filteringHooks';
import { useCanvas } from '../hooks/useCanvas';
import { Action } from '../hooks/useHistoryState';
import { Filtering } from './Filtering';
import { GraphMindMapView } from './GraphMindMapView';

export const GraphContainer: React.FC = () => {
  //History
  const [history, setHistory] = useState<Action[]>([]);
  const [pointer, setPointer] = useState<number>(-1);
  // const { addAction, undo, redo } = useHistoryState(nodes, setNodes, setLines);

  //For drawing
  const drawingContext = useContext(DrawingContext) as DrawingContextInterface;
  const {
    startNode,
    endNode,
    drawingMode,
    setDrawingMode,
    setIsDrawing,
    isDrawing,
  } = drawingContext;

  //Lines and nodes to show

  const viewContext = useContext(GraphViewContext) as GraphViewContextInterface;
  const { lines, setLines, nodesDisplayed } = viewContext;

  useEffect(() => {
    setLines([...lines]);
  }, [nodesDisplayed]);

  //DND
  const startPos = useRef<{ left: number; top: number }>();
  const [, drop] = useDropNode(setIsDrawing);
  const [canDrag, setCanDrag] = useState(false);

  //Drawing
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

  //Adds a line when the mouse is released from the drawing area of a node
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
      addLine(startNode.current, endNode.current, null, viewContext);
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

  const handleStartPoint = useDrawingStart();
  const handleDrawing = useDrawingCanvas();
  const handleDrawingEnd = useDrawingEnd();

  //Pill menu information for centered node
  const {
    xCategory,
    yCategory,
    getDropdownItemsX,
    getDropdownItemsY,
    getDropdownItems,
  } = useFiltering();

  //Resizing
  const updateSize = useResize();

  return (
    <GraphActionContext.Provider
      value={{
        hideSourceOnDrag: true,
        canDrag: canDrag,
        setCanDrag: setCanDrag,
        updateSize: updateSize,
        // addAction: addAction,
      }}
    >
      <div className='relative h-full w-full' ref={drop}>
        <Filtering
          xCategory={xCategory}
          yCategory={yCategory}
          getDropdownItems={getDropdownItems}
          getDropdownItemsX={getDropdownItemsX}
          getDropdownItemsY={getDropdownItemsY}
        />
        <GraphMindMapView
          points={points}
          setPoints={setPoints}
          startPos={startPos}
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
    </GraphActionContext.Provider>
  );
};
