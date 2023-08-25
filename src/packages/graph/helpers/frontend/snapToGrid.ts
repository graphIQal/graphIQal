/**
 * Calculates position of node based on drop position and grid size
 */

export const GRID_X_SIZE = 25;
export const GRID_Y_SIZE = 25;
export function snapToGrid(x: number, y: number): [number, number] {
	const snappedX = Math.round(x / GRID_X_SIZE) * GRID_X_SIZE;
	const snappedY = Math.round(y / GRID_Y_SIZE) * GRID_Y_SIZE;
	return [snappedX, snappedY];
}
