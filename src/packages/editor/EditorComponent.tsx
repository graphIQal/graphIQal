import {
	createComboboxPlugin,
	createNodeIdPlugin,
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
	ELEMENT_CUT,
	MyEditor,
	MyPlatePlugin,
	MyValue,
} from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { CommandPlugins } from './Plugins/CommandPlugins';
import { FormatPlugins } from './Plugins/FormatPlugins';
import { createBlockPlugin } from './Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';

import IconCircleButton from '@/components/molecules/IconCircleButton';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { useViewData } from '../../components/context/ViewContext';
import { CutText } from './Elements/Elements';

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

	// okay, so there's 2 solutions I can think of for the cut text plugin.
	// Because we're saving the content, we need it to be void consistently when invisible.
	// So we probably actually have to go through the entire document and then turn them from void to non-void elements.
	// Or, we could go through and move them from children to an invisible content uneditable element.
	// All in all, this does mean that simply toggling their visibility won't be helpful, because they're still in slate flow.
	const cutTextPlugin = createMyPluginFactory<ToggleMarkPlugin>({
		key: ELEMENT_CUT,
		isElement: true,
		isLeaf: false,
		isInline: true,
		isVoid: !showCutText,
		options: {
			hotkey: 'mod+g',
		},
		handlers: {
			onKeyDown: (editor) => (event) => {
				if (event.key === 'g' && (event.ctrlKey || event.metaKey)) {
					event.preventDefault();
					const cutTextNode = { type: ELEMENT_CUT, children: [] };
					editor.wrapNodes(cutTextNode, { split: true });
				}
			},
		},
	});

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
						[ELEMENT_CUT]: (props) => CutText(props, showCutText),
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
				<EditorFloatingMenu>
					{/* <IconCircleButton
						// type={getPluginType(editor, MARK_CUT)}
						onClick={() => {}}
						circle={false}
						src={'cut'}
						// tooltip={underlineTooltip}
					/> */}
				</EditorFloatingMenu>
				<EditorSlashMenu />
			</Plate>
		</div>
	);
};

export default EditorComponent;
