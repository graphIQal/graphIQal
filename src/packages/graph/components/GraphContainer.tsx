/**
 * Container for Graph; renders either "Mind map" view or "Axis" view
 * Sets information for Context wrapper that deals with actions like dragging, undo/redo, resize
 */
import { useContext, useEffect, useRef, useState } from 'react';
import { addConnection } from '../../../helpers/backend/addConnection';
import GraphActionContext from '../context/GraphActionContext';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';
import { useDropNode } from '../hooks/dragging/useDropNode';

import { useFiltering } from '../hooks/useFiltering';
import { useCanvas } from '../hooks/drawing/useCanvas';
import { Action, useHistoryState } from '../hooks/useHistoryState';
import { useResize } from '../hooks/useResize';
import { usePanAndZoom } from '../hooks/zoomAndPan/usePanAndZoom';
import { Filtering } from './Filtering';
import { GraphMindMapView } from './GraphMindMapView';
import ViewContext, {
  ViewContextInterface,
} from '../../../components/context/ViewContext';
import { useDrawingCanvas } from '../hooks/drawing/useDrawingCanvas';
import { useDrawingEnd } from '../hooks/drawing/useDrawingEnd';
import { useDrawingStart } from '../hooks/drawing/useDrawingStart';
import { Alert } from '../../../components/organisms/Alert';
import {
  handleEscapeDrawing,
  handleInvokeSearch,
} from '../helpers/handleKeyPress';

export const GraphContainer: React.FC<{}> = () => {
  const { windowVar, documentVar } = useContext(
    ViewContext
  ) as ViewContextInterface;

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

  const graphViewContext = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  useEffect(() => {
    const listenerFunc = (evt: any) => {
      evt.stopImmediatePropagation();
      if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey) && evt.shiftKey) {
        graphViewContext.redo();
      } else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
        graphViewContext.undo();
      } else if (evt.code == 'KeyM') {
        handleEscapeDrawing(drawingContext, setPoints);
      } else if (evt.code === 'KeyP' && (evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
        handleInvokeSearch(viewContext);
      }
    };
    document.addEventListener('keydown', (event) => listenerFunc(event));
    return document.removeEventListener('keydown', (event) =>
      listenerFunc(event)
    );
  }, []);

  //Pan and zoom
  const ref = useRef(null);
  let { onWheel, translateX, translateY, scale } = usePanAndZoom(ref);

  if (!Number.isFinite(translateX)) {
    translateX = 0;
  }

  if (!Number.isFinite(translateY)) {
    translateY = 0;
  }

  useEffect(() => {
    windowVar.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      windowVar.removeEventListener('wheel', onWheel);
    };
  });

  //Lines and nodes to show

  const viewContext = useContext(GraphViewContext) as GraphViewContextInterface;
  // const { lines, setLines, nodeData_Graph } = viewContext;

  //DND
  const startPos = useRef<{ left: number; top: number }>();
  const [, drop] = useDropNode(setIsDrawing, translateX, translateY, scale);
  const [canDrag, setCanDrag] = useState(false);

  //Drawing
  const canvas = useRef<any>();
  const { canvasWidth, canvasHeight, points, setPoints } = useCanvas(
    translateX,
    translateY,
    scale,
    ref,
    windowVar
  );

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
      addConnection(startNode.current, endNode.current, viewContext);
    }
  }, [endNode.current]);

  const handleStartPoint = useDrawingStart();
  const handleDrawing = useDrawingCanvas();
  const handleDrawingEnd = useDrawingEnd(translateX, translateY, scale);

  //Pinching hook
  // const handlePinch = usePinch();

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
      <div className='h-full w-full' id='parent' ref={drop}>
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
          translateX={translateX}
          translateY={translateY}
          scale={scale}
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
          <canvas
            ref={ref}
            width={canvasWidth}
            height={canvasHeight}
            id='canvas'
            className='overflow-auto'
          />
        </div>
      </div>
    </GraphActionContext.Provider>
  );
};
