/**
 * Pill menu for filtering the nodes that are "in view"
 */

import React, { useContext } from 'react';
import { PillMenu } from '../../../components/molecules/PillMenu';
import { ItemProps } from '../../../components/organisms/Dropdown';
import { nodesData } from '../../../schemas/Data_structures/helpers';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../context/GraphViewContext';

type FilteringProps = {
  xCategory: string;
  yCategory: string;
  getDropdownItemsX: () => ItemProps[];
  getDropdownItemsY: () => ItemProps[];
  getDropdownItems: () => ItemProps[];
};
export const Filtering: React.FC<FilteringProps> = ({
  xCategory,
  yCategory,
  getDropdownItems,
  getDropdownItemsX,
  getDropdownItemsY,
}) => {
  const { nodeInView } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;
  return (
    <div className=' absolute ml-3 mt-3 flex flex-row gap-x-3 mb-3'>
      <PillMenu
        label='In View: '
        value={nodeInView}
        dropdownItems={getDropdownItems()}
      />
      <PillMenu
        label='X-Axis: '
        value={xCategory}
        dropdownItems={getDropdownItemsX()}
      />
      <PillMenu
        label='Y-Axis: '
        value={yCategory}
        dropdownItems={getDropdownItemsY()}
      />
    </div>
  );
};
