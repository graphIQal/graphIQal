import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { List } from '@styled-icons/feather/List';
import React, { useState } from 'react';
import { Dropdown, ItemProps } from '../organisms/Dropdown';

export const PillMenu: React.FC<{
  label: string;
  value: string;
  dropdownItems: ItemProps[];
}> = ({ label, value, dropdownItems }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className=' flex flex-col items-center gap-y-1'>
      <div
        className=' h-10 w-auto bg-blue-100 border border-base_black rounded-lg flex flex-row items-center p-3 gap-x-3 justify-items-stretch text-sm'
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <List className='w-5' />
        <div>
          {label} <span className='font-bold'> {value}</span>
        </div>
        <AngleDown
          onClick={() => setShowDropdown(!showDropdown)}
          className='w-2 hover:opacity-80 hover:cursor-pointer'
        />
      </div>
      {/* {showDropdown && (
        <div className='w-full relative'>
          <Dropdown items={dropdownItems} activeIndex={0} />
        </div>
      )} */}
    </div>
  );
};
