import {
	getChildren,
	liftNodes,
	moveChildren,
	PlateEditor,
	unwrapNodes,
} from '@udecode/plate';
import { MyValue } from '../../../plateTypes';
import { SetIndentOptions } from './setIndent';

import { getNode, moveNodes } from '@udecode/plate';
import { Node, Path } from 'slate';

/**
 * Increase the indentation of the selected blocks.
 */
export const outdent = <V extends MyValue>(
	editor: PlateEditor<V>,
	nestedBlockNum: number = 2
) => {
	if (editor.selection) {
		const path = editor.selection.anchor.path;
		// const paragraphPath = Path.parent(editor.selection.anchor.path);
		// const blockPath = Path.parent(paragraphPath);

		let blockPath = path;
		for (let i = 0; i < nestedBlockNum; i++) {
			blockPath = Path.parent(blockPath);
		}

		if (blockPath.length > 1) {
			// move all children into this current node
			// path (text -> paragraph -> block)
			// find children index based on current path
			const blockNode = getNode(editor, blockPath);

			if (
				blockNode &&
				'children' in blockNode &&
				Array.isArray(blockNode.children)
			) {
				moveChildren(editor, {
					at: Path.parent(blockPath),
					to: [...blockPath, blockNode.children.length],
					fromStartIndex: blockPath[blockPath.length - 1] + 1,
				});
			}

			// lift nodes upwards
			liftNodes(editor, {
				at: blockPath,
			});
		}
	}
};
