import {
	MARK_BOLD,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
// import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons } from '@/components/icons';

import { ELEMENT_CUT_HIDDEN, MARK_COLOUR } from '@/packages/editor/plateTypes';
import {
	collapseSelection,
	deselect,
	focusEditor,
	getPluginType,
	select,
	useEditorRef,
	withoutNormalizing,
	wrapNodes,
} from '@udecode/plate';
import { BaseEditor, Path, Transforms } from 'slate';
import { CommentToolbarButton } from './comment-toolbar-button';
import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { ToolbarButton } from './toolbar';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { ReactEditor } from 'slate-react';

export function FloatingToolbarButtons() {
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

							console.log(selection);
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

							// const focusEditor = (editor, target) => {
							// 	if (target) {
							// 		withoutNormalizing(editor, () => {
							// 			deselect(editor);
							// 			select(editor, target);
							// 		});
							// 	}
							// 	console.log('okay');
							// 	ReactEditor.focus(editor);
							// };

							// collapseSelection(editor);
							// Transforms.select(
							// 	editor as BaseEditor,
							// 	newPointPath
							// );
							const neet = focusEditor(editor, [0, 0]);
							collapseSelection(editor);
							select(editor, newPoint);

							// setSelection(editor, {
							// 	anchor: newPoint,
							// 	focus: newPoint,
							// });
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
