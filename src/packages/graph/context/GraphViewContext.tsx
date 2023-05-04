/**
 * Context for everything that is displayed in the Graph.
 */

import { createContext, MutableRefObject } from 'react';
import {
	ConnectionData,
	Node,
	VisualData,
} from '../../../schemas/Data_structures/DS_schema';
import { LineRefs } from '../graphTypes';

export type GraphViewContextInterface = {
	lines: LineRefs[]; //lines displayed in graph
	setLines: (val: LineRefs[]) => void;
	nodeInView: string; //ID of "centered" node (shows only its connections and relevant data), 'homenode' if no centered node
	setNodeInView: (val: string) => void;
	nodesDisplayed: { [key: string]: ConnectionData }; //The data of the nodes that are shown on the screen
	setNodesDisplayed: (val: { [key: string]: ConnectionData }) => void;
	nodesVisual: { [key: string]: VisualData }; //The visual information of the nodes that are shown on the screen
	setNodesVisual: (val: { [key: string]: VisualData }) => void;
	modalNode: string; //The node that will show in the popup modal
	setModalNode: (val: string) => void;
	allNodes: { [key: string]: Node };
	setAllNodes: (val: { [key: string]: Node }) => void;
	username: string | string[] | undefined;
	nodeId: string | string[] | undefined;
	graphViewId: string | string[] | undefined;
};

const GraphViewContext = createContext<GraphViewContextInterface | null>(null);

export default GraphViewContext;
