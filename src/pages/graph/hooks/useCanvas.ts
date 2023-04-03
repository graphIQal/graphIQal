import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import { GRID_X_SIZE, GRID_Y_SIZE } from '../helpers/snapping';

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth;
export const canvasHeight = window.innerHeight;

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

export function useCanvas() {
  const canvasRef = useRef<any>(null);

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

    // drawLine(
    //   ctx,
    //   startCoordinate.x,
    //   startCoordinate.y,
    //   endCoordinate.x,
    //   endCoordinate.y
    // );
    if (points == null) {
      return;
    }
    for (let i = 0; i < points.length - 1; ++i) {
      if (points[i] == null) break;
      drawLine(
        ctx,
        (points[i] as any).x,
        (points[i] as any).y,
        (points[i + 1] as any).x,
        (points[i + 1] as any).y
      );
    }

    //draw dots
    function drawGrid() {
      var cellW = 10,
        cellH = 10;

      // vertical lines
      for (var x = 0; x <= canvasWidth; x += cellW) {
        ctx.moveTo(x, 0); // x, y
        ctx.lineTo(x, canvasHeight);
      }

      // horizontal lines
      for (var y = 0; y <= canvasHeight; y += cellH) {
        ctx.moveTo(0, y); // x, y
        ctx.lineTo(canvasWidth, y);
      }

      ctx.strokeStyle = '#cccccc';
      ctx.stroke();
    }

    // dots
    function drawDots() {
      var r = 1,
        cw = GRID_X_SIZE,
        ch = GRID_Y_SIZE;

      for (var x = 0; x < canvasWidth; x += cw) {
        for (var y = 0; y < canvasHeight; y += ch) {
          ctx.fillStyle = `rgb(36, 36, 37, 0.7)`;
          ctx.fillRect(x - r / 2, y - r / 2, r, r);
        }
      }
    }
    drawDots();
  }, [points, setPoints]);

  return {
    canvasRef: canvasRef,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    points,
    setPoints,
  };
}
