/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useContext, useEffect, useRef, useState } from 'react';

import { Divider, getNode } from '@udecode/plate';
import useSWR from 'swr';
import { fetcher } from '../../../backend/driver/fetcher';
import ViewContext, {
	ViewContextInterface,
} from '../../../components/context/ViewContext';
import { Alert } from '../../../components/organisms/Alert';
import SearchBar from '../../../components/organisms/SearchBar';
import GraphSideTabs from '../../../components/organisms/Tabs/GraphSideTabs';
import SplitPane, {
	SplitPaneLeft,
	SplitPaneRight,
} from '../../../components/organisms/split-pane/SplitPane';
import { getTags } from '../../../helpers/backend/gettersConnectionInfo';
import DrawingContext from '../context/GraphDrawingContext';
import GraphViewContext from '../context/GraphViewContext';
import { ConnectionData, GraphNodeData, NodeData } from '../graphTypes';
import { useHistoryState } from '../hooks/useHistoryState';
import { GraphContainer } from './GraphContainer';
import TextButton from '../../../components/molecules/TextButton';
import { getNodeData } from '../../../backend/functions/node/query/getNodeData';

const Graph: React.FC<{
	viewId: string;
}> = ({ viewId }) => {
	const { documentVar, windowVar } = useContext(
		ViewContext
	) as ViewContextInterface;
	let document = documentVar;
	let window = windowVar;
	if (!document || !window) return <div></div>;

	const { nodeId, username } = useContext(
		ViewContext
	) as ViewContextInterface;

	const { data, error, isLoading } = useSWR(
		nodeId ? `/api/${username}/${nodeId}/graph/${viewId}` : null,
		fetcher
	);

	let nodeData: { [key: string]: NodeData } = {};
	let visualData: { [key: string]: GraphNodeData } = {};
	// node data
	const [nodeData_Graph, setnodeData_Graph] = useState(nodeData);
	const [nodeVisualData_Graph, setnodeVisualData_Graph] =
		useState(visualData);

	useEffect(() => {
		if (nodeId) {
			fetch(`/api/${username}/${nodeId}/graph/${viewId}`)
				.then((res) => res.json())
				.then((data) => {
					// console.log('node info' + JSON.stringify(data));
					for (let node in data) {
						let nodeConnections: { [key: string]: ConnectionData } =
							{};
						for (let connection in data[node].connections) {
							nodeConnections[
								data[node].connections[connection].endNode
							] = {
								...data[node].connections[connection],
								content: [],
							};
						}
						nodeData[data[node].node.id] = {
							...data[node].node,
							connections: nodeConnections,
							icon: 'block',
							color: 'black',
						};

						visualData[data[node].node.id] =
							data[node].relationship;
					}
				});
			setnodeData_Graph(nodeData);
			setnodeVisualData_Graph(visualData);
			console.log('nodes ' + JSON.stringify(nodeData));
		}
	}, [nodeId]);

	//History
	const { addAction, undo, redo, history, pointer } = useHistoryState(
		nodeData_Graph,
		setnodeData_Graph,
		nodeVisualData_Graph,
		setnodeVisualData_Graph
	);

	console.log('history: ', pointer);
	console.log(history.current);

	//Graph in view of one node, keep the id.
	const [nodeInFocusId, setnodeInFocusId] = useState(nodeId);
	const [nodeInFocus_data, setnodeInFocus_data] = useState<{
		n: any;
		connectedNodes: any[];
	}>({ n: {}, connectedNodes: [] });

	// get the connected nodes of seleced node
	useEffect(() => {
		console.log('nodeInFocus');
		console.log(nodeInFocusId);

		if (nodeInFocusId)
			// setnodeInFocus_data(getNodeData(nodeId, username)[0]);
			fetch(`/api/${username}/${nodeInFocusId}`)
				.then((res) => res.json())
				.then((json) => {
					console.log('connected Nodes');
					console.log(json);
					setnodeInFocus_data(json[0]);
				});
		if (nodeInFocusId) console.log(getNodeData(nodeId, username));
	}, [nodeInFocusId]);

	// // set NodeId once it changes
	useEffect(() => {
		console.log('nodeId updated' + nodeId);
		setnodeInFocusId(nodeId);
	}, [nodeId]);
	// const [currGraphViewId, setCurrGraphViewId] = useState(viewId);
	const [currGraphViewId, setCurrGraphViewId] = useState(viewId);

	//Drawing states
	const containerRef = useRef<HTMLDivElement>(null);
	const [drawingMode, setDrawingMode] = useState(true);
	const [isDrawing, setIsDrawing] = useState<boolean>(false);

	//Drawing line data
	const startNode = useRef<string>('');
	const endNode = useRef<string>('');

	//Line functions for detecting arrows
	let isPointInCanvasFuncs = useRef<any>({});
	let numPointsInTriangleFuncs = useRef<any>({});

	const [modalNode, setModalNode] = useState('');
	const [showModalConnection, setShowModalConnection] = useState(false);

	// Hot key for undo/redo
	// useEffect(() => {
	//   const listenerFunc = (evt: any) => {
	//     evt.stopImmediatePropagation();
	//     if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey) && evt.shiftKey) {
	//       // redo();
	//     } else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
	//       // undo();
	//     }
	//   };
	//   document.addEventListener('keydown', (event) => listenerFunc(event));
	//   return document.removeEventListener('keydown', (event) =>
	//     listenerFunc(event)
	//   );
	// }, []);

	//graph view tags default
	const [tags, setTags] = useState(getTags(nodeData_Graph));

	//alert message
	const [alert, setAlert] = useState('');

	const [showSearchBar, setShowSearchBar] = useState(false);

	return (
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
					setnodeInFocusId: setnodeInFocusId,
					nodeData_Graph: nodeData_Graph,
					setnodeData_Graph: setnodeData_Graph,
					nodeVisualData_Graph: nodeVisualData_Graph,
					setnodeVisualData_Graph: setnodeVisualData_Graph,
					modalNode: modalNode,
					setModalNode: setModalNode,
					nodeInFocusId: nodeInFocusId,
					graphViewId: currGraphViewId as string,
					setGraphViewId: setCurrGraphViewId,
					tags: tags,
					setTags: setTags,
					alert: alert,
					setAlert: setAlert,
					showSearchBar: showSearchBar,
					setShowSearchBar: setShowSearchBar,
					addAction: addAction,
					undo: undo,
					redo: redo,
					history: history,
					pointer: pointer,
				}}
			>
				<SplitPane className='split-pane-row'>
					<SplitPaneLeft>
						<div
							// onKeyDown={(event) =>
							// 	handleDrawingHotkey(event, drawingMode, setDrawingMode)
							// }
							tabIndex={-1}
							ref={containerRef}
							// className='relative'
						>
							<GraphContainer />
							<Alert />
							{showSearchBar && <SearchBar />}
							{showSearchBar && (
								<div
									onClick={() => setShowSearchBar(false)}
									className='absolute w-screen h-screen bg-black top-0 left-0 opacity-30'
								></div>
							)}
						</div>
						{/* <BoxDragLayer parentRef={containerRef} /> */}
					</SplitPaneLeft>
					<Divider className='separator-col' />
					<SplitPaneRight>
						{/* <TextButton
							text='Show search bar'
							onClick={() => setShowSearchBar(true)}
						/> */}
						<GraphSideTabs nodeInFocus_data={nodeInFocus_data} />
					</SplitPaneRight>
				</SplitPane>
			</GraphViewContext.Provider>
		</DrawingContext.Provider>
	);
};

export default Graph;
