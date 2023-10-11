export type ConnectionData = {
	content: string[] | string; //ids of the blocks of the node's data that are contained in this connection
	startNode: string;
	endNode: string;
	type: string;
};

export type NodeData = {
	id: string;
	title: string;
	connections: { [key: string]: ConnectionData };
	icon: string;
	color: string;
	document?: string;
	[key: string]: any;
};

export type GraphNodeData = {
	width: number;
	height: number;
	x: number;
	y: number;
	collapsed?: boolean;
	categorizing_node: string; // which icon and color do we display? If its own, it will be its own ID, if any of its parents, it'll be that parent's ID
};

export interface DragItemGraph {
	/**
	 * Required to identify the node.
	 */
	id: string;
	left: number;
	top: number;
	width: number;
	height: number;
}

export type LineRefs = {
	start: string;
	end: string;
	arrowStart: string | null; // unused atm
};
