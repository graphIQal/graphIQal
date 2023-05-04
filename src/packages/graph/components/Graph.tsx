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
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../../backend/driver/fetcher';
import {
  ConnectionData,
  GraphNodeData,
  NodeData,
} from '../../../schemas/Data_structures/DS_schema';

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
      nodeData[data[node].node.id] = data[node].node;
      visualData[data[node].node.id] = data[node].relationship;
    }
  }

  //Graph in view of one node
  const [nodeInView, setNodeInView] = useState('homenode');
  //Data of nodes to display (comes from Connection information between each node and the node in view)

  // node data
  const [nodeData_Graph, setnodeData_Graph] = useState(
    // getNodesToDisplay(nodeInView, allNodes)
    nodeData
  );

  // nodeVisualData_Graph is
  const [nodeVisualData_Graph, setnodeVisualData_Graph] = useState(visualData);

  console.log('nodeData_Graph');
  console.log(nodeData_Graph);
  console.log('nodeVisualData_Graph');
  console.log(nodeVisualData_Graph);

  useEffect(() => {
    setnodeData_Graph(nodeData);
    setnodeVisualData_Graph(visualData);
  }, [isLoading]);

  // useEffect(() => {
  //   setLines(getLines(nodeData_Graph, allNodes));
  // }, [nodeData_Graph, allNodes]);

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
      if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey) && evt.shiftKey) {
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
            setNodeInView: setNodeInView,
            nodeData_Graph: nodeData_Graph,
            setnodeData_Graph: setnodeData_Graph,
            nodeVisualData_Graph: nodeVisualData_Graph,
            setnodeVisualData_Graph: setnodeVisualData_Graph,
            modalNode: modalNode,
            setModalNode: setModalNode,
            nodeInView: nodeInView,
            graphViewId: graphViewId as string,
            username: username as string,
            nodeId: nodeId as string,
          }}
        >
          <GraphContainer window={window} document={document} />
          <BoxDragLayer parentRef={containerRef} />
        </GraphViewContext.Provider>
      </DrawingContext.Provider>
    </div>
  );
};

export default Graph;
