import {
	getNodeEntries,
	GetNodeEntriesOptions,
	isBlock,
	TEditor,
	Value,
} from '@udecode/plate-core';
import { MyEditor } from '../../editor/plateTypes';

/**
 * Get blocks with an id
 */
export const getBlocksWithId = <V extends Value>(
	editor: MyEditor,
	options: GetNodeEntriesOptions<V>
) => {
	const _nodes = getNodeEntries(editor, {
		match: (n) => isBlock(editor, n) && !!n.id,
		...options,
	});
	return Array.from(_nodes);
};
