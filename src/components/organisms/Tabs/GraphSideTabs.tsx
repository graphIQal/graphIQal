import React, { useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import Graph from '../../../packages/graph/components/Graph';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';

export type SideTabProps = {
  label: string;
  viewType: 'connections' | 'content' | 'shelf';
  component: any;
};

const GraphSideTabs: React.FC<{
  windowVar: Window;
  documentVar: Document;
}> = ({ windowVar, documentVar }) => {
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
      component: (
        <Graph window={windowVar} document={documentVar} viewId={''} />
      ),
    },
  ]);

  const [currTab, setCurrTab] = useState(0);
  const [activeTabs, setActiveTabs] = useState([0]);
  return (
    <>
      <Tabs component={tabs[currTab]}>
        {tabs.map((tab, index) => {
          return (
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
          );
        })}
      </Tabs>
    </>
  );
};
export default GraphSideTabs;
