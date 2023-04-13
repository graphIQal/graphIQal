/**
 * Hook that controls the changing of focused nodes in the main view and on the axes
 * Returns the xCategory, the yCategory, and functions that will get the dropdown items for the three focuses.
 */

import { useContext, useState } from 'react';
import { nodesData } from '../../../schemas/Data_structures/DS_schema';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../GraphViewContext';

export const useFiltering = () => {
  const [xCategory, setXCategory] = useState('study_categories');
  const [yCategory, setYCategory] = useState('data_structures');

  const { setNodeInView, allNodes } = useContext(
    GraphViewContext
  ) as GraphViewContextInterface;

  const getDropdownItems = () => {
    let items = [];
    for (let node in allNodes) {
      items.push({
        text: node,
        onPress: () => {
          setNodeInView(node);
        },
      });
    }
    return items;
  };

  const getDropdownItemsX = () => {
    let items = [];
    for (let node in allNodes) {
      if (!allNodes[node].categorical) continue;
      items.push({
        text: node,
        onPress: () => {
          setXCategory(node);
        },
      });
    }
    return items;
  };
  const getDropdownItemsY = () => {
    let items = [];
    for (let node in allNodes) {
      if (!allNodes[node].categorical) continue;
      items.push({
        text: node,
        onPress: () => {
          setYCategory(node);
        },
      });
    }
    return items;
  };

  return {
    xCategory,
    yCategory,
    getDropdownItemsX,
    getDropdownItemsY,
    getDropdownItems,
  };
};
