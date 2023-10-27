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
	getParentNode,
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
import { Editor, Path, Point, Text, Transforms } from 'slate';
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

							const earlierPoint = Point.isBefore(
								selection.anchor,
								selection.focus
							)
								? selection.anchor
								: selection.focus;

							const laterPoint = Point.isBefore(
								selection.anchor,
								selection.focus
							)
								? selection.focus
								: selection.anchor;

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

								let newPointPath = [...earlierPoint.path]; // create a copy of the path
								newPointPath[newPointPath.length - 1] += 2; // increment the last element

								const newPoint = {
									path: newPointPath,
									offset: 0,
								};

								focusEditor(editor, [0, 0]);
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
									const [node, path] = match;
									const nodeRange = Editor.range(
										editor as Editor,
										path
									);

									const isEntireNodeSelected =
										Point.equals(
											earlierPoint,
											nodeRange.anchor
										) &&
										Point.equals(
											laterPoint,
											nodeRange.focus
										);

									if (isEntireNodeSelected) {
										// You're selecting the entire ELEMENT_CUT_SHOWN
										unwrapNodes(editor, {
											match: (n) =>
												n.type ===
												getPluginType(
													editor,
													ELEMENT_CUT_SHOWN
												),
										});
									} else {
										// You're selecting a part of the ELEMENT_CUT_SHOWN

										// Unwrap the node
										withoutNormalizing(editor, () => {
											// Unwrap nodes at new selection

											// Check the node before the selection
											const beforeSelection =
												Editor.before(
													editor as Editor,
													selection
												);
											const beforeNode =
												beforeSelection &&
												Editor.node(
													editor as Editor,
													beforeSelection.path
												);

											const parentNode = getParentNode(
												editor,
												beforeNode[1]
											);

											const hasCutShownBefore =
												parentNode[0].type ===
												ELEMENT_CUT_SHOWN;

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

											if (hasCutShownBefore) {
												// There's more ELEMENT_CUT_SHOWN text before the selection
												const cutPath =
													earlierPoint.path.slice(
														0,
														-1
													);
												cutPath[
													cutPath.length - 1
												] += 1;

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
											} else {
												unwrapNodes(editor, {
													match: (n) =>
														n.type ===
														getPluginType(
															editor,
															ELEMENT_CUT_SHOWN
														),
													at: selection,
													split: true,
												});
											}
										});
									}
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
								collapseSelection(editor, { edge: 'end' });
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
