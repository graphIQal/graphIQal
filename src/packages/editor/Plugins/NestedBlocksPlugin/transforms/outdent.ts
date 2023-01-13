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
	options?: SetIndentOptions<V>
) => {
	if (editor.selection) {
		const path = editor.selection.anchor.path;
		const paragraphPath = Path.parent(editor.selection.anchor.path);
		const blockPath = Path.parent(paragraphPath);

		console.log(blockPath);

		if (blockPath.length > 1) {
			// move all children into this current node
			// path (text -> paragraph -> block)
			// find children index based on current path
			const parentBlockNode = getNode(editor, Path.parent(blockPath));
			const blockNode = getNode(editor, blockPath);
			console.log(parentBlockNode);
			console.log('parent stuff');
			console.log(Path.parent(blockPath));
			console.log(blockNode);

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

			// Move children below into current block

			// lift nodes upwards
			liftNodes(editor, {
				at: path.slice(0, path.length - 2),
			});
		}
	}
};
