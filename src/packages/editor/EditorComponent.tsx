import {
	createComboboxPlugin,
	createNodeIdPlugin,
	ELEMENT_H1,
	Plate,
} from '@udecode/plate';
import React, { useEffect, useMemo, useState } from 'react';
import { GetCurrentUser } from '../../helpers/backend/userHelpers';
import { EditorFloatingMenu } from './Components/EditorFloatingMenu';
import { EditorSlashMenu } from './Components/EditorSlashMenu';
import { editableProps } from './editableProps';
import {
	createMyPlugins,
	MyBlockElement,
	MyH1Element,
	MyParagraphElement,
	MyValue,
} from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { CommandPlugins } from './Plugins/CommandPlugins';
import { createBlockPlugin } from './Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';
import { useQuery } from 'urql';

const EditorComponent: React.FC = () => {
	const [value, setValue] = useState([
		{
			type: ELEMENT_H1,
			id: 'asdkj123123a',
			children: [{ text: 'title' }],
		} as MyH1Element,
		{
			type: 'block',
			id: '123123990asdf',
			children: [
				{
					type: 'p',
					id: '33333',
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
				createBlockPlugin(),
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
			id='editor'
		>
			<EditorFloatingMenu />
			<EditorSlashMenu />
		</Plate>
	);
};

export default EditorComponent;
