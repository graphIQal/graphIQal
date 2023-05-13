import React, { useContext, useEffect, useState } from 'react';
import MainTabs from '../../components/organisms/Tabs/MainTabs';
import ViewContext, {
  ViewContextInterface,
  MainTabProps,
} from '../../components/context/ViewContext';
import { useRouter, withRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../backend/driver/fetcher';
import TextButton from '../../components/molecules/TextButton';
import Graph2 from '../../packages/graph/Graph';
import Link from 'next/link';
import SplitPaneWrapper from '../../packages/dnd-editor/Document';

const Home: React.FC = () => {
  const [windowVar, setWindow] = useState<any>();
  const [documentVar, setDocument] = useState<any>();
  useEffect(() => {
    setWindow(window);
    setDocument(document);
  });

  const router = useRouter();

  const { username, nodeId } = router.query;

  const { data, error, isLoading } = useSWR(
    nodeId ? `/api/${username}/${nodeId}/document` : null,
    fetcher
  );

  let newTabs: MainTabProps[] = [
    // {
    //   label: 'Home',
    //   viewId: '',
    //   viewType: 'document',
    //   component: <SplitPaneWrapper viewId={''} />,
    // },
    {
      label: 'Graph',
      viewId: '',
      viewType: 'graph',
      component: (
        <Graph2 viewId={'f5cddebe-f6e3-49bc-8994-f40c499b9296'} title='' />
      ),
    },
  ];
  const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        console.log('data');
        console.log(data);

        let includedIDs: { [key: string]: boolean } = {};
        if (!data) return;
        data.map((record: any, index: number) => {
          if (!includedIDs[record.g.properties.id]) {
            includedIDs[record.g.properties.id] = true;

            newTabs.push({
              label: record.g.properties.title,
              viewId: record.g.properties.id,
              viewType: 'graph',
              component: (
                <Graph2
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
  }, [data]);

  const [currTab, setCurrTab] = useState(0);

  return (
    <ViewContext.Provider
      value={{
        mainViewTabs: tabs,
        setMainViewTabs: setTabs,
        username: username as string,
        nodeId: nodeId as string,
        currTab: currTab,
        setCurrTab: setCurrTab,
        windowVar: windowVar,
        documentVar: documentVar,
      }}
    >
      <MainTabs />
    </ViewContext.Provider>
  );
};
export default withRouter(Home);
