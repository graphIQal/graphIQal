/**
 * Context for everything that is displayed in the Graph.
 */

import { createContext, MutableRefObject } from 'react';
import {
  ConnectionData,
  GraphNodeData,
  Node,
  NodeData,
  VisualData,
} from '../../../schemas/Data_structures/DS_schema';
import { LineRefs } from '../graphTypes';

export type GraphViewContextInterface = {
  lines: LineRefs[]; //lines displayed in graph
  setLines: (val: LineRefs[]) => void;
  nodeInView: string; //ID of "centered" node (shows only its connections and relevant data), 'homenode' if no centered node
  setNodeInView: (val: string) => void;
  nodesDisplayed: { [key: string]: NodeData }; //The data of the nodes that are shown on the screen
  setNodesDisplayed: (val: { [key: string]: NodeData }) => void;

  nodesVisual: { [key: string]: GraphNodeData };
  setNodesVisual: (val: { [key: string]: GraphNodeData }) => void;
  modalNode: string; //The node that will show in the popup modal
  setModalNode: (val: string) => void;
  username: string | string[] | undefined;
  nodeId: string | string[] | undefined;
  graphViewId: string | string[] | undefined;
};

const GraphViewContext = createContext<GraphViewContextInterface | null>(null);

export default GraphViewContext;
