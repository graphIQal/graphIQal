import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Tab from '../../atoms/Tab';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import { Tabs } from './Tabs';

type MainTabsProps = {
  mainViewTabs: MainTabProps[];
  setMainViewTabs: (val: MainTabProps[]) => void;
  router: Router;
};

export type MainTabProps = {
  label: string;
  viewId: string;
  viewType: 'document' | 'graph';
  component?: any;
};
const MainTabs: React.FC<MainTabsProps> = ({
  router,
  mainViewTabs,
  setMainViewTabs,
}) => {
  const { username, nodeId, currTab, setCurrTab } = useContext(
    ViewContext
  ) as ViewContextInterface;

  useEffect(() => {
    if (!router.query.tab) return;
    setCurrTab(parseInt(router.query.tab as string));
  }, [router.query.tab]);

  useEffect(() => {
    // if (router.query.tab) return;
    if (!username) return;
    if (mainViewTabs.length == 0) return;
    router.push(
      {
        pathname: '/' + username + '/' + nodeId,
        query: {
          view: mainViewTabs[0].viewType,
          viewId: mainViewTabs[0].viewId,
          tab: 0,
        },
      },
      undefined,
      { shallow: true }
    );
  }, [nodeId, mainViewTabs]);

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
                    tab: index,
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
                  onClick={() => null}
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
