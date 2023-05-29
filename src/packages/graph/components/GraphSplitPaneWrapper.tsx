/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useContext, useEffect, useRef, useState } from 'react';

import { getCommonParents } from '../../../backend/functions/general/getCommonParents';
import ViewContext, {
  ViewContextInterface,
} from '../../../components/context/ViewContext';
import { Alert } from '../../../components/organisms/Alert';
import GraphSideTabs from '../../../components/organisms/Tabs/GraphSideTabs';
import SplitPane, {
  SplitPaneLeft,
  SplitPaneRight,
  Divider,
} from '../../../components/organisms/split-pane/SplitPane';
import DrawingContext from '../context/GraphDrawingContext';
import GraphViewContext from '../context/GraphViewContext';
import { ConnectionData, GraphNodeData, NodeData } from '../graphTypes';
import { useHistoryState } from '../hooks/useHistoryState';
import { GraphContainer } from './GraphContainer';
import useSWR from 'swr';
import { fetcher } from '../../../backend/driver/fetcher';

const GraphSplitPaneWrapper: React.FC<{
  viewId: string;
}> = ({ viewId }) => {
  const { documentVar, windowVar } = useContext(
    ViewContext
  ) as ViewContextInterface;
  let document = documentVar;
  let window = windowVar;
  if (!document || !window) return <div></div>;

  const { nodeId, username } = useContext(ViewContext) as ViewContextInterface;

  // node data on screen
  let nodeData: { [key: string]: NodeData } = {};
  let visualData: { [key: string]: GraphNodeData } = {};

  const [nodeData_Graph, setnodeData_Graph] = useState(nodeData);
  const [nodeVisualData_Graph, setnodeVisualData_Graph] = useState(visualData);

  const {
    data: nodeDataResponse,
    error: nodeError,
    isLoading: nodeDataLoading,
  } = useSWR(
    viewId && nodeId ? `/api/${username}/${nodeId}/graph/${viewId}` : null,
    fetcher
  );

  useEffect(() => {
    if (!nodeDataResponse) return;
    for (let node in nodeDataResponse) {
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
    setnodeData_Graph(nodeData);
    setnodeVisualData_Graph(visualData);
  }, [nodeDataResponse]);

  //   console.log(nodeData_Graph);
  //   console.log('visualData');
  //   console.log(nodeVisualData_Graph);

  //alert message
  const [alert, setAlert] = useState('');

  //History
  const { addAction, undo, redo, history, pointer } = useHistoryState(
    nodeData_Graph,
    setnodeData_Graph,
    nodeVisualData_Graph,
    setnodeVisualData_Graph,
    setAlert
  );

  useEffect(() => {
    console.log('history: ', pointer);
    console.log(history.current);
  }, [history.current, pointer.current]);

  //Graph in view of one node, keep the id.
  const [nodeInFocusId, setnodeInFocusId] = useState(nodeId);
  const [nodeInFocus_data, setnodeInFocus_data] = useState<{
    n: any;
    connectedNodes: any[];
  }>({ n: {}, connectedNodes: [] });

  // get the connected nodes of seleced node
  const {
    data: nodeInFocusDataResponse,
    error: nodeInFocusError,
    isLoading: nodeInFocusLoading,
  } = useSWR(
    nodeInFocusId ? `/api/${username}/${nodeInFocusId}` : null,
    fetcher
  );

  useEffect(() => {
    if (nodeInFocusDataResponse) {
      setnodeInFocus_data(nodeInFocusDataResponse[0]);
    }
  }, [nodeInFocusDataResponse]);

  // set NodeId once it changes
  useEffect(() => {
    setnodeInFocusId(nodeId);
  }, [nodeId]);
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

  //graph view tags default
  const [tags, setTags] = useState(
    getCommonParents(Object.keys(nodeData_Graph))
  );

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
          nodeInFocusId: nodeInFocusId,
          graphViewId: currGraphViewId as string,
          setGraphViewId: setCurrGraphViewId,
          tags: tags,
          setTags: setTags,
          alert: alert,
          setAlert: setAlert,
          addAction: addAction,
          undo: undo,
          redo: redo,
          history: history,
          pointer: pointer,
        }}
      >
        <SplitPane className='split-pane-row '>
          <SplitPaneLeft>
            <div
              className='outline-none border-none'
              tabIndex={-1}
              ref={containerRef}
            >
              <GraphContainer />
              <Alert />
            </div>
            {/* <BoxDragLayer parentRef={containerRef} /> */}
          </SplitPaneLeft>
          <Divider className='separator-col' />
          <SplitPaneRight>
            <GraphSideTabs nodeInFocus_data={nodeInFocus_data} />
          </SplitPaneRight>
        </SplitPane>
      </GraphViewContext.Provider>
    </DrawingContext.Provider>
  );
};

export default GraphSplitPaneWrapper;
