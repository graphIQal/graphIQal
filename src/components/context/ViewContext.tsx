/**
 * Context for common info across a state of the app.
 */

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { getNodeData_type } from '../../backend/functions/node/query/useGetNodeData';

type Actions =
  | { type: 'changeNodeId'; id: string }
  | { type: 'changeNodeData'; data: getNodeData_type }
  | { type: 'changeCurrTab'; tab: number }
  | { type: 'changeDocumentVar'; document: Document }
  | { type: 'changeWindowVar'; window: Window }
  | { type: 'changeUsername'; username: string };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'changeNodeId':
      return { ...state, nodeId: action.id };
    case 'changeNodeData':
      return { ...state, currNode_data: action.data };
    case 'changeCurrTab':
      return { ...state, currTab: action.tab };
    case 'changeDocumentVar':
      return { ...state, documentVar: action.document };
    case 'changeUsername':
      return { ...state, username: action.username };
    case 'changeWindowVar':
      return { ...state, windowVar: action.window };
  }
};

type State = {
  username: string;
  nodeId: string;
  currNode_data: getNodeData_type;
  currTab: number;
  windowVar: Window | undefined;
  documentVar: Document | undefined;
};

type API = {
  changeNodeId: (val: string) => void;
  changeNodeData: (val: getNodeData_type) => void;
  changeCurrTab: (val: number) => void;
  changeWindowVar: (val: Window) => void;
  changeDocumentVar: (val: Document) => void;
  changeUsername: (val: string) => void;
};

const ViewContextState = createContext<State>({} as State);
const ViewContextAPI = createContext<API>({} as API);

export const ViewDataProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const defaultState = {
    username: '',
    nodeId: '',
    currNode_data: {
      n: {},
      connectedNodes: [],
    },
    currTab: 0,
    windowVar: undefined,
    documentVar: undefined,
  };

  const [viewState, dispatch] = useReducer(reducer, defaultState);

  const api = useMemo(() => {
    const changeNodeId = (nodeId: string) =>
      dispatch({ type: 'changeNodeId', id: nodeId });
    const changeNodeData = (currNode_data: getNodeData_type) =>
      dispatch({ type: 'changeNodeData', data: currNode_data });
    const changeCurrTab = (currTab: number) =>
      dispatch({ type: 'changeCurrTab', tab: currTab });
    const changeDocumentVar = (documentVar: Document) =>
      dispatch({ type: 'changeDocumentVar', document: documentVar });
    const changeWindowVar = (windowVar: Window) =>
      dispatch({ type: 'changeWindowVar', window: windowVar });
    const changeUsername = (username: string) =>
      dispatch({ type: 'changeUsername', username });

    return {
      changeNodeId,
      changeNodeData,
      changeCurrTab,
      changeDocumentVar,
      changeWindowVar,
      changeUsername,
    };
  }, []);

  return (
    <ViewContextState.Provider value={viewState}>
      <ViewContextAPI.Provider value={api}>{children}</ViewContextAPI.Provider>
    </ViewContextState.Provider>
  );
};

export const useViewData = () => useContext(ViewContextState);
export const useViewAPI = () => useContext(ViewContextAPI);
