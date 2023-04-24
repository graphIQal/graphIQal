/**
 * Hook that returns the updateSize method that will be used on resize
 */
import { useCallback, useContext } from 'react';
import { updateNode } from '../../../helpers/backend/mutateHelpers';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';

//When box is resized
export const useResize = () => {
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
