// get data of nodes (title, ID, icon, color) of the nodes n that have a relationship HAS with a node in nodeIDs where n HAS one of the nodeIDs

import { NodeData } from '../../../packages/graph/graphTypes';

// if possible, sort by the ones that are the parent of the most nodes in nodeIDs
export const getCommonParents = (nodeIDs: string[]): NodeData[] => {
  return [
    {
      id: 'f3403c06-c449-4c3e-b376-a8f1d38a961d',
      title: 'Homework',
      icon: 'block',
      color: 'blue',
      connections: {
        'cce198e8-6c92-44e5-a7b7-7f1a4d75ba18': {
          content: [],
          startNode: 'f3403c06-c449-4c3e-b376-a8f1d38a961d',
          endNode: 'cce198e8-6c92-44e5-a7b7-7f1a4d75ba18',
          type: 'HAS',
        },
      },
    },
  ];
};
