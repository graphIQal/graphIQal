import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';
import { isLineDirectional } from './gettersConnectionInfo';

type LineUpdate = 'arrowAdd' | 'type' | 'reverse';

export const updateConnection = (
	context: GraphViewContextInterface | null,
	type: LineUpdate,
	lineID: string | number,
	newVal: any
) => {
	const { nodeData_Graph, setnodeData_Graph } =
		context as GraphViewContextInterface;
	let newData = { ...nodeData_Graph };
	switch (type) {
		case 'arrowAdd':
			//directional relationship already exists in this direction
			if (
				newData[newVal.arrowStart].connections[newVal.arrowEnd] &&
				isLineDirectional(
					newData[newVal.arrowStart].connections[newVal.arrowEnd]
				)
			) {
				return;
			}

			//does directional relationship already exist in opposite direction, we only want to reverse connection
			if (
				newData[newVal.arrowEnd].connections[newVal.arrowStart] &&
				isLineDirectional(
					newData[newVal.arrowEnd].connections[newVal.arrowStart]
				)
			) {
				updateConnection(context, 'reverse', '', newVal);
				return;
			}

			let newConnection = {
				...newData[newVal.arrowEnd].connections[newVal.arrowStart],
				startNode: newVal.arrowStart,
				endNode: newVal.arrowEnd,
				type: 'HAS',
			};

			context?.addAction(newVal.arrowStart, 'CONNECTION_DIRECTION', {
				endNode: newVal.arrowEnd,
				oldConnection: newData[newVal.arrowEnd].connections[
					newVal.arrowStart
				]
					? newData[newVal.arrowEnd].connections[newVal.arrowStart]
					: newData[newVal.arrowStart].connections[newVal.arrowEnd],
				newConnection: newConnection,
			});

			newData[newVal.arrowStart].connections[newVal.arrowEnd] =
				newConnection;

			delete newData[newVal.arrowEnd].connections[newVal.arrowStart];
			context?.setAlert(
				'Added connection of type IN from ' +
					newData[newVal.arrowStart].title +
					' to ' +
					newData[newVal.arrowEnd].title
			);

			context?.setnodeData_Graph(newData);
			break;
		case 'type':
			const start = newVal.start;
			const end = newVal.end;
			const newType = newVal.newType;

			const newNodes = { ...nodeData_Graph };
			if (newNodes[start].connections[end].type == newType) return;
			context?.addAction(newVal.start, 'CONNECTION_TYPE', {
				endNode: end,
				new: { type: newType },
				old: {
					type: newNodes[start].connections[end].type,
				},
			});
			context?.setAlert(
				'Changed connection type of ' +
					nodeData_Graph[start].title +
					' to ' +
					nodeData_Graph[end].title +
					' from ' +
					nodeData_Graph[start].connections[end].type +
					' to ' +
					newVal.newType
			);
			newNodes[start].connections[end].type = newType;
			if (newNodes[end].connections[start]) {
				newNodes[end].connections[start].type = newType;
			}

			context?.setnodeData_Graph(newNodes);
			break;
		case 'reverse':
			newData = { ...nodeData_Graph };
			let oldConnection =
				newData[newVal.arrowEnd].connections[newVal.arrowStart];

			let newConnectionVal = {
				...newData[newVal.arrowEnd].connections[newVal.arrowStart],
				startNode: newVal.arrowStart,
				endNode: newVal.arrowEnd,
			};
			newData[newVal.arrowStart].connections[newVal.arrowEnd] =
				newConnectionVal;

			delete newData[newVal.arrowEnd].connections[newVal.arrowStart];

			context?.addAction(newVal.arrowStart, 'CONNECTION_DIRECTION', {
				endNode: newVal.arrowEnd,
				oldConnection: oldConnection,
				newConnection: newConnectionVal,
			});

			context?.setnodeData_Graph(newData);
	}
};
