import React, { useState } from 'react';
import EditorComponent from '../../../packages/editor/EditorComponent';
import ShelfEditor from '../../../packages/shelf-editor/ShelfEditor';
import { Tab } from '../../atoms/Tab';
import { Tabs } from './Tabs';

export type SideTabPropsDoc = {
  label: string;
  viewType: 'connections' | 'shelf' | 'content';
  component: any;
};

const DocumentSideTabs: React.FC = () => {
  const [tabs, setTabs] = useState<SideTabPropsDoc[]>([
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
      component: <ShelfEditor />,
    },
  ]);

  const [currTab, setCurrTab] = useState(0);
  const [activeTabs, setActiveTabs] = useState([0]);

  return (
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
  );
};
export default DocumentSideTabs;
