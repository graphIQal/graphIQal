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
  | {
      type: 'changeNodeData_Graph';
      nodeData_Graph: { [key: string]: NodeData };
    }
  | {
      type: 'changeVisualData_Graph';
      nodeVisualData_Graph: { [key: string]: GraphNodeData };
    };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'changeNodeData_Graph':
      console.log('before undoing', state.nodeData_Graph);
      console.log('undoing', action.nodeData_Graph);
      return { ...state, nodeData_Graph: action.nodeData_Graph };
    case 'changeVisualData_Graph':
      return { ...state, nodeVisualData_Graph: action.nodeVisualData_Graph };
  }
};

export type State = {
  nodeData_Graph: { [key: string]: NodeData };
  nodeVisualData_Graph: { [key: string]: GraphNodeData };
};

export type API = {
  changeNodeData_Graph: (val: { [key: string]: NodeData }) => void;
  changeVisualData_Graph: (val: { [key: string]: GraphNodeData }) => void;
};

const GraphNodeDataContextData = createContext<State>({} as State);
const GraphNodeDataContextAPI = createContext<API>({} as API);

export const GraphNodeDataProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const defaultState = {
    nodeData_Graph: {},
    nodeVisualData_Graph: {},
  };

  const [graphNodeDataState, dispatch] = useReducer(reducer, defaultState);

  const api = useMemo(() => {
    const changeNodeData_Graph = (nodeData_Graph: {
      [key: string]: NodeData;
    }) => dispatch({ type: 'changeNodeData_Graph', nodeData_Graph });
    const changeVisualData_Graph = (nodeVisualData_Graph: {
      [key: string]: GraphNodeData;
    }) => dispatch({ type: 'changeVisualData_Graph', nodeVisualData_Graph });

    return {
      changeNodeData_Graph,
      changeVisualData_Graph,
    };
  }, []);

  return (
    <GraphNodeDataContextData.Provider value={graphNodeDataState}>
      <GraphNodeDataContextAPI.Provider value={api}>
        {children}
      </GraphNodeDataContextAPI.Provider>
    </GraphNodeDataContextData.Provider>
  );
};

export const useGraphViewData = () => useContext(GraphNodeDataContextData);
export const useGraphViewAPI = () => useContext(GraphNodeDataContextAPI);
