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
  const [coordinates, setCoordinates] = useState<any>([]);

  type Coord = {
    x: number;
    y: number;
  };
  type Line = {
    start: Coord;
    end: Coord;
  };
  const [lines, setLines] = useState<Line[]>([]);
  const lineRef = useRef(lines);
  const setLineAll = (data: Line[]) => {
    lineRef.current = data;
    setLines(data);
  };

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw all coordinates held in state
    for (const line in lineRef.current) {
      drawLine(
        ctx,
        lines[line].start.x,
        lines[line].start.y,
        lines[line].end.x,
        lines[line].end.y
      );
    }
  }, [lines, setLines, lineRef, setLineAll]);

  return [
    coordinates,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
    lines,
    setLineAll,
  ];
}
