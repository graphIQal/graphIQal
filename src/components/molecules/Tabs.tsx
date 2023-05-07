import React, { useContext, useState } from 'react';
import { Tab } from '../atoms/Tab';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import TabContext, {
  TabContextInterface,
  TabProps,
} from '../context/TabContext';
import { Router, withRouter } from 'next/router';
import Link from 'next/link';

const Tabs: React.FC<{
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
    <div className='flex flex-row bg-blue-50 w-full'>
      {tabs.map((tab, index) => {
        return (
          <Link
            href={{
              pathname: '/' + username + '/' + nodeId + '/home',
              query: { viewId: tab.viewId },
            }}
          >
            <Tab
              pathname={route}
              label={tab.label}
              selected={tabs[currTab].viewId === tab.viewId}
              query={index}
              viewId={tab.viewId}
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
    </div>
  );
};
export default withRouter(Tabs);
