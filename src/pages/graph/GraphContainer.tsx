import { useCallback, useEffect, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import IconCircleButton from '../../components/molecules/IconCircleButton';
import { GraphViewElement } from '../../gql/graphql';
import { CreateNode, GetNodes } from '../../helpers/backend/nodeHelpers';
import { DragItemGraph } from './DragItemGraph';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';
import { useCanvas } from './useCanvas';

export interface ContainerProps {
  hideSourceOnDrag: boolean;
}
export interface nodeState {
  top: number;
  left: number;
  title: string;
}
export interface ContainerState {
  nodes: { [key: string]: nodeState };
}

export const GraphContainer: React.FC<ContainerProps> = ({
  hideSourceOnDrag,
}) => {
  const createNode = CreateNode();
  const [nodesList, setNodesList] = useState(GetNodes(true).data?.nodeData);

  //canvas stuff
  const canvas = useRef<any>();
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  let ctx = null;
  const [
    coordinates,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
    lines,
    setLineAll,
  ] = useCanvas();

  useEffect(() => {
    const canvasEle = canvas.current;
    if (canvasEle) {
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
    }
  });

  //Handling drawing methods
  const handleStartPoint = (event: any) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    setLineAll([...lines, { start: currentCoord, end: currentCoord }]);

    //this staste call isn't happening before mousemove handler, so it's changing the previous one at length - 1
    document.addEventListener('mousemove', handleDrawing);
    document.addEventListener('mouseup', handleEndPoint);
  };

  const handleDrawing = (event: any) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    console.log('current moving ' + JSON.stringify(currentCoord));
    if (lines.length == 0) {
      return;
    }
    const nextLines = lines.map((e: any, i: number) => {
      if (i === lines.length - 1) {
        return { start: e.start, end: currentCoord };
      } else {
        return e;
      }
    });
    console.log('current updating ' + JSON.stringify(nextLines));

    setLineAll(nextLines);
  };

  const handleEndPoint = (event: any) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    console.log('current stopping ' + JSON.stringify(currentCoord));

    document.removeEventListener('mousemove', handleDrawing);
    document.removeEventListener('mouseup', handleEndPoint);
  };

  //Mock node data
  const [nodes, setNodes] = useState<{ [key: string]: GraphViewElement }>({
    a: { id: 'a', graphNode: { index: 0, x: 80, y: 20, size: [100, 100] } },
    b: { id: 'b', graphNode: { index: 0, x: 400, y: 20, size: [20, 100] } },
  });

  //When box is resized
  const updateSize = useCallback(
    (id: number, width: number, height: number) => {
      const newSize = [width, height];
      let newNodes: any = {};
      for (const node in nodes) {
        newNodes[node] = nodes[node];
      }
      newNodes[id].graphNode.size = newSize;
      setNodes(newNodes);
    },
    [nodes, setNodes]
  );

  //When box is dragged
  const moveNode = useCallback(
    (id: string, x: number, y: number) => {
      let newNodes: any = {};
      for (const node in nodes) {
        newNodes[node] = nodes[node];
      }
      newNodes[id].graphNode.x = x;
      newNodes[id].graphNode.y = y;
      setNodes(newNodes);
    },

    [nodes, setNodes]
  );

  //Handling drop event
  const [, drop] = useDrop(
    () => ({
      accept: 'node',
      drop(item: DragItemGraph, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveNode(item.id, left, top);
        return undefined;
      },
    }),
    [moveNode]
  );

  return (
    <div className='w-screen h-screen border-solid border relative' ref={drop}>
      <div className='absolute bottom-10 right-10'>
        <IconCircleButton onClick={createNode} />
      </div>
      {Object.values(nodes).map((node) => {
        return (
          <div>
            <GraphNode
              startDraw={handleStartPoint}
              key={node.id}
              left={node.graphNode?.x == undefined ? 0 : node.graphNode?.x}
              top={node.graphNode?.y == undefined ? 0 : node.graphNode?.y}
              hideSourceOnDrag={hideSourceOnDrag}
              id={node.id}
              size={
                node.graphNode?.size == undefined
                  ? [100, 100]
                  : node.graphNode.size
              }
              updateSize={updateSize}
              setLineAll={setLineAll}
              lines={lines}
              isDrawing={isDrawing}
              setIsDrawing={setIsDrawing}
            >
              <GraphEditor />
            </GraphNode>
          </div>
        );
      })}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        // onMouseDown={handleStartPoint}
        // onMouseUp={handleEndPoint}
      />
    </div>
  );
};
