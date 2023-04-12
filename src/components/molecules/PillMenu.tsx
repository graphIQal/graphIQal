import React, { useContext, useState } from 'react';
import { List } from '@styled-icons/feather/List';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../../pages/graph/GraphActionContext';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import BlockMenu from '../organisms/BlockMenu';
import HoveringToolbar from '../organisms/HoveringToolbar';
import { Dropdown, ItemProps } from '../organisms/Dropdown';
import { nodesData } from '../../schemas/Data_structures/DS_schema';

export const PillMenu: React.FC<{
  label: string;
  value: string;
  dropdownItems: ItemProps[];
}> = ({ label, value, dropdownItems }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className=' flex flex-col items-center gap-y-1'>
      <div className=' h-10 w-auto bg-selected_white border border-base_black rounded-full flex flex-row items-center p-3 gap-x-3 justify-items-stretch'>
        <List className='w-5' />
        <div>
          {label} <span className='font-bold'> {value}</span>
        </div>
        <AngleDown
          onClick={() => setShowDropdown(!showDropdown)}
          className='w-3 hover:opacity-80 hover:cursor-pointer'
        />
      </div>
      {showDropdown && (
        <div className='w-full relative'>
          <Dropdown items={dropdownItems} />
        </div>
      )}
    </div>
  );
};
