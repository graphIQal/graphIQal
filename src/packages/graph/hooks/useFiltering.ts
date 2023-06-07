/**
 * Hook that controls the changing of focused nodes in the main view and on the axes
 * Returns the xCategory, the yCategory, and functions that will get the dropdown items for the three focuses.
 */

import { useContext, useState } from 'react';
import { nodesData, titles } from '../../../schemas/Data_structures/DS_schema';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';

export const useFiltering = () => {
  const [xCategory, setXCategory] = useState('study_categories');
  const [yCategory, setYCategory] = useState('data_structures');

  const { nodeData_Graph } = useGraphViewData();
  const { changeNodeInFocusId } = useGraphViewAPI();

  const getDropdownItems = () => {
    let items = [];
    for (let node in nodeData_Graph) {
      items.push({
        text: nodeData_Graph[node].title,
        onPress: () => {
          changeNodeInFocusId(node);
        },
      });
    }
    return items;
  };

  const getDropdownItemsX = () => {
    let items = [];
    for (let node in nodeData_Graph) {
      // if (!isNodeCategorical(nodeData_Graph, node)) continue;
      items.push({
        text: titles[node],
        onPress: () => {
          setXCategory(node);
        },
      });
    }
    return items;
  };
  const getDropdownItemsY = () => {
    let items = [];
    for (let node in nodeData_Graph) {
      // if (!isNodeCategorical(allNodes, node)) continue;
      items.push({
        text: titles[node],
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
