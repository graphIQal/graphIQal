import { KeyedMutator } from 'swr';
import { API, State } from '../../packages/graph/context/GraphViewContext';
import { NodeData } from '../../packages/graph/graphTypes';
import { isLineDirectional } from './gettersConnectionInfo';
import { changeConnectionType } from '@/backend/functions/node/mutate/updateConnectionType';

type LineUpdate = 'arrowAdd' | 'type' | 'reverse';

export const updateConnection = (
	type: LineUpdate,
	lineID: string | number,
	newVal: any,
	context: Partial<State & API>,
	mutateGraphData: KeyedMutator<any>
) => {
	const { nodeData_Graph, changeNodeData_Graph, addAction, changeAlert } =
		context;
	if (!nodeData_Graph || !changeNodeData_Graph || !addAction || !changeAlert)
		return;
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
				updateConnection(
					'reverse',
					'',
					newVal,
					context,
					mutateGraphData
				);
				return;
			}

			// This seems strange but, all connections are inherently directed in neo4j, so we should align them.
			let newConnection = {
				...newData[newVal.arrowEnd].connections[newVal.arrowStart],
				startNode: newVal.arrowStart,
				endNode: newVal.arrowEnd,
				type: 'HAS',
			};

			addAction(newVal.arrowStart, 'CONNECTION_DIRECTION', {
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
			changeAlert(
				'Added connection of type IN from ' +
					newData[newVal.arrowStart].title +
					' to ' +
					newData[newVal.arrowEnd].title
			);

			changeNodeData_Graph(newData);
			break;
		case 'type':
			const start = newVal.start;
			const end = newVal.end;
			const newType = newVal.newType;

			const newNodes = { ...nodeData_Graph };
			// const oldType = newNodes[start].connections[end].type;

			if (newNodes[start].connections[end].type == newType) return;

			const oldType = nodeData_Graph[start].connections[end].type;

			addAction(newVal.start, 'CONNECTION_TYPE', {
				endNode: end,
				startNode: start,
				new: { type: newType },
				old: { type: oldType },
			});

			changeAlert(
				'Changed connection type of ' +
					nodeData_Graph[start].title +
					' to ' +
					nodeData_Graph[end].title +
					' from ' +
					oldType +
					' to ' +
					newVal.newType
			);

			newNodes[start].connections[end].type = newType;
			if (newNodes[end].connections[start]) {
				newNodes[end].connections[start].type = newType;
			}

			mutateGraphData(
				changeConnectionType({
					startNode: start,
					endNode: end,
					oldType,
					newType,
				}),
				{
					optimisticData: (data: any) => ({
						visualData: newNodes,
						...data,
					}),
					populateCache: false,
					revalidate: false,
				}
			);

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

			addAction(newVal.arrowStart, 'CONNECTION_DIRECTION', {
				endNode: newVal.arrowEnd,
				oldConnection: oldConnection,
				newConnection: newConnectionVal,
			});

			changeNodeData_Graph(newData);
	}
};
