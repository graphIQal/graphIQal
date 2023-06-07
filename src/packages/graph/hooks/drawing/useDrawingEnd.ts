/**
 * Hooks and helper for drawing event handling.
 */

import { MutableRefObject, useCallback, useContext } from 'react';
import { addNode } from '../../../../helpers/backend/addNode';
import { updateConnection } from '../../../../helpers/backend/updateConnection';
import DrawingContext, {
  DrawingContextInterface,
} from '../../context/GraphDrawingContext';
import { calcArrowStart, isArrow, isCircle } from '../../helpers/drawingEvents';
import { snapToGrid } from '../../helpers/snapToGrid';
import GraphActionContext, {
  GraphActionContextInterface,
} from '../../context/GraphActionContext';
import { useVerticalOffset } from '../useVerticalOffset';
import {
  useGraphViewAPI,
  useGraphViewData,
} from '../../context/GraphViewContext';

export type Coord = {
  x: number;
  y: number;
};

//for border room for drawing
export const OFFSET = 50;

//When user stops drawing at any point in the canvas except for when completing a line
export const useDrawingEnd = (
  translateX: number,
  translateY: number,
  scale: number
) => {
  const { nodeData_Graph, addAction, nodeVisualData_Graph } =
    useGraphViewData();
  const { changeAlert, changeVisualData_Graph, changeNodeData_Graph } =
    useGraphViewAPI();
  const offset = useVerticalOffset();
  const { setIsDrawing, isPointInCanvasFuncs, numPointsInTriangleFuncs } =
    useContext(DrawingContext) as DrawingContextInterface;

  return useCallback(
    (points: Coord[], setPoints: (val: Coord[]) => void) => {
      setIsDrawing(false);
      if (points.length <= 1) {
        setPoints([]);
        return;
      }
      const { circle, center, size } = isCircle(points);
      if (circle) {
        let dimension = Math.sqrt(Math.pow(size, 2) / 2) * 2;
        const [snappedX, snappedY] = snapToGrid(
          center[0] / scale - 200 / 2 + translateX / scale,
          center[1] / scale + offset / scale - 75 / 2 + translateY / scale
        );
        const newSize = [dimension < 200 ? 200 : dimension, dimension];

        addNode(
          {
            nodeVisualData_Graph,
            changeAlert,
            changeVisualData_Graph,
            addAction,
            changeNodeData_Graph,
            nodeData_Graph,
          },
          newSize,
          snappedX,
          snappedY
        );
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
                  { nodeVisualData_Graph }
                );

                updateConnection(
                  'arrowAdd',
                  func,
                  {
                    arrowStart: arrowStart,
                    arrowEnd: arrowEnd,
                  },
                  {
                    nodeData_Graph,
                    changeNodeData_Graph,
                    addAction,
                    changeAlert,
                  }
                );
                break;
              }
            }
          }
        }
      }
      setPoints([]);
    },
    [
      nodeVisualData_Graph,
      changeAlert,
      changeVisualData_Graph,
      addAction,
      changeNodeData_Graph,
      translateX,
      translateY,
      scale,
    ]
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
