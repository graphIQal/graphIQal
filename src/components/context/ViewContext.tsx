/**
 * Context for common info across a state of the app.
 */

import { createContext } from 'react';
import { getNode_data } from '../../backend/cypher-generation/cypherGenerators';

export type MainTabProps = {
	label: string;
	viewId: string;
	viewType: 'document' | 'graph';
	component?: any;
};

export type ViewContextInterface = {
	mainViewTabs: MainTabProps[];
	setMainViewTabs: (val: MainTabProps[]) => void;
	username: string;
	nodeId: string;
	setNodeId: (val: string) => void;
	currNode_data: getNode_data;
	setcurrNode_data: (val: getNode_data) => void;
	currTab: number;
	setCurrTab: (val: number) => void;
	windowVar: Window;
	documentVar: Document;
};

const ViewContext = createContext<ViewContextInterface | null>(null);

export default ViewContext;
