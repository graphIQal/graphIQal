import { useCallback, useContext } from 'react';
import DrawingContext, { DrawingContextInterface } from '../DrawingContext';
import GraphViewContext, {
  GraphViewContextInterface,
} from '../GraphViewContext';
import {
  addNode,
  getLineDataEndpoints,
  updateLine,
} from '../helpers/nodeHelpers';
import { snapToGrid } from '../helpers/snapping';

export type Coord = {
  x: number;
  y: number;
};

export const useDrawingStart = () => {
  const { startNode, setIsDrawing } = useContext(
    DrawingContext
  ) as DrawingContextInterface;
  return useCallback((lineID: string) => {
    startNode.current = lineID;
    setIsDrawing(true);
  }, []);
};

export const useDrawingCanvas = () => {
  return useCallback(
    (event: any, points: Coord[], setPoints: (val: Coord[]) => void) => {
      setPoints([...points, { x: event.clientX, y: event.clientY }]);
    },
    []
  );
};

export const useDrawingEnd = () => {
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
          center[0] - 200 / 2,
          center[1] - 75 / 2
        );
        const newSize = [dimension, dimension];

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
                const arrowStart = calcArrowStart(
                  startPoint,
                  middlePoint,
                  endPoint,
                  func,
                  context
                );

                updateLine(context, 'arrowAdd', func, {
                  arrowStart: arrowStart,
                });
                break;
              }
            }
          }
        }
      }
      setPoints([]);
    },
    [context]
  );
};

export const isCircle = (coords: Coord[]) => {
  let xAvg = 0;
  let yAvg = 0;
  for (const coord in coords) {
    xAvg += coords[coord].x;
    yAvg += coords[coord].y;
  }
  xAvg = xAvg / coords.length;
  yAvg = yAvg / coords.length;
  let avgDist = 0;
  for (const coord in coords) {
    let dx = coords[coord].x - xAvg;
    let dy = coords[coord].y - yAvg;
    avgDist += Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
  avgDist = avgDist / coords.length;
  const min = avgDist * 0.8;
  const max = avgDist * 1.2;
  let countWithin = 0;
  for (const coord in coords) {
    let dx = coords[coord].x - xAvg;
    let dy = coords[coord].y - yAvg;
    let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance >= min && distance <= max) {
      countWithin = countWithin + 1;
    }
  }
  let startPoint = coords[0];
  let endPoint = coords[coords.length - 1];

  const angle = calculateAngle(startPoint, { x: xAvg, y: yAvg }, endPoint);
  return {
    circle: Math.abs(angle) < 90,
    center: [xAvg, yAvg],
    size: avgDist,
  };
};

//helper that calculates angle between three points
export const calculateAngle = (
  startPoint: Coord,
  middlePoint: Coord,
  endPoint: Coord
) => {
  const dotProduct =
    (startPoint.x - middlePoint.x) * (endPoint.x - middlePoint.x) +
    (middlePoint.y - startPoint.y) * (middlePoint.y - endPoint.y);
  let len1 = Math.sqrt(
    Math.pow(startPoint.x - middlePoint.x, 2) +
      Math.pow(startPoint.y - middlePoint.y, 2)
  );
  let len2 = Math.sqrt(
    Math.pow(endPoint.x - middlePoint.x, 2) +
      Math.pow(endPoint.y - middlePoint.y, 2)
  );

  const angle = Math.acos(dotProduct / (len1 * len2));
  return (angle * 180) / Math.PI;
};

export const isArrow = (coords: Coord[]) => {
  const startPoint = coords[0];
  const endPoint = coords[coords.length - 1];
  const middlePoint = coords[Math.floor(coords.length / 2)];
  const angle = calculateAngle(startPoint, middlePoint, endPoint);
  if (angle > 160) {
    return false;
  }
  const angle1 = calculateAngle(middlePoint, startPoint, endPoint);
  const angle2 = calculateAngle(middlePoint, endPoint, startPoint);

  if (angle1 < 90 && angle2 < 90) {
    return true;
  }
};

//calculates which direction the arrow is going in
export const calcArrowStart = (
  startPoint: Coord,
  middlePoint: Coord,
  endPoint: Coord,
  lineID: string,
  context: GraphViewContextInterface | null
) => {
  //get visual information for start and end node
  const { x1, x2, y1, y2, node1, node2 } = getLineDataEndpoints(
    context,
    lineID
  );

  if (!y1 || !y2 || !x1 || !x2 || !node1 || !node2) return;

  if (startPoint.x < middlePoint.x && middlePoint.x < endPoint.x) {
    if (middlePoint.y < startPoint.y || middlePoint.y < endPoint.y) {
      //up arrow
      if (y1 < y2) {
        return node1;
      } else {
        return node2;
      }
    } else {
      //down arrow

      if (y1 < y2) {
        return node2;
      } else {
        return node1;
      }
    }
  } else {
    if (middlePoint.x < startPoint.x || middlePoint.x < endPoint.x) {
      //left arrow
      if (x1 < x2) {
        return node2;
      } else {
        return node1;
      }
    } else {
      //right arrow
      if (x1 < x2) {
        return node1;
      } else {
        return node2;
      }
    }
  }
};
