import { ReactComponentElement } from 'react';
import { calculateSizeX, calculateSizeY } from './helpers';

//DATA
export type Block = {
  id: string;
  content: string;
};

export type ConnectionData = {
  content: string[]; //ids of the blocks of the node's data that are contained in this connection
  type: string;
};

export type Node = {
  title: string;
  id: string;
  blocks: string[]; // each string is an ID of a block, which is sa resource or text
  connections: { [key: string]: ConnectionData };
  categorical?: boolean;
};

//VISUAL
export type GraphView = {
  node: string;
  title: string;
  elements: { [key: string]: VisualData };
};

export type VisualData = {
  x: number;
  y: number;
  size: number[];
  collapsed: boolean;
};

export const nodesData: { [key: string]: Node } = {
  homenode: {
    title: 'Home',
    id: 'homenode',
    blocks: [],
    connections: {
      homework: {
        type: 'includes',
        content: [],
      },
      arraylist: {
        type: 'includes',
        content: [],
      },
      linkedlist: {
        type: 'includes',
        content: [],
      },
    },
  },
  arraylist: {
    title: 'ArrayList',
    id: 'arraylist',
    blocks: ['arraylist_saikrishna'],
    connections: {
      homework: {
        type: 'includes',
        content: ['arraylist_saikrishna'],
      },
    },
  },
  linkedlist: {
    title: 'LinkedList',
    id: 'linkedlist',
    blocks: ['linkedlist_adriana_notes'],
    connections: {
      homework: {
        type: 'includes',
        content: ['linkedlist_adriana_notes'],
      },
    },
  },

  homework: {
    title: 'Homework',
    id: 'homework',
    blocks: [],
    connections: {
      arraylist: {
        type: 'includes',
        content: ['arraylist_saikrishna'],
      },
      linkedlist: {
        type: 'includes',
        content: ['linkedlist_adriana_notes'],
      },
    },
  },

  data_structures: {
    title: 'Data Structures',
    categorical: true,
    id: 'data_structures',
    blocks: [],
    connections: {
      arraylist: {
        type: 'includes',
        content: ['arraylist_saikrishna'],
      },
      linkedlist: {
        type: 'includes',
        content: ['linkedlist_adriana_notes'],
      },
    },
  },
  content_learning: {
    title: 'Learning Content',
    id: 'content_learning',
    blocks: [],
    connections: {
      arraylist: {
        type: 'includes',
        content: [],
      },
      linkedlist: {
        type: 'includes',
        content: [],
      },
    },
  },
  study_categories: {
    title: 'Study Categories',
    categorical: true,
    id: 'study_categories',
    blocks: [],
    connections: {
      homework: {
        type: 'includes',
        content: [],
      },
      content_learning: {
        type: 'includes',
        content: [],
      },
    },
  },
};

export const graphNodes: { [key: string]: VisualData } = {
  arraylist: {
    x: calculateSizeX(2),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  linkedlist: {
    x: calculateSizeX(2.5),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  homework: {
    x: calculateSizeX(2),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  data_structures: {
    x: calculateSizeX(3),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  content_learning: {
    x: calculateSizeX(4),
    y: calculateSizeY(4),
    size: [100, 100],
    collapsed: true,
  },
  study_categories: {
    x: calculateSizeX(5),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
};

export const resources: { [key: string]: Block } = {
  arraylist_saikrishna: {
    id: 'arraylist_saikrishna',
    content:
      '[Start of Module Videos](https://gatech.instructure.com/courses/296880/pages/arraylists?module_item_id=2943154)',
  },
  linkedlist_adriana_notes: {
    id: 'linkedlist_adriana_notes',
    content:
      '[Adriana Course Notes](https://gatech.instructure.com/courses/296880/files/folder/Resources/Additional%20Resources/Adriana%20Course%20Notes?preview=37911339)',
  },
};
