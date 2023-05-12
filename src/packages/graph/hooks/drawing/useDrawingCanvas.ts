import { useCallback } from 'react';
import { Coord } from './useDrawingEnd';

//As user draws on the canvas
export const useDrawingCanvas = () => {
  return useCallback(
    (event: any, points: Coord[], setPoints: (val: Coord[]) => void) => {
      setPoints([...points, { x: event.clientX, y: event.clientY }]);
    },
    []
  );
};
