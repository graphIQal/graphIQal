import { ConnectionData } from '../../packages/graph/graphTypes';

//DATA
export type Block = {
  id: string;
  content: string;
};

export type Node = {
  title: string;
  id: string;
  blocks: string[]; // each string is an ID of a block, which is sa resource or text
  connections: { [keyCell: string]: ConnectionData };
  categorical?: boolean;
};

//VISUAL
export type GraphView = {
  node: string;
  title: string;
  elements: { [keyCell: string]: VisualData };
};

export type VisualData = {
  x?: number;
  y?: number;
  xCell: number;
  yCell: number;
  size: number[];
  collapsed: boolean;
  z?: number;
};

export const ConnectionTypes = {
  IN: 'Includes',
  DEPENDS_ON: 'Dependency',
  FOLLOWS: 'Chronology',
  RELATED: 'No Type',
};

export const ids = [
  'homenode',
  'course_topics',
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

  //adts
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
export const titles: { [keyCell: string]: string } = {
  homenode: 'Homenode',
  course_topics: 'Course Topics',
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

//key = where arrow ends, values = where arrow starts (each array represents the things that the key depends on
export const dependencies: { [keyCell: string]: string[] } = {
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
  course_topics: {
    title: 'Home',
    id: 'homenode',
    blocks: [],
    connections: {},
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

export let graphNodes: { [keyCell: string]: VisualData } = {
  //
  course_topics: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  data_structures: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  adts: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  concepts: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  algorithms: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  //

  //
  study_categories: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  homework: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },

  content_learning: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  exam_prep: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  recitation: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  further_reading: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },

  //
  exams: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  exam1: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  exam2: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },
  exam3: {
    xCell: 0,
    yCell: 0,
    size: [150, 50],
    collapsed: true,
  },

  //adts
  list: {
    xCell: 2.3,
    yCell: 3,
    size: [150, 50],
    collapsed: true,
  },
  tree: {
    xCell: 3.7,
    yCell: 5,
    size: [150, 50],
    collapsed: true,
  },
  stack: {
    xCell: 3.7,
    yCell: 3,
    size: [150, 50],
    collapsed: true,
  },
  queue: {
    xCell: 3.7,
    yCell: 3.5,
    size: [150, 50],
    collapsed: true,
  },
  dequeue: {
    xCell: 3.7,
    yCell: 4,
    size: [150, 50],
    collapsed: true,
  },
  map: {
    xCell: 3.7,
    yCell: 1,
    size: [150, 50],
    collapsed: true,
  },

  //data structures
  array: {
    xCell: 3,
    yCell: 1,
    size: [150, 50],
    collapsed: true,
  },
  arraylist: {
    xCell: 2.3,
    yCell: 2,
    size: [150, 50],
    collapsed: true,
  },
  linkedlist: {
    xCell: 3,
    yCell: 2,
    size: [150, 50],
    collapsed: true,
  },
  singlylinkedlist: {
    xCell: 3,
    yCell: 3,
    size: [150, 50],
    collapsed: true,
  },
  doublylinkedlist: {
    xCell: 3,
    yCell: 3.5,
    size: [150, 50],
    collapsed: true,
  },
  circularsinglylinkedlist: {
    xCell: 3,
    yCell: 4,
    size: [150, 50],
    collapsed: true,
  },

  binarytree: {
    xCell: 4.5,
    yCell: 5,
    size: [150, 50],
    collapsed: true,
  },
  bst: {
    xCell: 5,
    yCell: 5,
    size: [150, 50],
    collapsed: true,
  },
  heap: {
    xCell: 4.5,
    yCell: 5.5,
    size: [150, 50],
    collapsed: true,
  },
  avl: {
    xCell: 5,
    yCell: 5.5,
    size: [150, 50],
    collapsed: true,
  },
  twofourtree: {
    xCell: 5,
    yCell: 6.5,
    size: [150, 50],
    collapsed: true,
  },

  skiplist: {
    xCell: 5,
    yCell: 3,
    size: [150, 50],
    collapsed: true,
  },

  hashmap: {
    xCell: 5,
    yCell: 1,
    size: [150, 50],
    collapsed: true,
  },
  externalchaining: {
    xCell: 5,
    yCell: 1.5,
    size: [150, 50],
    collapsed: true,
  },
  linearprobing: {
    xCell: 4.3,
    yCell: 1,
    size: [150, 50],
    collapsed: true,
  },
  quadraticprobing: {
    xCell: 4.3,
    yCell: 1.5,
    size: [150, 50],
    collapsed: true,
  },
  doublehashing: {
    xCell: 5,
    yCell: 2,
    size: [150, 50],
    collapsed: true,
  },
  priorityqueue: {
    xCell: 4.3,
    yCell: 2.5,
    size: [150, 50],
    collapsed: true,
  },

  //concepts
  recursion: {
    xCell: 3,
    yCell: 5,
    size: [150, 50],
    collapsed: true,
  },
  comparablecomparator: {
    xCell: 5,
    yCell: 4,
    size: [150, 50],
    collapsed: true,
  },

  //algos
  graph: {
    xCell: 2.5,
    yCell: 6,
    size: [150, 50],
    collapsed: true,
  },
  prims: {
    xCell: 3,
    yCell: 6.5,
    size: [150, 50],
    collapsed: true,
  },
  kruskals: {
    xCell: 3,
    yCell: 6,
    size: [150, 50],
    collapsed: true,
  },
  dijkstra: {
    xCell: 3.5,
    yCell: 6,
    size: [150, 50],
    collapsed: true,
  },
  dfs: {
    xCell: 3.5,
    yCell: 6.5,
    size: [150, 50],
    collapsed: true,
  },
  bfs: {
    xCell: 2.5,
    yCell: 6.5,
    size: [150, 50],
    collapsed: true,
  },
  sorting: {
    xCell: 1,
    yCell: 2,
    size: [150, 50],
    collapsed: true,
  },
  bubblesort: {
    xCell: 1,
    yCell: 2.5,
    size: [150, 50],
    collapsed: true,
  },
  lsdradixsort: {
    xCell: 1,
    yCell: 3,
    size: [150, 50],
    collapsed: true,
  },
  cocktailshakersort: {
    xCell: 1.5,
    yCell: 2.5,
    size: [150, 50],
    collapsed: true,
  },
  quicksort: {
    xCell: 1.5,
    yCell: 3,
    size: [150, 50],
    collapsed: true,
  },
  insertionsort: {
    xCell: 1,
    yCell: 3.5,
    size: [150, 50],
    collapsed: true,
  },
  mergesort: {
    xCell: 1.5,
    yCell: 3.5,
    size: [150, 50],
    collapsed: true,
  },
  selectionsort: {
    xCell: 1.5,
    yCell: 2,
    size: [150, 50],
    collapsed: true,
  },
  patternmatching: {
    xCell: 1,
    yCell: 4.5,
    size: [150, 50],
    collapsed: true,
  },
  bruteforcepatternmatching: {
    xCell: 1.5,
    yCell: 4.5,
    size: [150, 50],
    collapsed: true,
  },
  rabinkarp: {
    xCell: 1,
    yCell: 5,
    size: [150, 50],
    collapsed: true,
  },
  boyermoore: {
    xCell: 1,
    yCell: 5.5,
    size: [150, 50],
    collapsed: true,
  },
  galilrule: {
    xCell: 1.5,
    yCell: 5,
    size: [150, 50],
    collapsed: true,
  },
  kmp: {
    xCell: 1.5,
    yCell: 5.5,
    size: [150, 50],
    collapsed: true,
  },
};

export const resources: { [keyCell: string]: Block } = {
  arraylist_saikrishna: {
    id: 'arraylist_saikrishna',
    content:
      '[Start of Module Videos](https://gatech.instructure.com/courses/296880/pages/arraylists?module_item_id=2943154',
  },
  linkedlist_adriana_notes: {
    id: 'linkedlist_adriana_notes',
    content:
      '[Adriana Course Notes](https://gatech.instructure.com/courses/296880/files/folder/Resources/Additional%20Resources/Adriana%20Course%20Notes?preview=37911339',
  },
};
