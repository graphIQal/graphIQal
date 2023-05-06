import React, { useState } from 'react';
import IconButton from './IconButton';
import IconCircleButton from '../molecules/IconCircleButton';

export type TabProps = {
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
      onClick={onClick}
      onMouseOver={() => setShowDel(true)}
      onMouseLeave={() => setShowDel(false)}
      className={
        ' w-36 border-x-[0.5px] border-lining p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row align-middle items-center justify-between ' +
        (active && ' bg-base_white')
      }
    >
      <h3>{label}</h3>
      {showDel && (
        <IconCircleButton src='remove' circle={false} onClick={onClose} />
      )}
    </div>
  );
};
