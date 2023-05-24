/**
 * Context for common info across a state of the app.
 */

import { createContext } from 'react';
import { getNodeData_type } from '../../backend/functions/node/query/getNodeData';

export type ViewContextInterface = {
  username: string;
  nodeId: string;
  setNodeId: (val: string) => void;
  currNode_data: getNodeData_type;
  setcurrNode_data: (val: getNodeData_type) => void;
  currTab: number;
  setCurrTab: (val: number) => void;
  windowVar: Window;
  documentVar: Document;
};

const ViewContext = createContext<ViewContextInterface | null>(null);

export default ViewContext;
