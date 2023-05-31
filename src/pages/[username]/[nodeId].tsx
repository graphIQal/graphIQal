import React, { useContext, useEffect, useRef, useState } from 'react';
import MainTabs, {
  MainTabProps,
} from '../../components/organisms/Tabs/MainTabs';
import ViewContext from '../../components/context/ViewContext';
import { useRouter, withRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../backend/driver/fetcher';

import SearchBar from '../../components/organisms/SearchBar';
import Graph from '../../packages/graph/Graph';
import SplitPaneWrapper from '../../packages/dnd-editor/Document';
import {
  getNodeData_type,
  useGetNodeData,
} from '../../backend/functions/node/query/useGetNodeData';

const Home: React.FC = () => {
  const [windowVar, setWindow] = useState<any>();
  const [documentVar, setDocument] = useState<any>();
  useEffect(() => {
    setWindow(window);
    setDocument(document);
  });

  const router = useRouter();

  const { username, nodeId } = router.query;

  const [currNodeId, setCurrNodeId] = useState(nodeId as string);
  const [currNode_data, setcurrNode_data] = useState<getNodeData_type>({
    n: {},
    connectedNodes: [],
  });

  const { data, error, isLoading } = useSWR(
    [nodeId ? `/api/${username}/${nodeId}/document` : null],
    fetcherAll
  );

  // useEffect(() => {
  //   if (nodeId) {
  //     fetch(`/api/${username}/${nodeId}/document`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data) {
  //           let includedIDs: { [key: string]: boolean } = {};
  //           data.map((record: any, index: number) => {
  //             if (!includedIDs[record.g.properties.id]) {
  //               includedIDs[record.g.properties.id] = true;

  //               newTabs.push({
  //                 label: record.g.properties.title,
  //                 viewId: record.g.properties.id,
  //                 viewType: 'graph',
  //                 component: (
  //                   <Graph2
  //                     viewId={record.g.properties.id}
  //                     title={record.g.properties.title}
  //                   />
  //                 ),
  //               });
  //             }
  //           });
  //         }
  //       });
  //   }
  //   setTabs(newTabs);
  // }, []);

  useEffect(() => {
    setCurrNodeId(nodeId as string);
  }, [nodeId]);
  const res = useGetNodeData(currNodeId, username as string);

  useEffect(() => {
    if (res) {
      setcurrNode_data(res);
    }
  }, [res]);

  // useEffect(() => {
  //   const res = useGetNodeData(currNodeId, username as string);
  //   setcurrNode_data(res);
  // }, [currNodeId]);

  let newTabs: MainTabProps[] = [
    // {
    //   label: 'Home',
    //   viewId: '',
    //   viewType: 'document',
    //   component: <SplitPaneWrapper viewId={''} />,
    // },
    //temp
    // {
    //   label: 'Graph View',
    //   viewId: '',
    //   viewType: 'graph',
    //   component: <Graph2 viewId={''} title={'Graph View'} />,
    // },
  ];
  const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

  useEffect(() => {
    if (!data || !data[0]) return;

    if (!isLoading) {
      console.log('data returned', data);
      if (data[0]) {
        let includedIDs: { [key: string]: boolean } = {};
        data[0].map((record: any, index: number) => {
          if (!includedIDs[record.g.properties.id]) {
            includedIDs[record.g.properties.id] = true;

            newTabs.push({
              label: record.g.properties.title,
              viewId: record.g.properties.id,
              viewType: 'graph',
              component: (
                <Graph
                  viewId={record.g.properties.id}
                  title={record.g.properties.title}
                />
              ),
            });
          }
        });
      }
    }
    setTabs(newTabs);
  }, [data && data[0]]);

  const [currTab, setCurrTab] = useState(0);

  useEffect(() => {
    setCurrTab(0);
  }, [nodeId]);

  return (
    // <NavigationContext.Provider value={}>
    <ViewContext.Provider
      value={{
        username: username as string,
        nodeId: currNodeId,
        setNodeId: setCurrNodeId,
        currNode_data: currNode_data,
        setcurrNode_data: setcurrNode_data,
        currTab: currTab,
        setCurrTab: setCurrTab,
        windowVar: windowVar,
        documentVar: documentVar,
      }}
    >
      <MainTabs mainViewTabs={tabs} setMainViewTabs={setTabs} />
    </ViewContext.Provider>
    // </NavigationContext.Provider>
  );
};
export default withRouter(Home);
