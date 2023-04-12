/**
 * Context for the Actions that can be done in the graph: dragging, resizing, undo/redo, zooming, spanning, etc.
 */

import { createContext, MutableRefObject } from 'react';

export type GraphActionContextInterface = {
  hideSourceOnDrag: boolean; //for dragging

  canDrag: boolean; //whether dragging can be done by the user, disabled on draw and on resize
  setCanDrag: (val: boolean) => void;
  parentRef: MutableRefObject<HTMLDivElement | null>; //Ref of scrollable div for spanning purposes (unimplemented)
  // addAction: (val: Action) => void; //Function that adds a given action to the history stack for undo/redo
};

const GraphActionContext = createContext<GraphActionContextInterface | null>(
  null
);

export default GraphActionContext;
