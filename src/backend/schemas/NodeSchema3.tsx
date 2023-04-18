// import { Block } from '../../packages/editor/plateTypes';

export type Node = {
	id: string;
	blocks: Block[];
	title: string;

	// Connections
	// connections: { [key: string]: Connection };
	children: { [key: string]: Connection };
	parents: { [key: string]: Connection };
	siblings: { [key: string]: Connection };

	// Uncommon Connections
};

// Possibility for Project Node
// Project Node is one where the schemas, custom relationships, etc. Live in. I don't know if this fully solves any problems
// because we will still have to figure out whether something will fit under the project.

type Block = {
	id: string;
	type: string;
	children: BlockChildren[];
};

type BlockChildren = CustomText | Block;

type CustomText = {
	text: string;
	bold?: Boolean;
	italics?: Boolean;
	underline?: Boolean;
};

type Connection = {
	// nodes: [Node, Node];
	type: 'IN' | 'IS' | 'EQUAL';
	content: Block[];
	block_one: {
		id?: string;
		all: boolean;
	};
	block_two: {
		id?: string;
		all: boolean;
	};
};
