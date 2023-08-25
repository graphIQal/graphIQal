import { DrawingContextInterface } from '../../context/GraphDrawingContext';
import { Coord } from '../../hooks/drawing/useDrawingEnd';

export const handleEscapeDrawing = (
	drawingContext: DrawingContextInterface,
	setPoints: (val: Coord[]) => void
) => {
	console.log('in listener 4');

	drawingContext.setIsDrawing(false);
	setPoints([]);
};
