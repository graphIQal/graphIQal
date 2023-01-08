import React from 'react';
import { DndProvider, useDragDropManager } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// TypeScript users only add this code
import EditorComponent from '../../packages/editor/EditorComponent';
const Document: React.FC = () => {
	const dragDropManager = useDragDropManager();

	return (
		<div className='container'>
			<DndProvider backend={HTML5Backend}>
				<EditorComponent></EditorComponent>
			</DndProvider>
		</div>
	);
};

export default Document;
