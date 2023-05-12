/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useState } from 'react';
import Graph from './components/GraphPage';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../editor/EditorComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GraphSideTabs, {
	SideTabProps,
} from '../../components/organisms/Tabs/GraphSideTabs';

const Graph2: React.FC<{ viewId: string; title: string }> = ({
	title,
	viewId,
}) => {
	return (
		<DndProvider backend={HTML5Backend}>
			<Graph viewId={viewId} />
		</DndProvider>
	);
};

export default Graph2;
