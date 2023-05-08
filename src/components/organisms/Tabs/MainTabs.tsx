import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Tab } from '../../atoms/Tab';
import ViewContext, {
  MainTabProps,
  ViewContextInterface,
} from '../../context/ViewContext';
import { Tabs } from './Tabs';

const MainTabs: React.FC<{
  router: Router;
  tabs: MainTabProps[];
  setTabs: (val: MainTabProps[]) => void;
  currTab: number;
  setCurrTab: (val: number) => void;
}> = ({ tabs, setTabs, router, currTab, setCurrTab }) => {
  const { username, nodeId } = useContext(ViewContext) as ViewContextInterface;
  const [activeTabs, setActiveTabs] = useState([0]);

  return (
    <>
      <Tabs component={tabs[currTab]}>
        {tabs.map((tab, index) => {
          return (
            <Link
              href={{
                pathname: '/' + username + '/' + nodeId,
                query: { view: tab.viewType, viewId: tab.viewId },
              }}
              key={index}
            >
              <Tab
                label={tab.label}
                selected={tabs[currTab].viewId === tab.viewId}
                index={index}
                currTab={currTab}
                setCurrTab={setCurrTab}
                tabs={tabs}
                setTabs={setTabs}
                activeTabs={activeTabs}
                setActiveTabs={setActiveTabs}
              />
            </Link>
          );
        })}
      </Tabs>
    </>
  );
};
export default withRouter(MainTabs);
