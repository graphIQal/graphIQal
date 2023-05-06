/**
 * Context for everything that is displayed in the Graph.
 */

import { createContext, MutableRefObject } from 'react';

export type TabProps = {
  label: string;
  children: any;
};

export type TabContextInterface = {
  mainViewTabs: TabProps[];
  setMainViewTabs: (val: TabProps[]) => void;
  sidePanelTabs: TabProps[];
  setSidePanelTabs: (val: TabProps[]) => void;
};

const TabContext = createContext<TabContextInterface | null>(null);

export default TabContext;
