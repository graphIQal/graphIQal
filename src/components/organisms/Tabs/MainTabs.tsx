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
}> = ({ router }) => {
  const {
    username,
    nodeId,
    mainViewTabs,
    setMainViewTabs,
    currTab,
    setCurrTab,
  } = useContext(ViewContext) as ViewContextInterface;
  const [activeTabs, setActiveTabs] = useState([0]);

  return (
    <div>
      <Tabs>
        {mainViewTabs.map((tab, index) => {
          return (
            <>
              <Link
                href={{
                  pathname: '/' + username + '/' + nodeId,
                  query: { view: tab.viewType, viewId: tab.viewId },
                }}
                key={index}
              >
                <Tab
                  label={tab.label}
                  selected={mainViewTabs[currTab].viewId === tab.viewId}
                  index={index}
                  currTab={currTab}
                  setCurrTab={setCurrTab}
                  tabs={mainViewTabs}
                  setTabs={setMainViewTabs}
                  activeTabs={activeTabs}
                  setActiveTabs={setActiveTabs}
                />
              </Link>
            </>
          );
        })}
      </Tabs>
      {mainViewTabs.map((tab, i) => {
        return (
          <div
            style={{
              display:
                mainViewTabs[currTab].viewId === tab.viewId ? 'block' : 'none',
            }}
          >
            {tab.component}
          </div>
        );
      })}
    </div>
  );
};
export default withRouter(MainTabs);
