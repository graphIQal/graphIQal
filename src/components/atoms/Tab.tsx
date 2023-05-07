import React, { useState } from 'react';
import IconButton from './IconButton';
import IconCircleButton from '../molecules/IconCircleButton';

type TabProps = {
  label: string;
  viewId: string;
  onClick: () => void;
  activeTab: number;
  index: number;
  onClose: () => void;
};
export const Tab: React.FC<TabProps> = ({
  label,
  onClick,
  activeTab,
  index,
  onClose,
}) => {
  const active = activeTab == index;
  const [showDel, setShowDel] = useState(false);

  return (
    <div
      onMouseOver={() => setShowDel(true)}
      onMouseLeave={() => setShowDel(false)}
      className={
        ' w-36 border-x-[0.5px] border-lining p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row align-middle items-center justify-between align-middle ' +
        (active && ' bg-base_white')
      }
    >
      <div onClick={onClick}>
        <h3>{label}</h3>
      </div>
      {showDel && (
        <IconCircleButton src='close' circle={false} onClick={onClose} />
      )}
    </div>
  );
};
