import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GraphViewElement } from '../../../gql/graphql';
import { getNodesToDisplay } from '../../../helpers/backend/dataHelpers';
import { CreateNode, GetNodes } from '../../../helpers/backend/nodeHelpers';
import GraphContext from '../GraphContext';
import { LineRefs } from '../graphTypes';
import { BoxDragLayer } from '../helpers/BoxDragLayer';
import { handleDrawingHotkey } from '../helpers/drawing';
import { updateSizeCallback } from '../helpers/resizing';
import { Action, useHistoryState } from '../hooks/useHistoryState';
import { GraphContainer } from './GraphContainer';

const Graph: React.FC = () => {
  //Graph in view of one node
  const [nodeInView, setNodeInView] = useState('arraylist');
  //get connections of current node in view
  const [nodesDisplayed, setNodesDisplayed] = useState(
    getNodesToDisplay(nodeInView)
  );

  useEffect(() => {
    setNodesDisplayed(getNodesToDisplay(nodeInView));
  }, [nodeInView]);

  //Mock node data
  const [nodes, setNodes] = useState<{ [key: string]: GraphViewElement }>({
    // a: { id: 'a', graphNode: { index: 0, x: 80, y: 20, size: [100, 100] } },
    // b: { id: 'b', graphNode: { index: 0, x: 400, y: 20, size: [100, 100] } },
  });

  //Mock line data
  const [lines, setLines] = useState<LineRefs[]>([
    // { start: Object.values(nodes)[0].id, end: Object.values(nodes)[1].id },
  ]);

  //DB stuff
  const createNode = CreateNode();
  const [nodesList, setNodesList] = useState(GetNodes(true).data?.nodeData);

  //Drawing/dragging states
  const containerRef = useRef(null);
  const [drawingMode, setDrawingMode] = useState(true);

  const [canDrag, setCanDrag] = useState(false);

  //Resize function called by components
  const updateSize = useCallback(
    (id: number | string, width: number, height: number, tag?: string) => {
      updateSizeCallback(id, width, height, nodes, setNodes, addAction, tag);
    },
    [nodes, setNodes]
  );

  //Drawing line data
  const startNode = useRef<string>('');
  const endNode = useRef<string>('');

  //History
  const [history, setHistory] = useState<Action[]>([]);
  const [pointer, setPointer] = useState<number>(-1);
  const { addAction, undo, redo } = useHistoryState(nodes, setNodes, setLines);

  //Line functions
  let isPointInCanvasFuncs = useRef<any>({});
  let numPointsInTriangleFuncs = useRef<any>({});

  //Modal to show node details and connection details
  const [modalNode, setModalNode] = useState('');

  const [showModalConnection, setShowModalConnection] = useState(false);
  const [currConnection, setCurrConnection] = useState(lines[0]);

  useEffect(() => {
    const listenerFunc = (evt: any) => {
      evt.stopImmediatePropagation();
      if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey) && evt.shiftKey) {
        redo();
      } else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
        undo();
      }
    };
    document.addEventListener('keydown', (event) => listenerFunc(event));
    return document.removeEventListener('keydown', (event) =>
      listenerFunc(event)
    );
  }, []);

  useEffect(() => {
    console.log('nodes ' + JSON.stringify(nodesDisplayed));
  }, [nodesDisplayed]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        onKeyDown={(event) =>
          handleDrawingHotkey(event, drawingMode, setDrawingMode)
        }
        tabIndex={-1}
        ref={containerRef}
      >
        <GraphContext.Provider
          value={{
            hideSourceOnDrag: true,
            drawingMode: drawingMode,
            setDrawingMode: setDrawingMode,
            canDrag: canDrag,
            setCanDrag: setCanDrag,
            parentRef: containerRef,
            nodes: nodes,
            setNodes: setNodes,
            lines,
            setLines,
            updateSize,
            createNode,
            startNode: startNode,
            endNode: endNode,
            addAction: addAction,
            isPointInCanvasFuncs: isPointInCanvasFuncs,
            numPointsInTriangleFuncs: numPointsInTriangleFuncs,
            nodeInView: nodeInView,
            setNodeInView: setNodeInView,
            nodesDisplayed: nodesDisplayed,
            setNodesDisplayed: setNodesDisplayed,
            modalNode: modalNode,
            setModalNode: setModalNode,
          }}
        >
          <GraphContainer />
          <BoxDragLayer parentRef={containerRef} />
        </GraphContext.Provider>
      </div>
    </DndProvider>
  );
};
export default Graph;
