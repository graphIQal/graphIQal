import React from 'react';
import {
	MARK_BOLD,
	MARK_CODE,
	MARK_ITALIC,
	MARK_STRIKETHROUGH,
	MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
// import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons } from '@/components/icons';

import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { ELEMENT_CUT_HIDDEN, MARK_COLOUR } from '@/packages/editor/plateTypes';
import { ToolbarButton } from './toolbar';
import {
	collapseSelection,
	focusEditor,
	getPluginType,
	toggleNodeType,
	useEditorRef,
	wrapNodes,
} from '@udecode/plate';
import { CommentToolbarButton } from './comment-toolbar-button';

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
							collapseSelection(editor);
							focusEditor(editor);
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
