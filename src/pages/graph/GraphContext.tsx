import { createContext, MutableRefObject } from 'react';
import { GraphViewElement } from '../../gql/graphql';
import {
  ConnectionData,
  VisualData,
} from '../../schemas/Data_structures/DS_schema';
import { LineRefs } from './graphTypes';
import { Action } from './hooks/useHistoryState';

export type GraphContextInterface = {
  hideSourceOnDrag: boolean;
  drawingMode: boolean;
  setDrawingMode: (val: boolean) => void;
  canDrag: boolean;
  setCanDrag: (val: boolean) => void;
  parentRef: MutableRefObject<HTMLDivElement | null>;
  lines: LineRefs[];
  setLines: (val: LineRefs[]) => void;

  createNode: (val: any) => any;
  startNode: MutableRefObject<string>;
  endNode: MutableRefObject<string>;
  // addAction: (val: Action) => void;
  isPointInCanvasFuncs: MutableRefObject<
    Map<string, (point: { x: number; y: number }) => boolean>
  >;
  numPointsInTriangleFuncs: MutableRefObject<
    Map<
      string,
      (
        a: { x: number; y: number },
        b: { x: number; y: number },
        c: { x: number; y: number }
      ) => number
    >
  >;
  nodeInView: string;
  setNodeInView: (val: string) => void;
  nodesDisplayed: { [key: string]: ConnectionData };
  setNodesDisplayed: (val: { [key: string]: ConnectionData }) => void;
  nodesVisual: { [key: string]: VisualData };
  setNodesVisual: (val: { [key: string]: VisualData }) => void;
  modalNode: string;
  setModalNode: (val: string) => void;
};

const GraphContext = createContext<GraphContextInterface | null>(null);

export default GraphContext;
