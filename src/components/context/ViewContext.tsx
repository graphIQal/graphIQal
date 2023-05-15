/**
 * Context for common info across a state of the app.
 */

import { createContext, MutableRefObject } from 'react';
import { Action } from '../../packages/graph/hooks/useHistoryState';

export type MainTabProps = {
  label: string;
  viewId: string;
  viewType: 'document' | 'graph';
  component?: any;
};

export type ViewContextInterface = {
  mainViewTabs: MainTabProps[];
  setMainViewTabs: (val: MainTabProps[]) => void;
  username: string;
  nodeId: string;
  setNodeId: (val: string) => void;
  currTab: number;
  setCurrTab: (val: number) => void;
  windowVar: Window;
  documentVar: Document;
};

const ViewContext = createContext<ViewContextInterface | null>(null);

export default ViewContext;
