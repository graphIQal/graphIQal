export const ConnectionTypes = {
  IN: 'Includes',
  DEPENDS_ON: 'Dependency',
  FOLLOWS: 'Chronology',
  RELATED: 'No Type',
};

export type ConnectionData = {
  content: string[]; //ids of the blocks of the node's data that are contained in this connection
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
};

export type GraphNodeData = {
  width: {
    low: number;
  };
  height: {
    low: number;
  };
  x: {
    low: number;
  };
  y: {
    low: number;
  };
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
