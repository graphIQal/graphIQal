import { ELEMENT_PARAGRAPH, outdent, wrapNodes } from '@udecode/plate';
import {
	TElement,
	TNodeEntry,
	getChildren,
	getPluginType,
	setNodes,
} from '@udecode/plate-core';
import {
	MyValue,
	MyEditor,
	ELEMENT_BLOCK,
	BlockwrappedElements,
	MyParagraphElement,
	ELEMENT_NODELINK,
} from '../../plateTypes';
// import {isCollapsed} from '@udecode/plate'
import { Editor, Range, Text, Transforms } from 'slate';
import { deselect, isCollapsed, isBlockAboveEmpty } from '@udecode/plate';
// I will normalise the block by setting the first block to text and all future blocks as children
export const normalizeNodeLink = <V extends MyValue>(editor: MyEditor) => {
	const nodeLinkType = getPluginType(editor, ELEMENT_NODELINK);

	const { normalizeNode } = editor;

	return ([node, path]: TNodeEntry) => {
		normalizeNode([node, path]);

		const isNodeLink = node.type === nodeLinkType;

		if (isNodeLink) {
			if (
				isCollapsed(editor.selection) &&
				editor.selection?.anchor.path
			) {
				console.log(node, path);
			}
		}

		// normalizeNode([node, path]);
	};
};
