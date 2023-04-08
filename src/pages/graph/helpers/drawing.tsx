import { MutableRefObject } from 'react';
import { VisualData } from '../../../schemas/Data_structures/DS_schema';
import { Action } from '../hooks/useHistoryState';
import { snapToGrid } from './snapping';
export type Coord = {
  x: number;
  y: number;
};
//for border room for drawing
export const OFFSET = 50;

//drawing functions
export const handleStartPoint = (
  id: string,
  startNode: MutableRefObject<string>,
  setIsDrawing: (val: boolean) => void
) => {
  startNode.current = id;
  setIsDrawing(true);
};

export const handleDrawing = (
  event: any,
  points: Coord[],
  setPoints: (val: Coord[]) => void
) => {
  setPoints([...points, { x: event.clientX, y: event.clientY }]);
};

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

//checks if what is drawn is a circle or an arrow or neither
export const handleDrawingEnd = (
  setIsDrawing: (val: any) => void,
  points: Coord[],
  setPoints: (val: Coord[]) => void,
  nodes: { [key: string]: VisualData },
  setNodes: (val: { [key: string]: VisualData }) => void,
  // addAction: (val: Action) => void,
  isPointInCanvasFuncs: MutableRefObject<
    Map<string, (point: { x: number; y: number }) => boolean>
  >,
  numPointsInTriangleFuncs: MutableRefObject<
    Map<
      string,
      (
        a: { x: number; y: number },
        b: { x: number; y: number },
        c: { x: number; y: number }
      ) => number
    >
  >,
  lines: any[],
  setLines: (val: any[]) => void
) => {
  setIsDrawing(false);
  const { circle, center, size } = isCircle(points);
  const ids = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
  ];
  if (circle) {
    let newNodes = { ...nodes };
    let dimension = Math.sqrt(Math.pow(size, 2) / 2) * 2;
    let id = ids[Object.keys(nodes).length + 1];
    const [snappedX, snappedY] = snapToGrid(
      center[0] - 200 / 2,
      center[1] - 75 / 2
    );
    (newNodes as any)[id] = {
      id: id,
      graphNode: {
        index: 0,
        x: snappedX,
        y: snappedY,
        // size: [dimension, dimension],
        size: [200, 75],
      },
    };
    setNodes(newNodes);
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
            const newLines = [...lines];
            const arrowStart = calcArrowStart(
              startPoint,
              middlePoint,
              endPoint,
              nodes[newLines[func as unknown as number].start],
              nodes[newLines[func as unknown as number].end]
            );

            newLines[func as unknown as number].arrowStart = arrowStart;
            setLines(newLines);
            break;
          }
        }
      }
    }
  }
  setPoints([]);
};

//calculates which direction the arrow is going in
export const calcArrowStart = (
  startPoint: Coord,
  middlePoint: Coord,
  endPoint: Coord,
  startNode: any,
  endNode: any
) => {
  const x1 = startNode.graphNode.x;
  const y1 = startNode.graphNode.y;
  const x2 = endNode.graphNode.x;
  const y2 = endNode.graphNode.y;

  if (startPoint.x < middlePoint.x && middlePoint.x < endPoint.x) {
    if (middlePoint.y < startPoint.y || middlePoint.y < endPoint.y) {
      //up arrow
      if (y1 < y2) {
        return startNode;
      } else {
        return endNode;
      }
    } else {
      //down arrow

      if (y1 < y2) {
        return endNode;
      } else {
        return startNode;
      }
    }
  } else {
    if (middlePoint.x < startPoint.x || middlePoint.x < endPoint.x) {
      //left arrow
      if (x1 < x2) {
        return endNode;
      } else {
        return startNode;
      }
    } else {
      //right arrow
      if (x1 < x2) {
        return startNode;
      } else {
        return endNode;
      }
    }
  }
};

export const handleDrawingHotkey = (
  event: any,
  drawingMode: boolean,
  setDrawingMode: (val: boolean) => void
) => {
  if (event.code == 'KeyD') {
    setDrawingMode(!drawingMode);
  }
};
