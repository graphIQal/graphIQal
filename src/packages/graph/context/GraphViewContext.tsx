/**
 * Context for everything that is displayed in the Graph.
 */

import { createContext } from 'react';
import { NodeData, GraphNodeData } from '../graphTypes';
import { Action, ActionChanges } from '../hooks/useHistoryState';

export type GraphViewContextInterface = {
	nodeInFocusId: string; //ID of "centered" node (shows only its connections and relevant data), 'homenode' if no centered node
	setnodeInFocusId: (val: string) => void;
	nodeData_Graph: { [key: string]: NodeData }; //The data of the nodes that are shown on the screen
	setnodeData_Graph: (val: { [key: string]: NodeData }) => void;
	nodeVisualData_Graph: { [key: string]: GraphNodeData };
	setnodeVisualData_Graph: (val: { [key: string]: GraphNodeData }) => void;
	modalNode: string; //The node that will show in the popup modal
	setModalNode: (val: string) => void;
	graphViewId: string;
	setGraphViewId: (val: string) => void;
	tags: { [key: string]: Set<string> }[];
	setTags: (val: { [key: string]: Set<string> }[]) => void;
	alert: string;
	setAlert: (val: string) => void;
	showSearchBar: boolean;
	setShowSearchBar: (val: boolean) => void;
	addAction: (id: string, type: ActionChanges, value: any) => void;
	undo: () => void;
	redo: () => void;
};

const GraphViewContext = createContext<GraphViewContextInterface | null>(null);

export default GraphViewContext;
