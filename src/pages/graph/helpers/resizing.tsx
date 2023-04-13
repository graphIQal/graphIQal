import { useCallback, useContext } from 'react';
import { GraphActionContextInterface } from '../GraphActionContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../GraphViewContext';
import { Action } from '../hooks/useHistoryState';
import { updateNode } from './nodeHelpers';

//When box is resized
export const useResize = () => {
  // const newSize = [width, height];
  // let newNodes: any = {};
  // for (const node in nodes) {
  //   newNodes[node] = nodes[node];
  // }
  // if (tag === 'top') {
  //   const newVal =
  //     newNodes[id].graphNode.y + newNodes[id].graphNode.size[1] - newSize[1];
  //   if (Number.isFinite(newVal)) {
  //     newNodes[id].graphNode.y = newVal;
  //   }
  // }
  // if (tag === 'left') {
  //   const newVal =
  //     newNodes[id].graphNode.x + newNodes[id].graphNode.size[0] - newSize[0];
  //   if (Number.isFinite(newVal)) newNodes[id].graphNode.x = newVal;
  // }
  // newNodes[id].graphNode.size = newSize;

  // setNodes(newNodes);
  const context = useContext(GraphViewContext);
  const { nodesVisual, setNodesVisual } = context as GraphViewContextInterface;

  let updateSize = useCallback(
    (id: number | string, width: number, height: number, tag?: string) => {
      updateNode(
        'resize',
        { width: width, height: height, tag: tag },
        id,
        context
      );
    },
    [nodesVisual, setNodesVisual]
  );

  return updateSize;
};
