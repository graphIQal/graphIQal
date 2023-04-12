import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GraphViewElement } from '../../../gql/graphql';
import {
  getNodesToDisplay,
  getNodesToDisplayGraph,
} from '../../../helpers/backend/dataHelpers';
import { CreateNode, GetNodes } from '../../../helpers/backend/nodeHelpers';
import DrawingContext from '../DrawingContext';
import GraphActionContext from '../GraphActionContext';
import { LineRefs } from '../graphTypes';
import GraphViewContext from '../GraphViewContext';
import { BoxDragLayer } from '../helpers/BoxDragLayer';
import { handleDrawingHotkey } from '../helpers/drawing';
import { Action, useHistoryState } from '../hooks/useHistoryState';
import { GraphContainer } from './GraphContainer';

const Graph: React.FC = () => {
  //Graph in view of one node
  const [nodeInView, setNodeInView] = useState('arraylist');
  //Data of nodes to display
  const [nodesDisplayed, setNodesDisplayed] = useState(
    getNodesToDisplay(nodeInView)
  );
  //Visual attributes of nodes to display
  const [nodesVisual, setNodesVisual] = useState(
    getNodesToDisplayGraph(nodeInView)
  );

  useEffect(() => {
    setNodesDisplayed(getNodesToDisplay(nodeInView));
    setNodesVisual(getNodesToDisplayGraph(nodeInView));
  }, [nodeInView]);

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

  //Drawing line data
  const startNode = useRef<string>('');
  const endNode = useRef<string>('');

  //History
  const [history, setHistory] = useState<Action[]>([]);
  const [pointer, setPointer] = useState<number>(-1);
  // const { addAction, undo, redo } = useHistoryState(nodes, setNodes, setLines);

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
            createNode,
            startNode: startNode,
            endNode: endNode,
            isPointInCanvasFuncs: isPointInCanvasFuncs,
            numPointsInTriangleFuncs: numPointsInTriangleFuncs,
            drawingMode: drawingMode,
            setDrawingMode: setDrawingMode,
          }}
        >
          <GraphActionContext.Provider
            value={{
              hideSourceOnDrag: true,

              canDrag: canDrag,
              setCanDrag: setCanDrag,
              parentRef: containerRef,

              // addAction: addAction,
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
              }}
            >
              <GraphContainer />
              <BoxDragLayer parentRef={containerRef} />
            </GraphViewContext.Provider>
          </GraphActionContext.Provider>
        </DrawingContext.Provider>
      </div>
    </DndProvider>
  );
};
export default Graph;
