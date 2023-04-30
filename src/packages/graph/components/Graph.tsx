/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DrawingContext from '../context/GraphDrawingContext';
import { LineRefs } from '../graphTypes';
import GraphViewContext from '../context/GraphViewContext';
import { BoxDragLayer } from '../helpers/BoxDragLayer';
import { handleDrawingHotkey } from '../hooks/drawingHooks';
import { GraphContainer } from './GraphContainer';
import {
	getAllNodes,
	getLines,
	getNodesToDisplay,
	getNodesToDisplayGraph,
} from '../../../helpers/backend/getHelpers';

const Graph: React.FC<{ window: Window; document: Document }> = ({
	window,
	document,
}) => {
	if (!document || !window) return <div></div>;
	//Data of all nodes
	const [allNodes, setAllNodes] = useState(getAllNodes());
	//Graph in view of one node
	const [nodeInView, setNodeInView] = useState('homenode');
	//Data of nodes to display (comes from Connection information between each node and the node in view)
	const [nodesDisplayed, setNodesDisplayed] = useState(
		getNodesToDisplay(nodeInView, allNodes)
	);

	//Visual attributes of nodes to display
	const [nodesVisual, setNodesVisual] = useState(
		getNodesToDisplayGraph(nodeInView, allNodes, window, document)
	);

	console.log('allNodes');
	console.log(allNodes);
	console.log('nodeInView');
	console.log(nodeInView);
	console.log('nodesDisplayed');
	console.log(nodesDisplayed);

	useEffect(() => {
		setNodesDisplayed(getNodesToDisplay(nodeInView, allNodes));
		setNodesVisual(
			getNodesToDisplayGraph(nodeInView, allNodes, window, document)
		);
	}, [nodeInView]);

	//Line data
	const [lines, setLines] = useState<LineRefs[]>(getLines());

	//Drawing states
	const containerRef = useRef(null);
	const [drawingMode, setDrawingMode] = useState(true);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);

	//Drawing line data
	const startNode = useRef<string>('');
	const endNode = useRef<string>('');

	//Line functions for detecting arrows
	let isPointInCanvasFuncs = useRef<any>({});
	let numPointsInTriangleFuncs = useRef<any>({});

	//Modal to show node details and connection details
	const [modalNode, setModalNode] = useState('');

	const [showModalConnection, setShowModalConnection] = useState(false);
	const [currConnection, setCurrConnection] = useState(lines[0]);

	// Hot key for undo/redo
	useEffect(() => {
		const listenerFunc = (evt: any) => {
			evt.stopImmediatePropagation();
			if (
				evt.code === 'KeyZ' &&
				(evt.ctrlKey || evt.metaKey) &&
				evt.shiftKey
			) {
				// redo();
			} else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
				// undo();
			}
		};
		document.addEventListener('keydown', (event) => listenerFunc(event));
		return document.removeEventListener('keydown', (event) =>
			listenerFunc(event)
		);
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<div
				onKeyDown={(event) =>
					handleDrawingHotkey(event, drawingMode, setDrawingMode)
				}
				tabIndex={-1}
				ref={containerRef}
			>
				<DrawingContext.Provider
					value={{
						startNode: startNode,
						endNode: endNode,
						isPointInCanvasFuncs: isPointInCanvasFuncs,
						numPointsInTriangleFuncs: numPointsInTriangleFuncs,
						drawingMode: drawingMode,
						setDrawingMode: setDrawingMode,
						isDrawing: isDrawing,
						setIsDrawing: setIsDrawing,
					}}
				>
					<GraphViewContext.Provider
						value={{
							lines,
							setLines,
							setNodeInView: setNodeInView,
							nodesDisplayed: nodesDisplayed,
							setNodesDisplayed: setNodesDisplayed,
							nodesVisual: nodesVisual,
							setNodesVisual: setNodesVisual,
							modalNode: modalNode,
							setModalNode: setModalNode,
							nodeInView: nodeInView,
							allNodes: allNodes,
							setAllNodes: setAllNodes,
						}}
					>
						<GraphContainer window={window} document={document} />
						<BoxDragLayer parentRef={containerRef} />
					</GraphViewContext.Provider>
				</DrawingContext.Provider>
			</div>
		</DndProvider>
	);
};

export default Graph;
