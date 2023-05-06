/**
 * Helper functions for the "canvas" on which each arrow is drawn
 */

import { Coord } from '../graph/hooks/drawingHooks';
import { getDy } from '../graph/hooks/useCanvas';

//Calculates dimensions based on the deltas and box buffers
export const calculateCanvasDimensions = ({
  absDx,
  absDy,
  boundingBoxBuffer,
}: {
  absDx: number;
  absDy: number;
  boundingBoxBuffer: { vertical: number; horizontal: number };
}): {
  canvasWidth: number;
  canvasHeight: number;
} => {
  const canvasWidth = absDx + 2 * boundingBoxBuffer.horizontal;
  const canvasHeight = absDy + 2 * boundingBoxBuffer.vertical;

  return { canvasWidth, canvasHeight };
};

//Detects if a point intersects with the canvas of a line (used to detect which line the arrow is drawn on)
export const isPointInCanvas = (
  point: Coord,
  canvasStartPoint: Coord,
  canvasWidth: number,
  canvasHeight: number
) => {
  if (
    point.x > canvasStartPoint.x &&
    point.x < canvasStartPoint.x + canvasWidth &&
    point.y > canvasStartPoint.y - getDy() &&
    point.y < canvasStartPoint.y - getDy() + canvasHeight
  ) {
    return true;
  }
};
