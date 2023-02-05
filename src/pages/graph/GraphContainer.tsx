import { useCallback, useEffect, useRef, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { DragItemGraph } from './DragItemGraph';
import { GraphNode } from './GraphNode2';
import update from 'immutability-helper';
import IconCircleButton from '../../components/molecules/IconCircleButton';
import { CreateNode, GetNodes } from '../../helpers/backend/nodeHelpers';
import EditorComponent from '../../packages/editor/EditorComponent';
import NodeCircle from '../../components/molecules/NodeCircle';
import GraphEditor from './GraphEditor';
import { offset, size } from '@udecode/plate';
import { ValidationContext } from 'graphql';
import { useCanvas } from './useCanvas';
import { xarrowPropsType, Xwrapper } from '../../packages/arrow_drawer';
import Xarrow from '../../packages/arrow_drawer/Xarrow/Xarrow';
import { GraphViewElement } from '../../gql/graphql';
import { GraphNode as GraphElement } from '../../gql/graphql';

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
  const [nodesList, setNodesList] = useState(GetNodes(true).data?.nodeData);
  // const [nodes, setNodes] = useState<{ [key: string]: nodeState }>({
  //   1: { top: 20, left: 80, title: 'Drag me around' },
  //   // 2: { top: 180, left: 20, title: 'Drag me too' },
  // });

  const [nodes, setNodes] = useState<{ [key: string]: GraphViewElement }>({
    a: { id: 'a', graphNode: { index: 0, x: 80, y: 20, size: [100, 100] } },
  });

  const updateSize = useCallback(
    (id: number, width: number, height: number) => {
      console.log('updating node ' + id + ' ' + width + ' ' + height);
      const newSize = [width, height];
      setNodes(
        update(nodes, {
          [id]: { graphNode: { $merge: { size: newSize } } },
        })
      );
    },
    [nodes, setNodes]
  );

  const moveNode = useCallback(
    (id: string, x: number, y: number) => {
      setNodes(
        update(nodes, {
          [id]: { graphNode: { $merge: { x, y } } },
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

  console.log(
    'objects ' + JSON.stringify(Object.keys(nodes).map((key) => nodes[key]))
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
              key={node.id}
              left={node.graphNode?.x == undefined ? 0 : node.graphNode?.x}
              top={node.graphNode?.y == undefined ? 0 : node.graphNode?.y}
              hideSourceOnDrag={hideSourceOnDrag}
              id={node.id}
              node={nodesList != undefined ? (nodesList as any)[node.id] : null}
              size={
                node.graphNode?.size == undefined
                  ? [100, 100]
                  : node.graphNode.size
              }
              updateSize={updateSize}
            >
              <GraphEditor />
            </GraphNode>
          </div>
        );
      })}
      {/* <canvas
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
                  <GraphEditor />
                </GraphNode>
                <Xarrow color='black' start='1' end='2' />
              </div>
            );
          })}
        </div>
      </Xwrapper> */}
    </div>
  );
};
