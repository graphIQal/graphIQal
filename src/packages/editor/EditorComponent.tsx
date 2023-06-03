import {
	createComboboxPlugin,
	createHistoryPlugin,
	createNodeIdPlugin,
	ELEMENT_H1,
	Plate,
} from '@udecode/plate';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
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

import { v4 as uuidv4 } from 'uuid';
import { withReact } from 'slate-react';
import { createEditor } from 'slate-hyperscript';
import { withHistory } from 'slate-history';
import useUnload from '../../helpers/hooks/useUnload';

const EditorComponent: React.FC<{ value: any[] }> = ({ value }) => {
	// const router = useRouter();
	const { nodeId, username } = useContext(
		ViewContext
	) as ViewContextInterface;

	const intervalRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 5000));

	useUnload(() => {
		console.log('unload');
		console.log(value.slice(1));
		// 	saveDocument({ nodeId, username, document: value.slice(1) });
	});

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
				// createHistoryPlugin(),
				createNodeIdPlugin({
					options: {
						idCreator: uuidv4,
					},
				}),
			]),
		[]
	);

	// useEffect(() => {
	// 	window.onbeforeunload(
	// 		saveDocument({ nodeId, username, document: value })
	// 	);
	// }, []);

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
					// console.log(intervalRef.current);
					clearTimeout(intervalRef.current);
					intervalRef.current = setTimeout(() => {
						saveDocument({
							nodeId,
							username,
							document: value.slice(1),
						});
					}, 5000);
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
