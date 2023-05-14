/**
 * Display of nodes and lines connecting them in "mind map" style
 */
import React, { useContext } from 'react';
import LineTo from '../lineto/LineTo';

import { ItemProps } from '../../../components/organisms/Dropdown';
import {
	getConnectionType,
	getIconAndColor,
	isLineDirectional,
} from '../../../helpers/backend/gettersConnectionInfo';

import { updateConnection } from '../../../helpers/backend/updateConnection';
import DrawingContext, {
	DrawingContextInterface,
} from '../context/GraphDrawingContext';
import GraphViewContext, {
	GraphViewContextInterface,
} from '../context/GraphViewContext';
import GraphEditor from './GraphEditor';
import { GraphNode } from './GraphNode';
import { deleteConnection } from '../../../helpers/backend/deleteConnection';
import { useDrawingCanvas } from '../hooks/drawing/useDrawingCanvas';
import { handleEndPoint } from '../hooks/drawing/useDrawingEnd';
import { useDrawingStart } from '../hooks/drawing/useDrawingStart';
import { ConnectionTypesMap } from '../graphTypes';

type MindMapProps = {
	points: any;
	setPoints: (val: any) => void;
	startPos: any;
	translateX: number;
	translateY: number;
	scale: number;
};
export const GraphMindMapView: React.FC<MindMapProps> = ({
	points,
	setPoints,
	startPos,
	translateX,
	translateY,
	scale,
}) => {
	const handleDrawing = useDrawingCanvas();
	const handleStartPoint = useDrawingStart();

	const viewContext = useContext(
		GraphViewContext
	) as GraphViewContextInterface;

	const { nodeData_Graph, nodeVisualData_Graph, setnodeVisualData_Graph } =
		viewContext;

	const getDropdownItems = (from: string, to: string) => {
		let activeIndex = 0;
		const items: ItemProps[] = [];
		Object.keys(ConnectionTypesMap).map((connection: string, i: number) => {
			items.push({
				text: (ConnectionTypesMap as any)[connection],
				onPress: () =>
					updateConnection(viewContext, 'type', '', {
						start: from,
						end: to,
						newType: connection,
					}),
			});
			if (getConnectionType(from, to, viewContext) == connection) {
				activeIndex = i;
			}
		});
		if (getConnectionType(from, to, viewContext) != 'RELATED') {
			items.push({
				text: 'Reverse Connection',
				onPress: () =>
					updateConnection(viewContext, 'reverse', '', {
						arrowStart: to,
						arrowEnd: from,
					}),
			});
		}
		items.push({
			text: 'Delete Connection',
			onPress: () => deleteConnection(from, to, viewContext),
			icon: 'remove',
		});

		return { items, activeIndex };
	};

	const { startNode, endNode, drawingMode, isDrawing, setIsDrawing } =
		useContext(DrawingContext) as DrawingContextInterface;

	return (
		<div className='relative' id={'container' + viewContext.graphViewId}>
			{Object.keys(nodeData_Graph).map(function (node, i) {
				return Object.keys(nodeData_Graph[node].connections).map(
					(line, j) => {
						return (
							<div key={j}>
								<LineTo
									key={j}
									from={node}
									to={line}
									id={node + '_' + line}
									arrow={isLineDirectional(
										nodeData_Graph[node].connections[line]
									)}
									getDropDownItems={getDropdownItems}
									deleteConnection={(
										from: string,
										to: string
									) =>
										deleteConnection(from, to, viewContext)
									}
								/>
							</div>
						);
					}
				);
			})}
			{Object.keys(nodeData_Graph).map((node) => {
				const title = nodeData_Graph[node].title;
				const x = nodeVisualData_Graph[node].x;
				const y = nodeVisualData_Graph[node].y;
				const width = nodeVisualData_Graph[node].width;
				const height = nodeVisualData_Graph[node].height;
				// const icon = nodeData_Graph[node].icon;
				// const color = nodeData_Graph[node].color;
				const { icon, color } = getIconAndColor(viewContext, node);
				return (
					<div
						className={node}
						key={node}
						onMouseDown={
							drawingMode
								? (event: any) => handleStartPoint(node)
								: () => {
										return null;
								  }
						}
						onMouseMove={
							isDrawing && drawingMode
								? (event: any) => {
										handleDrawing(event, points, setPoints);
								  }
								: () => {
										return null;
								  }
						}
						onMouseUp={
							isDrawing && drawingMode
								? (event: any) =>
										handleEndPoint(
											event,
											node,
											endNode,
											setIsDrawing,
											setPoints
										)
								: () => {
										return null;
								  }
						}
					>
						<GraphNode
							title={title}
							key={node}
							left={(x - translateX) * scale}
							top={(y - translateY) * scale}
							id={node}
							icon={icon}
							color={color}
							size={[width * scale, height * scale]}
							updateStartPos={(val) => (startPos.current = val)}
						>
							<GraphEditor />
						</GraphNode>
					</div>
				);
			})}
		</div>
	);
};
