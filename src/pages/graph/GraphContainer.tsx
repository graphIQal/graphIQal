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
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  });

  const canvas = useRef<any>();
  let ctx = null;

  useEffect(() => {
    const canvasEle = canvas.current;
    if (canvasEle) {
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
    }
  });

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
      {Object.keys(nodes).map((key) => {
        const { left, top, title } = nodes[key] as {
          top: number;
          left: number;
          title: string;
        };
        return (
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
        );
      })}
    </div>
  );
};
