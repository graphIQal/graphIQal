/**
 * Helpers for dragging nodes
 */
import { updateNode } from '../../../helpers/backend/mutateHelpers';
import { GraphViewContextInterface } from '../context/GraphViewContext';

//called when the node is dropped in a new place to update x and y values
export const moveNodeCallback = (
  id: string,
  x: number,
  y: number,
  context: GraphViewContextInterface | null
) => {
  updateNode('drag', { x: x, y: y }, id, context);
};
