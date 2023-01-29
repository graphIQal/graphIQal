import React, { useState, useEffect, useRef } from 'react';

// Path2D for a Heart SVG
const heartSVG =
  'M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z';
const SVG_PATH = new Path2D(heartSVG);

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 80;
export const canvasWidth = window.innerWidth * 0.5;
export const canvasHeight = window.innerHeight * 0.5;

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
  const [startPoints, setStartPoints] = useState<any>([]);
  const [endPoints, setEndPoints] = useState<any>([]);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw all coordinates held in state

    for (const startPoint in startPoints) {
      drawLine(
        ctx,
        startPoints[startPoint].x,
        startPoints[startPoint].y,
        endPoints[startPoint].x + 10,
        endPoints[startPoint].y + 10
      );
    }
  }, [endPoints]);

  return [
    coordinates,
    setCoordinates,
    canvasRef,
    canvasWidth,
    canvasHeight,
    startPoints,
    setStartPoints,
    endPoints,
    setEndPoints,
  ];
}
