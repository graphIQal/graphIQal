/**
 * Hook for controlling history actions
 */

import { useContext, useEffect, useRef } from 'react';
import { GraphNodeData, LineRefs, NodeData } from '../graphTypes';
import GraphViewContext, {
	GraphViewContextInterface,
} from '../context/GraphViewContext';

export type Action = {
	type: ActionChanges;
	id: string | number;
	value: any;
};

export type ActionChanges =
	| 'NODE_ADD'
	| 'NODE_DELETE'
	| 'CONNECTION_ADD'
	| 'CONNECTION_DELETE'
	| 'CONNECTION_DIRECTION_ADD'
	| 'CONNECTION_TYPE'
	| 'CONNECTION_DIRECTION'
	| 'DRAG'
	| 'NODE_ICON'
	| 'NODE_COLOR'
	| 'NODE_TITLE'
	| 'NODE_SIZE';

export const useHistoryState = (
	nodeData_Graph: { [key: string]: NodeData }, //The data of the nodes that are shown on the screen
	setnodeData_Graph: any,
	nodeVisualData_Graph: { [key: string]: GraphNodeData },
	setnodeVisualData_Graph: any
) => {
	const history = useRef<Action[]>([]);
	const pointer = useRef<number>(-1);

	const addActionToStack = (action: Action) => {
		history.current = [
			...history.current.slice(0, pointer.current + 1),
			action,
		];
		pointer.current += 1;
	};

	const addAction = (
		id: string,
		type: ActionChanges,
		value: { old: any; new: any }
	) => {
		addActionToStack({
			id: id,
			value: value,
			type: type,
		});
	};

	const undo = () => {
		if (pointer.current == -1) {
			return;
		}
		const { id, value, type } = history.current[pointer.current];
		let newNodes = { ...nodeData_Graph };
		let newNodesVisual = { ...nodeVisualData_Graph };
		switch (type) {
			case 'NODE_SIZE':
				setnodeVisualData_Graph(
					(prevState: { [key: string]: GraphNodeData }) => {
						let newState = { ...prevState };
						newState[id].height = value.old.height;
						newState[id].width = value.old.width;
						newState[id].x = value.old.x;
						newState[id].y = value.old.y;
						return newState;
					}
				);

				break;
			case 'NODE_ADD':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					delete newState[id];
					return newState;
				});
				setnodeVisualData_Graph(
					(prevState: { [key: string]: GraphNodeData }) => {
						let newState = { ...prevState };
						delete newState[id];
						return newState;
					}
				);

				break;
			case 'NODE_DELETE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id] = value.deletedNode;
					return newState;
				});
				setnodeVisualData_Graph(
					(prevState: { [key: string]: GraphNodeData }) => {
						let newState = { ...prevState };
						newState[id] = value.deletedVisualNode;
						return newState;
					}
				);
				break;
			case 'NODE_COLOR':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].color = value.old.color;
					return newState;
				});
				break;
			case 'NODE_ICON':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].icon = value.old.icon;
					return newState;
				});
				break;
			case 'CONNECTION_ADD':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					delete newState[id].connections[value.endNode];
					return newState;
				});
				break;
			case 'CONNECTION_DELETE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].connections[value.endNode] = value.connection;
					return newState;
				});
				break;

			case 'CONNECTION_TYPE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].connections[value.endNode].type =
						value.oldType;
					return newState;
				});
				break;
			case 'CONNECTION_DIRECTION':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };

					newState[value.endNode].connections[id] =
						value.oldConnection;
					delete newState[id].connections[value.endNode];

					return newState;
				});
				break;
			case 'DRAG':
				setnodeVisualData_Graph(
					(oldNodes: { [key: string]: GraphNodeData }) => {
						let newNodes = { ...oldNodes };
						newNodes[id].x = value.old.x;
						newNodes[id].y = value.old.y;
						return newNodes;
					}
				);
				break;
			case 'NODE_TITLE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].title = value.oldTitle;
					return newState;
				});
				break;
		}

		pointer.current -= 1;
	};

	const redo = () => {
		if (pointer.current + 1 >= history.current.length) {
			return;
		}
		const { id, value, type } = history.current[pointer.current + 1];
		switch (type) {
			case 'NODE_SIZE':
				setnodeVisualData_Graph(
					(prevState: { [key: string]: GraphNodeData }) => {
						console.log('value ' + JSON.stringify(value));
						let newState = { ...prevState };
						newState[id].height = value.new.height;
						newState[id].width = value.new.width;
						newState[id].x = value.new.x;
						newState[id].y = value.new.y;
						return newState;
					}
				);

				break;
			case 'NODE_ADD':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id] = value.new.node_data;
					return newState;
				});
				setnodeVisualData_Graph(
					(prevState: { [key: string]: GraphNodeData }) => {
						let newState = { ...prevState };
						newState[id] = value.new.node_visual;
						return newState;
					}
				);
				break;
			case 'NODE_DELETE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					delete newState[id];
					return newState;
				});
				setnodeVisualData_Graph(
					(prevState: { [key: string]: GraphNodeData }) => {
						let newState = { ...prevState };
						delete newState[id];
						return newState;
					}
				);
				break;
			case 'NODE_COLOR':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].color = value.new.color;
					return newState;
				});
				break;
			case 'NODE_ICON':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].icon = value.new.icon;
					return newState;
				});
				break;
			case 'CONNECTION_ADD':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].connections[value.endNode] = value.connection;
					return newState;
				});
				break;

			case 'CONNECTION_DELETE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					delete newState[id].connections[value.endNode];
					return newState;
				});
				break;
			case 'CONNECTION_TYPE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].connections[value.endNode].type = value.type;
					return newState;
				});
				break;
			//fix redo for arrow drawing
			case 'CONNECTION_DIRECTION':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					if (newState[id].connections[value.endNode]) {
						newState[value.endNode].connections[id] =
							value.newConnection;
						delete newState[id].connections[value.endNode];
					} else {
						newState[id].connections[value.endNode] =
							value.newConnection;
						delete newState[value.endNode].connections[id];
					}

					return newState;
				});
				break;
			case 'DRAG':
				setnodeVisualData_Graph(
					(oldNodes: { [key: string]: GraphNodeData }) => {
						let newNodes = { ...oldNodes };
						newNodes[id].x = value.new.x;
						newNodes[id].y = value.new.y;
						return newNodes;
					}
				);
				break;
			case 'NODE_TITLE':
				setnodeData_Graph((prevState: { [key: string]: NodeData }) => {
					let newState = { ...prevState };
					newState[id].title = value.title;
					return newState;
				});
				break;
		}

		// setnodeData_Graph(newNodes);
		// setnodeVisualData_Graph(newVisualNodes);
		pointer.current += 1;
	};

	return { undo, redo, addAction, history, pointer };
};
