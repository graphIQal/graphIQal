import React from 'react';

// TypeScript users only add this code
import EditorComponent from '../../packages/editor/EditorComponent';
const Document: React.FC = () => {
	return (
		<div className='container'>
			<EditorComponent></EditorComponent>
		</div>
	);
};

export default Document;
