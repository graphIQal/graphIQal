import React, { useState } from 'react';
import IconButton from './IconButton';
import IconCircleButton from '../molecules/IconCircleButton';
import Link from 'next/link';
import { SideTabProps } from '../organisms/Tabs/GraphSideTabs';
import { SideTabPropsDoc } from '../organisms/Tabs/DocumentSideTabs';
import { MainTabProps } from '../context/ViewContext';

type TabProps = {
  label: string;
  selected: boolean;
  index: number;
  currTab: number;
  setCurrTab: (val: number) => void;
  tabs: any;
  setTabs: (val: any) => void;
  activeTabs: number[];
  setActiveTabs: (val: number[]) => void;
};
export const Tab: React.FC<TabProps> = ({
  label,
  selected,
  index,
  currTab,
  setCurrTab,
  tabs,
  setTabs,
  activeTabs,
  setActiveTabs,
}) => {
  const [showDel, setShowDel] = useState(false);

  const onClick = (index: number) => {
    setCurrTab(index);
    activeTabs.push(index);
  };
  const onClose = (index: number) => {
    if (currTab == index) {
      setCurrTab(activeTabs[activeTabs.length - 1]);
      setActiveTabs(activeTabs.filter((tab, i) => i != activeTabs.length - 1));
    }
    setTabs(tabs.filter((tab: any, i: number) => i != index));
  };

  return (
    <div
      onMouseOver={() => setShowDel(true)}
      onMouseLeave={() => setShowDel(false)}
      className={
        ' w-36 border-x-[0.5px] border-lining p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row items-center justify-between align-middle ' +
        (selected && ' bg-base_white')
      }
    >
      <div onClick={() => onClick(index)}>
        <h3>{label}</h3>
      </div>
      {showDel && (
        <IconCircleButton
          src='close'
          circle={false}
          onClick={() => onClose(index)}
        />
      )}
    </div>
  );
};
