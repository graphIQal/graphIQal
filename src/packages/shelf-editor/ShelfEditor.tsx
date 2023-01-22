import {
	createComboboxPlugin,
	createNodeIdPlugin,
	ELEMENT_H1,
	Plate,
} from '@udecode/plate';
import React, { useMemo, useState } from 'react';
import { EditorFloatingMenu } from '../editor/Components/EditorFloatingMenu';
import { EditorSlashMenu } from '../editor/Components/EditorSlashMenu';
import { editableProps } from '../editor/editableProps';
import {
	createMyPlugins,
	MyBlockElement,
	MyH1Element,
	MyParagraphElement,
	MyValue,
} from '../editor/plateTypes';
import { BlockPlugins } from '../editor/Plugins/BlockPlugins';
import { CommandPlugins } from '../editor/Plugins/CommandPlugins';
import { createBlockPlugin } from '../editor/Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from '../editor/Plugins/TextMarkPlugins';
import { createShelfBlockPlugin } from './ShelfBlock/ShelfBlockPlugin';

const ShelfEditor: React.FC = () => {
	const [value, setValue] = useState([
		{
			type: 'block',
			id: '23132123123123',
			children: [
				{
					type: 'p',
					id: '32343',
					children: [
						{
							text: '1',
						},
						// { type: 'p', id: 'bbbbb', children: [{ text: 'hmm' }] },
					],
				} as MyParagraphElement,
			],
		} as MyBlockElement,
	]);

	const plugins = useMemo(
		() =>
			createMyPlugins([
				// Mark Plugins
				...TextMarkPlugins,
				// elements
				...BlockPlugins,
				// Commands,
				...CommandPlugins,
				createShelfBlockPlugin(),
				createComboboxPlugin(),
				createNodeIdPlugin(),
			]),
		[]
	);
	// `useCallback` here to memoize the function for subsequent renders.
	// const renderElement = useCallback((props: any) => {
	// 	return <Block {...props} />;
	// }, []);

	return (
		<Plate<MyValue>
			editableProps={editableProps}
			value={value}
			onChange={(value) => {
				console.log(value);
			}}
			plugins={plugins}
			id='shelf'
		>
			<EditorFloatingMenu />
			<EditorSlashMenu />
		</Plate>
	);
};

export default ShelfEditor;
