import { DrawingContextInterface } from '../context/GraphDrawingContext';
import { GraphViewContextInterface } from '../context/GraphViewContext';
import { Coord } from '../hooks/drawing/useDrawingEnd';

export const handleKeyPress = (
  event: any,
  drawingContext: DrawingContextInterface
) => {
  event.stopImmediatePropagation();
  if (
    event.code === 'KeyZ' &&
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey
  ) {
    // redo();
    console.log('redo pressed');
  } else if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    // undo();
    console.log('undo pressed');
  } else if (event.code === 'KeyM') {
  }
};

export const handleEscapeDrawing = (
  event: any,
  drawingContext: DrawingContextInterface,
  setPoints: (val: Coord[]) => void
) => {
  if (event.code === 'KeyM') {
    drawingContext.setIsDrawing(false);
    setPoints([]);
  }
};
