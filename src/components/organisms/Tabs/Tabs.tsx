import React, { useContext, useState } from 'react';
import IconCircleButton from '../../molecules/IconCircleButton';
import { Dropdown, ItemProps } from '../Dropdown';
import ViewContext, { ViewContextInterface } from '../../context/ViewContext';
import { createGraphView } from '../../../backend/functions/graph/mutate/createGraphView';
import { useToggle } from '../../../helpers/hooks/useToggle';

export const Tabs: React.FC<{ children: any }> = ({ children }) => {
  const { windowVar, username, nodeId } = useContext(
    ViewContext
  ) as ViewContextInterface;
  const { value: showDropdown, toggle: setShowDropdown } = useToggle();

  const items: ItemProps[] = [
    {
      text: 'Empty graph',
      onPress: () => {
        createGraphView(username, nodeId);
      },
    },
    { text: 'Duplicate graph', onPress: () => null },
  ];
  return (
    <div className='flex flex-row bg-blue-50 w-full items-center align-middle'>
      {children}
      <div className='ml-[0.5rem]'>
        <IconCircleButton circle={false} src='plus' onClick={setShowDropdown} />
        {showDropdown && (
          <Dropdown
            items={items}
            list
            activeIndex={-1}
            windowVar={windowVar}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        )}
      </div>
    </div>
  );
};
