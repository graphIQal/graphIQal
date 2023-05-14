/*
Context used for drawing functionalities including nodes (circles), lines, and arrows.
*/

import { createContext, MutableRefObject } from 'react';
import { Coord } from '../hooks/drawing/useDrawingEnd';

export type DrawingContextInterface = {
  startNode: MutableRefObject<string>; //Ref of node that line is drawn from
  endNode: MutableRefObject<string>; //Ref of node that line is drawn to
  isPointInCanvasFuncs: MutableRefObject<
    Map<string, (point: { x: number; y: number }) => boolean>
  >; //Functions for each line drawn on the screen that determine whether an arrow is in its canvas
  numPointsInTriangleFuncs: MutableRefObject<
    Map<
      string,
      (
        a: { x: number; y: number },
        b: { x: number; y: number },
        c: { x: number; y: number }
      ) => number
    >
  >; //Functions for each line that counts the number of points on a line that lie in the triangle formed by an arrow drawn

  drawingMode: boolean; //Whether user can draw on the canvas, disabled on drag/resize, etc.
  setDrawingMode: (val: boolean) => void;
  isDrawing: boolean;
  setIsDrawing: (val: boolean) => void; //whether user is currently drawing
};

const DrawingContext = createContext<DrawingContextInterface | null>(null);

export default DrawingContext;
