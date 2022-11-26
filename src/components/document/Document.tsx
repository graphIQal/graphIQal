import React, { useState } from 'react';

const Document: React.FC = () => {
	const [data, setData] = useState({
		title: 'Page Title',
		blocks: [
			{ id: '1', content: 'text', type: 'header' },
			{ id: '1', content: 'text', type: 'header' },
			{ id: '1', content: 'text', type: 'header' },
			{ id: '1', content: 'text', type: 'header' },
			{ id: '1', content: 'text', type: 'header' },
		],
	});

	const renderAllBlocks = () => {
		return null;
	};

	const renderBlock = () => {};

	return (
		<div>
			{data.title}
			{renderAllBlocks()}
		</div>
	);
};

export default Document;
