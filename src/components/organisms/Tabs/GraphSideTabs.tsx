import React, { useContext, useState } from 'react';
import { Tab } from '../../atoms/Tab';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../../packages/graph/context/GraphViewContext';
import TabContext, {
  TabContextInterface,
  TabProps,
} from '../../context/TabContext';
import { Router, withRouter } from 'next/router';
import Link from 'next/link';
import { TabsContainer } from './TabsContainer';

export type SideTabProps = {
  label: string;
  viewType: 'connections' | 'content' | 'shelf';
};

const GraphSideTabs: React.FC<{
  tabs: SideTabProps[];
  setTabs: (val: SideTabProps[]) => void;
  currTab: number;
  setCurrTab: (val: number) => void;
}> = ({ tabs, setTabs, currTab, setCurrTab }) => {
  const [lastActiveTab, setLastActiveTab] = useState(0);

  return (
    <TabsContainer>
      {tabs.map((tab, index) => {
        return (
          <Tab
            label={tab.label}
            selected={index == currTab}
            onClick={() => {
              setCurrTab(index);
            }}
            onClose={() => {
              // if (activeTab == index) {
              // setActiveTab(lastActiveTab);
              // }
              setTabs(tabs.filter((tab, i) => i != index));
            }}
          />
        );
      })}
    </TabsContainer>
  );
};
export default GraphSideTabs;
