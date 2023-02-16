import { createContext, MutableRefObject } from 'react';
import { GraphViewElement } from '../../gql/graphql';
import { LineRefs } from './graphTypes';

export type GraphContextInterface = {
  hideSourceOnDrag: boolean;
  drawingMode: boolean;
  setDrawingMode: (val: boolean) => void;
  canDrag: boolean;
  setCanDrag: (val: boolean) => void;
  parentRef: MutableRefObject<HTMLDivElement | null>;
  nodes: { [key: string]: GraphViewElement };
  setNodes: (val: { [key: string]: GraphViewElement }) => void;
  lines: LineRefs[];
  setLines: (val: LineRefs[]) => void;
  updateSize: (
    id: string | number,
    width: number,
    height: number,
    tag?: string | undefined
  ) => void;
  createNode: (val: any) => any;
};

const GraphContext = createContext<GraphContextInterface | null>(null);

export default GraphContext;
