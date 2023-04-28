/**
 * Container for Graph; renders either "Mind map" view or "Axis" view
 * Sets information for Context wrapper that deals with actions like dragging, undo/redo, resize
 */
import {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { usePanAndZoom } from '../hooks/zoomingHooks';

export const GraphContainer: React.FC<{
  window: Window;
  document: Document;
}> = ({ window, document }) => {
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
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  });

  //Lines and nodes to show

  const viewContext = useContext(GraphViewContext) as GraphViewContextInterface;
  const { lines, setLines, nodesDisplayed, nodesVisual, setNodesVisual } =
    viewContext;

  useEffect(() => {
    setLines([...lines]);
  }, [nodesDisplayed]);

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
    window
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
