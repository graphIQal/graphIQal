/**
 * Hook that draws on canvas and draws dot grid
 */

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { GRID_X_SIZE, GRID_Y_SIZE } from '../helpers/snapping';
import { usePanAndZoom, useZoomEvents } from './zoomingHooks';

export const canvasWidth = window.outerWidth;
export const canvasHeight = window.outerHeight;

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
  canvasRef: MutableRefObject<any>
) => {
  const [points, setPoints] = useState<Coord[]>([]);

  type Coord = {
    x: number;
    y: number;
  };
  type Line = {
    start: Coord;
    end: Coord;
  };

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
        (points[i] as any).y + getDy(),
        (points[i + 1] as any).x,
        (points[i + 1] as any).y + getDy()
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

//gets vertical offset of canvas
export const getDy = () => {
  const element = document.getElementById('container');
  if (!element) return 0;
  const offsetDifference =
    (element.offsetTop - element.scrollTop + element.clientTop) * -1;
  return offsetDifference;
};
