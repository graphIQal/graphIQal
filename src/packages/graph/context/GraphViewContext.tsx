/**
 * Context for everything that is displayed in the Graph.
 */

import {
	ReactNode,
	createContext,
	useContext,
	useMemo,
	useReducer,
	useRef,
} from 'react';
import { NodeData, GraphNodeData } from '../graphTypes';
import {
	Action,
	ActionChanges,
	useHistoryState,
} from '../hooks/useHistoryState';

type Actions =
	| { type: 'changeNodeInFocusId'; id: string }
	| {
			type: 'changeNodeData_Graph';
			nodeData_Graph: { [key: string]: NodeData };
	  }
	| {
			type: 'changeVisualData_Graph';
			nodeVisualData_Graph: { [key: string]: GraphNodeData };
	  }
	| { type: 'changeGraphViewId'; id: string }
	| { type: 'changeTags'; tags: NodeData[] }
	| { type: 'changeAlert'; alert: string }
	| {
			type: 'changeHistory';
			history: React.MutableRefObject<{
				undos: Action[];
				redos: Action[];
			}>;
	  }
	| {
			type: 'setHistoryFunctions';
			addAction: (id: string, type: ActionChanges, value: any) => void;
			undo: () => void;
			redo: () => void;
	  };

const reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case 'changeNodeInFocusId':
			return { ...state, nodeInFocusId: action.id };
		case 'changeGraphViewId':
			return { ...state, graphViewId: action.id };
		case 'changeNodeData_Graph':
			// console.log('before undoing', state.nodeData_Graph);
			// console.log('undoing', action.nodeData_Graph);
			return { ...state, nodeData_Graph: action.nodeData_Graph };
		case 'changeVisualData_Graph':
			return {
				...state,
				nodeVisualData_Graph: action.nodeVisualData_Graph,
			};
		case 'changeAlert':
			return { ...state, alert: action.alert };
		case 'changeTags':
			return { ...state, tags: action.tags };
		case 'changeHistory':
			return {
				...state,
				history: action.history,
			};
		case 'setHistoryFunctions':
			return {
				...state,
				addAction: action.addAction,
				undo: action.undo,
				redo: action.redo,
			};
	}
};

export type State = {
	nodeInFocusId: string;
	nodeData_Graph: { [key: string]: NodeData };
	nodeVisualData_Graph: { [key: string]: GraphNodeData };
	graphViewId: string;
	tags: NodeData[];
	alert: string;
	addAction: (id: string, type: ActionChanges, value: any) => void;
	undo: () => void;
	redo: () => void;
	history: React.MutableRefObject<{ undos: Action[]; redos: Action[] }>;
};

export type API = {
	changeNodeInFocusId: (val: string) => void;
	changeGraphViewId: (val: string) => void;
	changeNodeData_Graph: (val: { [key: string]: NodeData }) => void;
	changeVisualData_Graph: (val: { [key: string]: GraphNodeData }) => void;
	changeAlert: (val: string) => void;
	changeTags: (val: NodeData[]) => void;
	setHistoryFunctions: (
		addAction: (id: string, type: ActionChanges, value: any) => void,
		undo: () => void,
		redo: () => void
	) => void;
	changeHistory: (
		history: React.MutableRefObject<{ undos: Action[]; redos: Action[] }>
	) => void;
};

const GraphViewContextState = createContext<State>({} as State);
const GraphViewContextAPI = createContext<API>({} as API);

export const GraphViewDataProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const defaultState = {
		nodeInFocusId: '',
		nodeData_Graph: {},
		nodeVisualData_Graph: {},
		graphViewId: '',
		tags: [],
		alert: '',
		addAction: (id: string, type: ActionChanges, value: any) => null,
		undo: () => null,
		redo: () => null,
		history: useRef<{
			undos: Action[];
			redos: Action[];
		}>({ undos: [], redos: [] }),
	};

	const [graphViewState, dispatch] = useReducer(reducer, defaultState);

	const api = useMemo(() => {
		const changeNodeInFocusId = (nodeInFocusId: string) =>
			dispatch({ type: 'changeNodeInFocusId', id: nodeInFocusId });
		const changeGraphViewId = (viewId: string) =>
			dispatch({ type: 'changeGraphViewId', id: viewId });
		const changeNodeData_Graph = (nodeData_Graph: {
			[key: string]: NodeData;
		}) => dispatch({ type: 'changeNodeData_Graph', nodeData_Graph });
		const changeVisualData_Graph = (nodeVisualData_Graph: {
			[key: string]: GraphNodeData;
		}) =>
			dispatch({ type: 'changeVisualData_Graph', nodeVisualData_Graph });
		const changeAlert = (alert: string) =>
			dispatch({ type: 'changeAlert', alert });
		const changeTags = (tags: NodeData[]) =>
			dispatch({ type: 'changeTags', tags });
		const changeHistory = (
			history: React.MutableRefObject<{
				undos: Action[];
				redos: Action[];
			}>
		) =>
			dispatch({
				type: 'changeHistory',
				history,
			});
		const setHistoryFunctions = (
			addAction: (id: string, type: ActionChanges, value: any) => void,
			undo: () => void,
			redo: () => void
		) => dispatch({ type: 'setHistoryFunctions', addAction, undo, redo });

		return {
			changeNodeInFocusId,
			changeGraphViewId,
			changeNodeData_Graph,
			changeVisualData_Graph,
			changeAlert,
			changeTags,
			changeHistory,
			setHistoryFunctions,
		};
	}, []);

	return (
		<GraphViewContextState.Provider value={graphViewState}>
			<GraphViewContextAPI.Provider value={api}>
				{children}
			</GraphViewContextAPI.Provider>
		</GraphViewContextState.Provider>
	);
};

export const useGraphViewData = () => useContext(GraphViewContextState);
export const useGraphViewAPI = () => useContext(GraphViewContextAPI);
