/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useContext, useEffect, useRef, useState } from 'react';

import { getCommonParents } from '../../../backend/functions/general/getCommonParents';
import { Alert } from '../../../components/organisms/Alert';
import GraphSideTabs from '../../../components/organisms/Tabs/GraphSideTabs';
import SplitPane, {
  SplitPaneLeft,
  SplitPaneRight,
  Divider,
} from '../../../components/organisms/split-pane/SplitPane';
import DrawingContext from '../context/GraphDrawingContext';
import { ConnectionData, GraphNodeData, NodeData } from '../graphTypes';
import { useHistoryState } from '../hooks/useHistoryState';
import { GraphContainer } from './GraphContainer';
import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../../backend/driver/fetcher';
import SearchBar from '../../../components/organisms/SearchBar';
import { useViewData } from '../../../components/context/ViewContext';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';
import { Loading } from '../../../components/layouts/Loading';
import { LoadingGraph } from '../../../components/layouts/LoadingGraph';

const GraphSplitPaneWrapper: React.FC<{
  viewId: string;
}> = ({ viewId }) => {
  console.log('rerendering graph pane wrapper');

  const { nodeId, username, documentVar, windowVar, currTab } = useViewData();
  const { nodeInFocusId, nodeVisualData_Graph } = useGraphViewData();
  const {
    changeNodeInFocusId,
    changeNodeData_Graph,
    changeVisualData_Graph,
    changeGraphViewId,
  } = useGraphViewAPI();

  let document = documentVar;
  let window = windowVar;

  if (!document || !window) return <div></div>;

  useEffect(() => {
    changeVisualData_Graph({ ...nodeVisualData_Graph });
  }, [currTab]);

  //Graph in view of one node, keep the id.

  useEffect(() => {
    changeNodeInFocusId(nodeId);
  }, []);

  const [nodeInFocus_data, setnodeInFocus_data] = useState<{
    n: any;
    connectedNodes: any[];
  }>({ n: {}, connectedNodes: [] });

  const { data, error, isLoading } = useSWR(
    [
      viewId && nodeId ? `/api/${username}/${nodeId}/graph/${viewId}` : null,
      nodeInFocusId ? `/api/${username}/${nodeInFocusId}` : null,
    ],
    fetcherAll
  );

  useEffect(() => {
    let nodeData = {} as { [key: string]: NodeData };
    let visualData = {} as { [key: string]: GraphNodeData };
    if (!data || !data[0]) return;
    for (let node in data[0]) {
      const nodeDataResponse = data[0];
      let nodeConnections: { [key: string]: ConnectionData } = {};
      for (let connection in nodeDataResponse[node].connections) {
        nodeConnections[
          nodeDataResponse[node].connections[connection].endNode
        ] = {
          ...nodeDataResponse[node].connections[connection],
          content: [],
        };
      }
      nodeData[nodeDataResponse[node].node.id] = {
        ...nodeDataResponse[node].node,
        connections: nodeConnections,
      };

      visualData[nodeDataResponse[node].node.id] =
        nodeDataResponse[node].relationship;
    }
    changeNodeData_Graph(nodeData);
    changeVisualData_Graph(visualData);
  }, [data && data[0]]);

  useEffect(() => {
    if (data && data[1]) {
      setnodeInFocus_data(data[1][0]);
    }
  }, [data && data[1]]);

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
            className='outline-none border-none h-full'
            tabIndex={-1}
            ref={containerRef}
          >
            <GraphContainer loadingNodes={isLoading} />

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
