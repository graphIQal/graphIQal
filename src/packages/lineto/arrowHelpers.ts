/**
 * Helper functions for the arrow drawing
 */

import { Coord } from '../graph/hooks/drawingHooks';
import { getDy } from '../graph/hooks/useCanvas';

//Calculates delta and absolute delta between two given points
export const calculateDeltas = (
  x0: number,
  y0: number,
  x1: number,
  y1: number
): {
  dx: number;
  dy: number;
  absDx: number;
  absDy: number;
} => {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  return { dx, dy, absDx, absDy };
};

//Calculates control points points (bezier curve) of the arrow given the deltas and anchors
export const calculateControlPoints = ({
  absDx,
  absDy,
  dx,
  dy,
  anchor0,
  anchor1,
}: {
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
  anchor0: any;
  anchor1: any;
}): { p1: Coord; p2: Coord; p3: Coord; p4: Coord } => {
  let startPointX = 0;
  let startPointY = 0;
  let endPointX = absDx;
  let endPointY = absDy;
  if (dx < 0) [startPointX, endPointX] = [endPointX, startPointX];
  if (dy < 0) [startPointY, endPointY] = [endPointY, startPointY];
  if (anchor0 == undefined) {
    return {
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 0 },
      p3: { x: 0, y: 0 },
      p4: { x: 0, y: 0 },
    };
  }

  const fixedLineInflectionConstsant = 40;

  const p1 = {
    x: startPointX,
    y: startPointY,
  };
  const p2 = {
    x: startPointX,
    y: startPointY,
  };
  const p3 = {
    x: endPointX,
    y: endPointY,
  };
  const p4 = {
    x: endPointX,
    y: endPointY,
  };

  const offsetY = anchor0.y == 0.5 ? 0 : fixedLineInflectionConstsant;
  const offsetX = anchor0.y == 0.5 ? fixedLineInflectionConstsant : 0;
  if (dy >= 0) {
    p2.y += offsetY;
    p3.y -= offsetY;
  } else {
    p2.y -= offsetY;
    p3.y += offsetY;
  }

  if (dx >= 0) {
    p2.x += offsetX;
    p3.x -= offsetX;
  } else {
    p2.x -= offsetX;
    p3.x += offsetX;
  }

  return { p1, p2, p3, p4 };
};

//Calculates the control points of the Bezier curve with the buffer of the bounding box so it won't be cut off
export const calculateControlPointsWithBuffer = ({
  boundingBoxElementsBuffer,
  absDx,
  absDy,
  dx,
  dy,
  anchor0,
  anchor1,
}: {
  boundingBoxElementsBuffer: number;
  absDx: number;
  absDy: number;
  dx: number;
  dy: number;
  anchor0: any;
  anchor1: any;
}): {
  p1: Coord;
  p2: Coord;
  p3: Coord;
  p4: Coord;
  boundingBoxBuffer: {
    vertical: number;
    horizontal: number;
  };
} => {
  const { p1, p2, p3, p4 } = calculateControlPoints({
    absDx,
    absDy,
    dx,
    dy,
    anchor0,
    anchor1,
  });

  const topBorder = Math.min(p1.y, p2.y, p3.y, p4.y);
  const bottomBorder = Math.max(p1.y, p2.y, p3.y, p4.y);
  const leftBorder = Math.min(p1.x, p2.x, p3.x, p4.x);
  const rightBorder = Math.max(p1.x, p2.x, p3.x, p4.x);

  const verticalBuffer =
    (bottomBorder - topBorder - absDy) / 2 + boundingBoxElementsBuffer;
  const horizontalBuffer =
    (rightBorder - leftBorder - absDx) / 2 + boundingBoxElementsBuffer;

  const boundingBoxBuffer = {
    vertical: verticalBuffer,
    horizontal: horizontalBuffer,
  };

  return {
    p1: {
      x: p1.x + horizontalBuffer,
      y: p1.y + verticalBuffer,
    },
    p2: {
      x: p2.x + horizontalBuffer,
      y: p2.y + verticalBuffer,
    },
    p3: {
      x: p3.x + horizontalBuffer,
      y: p3.y + verticalBuffer,
    },
    p4: {
      x: p4.x + horizontalBuffer,
      y: p4.y + verticalBuffer,
    },
    boundingBoxBuffer,
  };
};

//Calculates translation and rotation of arrow given a control point, the endpoint, and the size of the arrow head
export const calculateTransformArrow = ({
  p3,
  p4,
  arrowHeadEndingSize,
}: {
  p3: Coord;
  p4: Coord;
  arrowHeadEndingSize: number;
}): {
  angle: number;
  x: number;
  y: number;
} => {
  const dy = p4.y - p3.y;
  const dx = p4.x - p3.x;

  let angle = (Math.atan(dy / dx) * 180) / Math.PI;
  if (p3.x > p4.x) {
    angle = 180;
  }
  let x;
  let y;
  if (angle == 0) {
    x = p4.x - arrowHeadEndingSize;
    y = p4.y - arrowHeadEndingSize / 2;
  } else if (angle == -90) {
    x = p4.x - arrowHeadEndingSize / 2;
    y = p4.y + arrowHeadEndingSize;
  } else if (angle == 180) {
    x = p4.x + arrowHeadEndingSize;
    y = p4.y + arrowHeadEndingSize / 2;
  } else {
    x = p4.x + arrowHeadEndingSize / 2;
    y = p4.y - arrowHeadEndingSize;
  }

  return { angle: angle, x: x, y: y };
};

//Calculates the number of points of the triangle formed by an arrow that intersect a line to judge whether arrow belongs to that line
export const numPointsInTriangle = (
  a: Coord,
  b: Coord,
  c: Coord,
  points: Coord[]
) => {
  const AB = { x: b.x - a.x, y: b.y - a.y };
  const AC = { x: c.x - a.x, y: c.y - a.y };
  const BC = { x: c.x - b.x, y: c.y - b.y };
  let numPoints = 0;
  for (let p in points) {
    let point = points[p];
    const AP = { x: point.x - a.x, y: point.y - getDy() - a.y };
    const thirdTermABxAPisPositive = AB.x * AP.y - AB.y * AP.x > 0;
    const thirdTermACxAPisPositive = AC.x * AP.y - AC.y * AP.x > 0;

    if (thirdTermACxAPisPositive == thirdTermABxAPisPositive) continue;

    const BP = { x: point.x - b.x, y: point.y - getDy() - b.y };
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0;

    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositive) continue;

    ++numPoints;
  }
  return numPoints;
};
