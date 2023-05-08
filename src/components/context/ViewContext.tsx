/**
 * Context for everything that is displayed in the Graph.
 */

import { createContext, MutableRefObject } from 'react';

export type MainTabProps = {
  label: string;
  viewId: string;
  viewType: 'document' | 'graph';
  component: any;
};

export type ViewContextInterface = {
  mainViewTabs: MainTabProps[];
  setMainViewTabs: (val: MainTabProps[]) => void;
  // sidePanelTabs: TabProps[];
  // setSidePanelTabs: (val: TabProps[]) => void;
  username: string;
  nodeId: string;
};

const ViewContext = createContext<ViewContextInterface | null>(null);

export default ViewContext;
