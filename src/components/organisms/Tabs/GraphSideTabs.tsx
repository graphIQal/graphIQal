import React, { useContext, useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import Graph from '../../../packages/graph/components/Graph';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';

export type SideTabProps = {
  label: string;
  viewType: 'connections' | 'content' | 'shelf';
  component: any;
};

const GraphSideTabs: React.FC<{}> = () => {
  const [tabs, setTabs] = useState<SideTabProps[]>([
    {
      label: 'Connections',
      viewType: 'connections',
      component: <EditorComponent textIn={'connections'} />,
    },
    {
      label: 'Content',
      viewType: 'content',
      component: <EditorComponent textIn={'content'} />,
    },
    {
      label: 'Shelf',
      viewType: 'shelf',
      component: <Graph viewId={''} />,
    },
  ]);

  const [currTab, setCurrTab] = useState(0);
  const [activeTabs, setActiveTabs] = useState([0]);
  return (
    <>
      <Tabs>
        {tabs.map((tab, index) => {
          return (
            <div key={index}>
              <Tab
                label={tab.label}
                selected={index == currTab}
                index={index}
                currTab={currTab}
                setCurrTab={setCurrTab}
                tabs={tabs}
                setTabs={setTabs}
                activeTabs={activeTabs}
                setActiveTabs={setActiveTabs}
              />
            </div>
          );
        })}
      </Tabs>
      {tabs.map((tab, i) => {
        return (
          <div
            key={i}
            style={{
              display: i == currTab ? 'block' : 'none',
            }}
          >
            {tab.component}
          </div>
        );
      })}
    </>
  );
};
export default GraphSideTabs;
