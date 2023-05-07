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

const Tabs: React.FC<{
  router: Router;
  tabs: TabProps[];
  setTabs: (val: TabProps[]) => void;
  currTab: number;
  setCurrTab: (val: number) => void;
}> = ({ tabs, setTabs, router, currTab, setCurrTab }) => {
  const {
    query: { activeTab },
  } = router;
  console.log('active ' + activeTab);

  const { username, nodeId } = useContext(TabContext) as TabContextInterface;
  // const route = '/' + username + '/' + nodeId + '/graph/' + graphViewId;
  const route = '';
  // const [activeTab, setActiveTab] = useState(0);
  const [lastActiveTab, setLastActiveTab] = useState(0);

  return (
    <div className='flex flex-row bg-blue-50 w-full'>
      {tabs.map((tab, index) => {
        return (
          <Tab
            pathname={route}
            label={tab.label}
            selected={currTab == index}
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
        );
      })}
    </div>
  );
};
export default withRouter(Tabs);
