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

const MainTabs: React.FC<{
  router: Router;
  tabs: TabProps[];
  setTabs: (val: TabProps[]) => void;
  currTab: number;
  setCurrTab: (val: number) => void;
}> = ({ tabs, setTabs, router, currTab, setCurrTab }) => {
  const { username, nodeId } = useContext(TabContext) as TabContextInterface;
  // const route = '/' + username + '/' + nodeId + '/graph/' + graphViewId;
  const route = '';
  // const [activeTab, setActiveTab] = useState(0);
  const [lastActiveTab, setLastActiveTab] = useState(0);

  return (
    <TabsContainer>
      {tabs.map((tab, index) => {
        return (
          <Link
            href={{
              pathname: '/' + username + '/' + nodeId,
              query: { view: tab.viewType, viewId: tab.viewId },
            }}
          >
            <Tab
              label={tab.label}
              selected={tabs[currTab].viewId === tab.viewId}
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
          </Link>
        );
      })}
    </TabsContainer>
  );
};
export default withRouter(MainTabs);
