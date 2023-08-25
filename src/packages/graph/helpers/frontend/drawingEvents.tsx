/**
 * Helpers for detecting what is drawn.
 */

import { API, State } from '../../context/GraphViewContext';
import { Coord } from '../../hooks/drawing/useDrawingEnd';
import { getLineEndpointData } from '../backend/gettersConnectionInfo';

export const isCircle = (coords: Coord[]) => {
	let xAvg = 0;
	let yAvg = 0;
	for (const coord in coords) {
		xAvg += coords[coord].x;
		yAvg += coords[coord].y;
	}
	xAvg = xAvg / coords.length;
	yAvg = yAvg / coords.length;
	let avgDist = 0;
	for (const coord in coords) {
		let dx = coords[coord].x - xAvg;
		let dy = coords[coord].y - yAvg;
		avgDist += Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	}
	avgDist = avgDist / coords.length;
	const min = avgDist * 0.8;
	const max = avgDist * 1.2;
	let countWithin = 0;
	for (const coord in coords) {
		let dx = coords[coord].x - xAvg;
		let dy = coords[coord].y - yAvg;
		let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
		if (distance >= min && distance <= max) {
			countWithin = countWithin + 1;
		}
	}
	let startPoint = coords[0];
	let endPoint = coords[coords.length - 1];

	const angle = calculateAngle(startPoint, { x: xAvg, y: yAvg }, endPoint);
	return {
		circle: Math.abs(angle) < 90,
		center: [xAvg, yAvg],
		size: avgDist,
	};
};

//helper that calculates angle between three points
export const calculateAngle = (
	startPoint: Coord,
	middlePoint: Coord,
	endPoint: Coord
) => {
	const dotProduct =
		(startPoint.x - middlePoint.x) * (endPoint.x - middlePoint.x) +
		(middlePoint.y - startPoint.y) * (middlePoint.y - endPoint.y);
	let len1 = Math.sqrt(
		Math.pow(startPoint.x - middlePoint.x, 2) +
			Math.pow(startPoint.y - middlePoint.y, 2)
	);
	let len2 = Math.sqrt(
		Math.pow(endPoint.x - middlePoint.x, 2) +
			Math.pow(endPoint.y - middlePoint.y, 2)
	);

	const angle = Math.acos(dotProduct / (len1 * len2));
	return (angle * 180) / Math.PI;
};

export const isArrow = (coords: Coord[]) => {
	const startPoint = coords[0];
	const endPoint = coords[coords.length - 1];
	const middlePoint = coords[Math.floor(coords.length / 2)];
	const angle = calculateAngle(startPoint, middlePoint, endPoint);
	if (angle > 160) {
		return false;
	}
	const angle1 = calculateAngle(middlePoint, startPoint, endPoint);
	const angle2 = calculateAngle(middlePoint, endPoint, startPoint);

	if (angle1 < 90 && angle2 < 90) {
		return true;
	}
};

//calculates which direction the arrow is going in
export const calcArrowStart = (
	startPoint: Coord,
	middlePoint: Coord,
	endPoint: Coord,
	lineID: string,
	context: Partial<State & API>
) => {
	//get visual information for start and end node
	const { x1, x2, y1, y2, node1, node2 } = getLineEndpointData(
		context,
		lineID
	);

	if (!y1 || !y2 || !x1 || !x2 || !node1 || !node2)
		return { arrowStart: node1, arrowEnd: node2 };
	let start = node1;
	if (startPoint.x < middlePoint.x && middlePoint.x < endPoint.x) {
		if (middlePoint.y < startPoint.y || middlePoint.y < endPoint.y) {
			//up arrow
			if (y1 < y2) {
				start = node1;
			} else {
				start = node2;
			}
		} else {
			//down arrow

			if (y1 < y2) {
				start = node2;
			} else {
				start = node1;
			}
		}
	} else {
		if (middlePoint.x < startPoint.x || middlePoint.x < endPoint.x) {
			//left arrow
			if (x1 < x2) {
				start = node2;
			} else {
				start = node1;
			}
		} else {
			//right arrow
			if (x1 < x2) {
				start = node1;
			} else {
				start = node2;
			}
		}
	}
	return { arrowStart: start, arrowEnd: node1 == start ? node2 : node1 };
};
