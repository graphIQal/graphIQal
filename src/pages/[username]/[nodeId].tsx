import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../backend/driver/fetcher';
import MainTabs, {
  MainTabProps,
} from '../../components/organisms/Tabs/MainTabs';

import { ViewDataProvider } from '../../components/context/ViewContext';
import Document from '../../packages/dnd-editor/Document';
import Graph from '../../packages/graph/Graph';
import { WorkspaceProvider } from '@/components/context/WorkspaceContext';

// ('use client');

const Home: React.FC = () => {
  const router = useRouter();
  const { nodeId, username } = router.query;

  const {
    data,
    error,
    isLoading,
    mutate: mutateGraphViews,
  } = useSWR(
    [nodeId ? `/api/${username}/${nodeId}/getGraphviews` : null],
    fetcher
  );

  let newTabs: MainTabProps[] = [
    {
      title: 'Document',
      viewId: '',
      viewType: 'document',
    },
    //temp graph for offline purposes
    // {
    //   label: 'Graph View',
    //   viewId: '',
    //   viewType: 'graph',
    //   component: <Graph viewId={''} title={'Graph View'} />,
    // },
  ];

  const [tabs, setTabs] = useState<MainTabProps[]>(newTabs);

  useEffect(() => {
    if (!data || data.err) return;

    console.log('data');
    console.log(data);

    if (!isLoading) {
      if (data) {
        let includedIDs: { [key: string]: boolean } = {};
        data.map((record: any, index: number) => {
          if (!includedIDs[record.g.properties.id]) {
            includedIDs[record.g.properties.id] = true;

            newTabs.push({
              title: record.g.properties.title,
              viewId: record.g.properties.id,
              viewType: 'graph',
            });
          }
        });
      }
    }
    console.log('newTabs ', newTabs);
    setTabs(newTabs);
  }, [data]);

  return (
    <ViewDataProvider>
      <WorkspaceProvider>
        <MainTabs
          mainViewTabs={tabs}
          setMainViewTabs={setTabs}
          mutateGraphViews={mutateGraphViews}
        />
      </WorkspaceProvider>
    </ViewDataProvider>
  );
};
export default Home;
