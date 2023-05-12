/**
 * Hook that draws on canvas and draws dot grid
 */

import { MutableRefObject, useContext, useEffect, useState } from 'react';
import ViewContext, {
  ViewContextInterface,
} from '../../../../components/context/ViewContext';
import { GRID_X_SIZE, GRID_Y_SIZE } from '../../helpers/snapToGrid';
import { useVerticalOffset } from '../useVerticalOffset';

export function drawLine(
  ctx: any,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke = 'black',
  width = 1
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.stroke();
}

export const useCanvas = (
  translateX: number,
  translateY: number,
  scale: number,
  canvasRef: MutableRefObject<any>,
  window: Window
) => {
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  const [points, setPoints] = useState<Coord[]>([]);

  type Coord = {
    x: number;
    y: number;
  };

  const { currTab } = useContext(ViewContext) as ViewContextInterface;
  useEffect(() => {
    if (canvasWidth == 0) {
      canvasWidth = window.innerWidth;
    }
    if (canvasHeight == 0) {
      canvasHeight = window.innerHeight;
    }
  }, [window, currTab]);

  const offset = useVerticalOffset();

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    if (points == null) {
      return;
    }
    for (let i = 0; i < points.length - 1; ++i) {
      if (points[i] == null) break;
      drawLine(
        ctx,
        (points[i] as any).x,
        (points[i] as any).y + offset,
        (points[i + 1] as any).x,
        (points[i + 1] as any).y + offset
      );
    }

    // dots
    function drawDots() {
      var r = 1,
        cw = GRID_X_SIZE,
        ch = GRID_Y_SIZE;

      for (var x = 0; x < canvasWidth; x += cw * scale) {
        for (var y = 0; y < canvasHeight; y += ch * scale) {
          ctx.fillStyle = `rgb(36, 36, 37, 0.7)`;
          ctx.fillRect(x - r / 2, y - r / 2, r, r);
        }
      }
    }
    drawDots();
  }, [points, setPoints, scale]);

  return {
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    points,
    setPoints,
  };
};
