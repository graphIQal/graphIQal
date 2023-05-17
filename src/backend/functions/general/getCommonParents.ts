// get data of nodes (title, ID, icon, color) of the nodes n that have a relationship HAS with a node in nodeIDs where n HAS one of the nodeIDs

import { NodeData } from '../../../packages/graph/graphTypes';

// if possible, sort by the ones that are the parent of the most nodes in nodeIDs
export const getCommonParents = (nodeIDs: string[]) => {
  return [
    {
      id: '',
      title: 'Homework',
      icon: 'block',
      color: 'blue',
    },
  ];
};
