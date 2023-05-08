import React, { useContext, useEffect, useState } from 'react';
import SplitPaneWrapper from './document';
import MainTabs from '../../components/organisms/Tabs/MainTabs';
import TabContext, {
  TabContextInterface,
  TabProps,
} from '../../components/context/TabContext';
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

  let newTabs: TabProps[] = [
    { label: 'Home', viewId: '', viewType: 'document' },
  ];
  const [tabs, setTabs] = useState<TabProps[]>(newTabs);
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
            });
          }
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
      <MainTabs
        tabs={tabs}
        setTabs={setTabs}
        currTab={currTab}
        setCurrTab={setCurrTab}
      />
      {tabs[currTab].viewType == 'graph' ? (
        <Graph2 viewId={tabs[currTab].viewId} title={nodeId as string} />
      ) : (
        <SplitPaneWrapper viewId={tabs[currTab].viewId} />
      )}
    </TabContext.Provider>
  );
};
export default withRouter(Home);
