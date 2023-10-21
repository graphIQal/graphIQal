/**
 * Container for Graph; renders either "Mind map" view or "Axis" view
 * Sets information for Context wrapper that deals with actions like dragging, undo/redo, resize
 */
import { useContext, useEffect, useRef } from 'react';
import { useViewData } from '../../../components/context/ViewContext';
import { addConnection } from '../helpers/backend/addConnection';
import { useToggle } from '../../../helpers/hooks/useToggle';
import GraphActionContext from '../context/GraphActionContext';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';
import { handleEscapeDrawing } from '../helpers/frontend/handleKeyPress';
import { useDropNode } from '../hooks/dragging/useDropNode';
import { useCanvas } from '../hooks/drawing/useCanvas';
import { useDrawingCanvas } from '../hooks/drawing/useDrawingCanvas';
import { useDrawingEnd } from '../hooks/drawing/useDrawingEnd';
import { useDrawingStart } from '../hooks/drawing/useDrawingStart';
import { useHistoryState } from '../hooks/useHistoryState';
import { useResize } from '../hooks/useResize';
import { usePanAndZoom } from '../hooks/zoomAndPan/usePanAndZoom';
import { GraphMindMapView } from './GraphMindMapView';
import useSWR, { KeyedMutator, useSWRConfig } from 'swr';
import { fetcher } from '@/backend/driver/fetcher';
import { useKeyboardShortcut } from '@/helpers/hooks/useKeyboardShortcut';

export const GraphContainer: React.FC = () => {
  const { nodeId, username, windowVar, documentVar } = useViewData();
  const { graphViewId, nodeData_Graph, nodeVisualData_Graph } =
    useGraphViewData();

  if (!windowVar || !documentVar || !graphViewId) return <div></div>;

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

  // console.log('nodeData graph ', nodeData_Graph);
  // console.log('nodeVisualDatagraph ', nodeVisualData_Graph);

  const {
    changeNodeData_Graph,
    changeAlert,
    changeVisualData_Graph,
    setHistoryFunctions,
    changeHistory,
  } = useGraphViewAPI();

  const nodeDataRef = useRef(nodeData_Graph);
  const visualDataRef = useRef(nodeVisualData_Graph);

  const { mutate } = useSWRConfig();

  // Could not call useSWR and make a custom mutateGraphData but w/e
  const {
    mutate: mutateGraphData,
    // error: nodeError,
    // isLoading: nodeDataLoading,
  } = useSWR(
    graphViewId && nodeId
      ? `/api/${username}/${nodeId}/graph/${graphViewId}`
      : null,
    fetcher,
    {}
  );

  // const mutateGraphData = (params) =>
  // 	mutate(
  // 		graphViewId && nodeId
  // 			? `/api/${username}/${nodeId}/graph/${graphViewId}`
  // 			: null,
  // 		...params
  // 	);

  useEffect(() => {
    nodeDataRef.current = nodeData_Graph;
    visualDataRef.current = nodeVisualData_Graph;
    // console.log('nodeData_Graph');
    // console.log(nodeData_Graph);
    // console.log(nodeVisualData_Graph);
  }, [nodeData_Graph, nodeVisualData_Graph]);

  // const useSWRKey =
  // 	viewId && nodeId ? `/api/${username}/${nodeId}/graph/${viewId}` : null;

  const { undo, redo, history, addAction } = useHistoryState({
    changeNodeData_Graph,
    changeVisualData_Graph,
    changeAlert,
    nodeDataRef,
    visualDataRef,
    mutateGraphData,
    graphViewId,
  });

  useEffect(() => {
    setHistoryFunctions(addAction, undo, redo);
  }, []);

  useEffect(() => {
    changeHistory(history);
  }, [history]);

  //key events: undo, redo, escaping drawing
  // useEffect(() => {
  //   const listenerFunc = (evt: any) => {
  //     if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey) && evt.shiftKey) {
  //       evt.stopPropagation();
  //       evt.stopImmediatePropagation();
  //       evt.preventDefault();
  //       redo();
  //     } else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
  //       evt.stopImmediatePropagation();
  //       evt.preventDefault();
  //       undo();
  //     } else if (evt.keyCode == 27) {
  //       evt.stopImmediatePropagation();
  //       //escape key
  //       handleEscapeDrawing(drawingContext, setPoints);
  //     }
  //   };
  const undoShortcutConfig = {
    code: 'KeyZ',
    ctrlKey: true,
    workspace: graphViewId,
    shortcutTarget: document.getElementById('parent' + graphViewId),
  };
  useKeyboardShortcut(() => undo(), undoShortcutConfig);

  const redoShortcutConfig = {
    code: 'KeyZ',
    ctrlKey: true,
    shiftKey: true,
    workspace: graphViewId,
    shortcutTarget: document.getElementById('parent' + graphViewId),
  };
  useKeyboardShortcut(() => redo(), redoShortcutConfig);

  const escapeDrawingConfig = {
    code: 'Escape',
    workspace: graphViewId,
    shortcutTarget: document.getElementById('parent' + graphViewId),
  };
  useKeyboardShortcut(
    () => handleEscapeDrawing(drawingContext, setPoints),
    escapeDrawingConfig
  );

  //   document.addEventListener('keydown', (event) => listenerFunc(event));
  //   return document.removeEventListener('keydown', (event) =>
  //     listenerFunc(event)
  //   );
  // }, []);

  // Wheel event: panning and zooming
  useEffect(() => {
    documentVar
      .getElementById('parent' + graphViewId)
      ?.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      documentVar
        .getElementById('parent' + graphViewId)
        ?.removeEventListener('wheel', onWheel);
    };
  });

  //Pan and zoom
  const ref = useRef(null);
  let { onWheel, translateX, translateY, scale } = usePanAndZoom(ref);

  if (!Number.isFinite(translateX)) {
    translateX = 0;
  }

  if (!Number.isFinite(translateY)) {
    translateY = 0;
  }

  //DND
  const startPos = useRef<{ left: number; top: number }>();
  const [, drop] = useDropNode(setIsDrawing, translateX, translateY, scale);
  const { value: canDrag, toggle: setCanDrag } = useToggle(false);

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
      addConnection(startNode.current, endNode.current, {
        addAction,
        nodeData_Graph,
        nodeVisualData_Graph,
        changeAlert,
      });
    }
  }, [endNode.current]);

  const handleStartPoint = useDrawingStart();
  const handleDrawing = useDrawingCanvas();
  const handleDrawingEnd = useDrawingEnd(translateX, translateY, scale, mutate);

  //Resizing
  const updateSize = useResize();

  return (
    <GraphActionContext.Provider
      value={{
        hideSourceOnDrag: true,
        canDrag: canDrag,
        setCanDrag: setCanDrag,
        updateSize: updateSize,
      }}
    >
      <div className='h-full w-full' id={'parent' + graphViewId} ref={drop}>
        <GraphMindMapView
          points={points}
          setPoints={setPoints}
          startPos={startPos}
          translateX={translateX}
          translateY={translateY}
          scale={scale}
          mutateGraphData={mutateGraphData}
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
