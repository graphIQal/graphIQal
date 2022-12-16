import {
	createKbdPlugin,
	createPlateUI,
	Plate,
	PlateProvider,
} from '@udecode/plate';
import React, { useCallback, useMemo, useState } from 'react';
import { editableProps } from './editableProps';
import { Block, Leaf } from './Elements/Elements';
import { createMyPlugins, MyParagraphElement, MyValue } from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';

const EditorComponent: React.FC = () => {
	const [value, setValue] = useState([
		{
			type: 'p',
			children: [
				{
					text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
				},
			],
		} as MyParagraphElement,
	]);

	const plugins = useMemo(
		() =>
			createMyPlugins([
				// Mark Plugins
				...TextMarkPlugins,
				// elements
				...BlockPlugins,
				// Commands,
			]),
		[]
	);
	// `useCallback` here to memoize the function for subsequent renders.
	const renderElement = useCallback((props: any) => {
		return <Block {...props} />;
	}, []);

	return (
		<Plate<MyValue>
			editableProps={editableProps}
			value={value}
			onChange={(value) => {
				console.log(value);
			}}
			plugins={plugins}
		/>
	);
};

export default EditorComponent;
