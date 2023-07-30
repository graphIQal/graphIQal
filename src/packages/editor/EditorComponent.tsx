import {
	// createComboboxPlugin,
	createNodeIdPlugin,
	Plate,
} from '@udecode/plate';

import { createComboboxPlugin } from '@udecode/plate-combobox';
import React, { useEffect, useMemo, useRef } from 'react';
import { SaveDocumentInput } from '../../backend/functions/general/document/mutate/saveDocument';
import { EditorFloatingMenu } from './Components/EditorFloatingMenu';
import { EditorSlashMenu } from './Components/EditorSlashMenu';
import { editableProps } from './editableProps';
import {
	createMyPlugins,
	ELEMENT_BLOCK,
	MyEditor,
	MyPlatePlugin,
	MyValue,
} from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { CommandPlugins } from './Plugins/CommandPlugins';
import { FormatPlugins } from './Plugins/FormatPlugins';
import { createBlockPlugin } from './Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';

import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useViewData } from '../../components/context/ViewContext';
import { withDraggable } from '../dnd-editor/components/withDraggable';

const EditorComponent: React.FC<{
	value: any[];
	setValue: Function;
	initialValue: any[];
	id: string;
	save: (args: SaveDocumentInput) => void;
	blockElement: (props: any) => JSX.Element;
	customPlugins?: MyPlatePlugin[];
}> = ({
	initialValue,
	value,
	setValue,
	id = uuidv4(),
	save,
	blockElement,
	customPlugins = [],
}) => {
	// const router = useRouter();
	const { nodeId, username } = useViewData();
	const router = useRouter();
	const intervalRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, 3000));
	const editorRef = useRef<MyEditor | null>(null);

	useEffect(() => {
		// console.log('on Mount');
		setValue(initialValue);
		// console.log(nodeId, value, initialValue);
	}, []);

	useEffect(() => {
		window.addEventListener('beforeunload', onUnload);
		router.events.on('routeChangeStart', onRouterUnload);

		return () => {
			window.removeEventListener('beforeunload', onUnload);
			router.events.off('routeChangeStart', onRouterUnload);
		};
	}, [value]);

	const onRouterUnload = (url: string, { shallow }: { shallow: boolean }) => {
		if (value.length > 0 && !shallow) {
			clearTimeout(intervalRef.current);
			save({
				nodeId,
				username,
				document: value,
				title: value[0].children[0].text as string,
			});
		}
	};
	const onUnload = () => {
		// code to save progress to local storage....
		if (value.length > 0) {
			clearTimeout(intervalRef.current);
			save({
				nodeId,
				username,
				document: value,
				title: value[0].children[0].text as string,
			});
		}
	};

	const plugins = useMemo(
		() =>
			createMyPlugins(
				[
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
					...customPlugins,
				],
				{
					components: {
						[ELEMENT_BLOCK]: withDraggable(blockElement),
					},
				}
			),
		[]
	);

	// const editorOnly = createMyEditor();
	// const editor = createMyPlateEditor({
	// 	plugins: plugins,
	// });

	// `useCallback` here to memoize the function for subsequent renders.
	// const renderElement = useCallback((props: any) => {
	// 	return <Block {...props} />;
	// }, []);

	// get editor instance
	// const editor =

	return (
		<div className='pb-[50%]'>
			<Plate<MyValue>
				editorRef={editorRef}
				editableProps={editableProps}
				initialValue={initialValue}
				// editor={editor}
				onChange={(docValue) => {
					console.log(docValue);
					setValue(docValue);
					clearTimeout(intervalRef.current);
					intervalRef.current = setTimeout(() => {
						save({
							nodeId,
							username,
							document: docValue,
							title: docValue[0].children[0].text as string,
						});
					}, 5000);
				}}
				plugins={plugins}
				id={id}
			>
				{/* <EditorFloatingMenu /> */}
				<EditorSlashMenu />
			</Plate>
		</div>
	);
};

export default EditorComponent;
