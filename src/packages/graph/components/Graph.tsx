/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../../backend/driver/fetcher';
import {
	ConnectionData,
	GraphNodeData,
	NodeData,
} from '../../../schemas/Data_structures/DS_schema';
import DrawingContext from '../context/GraphDrawingContext';
import GraphViewContext from '../context/GraphViewContext';
import { BoxDragLayer } from '../helpers/BoxDragLayer';
import { handleDrawingHotkey } from '../hooks/drawingHooks';
import { GraphContainer } from './GraphContainer';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../../editor/EditorComponent';
import TextButton from '../../../components/molecules/TextButton';

const Graph: React.FC<{ window: Window; document: Document }> = ({
	window,
	document,
}) => {
	if (!document || !window) return <div></div>;

	const router = useRouter();
	const { username, nodeId, graphViewId } = router.query;

	const { data, error, isLoading } = useSWR(
		nodeId ? `/api/${username}/${nodeId}/graph/${graphViewId}` : null,
		fetcher
	);

	let nodeData: { [key: string]: NodeData } = {};
	let visualData: { [key: string]: GraphNodeData } = {};

	if (!isLoading) {
		console.log('data');
		console.log(data);
		for (let node in data) {
			let nodeConnections: { [key: string]: ConnectionData } = {};
			for (let connection in data[node].connections) {
				nodeConnections[data[node].connections[connection].endNode] = {
					...data[node].connections[connection],
					content: [],
				};
			}
			nodeData[data[node].node.id] = {
				...data[node].node,
				connections: nodeConnections,
			};

			visualData[data[node].node.id] = data[node].relationship;
		}
	}

	//Graph in view of one node, keep the id.
	const [nodeInFocus, setnodeInFocus] = useState(nodeId);
	const [nodeInFocus_Connections, setNodeInFocus_Connections] = useState<
		{ r: any; c: any }[]
	>([]);

	// get the connected nodes of seleced node
	useEffect(() => {
		console.log('nodeInFocus');
		console.log(nodeInFocus);
		if (nodeInFocus)
			fetch(`/api/${username}/${nodeInFocus}`)
				.then((res) => res.json())
				.then((json) => {
					console.log('connected Nodes');
					console.log(json);
					setNodeInFocus_Connections(json);
				});
	}, [nodeInFocus]);

	// // set NodeId once it changes
	useEffect(() => {
		console.log('nodeId updated' + nodeId);
		setnodeInFocus(nodeId);
	}, [nodeId]);

	// node data
	const [nodeData_Graph, setnodeData_Graph] = useState(
		// getNodesToDisplay(nodeInFocus, allNodes)
		nodeData
	);

	// nodeVisualData_Graph is
	const [nodeVisualData_Graph, setnodeVisualData_Graph] =
		useState(visualData);

	console.log('nodeData_Graph');
	console.log(nodeData_Graph);
	console.log('nodeVisualData_Graph');
	console.log(nodeVisualData_Graph);

	useEffect(() => {
		setnodeData_Graph(nodeData);
		setnodeVisualData_Graph(visualData);
	}, [isLoading]);

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
	// const [currConnection, setCurrConnection] = useState(lines[0]);

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
						setnodeInFocus: setnodeInFocus,
						nodeData_Graph: nodeData_Graph,
						setnodeData_Graph: setnodeData_Graph,
						nodeVisualData_Graph: nodeVisualData_Graph,
						setnodeVisualData_Graph: setnodeVisualData_Graph,
						modalNode: modalNode,
						setModalNode: setModalNode,
						nodeInFocus: nodeInFocus ? (nodeInFocus as string) : '',
						graphViewId: graphViewId as string,
						username: username as string,
						nodeId: nodeId as string,
					}}
				>
					<SplitPane className='split-pane-row'>
						<SplitPaneLeft>
							<GraphContainer
								window={window}
								document={document}
							/>
							<BoxDragLayer parentRef={containerRef} />
						</SplitPaneLeft>
						<Divider className='separator-col' />
						<SplitPaneRight>
							{/* Get all connections to the main node, check if they aren't displayed on graph, and add a button to add them to this graph */}
							{nodeInFocus_Connections
								? nodeInFocus_Connections.map((el) => (
										<TextButton
											text={el.c.title}
											onClick={() => {
												router.push(
													`/${username}/${el.c.id}/document`,
													undefined,
													{ shallow: true }
												);
											}}
										/>
								  ))
								: null}
							<EditorComponent />
						</SplitPaneRight>
					</SplitPane>
				</GraphViewContext.Provider>
			</DrawingContext.Provider>
		</div>
	);
};

export default Graph;
