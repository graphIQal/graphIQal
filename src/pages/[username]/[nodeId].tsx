import React, { useContext, useEffect, useState } from 'react';
import SplitPaneWrapper from './document';
import MainTabs from '../../components/organisms/Tabs/MainTabs';
import ViewContext, {
  ViewContextInterface,
  MainTabProps,
} from '../../components/context/ViewContext';
import { useRouter, withRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../backend/driver/fetcher';
import TextButton from '../../components/molecules/TextButton';
import Graph2 from './graph/[graphViewId]';
import Link from 'next/link';

const Home: React.FC = () => {
  const router = useRouter();

  const { username, nodeId } = router.query;

  const { data, error, isLoading } = useSWR(
    nodeId ? `/api/${username}/${nodeId}` : null,
    fetcher
  );

  console.log(isLoading);

  let newTabs: MainTabProps[] = [
    {
      label: 'Home',
      viewId: '',
      viewType: 'document',
      component: <SplitPaneWrapper viewId={''} />,
    },
  ];
  const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);
  useEffect(() => {
    if (!isLoading) {
      console.log('data ' + data);
      console.log('in here');
      if (data) {
        let includedIDs: { [key: string]: boolean } = {};
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
      }}
    >
      <MainTabs
        tabs={tabs}
        setTabs={setTabs}
        currTab={currTab}
        setCurrTab={setCurrTab}
      />
    </ViewContext.Provider>
  );
};
export default withRouter(Home);
