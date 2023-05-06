/**
 * Hooks and helper for drawing event handling.
 */

import { MutableRefObject, useCallback, useContext } from 'react';
import { addNode, updateLine } from '../../../helpers/backend/mutateHelpers';
import DrawingContext, {
  DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphViewContext from '../context/GraphViewContext';
import { calcArrowStart, isArrow, isCircle } from '../helpers/drawingEvents';
import { snapToGrid } from '../helpers/snapping';
import { getDy } from './useCanvas';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../context/GraphActionContext';

export type Coord = {
  x: number;
  y: number;
};

//for border room for drawing
export const OFFSET = 50;

//When user starts drawing
export const useDrawingStart = () => {
  const { startNode, setIsDrawing } = useContext(
    DrawingContext
  ) as DrawingContextInterface;
  return useCallback((lineID: string) => {
    startNode.current = lineID;
    setIsDrawing(true);
  }, []);
};

//As user draws on the canvas
export const useDrawingCanvas = () => {
  return useCallback(
    (event: any, points: Coord[], setPoints: (val: Coord[]) => void) => {
      setPoints([...points, { x: event.clientX, y: event.clientY }]);
    },
    []
  );
};

//When user stops drawing at any point in the canvas except for when completing a line
export const useDrawingEnd = (
  translateX: number,
  translateY: number,
  scale: number
) => {
  const context = useContext(GraphViewContext);
  const { setIsDrawing, isPointInCanvasFuncs, numPointsInTriangleFuncs } =
    useContext(DrawingContext) as DrawingContextInterface;
  return useCallback(
    (points: Coord[], setPoints: (val: Coord[]) => void) => {
      setIsDrawing(false);
      const { circle, center, size } = isCircle(points);

      if (circle) {
        let dimension = Math.sqrt(Math.pow(size, 2) / 2) * 2;
        const [snappedX, snappedY] = snapToGrid(
          center[0] / scale - 200 / 2 / scale + translateX / scale,
          center[1] / scale +
            getDy() / scale -
            75 / 2 / scale +
            translateY / scale
        );
        const newSize = [dimension < 200 ? 200 : dimension, dimension];

        addNode(context, newSize, snappedX, snappedY);
        // addAction({
        //   undo: { id: id, value: null, type: 'ADD' },
        //   redo: { id: id, value: (newNodes)[id], type: 'ADD' },
        // });
      } else {
        if (isArrow(points)) {
          for (let func in isPointInCanvasFuncs.current) {
            const startPoint = points[0];
            const endPoint = points[points.length - 1];
            const middlePoint = points[Math.floor(points.length / 2)];
            if ((isPointInCanvasFuncs.current as any)[func](middlePoint)) {
              const result = (numPointsInTriangleFuncs.current as any)[func](
                startPoint,
                middlePoint,
                endPoint
              );

              if (result > 0) {
                const { arrowStart, arrowEnd } = calcArrowStart(
                  startPoint,
                  middlePoint,
                  endPoint,
                  func,
                  context
                );

                updateLine(context, 'arrowAdd', func, {
                  arrowStart: arrowStart,
                  arrowEnd: arrowEnd,
                });
                break;
              }
            }
          }
        }
      }
      setPoints([]);
    },
    [context, translateX, translateY, scale]
  );
};

//When user stops drawing on another node, it draws a line
export const handleEndPoint = (
  event: any,
  id: string,
  endNode: MutableRefObject<string>,
  setIsDrawing: (val: boolean) => void,
  setPoints: (val: any) => void
) => {
  setPoints([]);
  endNode.current = id;
  setIsDrawing(false);
};

//Setting drawing mode on and off
export const handleDrawingHotkey = (
  event: any,
  drawingMode: boolean,
  setDrawingMode: (val: boolean) => void
) => {
  if (event.code == 'KeyD') {
    setDrawingMode(!drawingMode);
  }
};
