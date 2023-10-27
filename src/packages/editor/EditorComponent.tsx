import {
	createComboboxPlugin,
	createNodeIdPlugin,
	getNodes,
	isElement,
	Plate,
	setNodes,
	withoutSavingHistory,
} from '@udecode/plate';

import React, { useEffect, useMemo, useRef } from 'react';
import { SaveDocumentInput } from '../../backend/functions/general/document/mutate/saveDocument';
import { EditorSlashMenu } from './Components/EditorSlashMenu';
import { editableProps } from './editableProps';
import {
	createMyPlugins,
	ELEMENT_CUT_HIDDEN,
	ELEMENT_CUT_SHOWN,
	MyEditor,
	MyPlatePlugin,
	MyValue,
} from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { CommandPlugins } from './Plugins/CommandPlugins';
import { FormatPlugins } from './Plugins/FormatPlugins';
import { createBlockPlugin } from './Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';

import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useViewData } from '../../components/context/ViewContext';
import { nodes } from 'slate';

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
		setValue(initialValue);
	}, []);

	useEffect(() => {
		if (showCutText) {
			const editor = editorRef.current;
			if (editor) {
				// Traverse the document
				for (const [node, path] of getNodes(editor)) {
					// If the node is a cutTextHidden
					if (isElement(node) && node.type === ELEMENT_CUT_HIDDEN) {
						// Change it to cutTextShown
						withoutSavingHistory(editor, () =>
							setNodes(
								editor,
								{ type: ELEMENT_CUT_SHOWN },
								{ at: path }
							)
						);
					}
				}
			}
		} else {
			const editor = editorRef.current;
			if (editor) {
				// Traverse the document
				for (const [node, path] of getNodes(editor)) {
					// If the node is a cutTextHidden
					if (isElement(node) && node.type === ELEMENT_CUT_SHOWN) {
						// Change it to cutTextShown
						withoutSavingHistory(editor, () =>
							setNodes(
								editor,
								{ type: ELEMENT_CUT_HIDDEN },
								{ at: path }
							)
						);
					}
				}
			}
		}
	}, [showCutText]);

	useEffect(() => {
		window.addEventListener('beforeunload', onUnload);
		router.events.on('routeChangeStart', onRouterUnload);

		// console.log('editorRef');
		console.log(editorRef.current?.history);

		return () => {
			window.removeEventListener('beforeunload', onUnload);
			router.events.off('routeChangeStart', onRouterUnload);
		};
	}, [value]);

	const onRouterUnload = (url: string, { shallow }: { shallow: boolean }) => {
		console.log('routerUnload', shallow, url);
		if (value.length > 0) {
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
			console.log('on Unload save, ', nodeId);
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
							idKey: 'id',
							idCreator: uuidv4,
							disableInsertOverrides: false,
							// reuseId: true,
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
				editableProps={{
					...editableProps,
					onBlur: () => {
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
					},
				}}
				initialValue={[
					{
						type: 'title',
						id: 'Node Title',
						children: [
							{
								text: 'Graphiqal Testing Page',
							},
						],
					},
					{
						type: 'block',
						id: 'f72945c8-e8de-479c-81d6-ecbfce092085',
						children: [
							{
								text: 'asdfasdfaasdf',
							},
							{
								type: 'cut_show',
								children: [
									{
										text: 'sdsdffasdasdfa',
									},
								],
								id: 'e5dfadd3-a5c1-4b03-af0c-d52da49fcd86',
							},
							{
								text: 'l',
							},
						],
					},
				]}
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
				plugins={[...plugins]}
				id={id}
			>
				<FloatingToolbar>
					<FloatingToolbarButtons showCutText={showCutText} />
				</FloatingToolbar>
				<EditorSlashMenu />
			</Plate>
		</div>
	);
};

export default EditorComponent;
