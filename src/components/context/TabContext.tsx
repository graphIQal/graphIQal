/**
 * Context for everything that is displayed in the Graph.
 */

import { createContext, MutableRefObject } from 'react';

export type TabProps = {
  label: string;
  viewId: string;
  viewType: 'document' | 'graph';
};

export type TabContextInterface = {
  mainViewTabs: TabProps[];
  setMainViewTabs: (val: TabProps[]) => void;
  // sidePanelTabs: TabProps[];
  // setSidePanelTabs: (val: TabProps[]) => void;
  username: string;
  nodeId: string;
};

const TabContext = createContext<TabContextInterface | null>(null);

export default TabContext;
