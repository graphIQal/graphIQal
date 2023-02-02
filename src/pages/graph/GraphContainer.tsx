import { useCallback, useEffect, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { DragItemGraph } from './DragItemGraph';
import { GraphNode } from './GraphNode';
import update from 'immutability-helper';
import IconCircleButton from '../../components/molecules/IconCircleButton';
import { CreateNode, GetNodes } from '../../helpers/backend/nodeHelpers';
import EditorComponent from '../../packages/editor/EditorComponent';
import NodeCircle from '../../components/molecules/NodeCircle';
import GraphEditor from './GraphEditor';
import { offset } from '@udecode/plate';
import { ValidationContext } from 'graphql';
import { useCanvas } from './useCanvas';
import { Xwrapper } from '../../packages/arrow_drawer';
import Xarrow from '../../packages/arrow_drawer/Xarrow/Xarrow';

/**
 * hemingway bridge:
 * - how can i combine start and endpoints into one object
 * - how can I disable dnd when pressing the border + give element the same canvas ref
 *    could i potentially put children inside the canvas eleemnt
 * -clean up
 * - maybe move ref for drop object up a level and assign null under some condition
 */
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
  const nodesList = GetNodes(true).data?.nodeData;
  const [nodes, setNodes] = useState<{ [key: string]: nodeState }>({
    1: { top: 20, left: 80, title: 'Drag me around' },
    2: { top: 180, left: 20, title: 'Drag me too' },
  });

  const [
    coordinates,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
    startPoints,
    setStartPoints,
    endPoints,
    setEndPoints,
  ] = useCanvas();

  const handleStartPoint = (event: any) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    setStartPoints([...startPoints, currentCoord]);
  };

  const handleEndPoint = (event: any) => {
    const currentCoord = { x: event.clientX, y: event.clientY };
    setEndPoints([...endPoints, currentCoord]);
  };

  const moveNode = useCallback(
    (id: string, left: number, top: number) => {
      setNodes(
        update(nodes, {
          [id]: { $merge: { left, top } },
        })
      );
    },
    [nodes, setNodes]
  );

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
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleStartPoint}
        onMouseUp={handleEndPoint}
      />
      <Xwrapper>
        <div className='z-40'>
          {Object.keys(nodes).map((key) => {
            const { left, top, title } = nodes[key] as {
              top: number;
              left: number;
              title: string;
            };
            return (
              <div>
                <GraphNode
                  key={key}
                  left={left}
                  top={top}
                  hideSourceOnDrag={hideSourceOnDrag}
                  id={key}
                >
                  {/* <NodeCircle children={title} /> */}
                  <GraphEditor />
                </GraphNode>
                <Xarrow color='black' start='1' end='2' />
              </div>
            );
          })}
        </div>
      </Xwrapper>
    </div>
  );
};
