import React, { useContext, useEffect, useState } from 'react';
import SplitPaneWrapper from './document';
import Tabs from '../../../components/molecules/Tabs';
import TabContext, {
  TabContextInterface,
  TabProps,
} from '../../../components/context/TabContext';
import { useRouter, withRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../../backend/driver/fetcher';
import TextButton from '../../../components/molecules/TextButton';
import Graph2 from './graph/[graphViewId]';
import Link from 'next/link';

const Home: React.FC = () => {
  //Tabs

  const [secondaryTabs, setSecondaryTabs] = useState([
    {
      label: 'Connections',
      children: '',
    },
    {
      label: 'Content',
      children: '',
    },
  ]);

  const router = useRouter();

  const { username, nodeId } = router.query;

  const { data, error, isLoading } = useSWR(
    nodeId ? `/api/${username}/${nodeId}` : null,
    fetcher
  );

  console.log(isLoading);

  let newTabs: TabProps[] = [
    { label: 'Home', viewId: '', viewType: 'document' },
  ];
  const [tabs, setTabs] = useState<TabProps[]>(newTabs);
  useEffect(() => {
    if (!isLoading) {
      console.log(data);
      console.log('in here');
      if (data) {
        data.map((record: any, index: number) => {
          newTabs.push({
            label: record.g.properties.title,
            viewId: record.g.properties.id,
            viewType: 'graph',
          });
        });
      }
    }
    setTabs(newTabs);
  }, [data]);

  const [currTab, setCurrTab] = useState(0);

  return (
    <TabContext.Provider
      value={{
        mainViewTabs: tabs,
        // sidePanelTabs: secondaryTabs,
        setMainViewTabs: setTabs,
        // setSidePanelTabs: setSecondaryTabs,
        username: username as string,
        nodeId: nodeId as string,
      }}
    >
      <Tabs
        tabs={tabs}
        setTabs={setTabs}
        currTab={currTab}
        setCurrTab={setCurrTab}
      />
      {tabs[currTab].viewType == 'graph' ? (
        <Link
          href={{
            pathname: '/' + username + '/' + nodeId + '/home',
            query: { viewId: tabs[currTab].viewId },
          }}
        >
          <Graph2 viewId={tabs[currTab].viewId} />
        </Link>
      ) : (
        <Link
          href={{
            pathname: '/' + username + '/' + nodeId + '/home',
            query: { viewId: tabs[currTab].viewId },
          }}
        >
          <SplitPaneWrapper viewId={tabs[currTab].viewId} />
        </Link>
      )}
    </TabContext.Provider>
  );
};
export default withRouter(Home);
