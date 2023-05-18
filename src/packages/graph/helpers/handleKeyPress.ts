import { GraphView } from '../../../schemas/Data_structures/DS_schema';
import { DrawingContextInterface } from '../context/GraphDrawingContext';
import { GraphViewContextInterface } from '../context/GraphViewContext';
import { Coord } from '../hooks/drawing/useDrawingEnd';

export const handleEscapeDrawing = (
  drawingContext: DrawingContextInterface,
  setPoints: (val: Coord[]) => void
) => {
  if (!drawingContext.isDrawing) return;
  drawingContext.setIsDrawing(false);
  setPoints([]);
};
