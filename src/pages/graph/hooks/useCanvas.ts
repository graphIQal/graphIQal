import React, { useState, useEffect, useRef, MutableRefObject } from 'react';

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
  }, [points, setPoints]);

  return {
    canvasRef: canvasRef,
    canvasWidth: canvasWidth,
    canvasHeight: canvasHeight,
    points,
    setPoints,
  };
}
