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
  arrowStart: string | null;
};
