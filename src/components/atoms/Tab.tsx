import React, { useEffect, useState } from 'react';
import IconButton from './IconButton';
import IconCircleButton from '../molecules/IconCircleButton';
import Link from 'next/link';
import { SideTabProps } from '../organisms/Tabs/GraphSideTabs';
import { SideTabPropsDoc } from '../organisms/Tabs/DocumentSideTabs';
import { updateView } from '../../helpers/backend/updateView';
import { useToggle } from '../../helpers/hooks/useToggle';

type TabProps = {
  label: string;
  selected: boolean;
  index: number;
  currTab: number;
  setCurrTab: (val: number) => void;
  tabs: any;
  setTabs: (val: any) => void;
  onClick?: (val: number) => void;
};
const Tab: React.FC<TabProps> = ({
  label,
  selected,
  index,
  currTab,
  setCurrTab,
  tabs,
  setTabs,
  onClick = (index: number) => {
    setCurrTab(index);
  },
}) => {
  console.log('tab rendering');
  // const [showDel, setShowDel] = useState(false);

  const onClose = (index: number) => {
    if (currTab == tabs.length - 1) {
      setCurrTab(currTab - 1);
    }
    setTabs(tabs.filter((tab: any, i: number) => i != index));
  };

  const { value: isEditing, toggle: toggleIsEditing } = useToggle();

  useEffect(() => {
    const listenerFunc = (ev: any) => {
      if (ev.code == 'Enter') {
        toggleIsEditing(false);
      }
    };
    if (isEditing) {
      window.addEventListener('click', () => toggleIsEditing(false));
      window.addEventListener('keydown', (ev: any) => listenerFunc(ev));
    }

    return () => {
      window.removeEventListener('click', () => toggleIsEditing(false));
      window.removeEventListener('keydown', (ev: any) => listenerFunc(ev));
    };
  }, [isEditing]);

  return (
    <div
      onClick={() => onClick(index)}
      onDoubleClick={() => toggleIsEditing(true)}
      // onMouseOver={() => setShowDel(true)}
      // onMouseLeave={() => setShowDel(false)}
      className={
        'min-w-[9rem]  border-x-[0.5px] border-lining p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row items-center justify-between align-middle ' +
        (selected && ' bg-base_white')
      }
    >
      <div>
        {isEditing ? (
          <input
            className='outline-none border-none'
            onBlur={(e: any) =>
              updateView('TAB_NAME', {
                tabs: tabs,
                setTabs: setTabs,
                newLabel: e.target.value,
                index: index,
              })
            }
            defaultValue={label}
            autoFocus={true}
          />
        ) : (
          <h3>{label}</h3>
        )}
      </div>
      {/* {showDel && (
        <IconCircleButton
          src='close'
          circle={false}
          onClick={() => onClose(index)}
        />
      )} */}
    </div>
  );
};
export default Tab;
