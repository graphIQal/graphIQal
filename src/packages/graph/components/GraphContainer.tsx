/**
 * Container for Graph; renders either "Mind map" view or "Axis" view
 * Sets information for Context wrapper that deals with actions like dragging, undo/redo, resize
 */
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import GraphActionContext from '../context/GraphActionContext';
import DrawingContext, {
	DrawingContextInterface,
} from '../context/GraphDrawingContext';
import { useDropNode } from '../hooks/dragging/useDropNode';
import { handleEscapeDrawing } from '../helpers/handleKeyPress';
import { useCanvas } from '../hooks/drawing/useCanvas';
import { useDrawingCanvas } from '../hooks/drawing/useDrawingCanvas';
import { useDrawingEnd } from '../hooks/drawing/useDrawingEnd';
import { useDrawingStart } from '../hooks/drawing/useDrawingStart';
import { useFiltering } from '../hooks/useFiltering';
import { useResize } from '../hooks/useResize';
import { usePanAndZoom } from '../hooks/zoomAndPan/usePanAndZoom';
import { Filtering } from './Filtering';
import { GraphMindMapView } from './GraphMindMapView';
import { useToggle } from '../../../helpers/hooks/useToggle';
import { addNode } from '../../../helpers/backend/addNode';
import SearchBar from '../../../components/organisms/SearchBar';
import { useViewData } from '../../../components/context/ViewContext';
import { useGraphViewAPI } from '../context/GraphViewContext';
import { useGraphViewData } from '../context/GraphViewContext';
import { addConnection } from '../../../helpers/backend/addConnection';
import { ActionChanges, useHistoryState } from '../hooks/useHistoryState';

export const GraphContainer: React.FC<{}> = () => {
	const { windowVar, documentVar } = useViewData();
	if (!windowVar || !documentVar) return <div></div>;

	//For drawing
	const drawingContext = useContext(
		DrawingContext
	) as DrawingContextInterface;
	const {
		startNode,
		endNode,
		drawingMode,
		setDrawingMode,
		setIsDrawing,
		isDrawing,
	} = drawingContext;

	const { graphViewId, nodeData_Graph, nodeVisualData_Graph } =
		useGraphViewData();

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

	useEffect(() => {
		nodeDataRef.current = nodeData_Graph;
		visualDataRef.current = nodeVisualData_Graph;
	}, [nodeData_Graph, nodeVisualData_Graph]);

	const { undo, redo, history, addAction, pointer } = useHistoryState(
		changeNodeData_Graph,
		changeVisualData_Graph,
		changeAlert,
		nodeDataRef,
		visualDataRef
	);

	useEffect(() => {
		setHistoryFunctions(addAction, undo, redo);
	}, []);

	useEffect(() => {
		changeHistory(history, pointer);
	}, [history, pointer]);

	//key events: undo, redo, escaping drawing
	useEffect(() => {
		const listenerFunc = (evt: any) => {
			if (
				evt.code === 'KeyZ' &&
				(evt.ctrlKey || evt.metaKey) &&
				evt.shiftKey
			) {
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				evt.preventDefault();
				redo();
			} else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
				evt.stopImmediatePropagation();
				evt.preventDefault();
				undo();
			} else if (evt.keyCode == 27) {
				evt.stopImmediatePropagation();
				//escape key
				handleEscapeDrawing(drawingContext, setPoints);
			}
		};

		document.addEventListener('keydown', (event) => listenerFunc(event));
		return document.removeEventListener('keydown', (event) =>
			listenerFunc(event)
		);
	}, []);

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
				changeAlert,
				changeNodeData_Graph,
			});
		}
	}, [endNode.current]);

	const handleStartPoint = useDrawingStart();
	const handleDrawing = useDrawingCanvas();
	const handleDrawingEnd = useDrawingEnd(translateX, translateY, scale);

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
			}}
		>
			<div
				className='h-full w-full'
				id={'parent' + graphViewId}
				ref={drop}
			>
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
