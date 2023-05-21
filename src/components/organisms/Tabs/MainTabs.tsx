import Link from 'next/link';
import { Router, withRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
    showSearchBar,
    setShowSearchBar,
    windowVar,
  } = useContext(ViewContext) as ViewContextInterface;

  useEffect(() => {
    const listenerFunc = (evt: any) => {
      evt.stopImmediatePropagation();

      if (evt.code === 'KeyP' && (evt.ctrlKey || evt.metaKey)) {
        evt.preventDefault();
        setShowSearchBar(true);
      }
    };

    window.addEventListener('keydown', (event: any) => listenerFunc(event));
    return window.removeEventListener('keydown', (event: any) =>
      listenerFunc(event)
    );
  }, []);

  useEffect(() => {
    if (!router.query.tab) return;
    setCurrTab(parseInt(router.query.tab as string));
  }, [router.query.tab]);

  useEffect(() => {
    console.log('router info ' + JSON.stringify(router.query));
    // if (router.query.tab) return;
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
  }, [nodeId]);

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
