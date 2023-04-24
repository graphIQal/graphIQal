const GRID_SIZE_X = 16;
const SPACING_X = 4;
const X_CELLS = window.innerWidth / convertRemToPixels(GRID_SIZE_X + SPACING_X);

function convertRemToPixels(rem: number) {
	return (
		rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
	);
}
export const calculateSizeX = (cell: number) => {
	return convertRemToPixels((GRID_SIZE_X + SPACING_X) * (cell - 0.95));
};

const GRID_SIZE_Y = 8;
const SPACING_Y = 0;
const Y_CELLS =
	window.innerHeight / convertRemToPixels(GRID_SIZE_Y + SPACING_Y);

export const calculateSizeY = (cell: number) => {
	return convertRemToPixels((GRID_SIZE_Y + SPACING_Y) * (cell - 0.9));
};

// export const sortChronologically = () => {
// 	let newNodes = { ...nodesData };
// 	const incrementX = X_CELLS / chronologicalOrder.length;
// 	for (let i = 0; i < chronologicalOrder.length; ++i) {
// 		const item = chronologicalOrder[i];

// 		(newNodes as any)[item].position.x = calculateSizeX(i * incrementX + 1);
// 	}

// 	for (let i = 0; i < units.unit1.length; ++i) {
// 		let incrementY = Y_CELLS / units.unit1.length;
// 		const incrementX = X_CELLS / chronologicalOrder.length / 2;
// 		const item = units.unit1[i];
// 		(newNodes as any)[item].position.x = calculateSizeX(i * incrementX + 1);
// 		(newNodes as any)[item].position.y = calculateSizeY(i * incrementY + 1);
// 	}
// 	for (let i = 0; i < units.unit2.length; ++i) {
// 		let incrementY = Y_CELLS / units.unit2.length;
// 		const incrementX = X_CELLS / chronologicalOrder.length / 2;
// 		const item = units.unit2[i];
// 		(newNodes as any)[item].position.x = calculateSizeX(
// 			(i * incrementX + 1) * 2.5
// 		);
// 		(newNodes as any)[item].position.y = calculateSizeY(i * incrementY + 1);
// 	}
// 	return newNodes;
// };

// export const nodesData = {
// 	list: {
// 		id: 'list',
// 		data: { title: 'List' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(1),
// 			y: calculateSizeY(3),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	array: {
// 		id: 'array',
// 		data: { title: 'Array' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(3),
// 			y: calculateSizeY(1),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	arraylist: {
// 		id: 'arraylist',
// 		data: { title: 'ArrayList' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(2),
// 			y: calculateSizeY(2),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	linkedlist: {
// 		id: 'linkedlist',
// 		data: { title: 'LinkedList' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(2.5),
// 			y: calculateSizeY(3),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	singlylinkedlist: {
// 		id: 'singlylinkedlist',
// 		data: { title: 'SinglyLinkedList' },
// 		showInParent: true,
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(1),
// 			y: calculateSizeY(1.2),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	doublylinkedlist: {
// 		id: 'doublylinkedlist',
// 		data: { title: 'DoublyLinkedList' },
// 		showInParent: true,
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(1),
// 			y: calculateSizeY(1.7),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	circularsinglylinkedlist: {
// 		id: 'circularsinglylinkedlist',
// 		data: { title: 'CircularSinglyLinkedList' },
// 		showInParent: true,
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(1),
// 			y: calculateSizeY(2.2),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	stack: {
// 		id: 'stack',
// 		data: { title: 'Stack' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(3.7),
// 			y: calculateSizeY(3),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	queue: {
// 		id: 'queue',
// 		data: { title: 'Queue' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(3.7),
// 			y: calculateSizeY(3.5),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},

// 	tree: {
// 		id: 'tree',
// 		data: { title: 'Tree' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(2.5),
// 			y: calculateSizeY(6),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	bst: {
// 		id: 'bst',
// 		data: { title: 'Binary Search Tree' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(4),
// 			y: calculateSizeY(6),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},

// 	twofourtree: {
// 		id: 'twofourtree',
// 		data: { title: '2-4 Tree' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(4),
// 			y: calculateSizeY(7),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	avl: {
// 		id: 'avl',
// 		data: { title: 'AVL' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(5),
// 			y: calculateSizeY(6),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	skiplist: {
// 		id: 'skiplist',
// 		data: { title: 'SkipList' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(5),
// 			y: calculateSizeY(5),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	hashmap: {
// 		id: 'heap',
// 		data: { title: 'Heap' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(5),
// 			y: calculateSizeY(3),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	heap: {
// 		id: 'hashmap',
// 		data: { title: 'HashMap' },
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(5),
// 			y: calculateSizeY(4),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	unit1: {
// 		id: 'unit1',
// 		data: { title: 'Unit 1' },
// 		categorical: true,
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(0),
// 			y: calculateSizeY(0),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	unit2: {
// 		id: 'unit2',
// 		data: { title: 'Unit 2' },
// 		categorical: true,
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(0),
// 			y: calculateSizeY(0),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// 	homework: {
// 		id: 'unit2',
// 		data: { title: 'Unit 2' },
// 		categorical: true,
// 		position: {
// 			index: 0,
// 			x: calculateSizeX(0),
// 			y: calculateSizeY(0),
// 			size: [100, 100],
// 		},
// 		children: [],
// 	},
// };

// export const connectionTypes = [
// 	'Dependency',
// 	'Parent',
// 	'Case',
// 	'Chronological',
// 	'Hidden',
// ];

// export const chronologicalOrder = [
// 	'array',
// 	'list',
// 	'arraylist',
// 	'linkedlist',
// 	'singlylinkedlist',
// 	'doublylinkedlist',
// 	'circularsinglylinkedlist',
// 	'stack',
// 	'queue',
// 	'tree',
// 	'bst',
// 	'heap',
// 	'hashmap',
// 	'skiplist',
// 	'avl',
// 	'twofourtree',
// ];
// export const units = {
// 	unit1: [
// 		'array',
// 		'arraylist',
// 		'list',
// 		'linkedlist',
// 		'singlylinkedlist',
// 		'doublylinkedlist',
// 		'circularsinglylinkedlist',
// 		'stack',
// 		'queue',
// 		'tree',
// 		'bst',
// 	],
// 	unit2: [
// 		'stack',
// 		'queue',
// 		'bst',
// 		'heap',
// 		'hashmap',
// 		'skiplist',
// 		'avl',
// 		'twofourtree',
// 	],
// };

// export const homework = [
// 	'arraylist',
// 	'linkedlist',
// 	'stack',
// 	'queue',
// 	'bst',
// 	'heap',
// 	'hashmap',
// 	'avl',
// ];

// export const adts = ['list', 'tree', 'stack', 'queue', 'map'];
// export const lines = [
// 	{
// 		start: 'array',
// 		end: 'arraylist',
// 		arrowStart: 'array',
// 		type: [0],
// 	},
// 	{
// 		start: 'list',
// 		end: 'arraylist',
// 		arrowStart: 'list',
// 		type: [0],
// 		fromAnchor: 'top center',
// 	},

// 	{
// 		start: 'list',
// 		end: 'linkedlist',
// 		arrowStart: 'list',
// 		type: [0],
// 	},
// 	{
// 		start: 'linkedlist',
// 		end: 'singlylinkedlist',
// 		arrowStart: 'linkedlist',
// 		type: [1],
// 	},
// 	{
// 		start: 'linkedlist',
// 		end: 'doublylinkedlist',
// 		arrowStart: 'linkedlist',
// 		type: [1],
// 	},
// 	{
// 		start: 'linkedlist',
// 		end: 'circularsinglylinkedlist',
// 		arrowStart: 'linkedlist',
// 		type: [1],
// 	},
// 	{
// 		start: 'singlylinkedlist',
// 		end: 'stack',
// 		arrowStart: 'singlylinkedlist',
// 		type: [0],
// 	},
// 	{
// 		start: 'doublylinkedlist',
// 		end: 'queue',
// 		arrowStart: 'doublylinkedlist',
// 		type: [0],
// 	},
// 	{
// 		start: 'array',
// 		end: 'hashmap',
// 		arrowStart: 'array',
// 		type: [0],
// 	},
// 	{
// 		start: 'array',
// 		end: 'heap',
// 		arrowStart: 'array',
// 		type: [0],
// 	},
// 	{
// 		start: 'linkedlist',
// 		end: 'skiplist',
// 		arrowStart: 'linkedlist',
// 		type: [2],
// 	},
// 	{
// 		start: 'tree',
// 		end: 'bst',
// 		arrowStart: 'tree',
// 		type: [0],
// 	},
// 	{
// 		start: 'tree',
// 		end: 'twofourtree',
// 		arrowStart: 'tree',
// 		type: [0],
// 	},
// 	{
// 		start: 'bst',
// 		end: 'avl',
// 		arrowStart: 'bst',
// 		type: [0],
// 	},
// ];

// export const links = {
// 	arraylist: {
// 		content: [
// 			{
// 				linkName: 'Start of Module Videos',
// 				url: 'https://gatech.instructure.com/courses/296880/pages/arraylists?module_item_id=2943154',
// 			},
// 			{
// 				linkName: 'Live Coding',
// 				url: 'https://gatech.instructure.com/courses/296880/files/folder/Resources/Live%20Coding/ArrayList%20Live%20Coding',
// 			},
// 			{
// 				linkName: 'Module Video Slides',
// 				url: 'https://gatech.instructure.com/courses/296880/files/folder/Resources/Module%20Video%20Slides/Module0%261?preview=37911935',
// 			},
// 			{
// 				linkName: 'Saikrishna Slides',
// 				url: 'https://gatech.instructure.com/courses/296880/files/folder/Resources/Saikrishna%20Slides?preview=37912199',
// 			},
// 			{
// 				linkName: 'Adriana Course Notes',
// 				url: 'https://gatech.instructure.com/courses/296880/files/folder/Resources/Additional%20Resources/Adriana%20Course%20Notes?preview=37911339',
// 			},
// 		],
// 		practice: [
// 			{
// 				linkName: 'Extension Worksheet',
// 				url: 'https://gatech.instructure.com/courses/296880/files/folder/Resources/Extension%20Worksheets?preview=38326523',
// 			},
// 			{
// 				linkName: 'Recitation Worksheet',
// 				url: 'https://gatech.instructure.com/courses/296880/files/folder/Resources/Recitation%20Materials/Recitation%20Worksheets?preview=38324977',
// 			},
// 		],
// 	},
// };
