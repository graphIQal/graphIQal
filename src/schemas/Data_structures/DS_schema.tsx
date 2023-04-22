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

export const ids = [
  'homenode',
  'data_structures',
  'adts',
  'concepts',
  'algorithms',
  'study_categories',
  'homework',

  'content_learning',
  'exam_prep',
  'recitation',
  'further_reading',

  'exams',
  'exam1',
  'exam2',
  'exam3',
  'list',
  'tree',
  'stack',
  'queue',
  'dequeue',
  'map',

  //data structures
  'array',
  'arraylist',
  'linkedlist',
  'singlylinkedlist',
  'doublylinkedlist',
  'circularsinglylinkedlist',
  'binarytree',
  'bst',
  'heap',
  'avl',
  'twofourtree',
  'skiplist',
  'hashmap',
  'externalchaining',
  'linearprobing',
  'quadraticprobing',
  'doublehashing',
  'priorityqueue',

  //concepts
  'recursion',
  'comparablecomparator',

  //algos
  'graph',
  'prims',
  'kruskals',
  'dijkstra',
  'dfs',
  'bfs',
  'sorting',
  'bubblesort',
  'lsdradixsort',
  'cocktailshakersort',
  'quicksort',
  'insertionsort',
  'mergesort',
  'selectionsort',
  'patternmatching',
  'bruteforcepatternmatching',
  'rabinkarp',
  'boyermoore',
  'galilrule',
  'kmp',
];

export const topicIDs = [
  'list',
  'tree',
  'stack',
  'queue',
  'dequeue',
  'map',

  //data structures
  'array',
  'arraylist',
  'linkedlist',
  'singlylinkedlist',
  'doublylinkedlist',
  'circularsinglylinkedlist',
  'binarytree',
  'bst',
  'heap',
  'avl',
  'twofourtree',
  'skiplist',
  'hashmap',
  'externalchaining',
  'linearprobing',
  'quadraticprobing',
  'doublehashing',
  'priorityqueue',

  //concepts
  'recursion',
  'comparablecomparator',

  //algos
  'graph',
  'prims',
  'kruskals',
  'dijkstra',
  'dfs',
  'bfs',
  'sorting',
  'bubblesort',
  'lsdradixsort',
  'cocktailshakersort',
  'quicksort',
  'insertionsort',
  'mergesort',
  'selectionsort',
  'patternmatching',
  'bruteforcepatternmatching',
  'rabinkarp',
  'boyermoore',
  'galilrule',
  'kmp',
];

// hardcoding titles
export const titles: { [key: string]: string } = {
  homenode: 'Course Topics',
  data_structures: 'Data Structures',
  adts: 'ADTs',
  concepts: 'Concepts',
  algorithms: 'Algorithms',
  study_categories: 'Study Categories',
  homework: 'Homework',

  content_learning: 'Content Learning',
  exam_prep: 'Exam Prep',
  recitation: 'Recitation',
  further_reading: 'Further Reading',

  exams: 'Exams',
  exam1: 'Exam 1',
  exam2: 'Exam 2',
  exam3: 'Exam 3',
  list: 'List',
  tree: 'Tree',
  stack: 'Stack',
  queue: 'Queue',
  dequeue: 'Dequeue',

  //data structures
  array: 'Array',
  arraylist: 'ArrayList',
  linkedlist: 'LinkedList',
  singlylinkedlist: 'SinglyLinkedList',
  doublylinkedlist: 'DoublyLinkedList',
  circularsinglylinkedlist: 'CircularSinglyLinkedList',
  binarytree: 'Binary Tree',
  bst: 'Binary Search Tree',
  heap: 'Heap',
  avl: 'AVL',
  twofourtree: '2-4 Tree',
  skiplist: 'SkipList',
  map: 'Map',
  hashmap: 'HashMap',
  externalchaining: 'External Chaining HashMap',
  linearprobing: 'Linear Probing HashMap',
  quadraticprobing: 'Quadratic Probing HashMap',
  doublehashing: 'Double Hashing HashMap',
  priorityqueue: 'Priority Queue',

  //concepts
  recursion: 'Recursion',
  comparablecomparator: 'Comparable/Comparator',

  //algos
  graph: 'Graph',
  prims: "Prim's",
  kruskals: "Kruskal's",
  dijkstra: "Dijkstra's",
  dfs: 'Depth First Search',
  bfs: 'Breadth First Search',
  sorting: 'Sorting',
  bubblesort: 'Bubble Sort',
  lsdradixsort: 'LSD Radix Sort',
  cocktailshakersort: 'Cocktail Shaker Sort',
  quicksort: 'Quick Sort',
  insertionsort: 'Insertion Sort',
  mergesort: 'Merge Sort',
  selectionsort: 'Selection Sort',
  patternmatching: 'Pattern Matching',
  bruteforcepatternmatching: 'Brute Force',
  rabinkarp: 'Rabin Karp',
  boyermoore: 'Boyer Moore',
  galilrule: 'Galil Rule',
  kmp: 'KMP',
};

//Hardcoding connection data
export const chronologicalOrder = [
  'comparablecomparator',
  'recursion',
  'array',
  'list',
  'arraylist',
  'linkedlist',
  'singlylinkedlist',
  'doublylinkedlist',
  'circularsinglylinkedlist',
  'stack',
  'queue',
  'dequeue',
  'tree',
  'binarytree',
  'bst',
  'heap',
  'map',
  'hashmap',
  'externalchaining',
  'linearprobing',
  'quadraticprobing',
  'doublehashing',
  'priorityqueue',
  'avl',
  'skiplist',
  'twofourtree',

  //algos
  'sorting',
  'bubblesort',
  'cocktailshakersort',
  'selectionsort',
  'insertionsort',
  'lsdradixsort',
  'mergesort',
  'quicksort',

  'patternmatching',
  'bruteforcepatternmatching',
  'boyermoore',
  'kmp',
  'rabinkarp',
  'galilrule',

  'graph',
  'dfs',
  'bfs',
  'dijkstra',
  'prims',
  'kruskals',
];

//key = where arrow ends, values = where arrow starts (each array represents the things that the key depends on)
export const dependencies: { [key: string]: string[] } = {
  list: [],
  tree: ['recursion'],
  stack: ['singlylinkedlist', 'array'],
  queue: ['doublylinkedlist', 'array'],
  dequeue: ['doublylinkedlist', 'array'],
  map: [],
  array: [],
  arraylist: ['array', 'list'],
  linkedlist: ['list'],
  singlylinkedlist: ['linkedlist'],
  doublylinkedlist: ['linkedlist'],
  circularsinglylinkedlist: ['linkedlist'],
  binarytree: ['tree', 'comparablecomparator'],
  bst: [],
  heap: ['array'],
  avl: ['bst'],
  twofourtree: ['tree'],
  skiplist: ['linkedlist'],
  hashmap: ['array'],
  externalchaining: ['linkedlist'],
  linearprobing: [],
  quadraticprobing: [],
  doublehashing: [],
  priorityqueue: ['queue', 'heap'],

  //concepts
  recursion: [],
  comparablecomparator: [],

  //algos
  graph: [],
  prims: ['priorityqueue'],
  kruskals: ['priorityqueue'],
  dijkstra: ['priorityqueue'],
  dfs: ['recursion'],
  bfs: ['queue'],
  sorting: [],
  bubblesort: [],
  lsdradixsort: ['linkedlist'],
  cocktailshakersort: ['bubblesort'],
  quicksort: ['recursion'],
  insertionsort: [],
  mergesort: ['recursion'],
  selectionsort: [],
  patternmatching: [],
  bruteforcepatternmatching: [],
  rabinkarp: [],
  boyermoore: [],
  galilrule: ['boyermoore'],
  kmp: [],
};

//Hardcoding 'includes' connection data
export const exams = {
  exam1: [
    'array',
    'list',
    'arraylist',
    'linkedlist',
    'singlylinkedlist',
    'doublylinkedlist',
    'circularsinglylinkedlist',
    'stack',
    'queue',
    'dequeue',
    'tree',
    'binarytree',
    'bst',
  ],
  exam2: [
    'stack',
    'queue',
    'dequeue',
    'tree',
    'binarytree',
    'bst',
    'heap',
    'map',
    'hashmap',
    'externalchaining',
    'linearprobing',
    'quadraticprobing',
    'doublehashing',
    'priorityqueue',
    'avl',
    'skiplist',
    'twofourtree',
  ],
  exam3: [
    'hashmap',
    'externalchaining',
    'linearprobing',
    'quadraticprobing',
    'doublehashing',
    'priorityqueue',
    'avl',
    'skiplist',
    'twofourtree',

    //algos
    'sorting',
    'bubblesort',
    'cocktailshakersort',
    'selectionsort',
    'insertionsort',
    'lsdradixsort',
    'mergesort',
    'quicksort',

    'patternmatching',
    'bruteforcepatternmatching',
    'boyermoore',
    'kmp',
    'rabinkarp',
    'galilrule',

    'graph',
    'dfs',
    'bfs',
    'dijkstra',
    'prims',
    'kruskals',
  ],
};

export const dataStructures = [
  'array',
  'arraylist',
  'linkedlist',
  'singlylinkedlist',
  'doublylinkedlist',
  'circularsinglylinkedlist',
  'binarytree',
  'bst',
  'heap',
  'avl',
  'twofourtree',
  'skiplist',
  'hashmap',
  'externalchaining',
  'linearprobing',
  'quadraticprobing',
  'doublehashing',
  'priorityqueue',
];
export const concepts = ['recursion', 'comparablecomparator'];
export const adts = ['list', 'tree', 'stack', 'queue', 'map'];
export const algorithms = [
  'graph',
  'prims',
  'kruskals',
  'dijkstra',
  'dfs',
  'bfs',
  'sorting',
  'bubblesort',
  'lsdradixsort',
  'cocktailshakersort',
  'quicksort',
  'insertionsort',
  'mergesort',
  'selectionsort',
  'patternmatching',
  'bruteforcepatternmatching',
  'rabinkarp',
  'boyermoore',
  'galilrule',
  'kmp',
];

export const study_categories = [
  'homework',
  'content_learning',
  'exam_prep',
  'recitation',
  'further_reading',
];
export const homework = [
  'arraylist',
  'linkedlist',
  'stack',
  'queue',
  'bst',
  'heap',
  'hashmap',
  'avl',
];
//includes all topics above, will also be linked to all resources?
export const content_learning = [];
export const exam_prep = [];
export const recitation = [];
export const further_reading = [];

// have an array of data structure nodes, ADT nodes, homework nodes, etc.
//render connections for each of these combinations
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

export let graphNodes: { [key: string]: VisualData } = {
  //
  data_structures: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  adts: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  concepts: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  algorithms: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  //

  //
  study_categories: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  homework: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },

  content_learning: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  exam_prep: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  recitation: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  further_reading: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },

  //
  exams: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  exam1: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  exam2: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },
  exam3: {
    x: calculateSizeX(0),
    y: calculateSizeY(0),
    size: [100, 100],
    collapsed: true,
  },

  //adts
  list: {
    x: calculateSizeX(2.3),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  tree: {
    x: calculateSizeX(3.7),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
  stack: {
    x: calculateSizeX(3.7),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  queue: {
    x: calculateSizeX(3.7),
    y: calculateSizeY(3.5),
    size: [100, 100],
    collapsed: true,
  },
  dequeue: {
    x: calculateSizeX(3.7),
    y: calculateSizeY(4),
    size: [100, 100],
    collapsed: true,
  },
  map: {
    x: calculateSizeX(3.7),
    y: calculateSizeY(1),
    size: [100, 100],
    collapsed: true,
  },

  //data structures
  array: {
    x: calculateSizeX(3),
    y: calculateSizeY(1),
    size: [150, 50],
    collapsed: true,
  },
  arraylist: {
    x: calculateSizeX(2.3),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  linkedlist: {
    x: calculateSizeX(3),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  singlylinkedlist: {
    x: calculateSizeX(3),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  doublylinkedlist: {
    x: calculateSizeX(3),
    y: calculateSizeY(3.5),
    size: [100, 100],
    collapsed: true,
  },
  circularsinglylinkedlist: {
    x: calculateSizeX(3),
    y: calculateSizeY(4),
    size: [100, 100],
    collapsed: true,
  },

  binarytree: {
    x: calculateSizeX(4.5),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
  bst: {
    x: calculateSizeX(5),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
  heap: {
    x: calculateSizeX(4.5),
    y: calculateSizeY(5.5),
    size: [100, 100],
    collapsed: true,
  },
  avl: {
    x: calculateSizeX(5),
    y: calculateSizeY(5.5),
    size: [100, 100],
    collapsed: true,
  },
  twofourtree: {
    x: calculateSizeX(5),
    y: calculateSizeY(6.5),
    size: [100, 100],
    collapsed: true,
  },

  skiplist: {
    x: calculateSizeX(5),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },

  hashmap: {
    x: calculateSizeX(5),
    y: calculateSizeY(1),
    size: [100, 100],
    collapsed: true,
  },
  externalchaining: {
    x: calculateSizeX(5),
    y: calculateSizeY(1.5),
    size: [100, 100],
    collapsed: true,
  },
  linearprobing: {
    x: calculateSizeX(4.3),
    y: calculateSizeY(1),
    size: [100, 100],
    collapsed: true,
  },
  quadraticprobing: {
    x: calculateSizeX(4.3),
    y: calculateSizeY(1.5),
    size: [100, 100],
    collapsed: true,
  },
  doublehashing: {
    x: calculateSizeX(5),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  priorityqueue: {
    x: calculateSizeX(4.3),
    y: calculateSizeY(2.5),
    size: [100, 100],
    collapsed: true,
  },

  //concepts
  recursion: {
    x: calculateSizeX(3),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
  comparablecomparator: {
    x: calculateSizeX(5),
    y: calculateSizeY(4),
    size: [100, 100],
    collapsed: true,
  },

  //algos
  graph: {
    x: calculateSizeX(2.5),
    y: calculateSizeY(6),
    size: [100, 100],
    collapsed: true,
  },
  prims: {
    x: calculateSizeX(3),
    y: calculateSizeY(6.5),
    size: [100, 100],
    collapsed: true,
  },
  kruskals: {
    x: calculateSizeX(3),
    y: calculateSizeY(6),
    size: [100, 100],
    collapsed: true,
  },
  dijkstra: {
    x: calculateSizeX(3.5),
    y: calculateSizeY(6),
    size: [100, 100],
    collapsed: true,
  },
  dfs: {
    x: calculateSizeX(3.5),
    y: calculateSizeY(6.5),
    size: [100, 100],
    collapsed: true,
  },
  bfs: {
    x: calculateSizeX(2.5),
    y: calculateSizeY(6.5),
    size: [100, 100],
    collapsed: true,
  },
  sorting: {
    x: calculateSizeX(1),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  bubblesort: {
    x: calculateSizeX(1),
    y: calculateSizeY(2.5),
    size: [100, 100],
    collapsed: true,
  },
  lsdradixsort: {
    x: calculateSizeX(1),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  cocktailshakersort: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(2.5),
    size: [100, 100],
    collapsed: true,
  },
  quicksort: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(3),
    size: [100, 100],
    collapsed: true,
  },
  insertionsort: {
    x: calculateSizeX(1),
    y: calculateSizeY(3.5),
    size: [100, 100],
    collapsed: true,
  },
  mergesort: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(3.5),
    size: [100, 100],
    collapsed: true,
  },
  selectionsort: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(2),
    size: [100, 100],
    collapsed: true,
  },
  patternmatching: {
    x: calculateSizeX(1),
    y: calculateSizeY(4.5),
    size: [100, 100],
    collapsed: true,
  },
  bruteforcepatternmatching: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(4.5),
    size: [100, 100],
    collapsed: true,
  },
  rabinkarp: {
    x: calculateSizeX(1),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
  boyermoore: {
    x: calculateSizeX(1),
    y: calculateSizeY(5.5),
    size: [100, 100],
    collapsed: true,
  },
  galilrule: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(5),
    size: [100, 100],
    collapsed: true,
  },
  kmp: {
    x: calculateSizeX(1.5),
    y: calculateSizeY(5.5),
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
