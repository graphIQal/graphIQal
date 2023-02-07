export type CustomText = {
	text: string;
	bold?: boolean;
	italics?: boolean;
	text_type: 'text' | 'h1' | 'h2' | 'h3';
};

type Block = {
	id: string;
	children: CustomText[];
};

type Connection = {
	id: string;
	title: string;
	content: Block[];
	nodes: [string, string];
	connection_type: 'parent' | 'relevant';
};

type DocumentView = {
	node: string;
	elements: string[];
};

type GraphView = {
	node: string;
	title: string;
	elements: {
		[key: string]: {
			key: string;
			x: number;
			y: number;
			size: [number, number];
			type: 'block' | 'connection';
		};
	};
};

type Node = {
	title: string;
	uid: string;
	blocks: { [key: string]: Block };
	connections: { [key: string]: Connection };
	// if we want document to be view - vvv
	// document:string
	document: DocumentView;
	navigation: (DocumentView | GraphView)[];
};

type User = {
	id: string;
	metadata: { name: string; email: string };
	home_node: Node;
	homeless_node: Node;
};

export default Node;
