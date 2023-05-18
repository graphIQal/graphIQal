/**
 * Hook that returns the updateSize method that will be used on resize
 */
import { useCallback, useContext } from 'react';
import { updateNode } from '../../../helpers/backend/updateNode';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';

//When box is resized
export const useResize = () => {
  const context = useContext(GraphViewContext);
  const { nodeVisualData_Graph, setnodeVisualData_Graph } =
    context as GraphViewContextInterface;
  let updateSize = useCallback(
    (
      id: string,
      width: number,
      height: number,
      tag?: string,
      done?: boolean
    ) => {
      updateNode(
        'resize',
        { width: width, height: height, tag: tag, done: done },
        id,
        context
      );
    },
    [nodeVisualData_Graph, setnodeVisualData_Graph]
  );

  return updateSize;
};
