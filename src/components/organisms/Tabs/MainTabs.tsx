import Link from 'next/link';
import { Router, useRouter, withRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Tab from '../../atoms/Tab';
import { Tabs } from './Tabs';
import { useViewAPI, useViewData } from '../../context/ViewContext';
import { useGetNodeData } from '../../../backend/functions/node/query/useGetNodeData';

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
  mainViewTabs,
  setMainViewTabs,
}) => {
  console.log('rerendering main tabs');
  const {
    changeWindowVar,
    changeDocumentVar,
    changeUsername,
    changeNodeId,
    changeNodeData,
    changeCurrTab,
  } = useViewAPI();

  const { currTab } = useViewData();

  useEffect(() => {
    changeWindowVar(window);
    changeDocumentVar(document);
  }, []);

  const router = useRouter();
  const { username, nodeId, tab } = router.query;

  useEffect(() => {
    if (!tab) return;
    changeCurrTab(parseInt(router.query.tab as string));
  }, [tab]);

  useEffect(() => {
    changeUsername(username as string);
  }, [username]);

  useEffect(() => {
    changeNodeId(nodeId as string);
    changeCurrTab(0);
  }, [nodeId]);

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

  const res = useGetNodeData(nodeId as string, username as string);

  useEffect(() => {
    if (res) {
      changeNodeData(res);
    }
  }, [res]);

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
                  setCurrTab={changeCurrTab}
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
