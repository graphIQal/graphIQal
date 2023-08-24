/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useRef, useState } from 'react';

import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../../backend/driver/fetcher';
import { useViewData } from '../../../components/context/ViewContext';
import { Alert } from '../../../components/organisms/Alert';
import SearchBar from '../../../components/organisms/SearchBar';
import GraphSideTabs from '../../../components/organisms/Tabs/GraphSideTabs';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../../components/organisms/split-pane/SplitPane';
import DrawingContext from '../context/GraphDrawingContext';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';
import { ConnectionData, GraphNodeData, NodeData } from '../graphTypes';
import { useFiltering } from '../hooks/useFiltering';
import { Filtering } from './Filtering';
import { GraphContainer } from './GraphContainer';

const GraphSplitPaneWrapper: React.FC<{
	viewId: string;
	barComponents: { [key: string]: JSX.Element };
}> = ({ viewId, barComponents }) => {
	// console.log('rerendering graph pane wrapper');

	const { nodeId, username, documentVar, windowVar } = useViewData();
	const { nodeInFocusId } = useGraphViewData();
	const {
		changeNodeInFocusId,
		changeNodeData_Graph,
		changeVisualData_Graph,
		changeGraphViewId,
		changeAlert,
		changeHistory,
		setHistoryFunctions,
	} = useGraphViewAPI();

	let document = documentVar;
	let window = windowVar;

	if (!document || !window) return <div></div>;

	//Graph in view of one node, keep the id.

	useEffect(() => {
		changeNodeInFocusId(nodeId);
	}, []);

	const [nodeInFocus_data, setnodeInFocus_data] = useState<{
		n: any;
		connectedNodes: any[];
	}>({ n: {}, connectedNodes: [] });

	const {
		data,
		// error: nodeError,
		// isLoading: nodeDataLoading,
	} = useSWR(
		[
			viewId && nodeId
				? `/api/${username}/${nodeId}/graph/${viewId}`
				: null,
		],
		fetcher
	);

	const { data: nodeInFocusData } = useSWR(
		[nodeInFocusId ? `/api/${username}/${nodeInFocusId}` : null],
		fetcher
	);

	useEffect(() => {
		// let nodeData = {} as { [key: string]: NodeData };
		// let visualData = {} as { [key: string]: GraphNodeData };
		console.log('data graph');
		console.log(data);

		if (!data) return;

		changeNodeData_Graph(data.nodeData);
		changeVisualData_Graph(data.visualData);
	}, [data]);

	useEffect(() => {
		if (nodeInFocusData) {
			setnodeInFocus_data(nodeInFocusData[0]);
		}
	}, [nodeInFocusData]);

	// set NodeId once it changes
	useEffect(() => {
		changeNodeInFocusId(nodeId);
	}, [nodeId]);

	useEffect(() => {
		changeGraphViewId(viewId);
	}, [viewId]);

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

	//graph view tags default
	// const [tags, setTags] = useState<any>([
	//   {
	//     id: 'f3403c06-c449-4c3e-b376-a8f1d38a961d',
	//     title: 'Homework',
	//     icon: 'block',
	//     color: 'blue',
	//     connections: {
	//       'cce198e8-6c92-44e5-a7b7-7f1a4d75ba18': {
	//         content: [],
	//         startNode: 'f3403c06-c449-4c3e-b376-a8f1d38a961d',
	//         endNode: 'cce198e8-6c92-44e5-a7b7-7f1a4d75ba18',
	//         type: 'HAS',
	//       },
	//     },
	//   },
	// ]);
	// getCommonParents(Object.keys(nodeData_Graph)).then((res) => {
	//   console.log('common parents ', res);
	// });

	//Pill menu information for centered node
	const {
		xCategory,
		yCategory,
		getDropdownItemsX,
		getDropdownItemsY,
		getDropdownItems,
	} = useFiltering();

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
			<SplitPane className='split-pane-row '>
				<SplitPaneLeft>
					<div
						className='outline-none border-none'
						tabIndex={-1}
						ref={containerRef}
					>
						<div className='w-full flex flex-row justify-between align-center items-center'>
							<Filtering
								xCategory={xCategory}
								yCategory={yCategory}
								getDropdownItems={getDropdownItems}
								getDropdownItemsX={getDropdownItemsX}
								getDropdownItemsY={getDropdownItemsY}
							/>
							<div className='flex flex-row justify-end align-middle items-center'>
								{barComponents.settings}
								{barComponents.favourite}
							</div>
						</div>
						<GraphContainer />
						<SearchBar />
						<Alert />
					</div>
					{/* <BoxDragLayer parentRef={containerRef} /> */}
				</SplitPaneLeft>
				<Divider className='separator-col' />
				<SplitPaneRight>
					<GraphSideTabs nodeInFocus_data={nodeInFocus_data} />
				</SplitPaneRight>
			</SplitPane>
		</DrawingContext.Provider>
	);
};

export default GraphSplitPaneWrapper;
