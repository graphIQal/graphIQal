import { Block } from '../../packages/editor/plateTypes';

export type User = {
	id: string;
	account_details: { name: string; email: string };
	home_node: Node;
	homeless_node: Node;
};

type Node = {
	id: string;
	connections: { [key: string]: Connection };
	blocks: Block[];
};

type Connection = {
	// nodes: [Node, Node];
	type: 'IN' | 'DIRECTED' | 'EQUAL';
	content: Block[];
	block_one: {
		id: string;
		all: boolean;
	};
	block_two: {
		id: string;
		all: boolean;
	};
};
