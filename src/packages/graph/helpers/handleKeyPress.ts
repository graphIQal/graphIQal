import { Coord } from '../hooks/drawing/useDrawingEnd';

export const handleEscapeDrawing = (
  setIsDrawing: (val: boolean) => void,
  setPoints: (val: Coord[]) => void
) => {
  console.log('in listener 4');

  setIsDrawing(false);
  setPoints([]);
};
