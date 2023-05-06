import React, { useContext, useState } from 'react';
import { Tab } from '../atoms/Tab';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';
import { TabProps } from '../context/TabContext';

export const Tabs: React.FC<{
  tabs: TabProps[];
  setTabs: (val: TabProps[]) => void;
}> = ({ tabs, setTabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [lastActiveTab, setLastActiveTab] = useState(0);

  console.log('active ' + activeTab);
  console.log('last active ' + lastActiveTab);

  return (
    <div className='flex flex-row bg-blue-50 w-full'>
      {tabs.map((tab, index) => {
        return (
          <Tab
            label={tab.label}
            activeTab={activeTab}
            index={index}
            viewId={tab.viewId}
            onClick={() => {
              setLastActiveTab(activeTab);
              setActiveTab(index);
            }}
            onClose={() => {
              if (activeTab == index) {
                setActiveTab(lastActiveTab);
              }
              setTabs(tabs.filter((tab, i) => i != index));
            }}
          />
        );
      })}
    </div>
  );
};
