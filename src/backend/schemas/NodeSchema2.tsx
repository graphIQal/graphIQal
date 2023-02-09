// import { Block } from '../../packages/editor/plateTypes';

export type User = {
	id: string;
	account_details: { name: string; email: string; username: string };
	home_node: Node;
	homeless_node: Node;
};

type Node = {
	id: string;
	// connections: { [key: string]: Connection };
	children: { [key: string]: Connection };
	connections: { [key: string]: Connection };
	equal: { [key: string]: Connection };
	blocks: Block[];
	// graphView: { [key: string]: Block[] };
};

type Block = {
	id: string;
	type: string;
	children: BlockChildren[];
};

type CustomText = {
	text: string;
	bold?: Boolean;
	italics?: Boolean;
	underline?: Boolean;
};

type BlockChildren = CustomText | Block;

type Connection = {
	// nodes: [Node, Node];
	type: 'IN' | 'DIRECTED' | 'EQUAL';
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
