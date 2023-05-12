import { useContext, useCallback } from 'react';
import DrawingContext, {
  DrawingContextInterface,
} from '../../context/GraphDrawingContext';
import { Coord } from './useDrawingEnd';

//When user starts drawing
export const useDrawingStart = () => {
  const { startNode, setIsDrawing } = useContext(
    DrawingContext
  ) as DrawingContextInterface;
  return useCallback((lineID: string) => {
    startNode.current = lineID;
    setIsDrawing(true);
  }, []);
};
