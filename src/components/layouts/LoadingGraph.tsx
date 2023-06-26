import React, { useEffect, useRef } from 'react';
import {
  GRID_X_SIZE,
  GRID_Y_SIZE,
} from '../../packages/graph/helpers/snapToGrid';

export const LoadingGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let drawn = false;
  useEffect(() => {
    if (drawn) return;
    const canvasWidth = window.outerWidth;
    const canvasHeight = window.outerHeight;
    const canvasObj = canvasRef.current;
    if (!canvasObj) return;
    const ctx = canvasObj.getContext('2d');

    const ratio = canvasHeight / canvasWidth;
    if (!ctx) return;
    ctx.scale(1, ratio);
    var r = 0.5,
      cw = 12,
      ch = 12;

    for (var x = 0; x < canvasWidth; x += cw) {
      for (var y = 0; y < canvasHeight; y += ch) {
        ctx.fillStyle = `rgb(36, 36, 37, 0.8)`;
        ctx.fillRect(x, y, r, r);
      }
    }
    drawn = true;
  }, [canvasRef, canvasRef.current]);

  return (
    <svg className='animate-pulse' width='100%' height='100%'>
      <pattern
        id='pattern-circles'
        x='0'
        y='0'
        width={GRID_X_SIZE}
        height={GRID_Y_SIZE}
        patternUnits='userSpaceOnUse'
        patternContentUnits='userSpaceOnUse'
      >
        <circle
          id='pattern-circle'
          cx='10'
          cy='10'
          r='1'
          fill='rgb(36, 36, 37, 0.4)'
        ></circle>
      </pattern>

      <rect
        id='rect'
        x='0'
        y='0'
        width='100%'
        height='100%'
        fill='url(#pattern-circles)'
      ></rect>
    </svg>
  );
};
