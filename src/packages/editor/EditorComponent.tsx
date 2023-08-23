import {
	createComboboxPlugin,
	createNodeIdPlugin,
	onKeyDownToggleMark,
	Plate,
	ToggleMarkPlugin,
} from '@udecode/plate';

import React, { useEffect, useMemo, useRef } from 'react';
import { SaveDocumentInput } from '../../backend/functions/general/document/mutate/saveDocument';
import { EditorFloatingMenu } from './Components/EditorFloatingMenu';
import { EditorSlashMenu } from './Components/EditorSlashMenu';
import { editableProps } from './editableProps';
import {
	createMyPluginFactory,
	createMyPlugins,
	MARK_CUT,
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

const EditorComponent: React.FC<{
	value: any[];
	setValue: Function;
	initialValue: any[];
	id: string;
	save: (args: SaveDocumentInput) => void;
	customElements: { [key: string]: (props: any) => any };
	customPlugins?: MyPlatePlugin[];
	showCutText?: boolean;
}> = ({
	initialValue,
	value,
	setValue,
	id = uuidv4(),
	save,
	customElements,
	customPlugins = [],
	showCutText = false,
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

		// console.log('editorRef');
		// console.log(editorRef.current?.history);

		// const lastUndo =
		// 	editorRef.current?.history.undos[
		// 		editorRef.current?.history.undos.length - 1
		// 	];

		return () => {
			window.removeEventListener('beforeunload', onUnload);
			router.events.off('routeChangeStart', onRouterUnload);
		};
	}, [value]);

	const onRouterUnload = (url: string, { shallow }: { shallow: boolean }) => {
		if (value.length > 0 && !shallow) {
			console.log('unshallow, save');
			clearTimeout(intervalRef.current);
			save({
				nodeId,
				username,
				document: value,
				title: value[0].children[0].text as string,
				history: editorRef.current?.history
					? editorRef.current.history
					: null,
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
				history: editorRef.current?.history
					? editorRef.current.history
					: null,
			});
		}
	};

	// const cutTextPlugin = useMemo(
	// 	() =>
	const cutTextPlugin = createMyPluginFactory<ToggleMarkPlugin>({
		key: MARK_CUT,
		isElement: false,
		isLeaf: true,
		options: {
			hotkey: 'mod+g',
		},
		handlers: {
			onKeyDown: onKeyDownToggleMark,
		},
		// query: (el) => !someHtmlElement(el, (node) => node.style.fontWeight === 'normal'),
		component: (props) => {
			console.log('cut plugin', props);
			console.log('showCutText ', showCutText);

			return !showCutText ? (
				<span className='text-lining'>{props.children}</span>
			) : (
				<span>{props.children}</span>
			);
		},
	});
	// ,[showCutText];
	// );

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
					createComboboxPlugin({
						options: {},
					}),
					createNodeIdPlugin({
						options: {
							idCreator: uuidv4,
						},
					}),
					...customPlugins,
				],
				{
					components: {
						...customElements,
					},
				}
			),
		[]
	);

	// `useCallback` here to memoize the function for subsequent renders.
	// const renderElement = useCallback((props: any) => {
	// 	return <Block {...props} />;
	// }, []);

	return (
		<div className='pb-[50%]'>
			<Plate<MyValue>
				editorRef={editorRef}
				editableProps={editableProps}
				initialValue={initialValue}
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
							history: editorRef.current?.history
								? editorRef.current.history
								: null,
						});
					}, 2000);
				}}
				plugins={[...plugins, cutTextPlugin()]}
				id={id}
			>
				<EditorFloatingMenu />
				<EditorSlashMenu />
			</Plate>
		</div>
	);
};

export default EditorComponent;
