import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { GraphViewElement } from '../../../gql/graphql';
import { CreateNode, GetNodes } from '../../../helpers/backend/nodeHelpers';
import GraphContext from '../GraphContext';
import { LineRefs } from '../graphTypes';
import { BoxDragLayer } from '../helpers/BoxDragLayer';
import { updateSizeCallback } from '../helpers/resizing';
import { GraphContainer } from './GraphContainer';

const Graph: React.FC = () => {
  //DB stuff
  const createNode = CreateNode();
  const [nodesList, setNodesList] = useState(GetNodes(true).data?.nodeData);

  //Drawing/dragging states
  const containerRef = useRef(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [canDrag, setCanDrag] = useState(false);

  //Mock node data
  const [nodes, setNodes] = useState<{ [key: string]: GraphViewElement }>({
    // a: { id: 'a', graphNode: { index: 0, x: 80, y: 20, size: [100, 100] } },
    // b: { id: 'b', graphNode: { index: 0, x: 400, y: 20, size: [100, 100] } },
  });

  //Mock line data
  const [lines, setLines] = useState<LineRefs[]>([
    // { start: Object.values(nodes)[0].id, end: Object.values(nodes)[1].id },
  ]);

  //Resize function called by components
  const updateSize = useCallback(
    (id: number | string, width: number, height: number, tag?: string) => {
      updateSizeCallback(id, width, height, nodes, setNodes, tag);
    },
    [nodes, setNodes]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-screen h-screen overflow-scroll' ref={containerRef}>
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
