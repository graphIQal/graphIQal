/**
 * Main Graph component
 * Creates and sets all the global props that go into Context wrappers
 */

import React, { useEffect, useState } from 'react';
import Graph from '../../../../packages/graph/components/Graph';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../../../../packages/editor/EditorComponent';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Graph2: React.FC = () => {
	const [windowVar, setWindow] = useState<Window>();
	const [documentVar, setDocument] = useState<Document>();
	useEffect(() => {
		setWindow(window);
		setDocument(document);
	});
	return (
		<DndProvider backend={HTML5Backend}>
			<Graph window={windowVar} document={documentVar} />
		</DndProvider>
	);
};

export default Graph2;
