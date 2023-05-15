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
  console.log('node ID ' + nodeId);
  return (
    <div>
      <Tabs>
        {mainViewTabs.map((tab, index) => {
          return (
            <div key={index}>
              <Link
                href={{
                  pathname: '/' + username + '/' + nodeId,
                  query: {
                    view: tab.viewType,
                    viewId: tab.viewId,
                  },
                }}
              >
                <Tab
                  label={tab.label}
                  selected={mainViewTabs[currTab].viewId === tab.viewId}
                  index={index}
                  currTab={currTab}
                  setCurrTab={setCurrTab}
                  tabs={mainViewTabs}
                  setTabs={setMainViewTabs}
                />
              </Link>
            </div>
          );
        })}
      </Tabs>
      {mainViewTabs.map((tab, i) => {
        return (
          <div
            key={i}
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
