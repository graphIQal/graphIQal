import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
// import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons } from '@/components/icons';

import {
	ELEMENT_CUT_HIDDEN,
	ELEMENT_CUT_SHOWN,
	MARK_COLOUR,
} from '@/packages/editor/plateTypes';
import {
	ELEMENT_PARAGRAPH,
	collapseSelection,
	focusEditor,
	getPluginType,
	select,
	setNodes,
	someNode,
	splitNodes,
	unwrapNodes,
	useEditorRef,
	withoutNormalizing,
	wrapNodes,
} from '@udecode/plate';
import { Editor, Path, Text, Transforms } from 'slate';
import { CommentToolbarButton } from './comment-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { ToolbarButton } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';

export function FloatingToolbarButtons({
	showCutText = false,
}: {
	showCutText: boolean;
}) {
	// const readOnly = useEditorReadOnly();
	const readOnly = false;
	const editor = useEditorRef();

	return (
		<>
			{!readOnly && (
				<>
					<TurnIntoDropdownMenu />

					<MarkToolbarButton
						nodeType={MARK_BOLD}
						tooltip='Bold (⌘+B)'
					>
						<Icons.bold />
					</MarkToolbarButton>
					<MarkToolbarButton
						nodeType={MARK_ITALIC}
						tooltip='Italic (⌘+I)'
					>
						<Icons.italic />
					</MarkToolbarButton>
					<MarkToolbarButton
						nodeType={MARK_UNDERLINE}
						tooltip='Underline (⌘+U)'
					>
						<Icons.underline />
					</MarkToolbarButton>
					<MarkToolbarButton
						nodeType={MARK_STRIKETHROUGH}
						tooltip='Strikethrough (⌘+⇧+M)'
					>
						<Icons.strikethrough />
					</MarkToolbarButton>
					{/* <MarkToolbarButton
						nodeType={MARK_CODE}
						tooltip='Code (⌘+E)'
					>
						<Icons.code />
					</MarkToolbarButton> */}
					<MarkToolbarButton
						nodeType={MARK_COLOUR}
						tooltip='Colour (⌘+E)'
					>
						<Icons.color />
					</MarkToolbarButton>
					<ToolbarButton
						onClick={() => {
							const { selection } = editor;
							if (!selection) return;

							if (!showCutText) {
								console.log('making hidden text');
								wrapNodes(
									editor,
									{
										type: getPluginType(
											editor,
											ELEMENT_CUT_HIDDEN
										),
										children: [],
									},
									{ split: true }
								);
								const earlierPoint = Path.isBefore(
									selection.anchor.path,
									selection.focus.path
								)
									? selection.anchor
									: selection.focus;

								let newPointPath = [...earlierPoint.path]; // create a copy of the path
								newPointPath[newPointPath.length - 1] += 2; // increment the last element

								const newPoint = {
									path: newPointPath,
									offset: 0,
								};

								const neet = focusEditor(editor, [0, 0]);
								collapseSelection(editor);
								select(editor, newPoint);
							} else {
								const [match] = Editor.nodes(editor as Editor, {
									match: (n) =>
										// @ts-ignore
										n.type ===
										getPluginType(
											editor,
											ELEMENT_CUT_SHOWN
										),
									universal: true,
								});

								if (match) {
									// withoutNormalizing(editor, () =>
									// Save the selected text
									const selectedText = Editor.string(
										editor,
										selection
									);

									const earlierPoint = Path.isBefore(
										selection.anchor.path,
										selection.focus.path
									)
										? selection.anchor
										: selection.focus;

									const laterPoint = Path.isBefore(
										selection.anchor.path,
										selection.focus.path
									)
										? selection.focus
										: selection.anchor;

									// Delete the selected text from the current node
									// Transforms.delete(editor as Editor, {
									// 	at: selection,
									// });

									// Unwrap the node
									withoutNormalizing(editor, () => {
										splitNodes(editor, {
											match: (n) =>
												n.type ===
												getPluginType(
													editor,
													ELEMENT_CUT_SHOWN
												),
											at: laterPoint,
										});

										splitNodes(editor, {
											match: (n) =>
												n.type ===
												getPluginType(
													editor,
													ELEMENT_CUT_SHOWN
												),
											at: earlierPoint,
										});

										// setNodes(
										// 	editor,
										// 	{
										// 		type: getPluginType(
										// 			editor,
										// 			ELEMENT_PARAGRAPH
										// 		),
										// 	},
										// 	{ split: true }
										// );

										const cutPath = earlierPoint.path.slice(
											0,
											-1
										);
										cutPath[cutPath.length - 1] += 1;

										// Unwrap nodes at new selection
										unwrapNodes(editor, {
											match: (n) =>
												n.type ===
												getPluginType(
													editor,
													ELEMENT_CUT_SHOWN
												),
											at: cutPath,
											split: true,
										});
									});

									// Insert the selected text at the current cursor position
								} else {
									// Your existing wrapNodes logic
									wrapNodes(
										editor,
										{
											type: getPluginType(
												editor,
												ELEMENT_CUT_SHOWN
											),
											children: [],
										},
										{ split: true }
									);
								}

								const newEditor = editor;
							}
						}}
						tooltip='Cut Text (⌘+D)'
					>
						<Icons.cut />
					</ToolbarButton>
					<CommentToolbarButton />
				</>
			)}

			<MoreDropdownMenu />
		</>
	);
}
