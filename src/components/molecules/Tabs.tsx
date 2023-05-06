import React, { useContext, useState } from 'react';
import { Tab, TabProps } from '../atoms/Tab';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../../packages/graph/context/GraphViewContext';

export const Tabs: React.FC = () => {
  //   const { graphViewId } = useContext(
  //     GraphViewContext
  //   ) as GraphViewContextInterface;
  const graphViewId = '';
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    {
      label: 'Dependencies',
      viewId: graphViewId,
    },
    {
      label: 'Chronological',
      viewId: graphViewId,
    },
  ]);
  return (
    <div className='flex flex-row bg-blue-50 w-full'>
      {tabs.map((tab, index) => {
        return (
          <Tab
            label={tab.label}
            activeTab={activeTab}
            index={index}
            viewId={tab.viewId}
            onClick={() => setActiveTab(index)}
            onClose={() => setTabs(tabs.filter((tab, i) => i != index))}
          />
        );
      })}
    </div>
  );
};
