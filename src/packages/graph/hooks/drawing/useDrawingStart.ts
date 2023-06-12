import { useCallback, MutableRefObject } from 'react';

//When user starts drawing
export const useDrawingStart = (
  startNode: MutableRefObject<any>,
  setIsDrawing: (val: boolean) => void
) => {
  return useCallback((lineID: string) => {
    startNode.current = lineID;
    setIsDrawing(true);
  }, []);
};
