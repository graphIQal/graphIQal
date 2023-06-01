import {
	createComboboxPlugin,
	createNodeIdPlugin,
	ELEMENT_H1,
	Plate,
} from '@udecode/plate';
import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import { FormatPlugins } from './Plugins/FormatPlugins';
import { createBlockPlugin } from './Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';
import SplitPane, {
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import TextButton from '../../components/molecules/TextButton';
import DocumentSideTabs from '../../components/organisms/Tabs/DocumentSideTabs';
import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';
import ViewContext, {
	ViewContextInterface,
} from '../../components/context/ViewContext';

const EditorComponent: React.FC<{ value: any[] }> = ({ value }) => {
	// const router = useRouter();

	const plugins = useMemo(
		() =>
			createMyPlugins([
				// Mark Plugins
				...TextMarkPlugins,
				// elements
				...BlockPlugins,
				// Commands,
				...CommandPlugins,
				...FormatPlugins,
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
		<div>
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
		</div>
	);
};

export default EditorComponent;
