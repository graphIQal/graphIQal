/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GraphSplitPaneWrapper from './components/GraphSplitPaneWrapper';
import { GraphViewDataProvider } from './context/GraphViewContext';

const Graph: React.FC<{
	viewId: string;
	title: string;
	barComponents: { [key: string]: JSX.Element };
}> = ({ title, viewId, barComponents }) => {
	// console.log('rerendering graph root');

	return (
		<DndProvider backend={HTML5Backend}>
			<GraphViewDataProvider>
				<GraphSplitPaneWrapper
					viewId={viewId}
					barComponents={barComponents}
				/>
			</GraphViewDataProvider>
		</DndProvider>
	);
};

export default Graph;
