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
  nodeInView: string; //ID of "centered" node (shows only its connections and relevant data), 'homenode' if no centered node
  setNodeInView: (val: string) => void;
  nodeData_Graph: { [key: string]: NodeData }; //The data of the nodes that are shown on the screen
  setnodeData_Graph: (val: { [key: string]: NodeData }) => void;

  nodeVisualData_Graph: { [key: string]: GraphNodeData };
  setnodeVisualData_Graph: (val: { [key: string]: GraphNodeData }) => void;
  modalNode: string; //The node that will show in the popup modal
  setModalNode: (val: string) => void;
  graphViewId: string;
  setGraphViewId: (val: string) => void;
};

const GraphViewContext = createContext<GraphViewContextInterface | null>(null);

export default GraphViewContext;
