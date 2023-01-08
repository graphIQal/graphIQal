import { getRange, TNodeEntry, Value } from '@udecode/plate-core';
import { MyEditor } from '../../editor/plateTypes';

/**
 * Get node entries range.
 */
export const getNodesRange = <V extends Value>(
	editor: MyEditor,
	nodeEntries: TNodeEntry[]
) => {
	if (!nodeEntries.length) return;

	const firstBlockPath = nodeEntries[0][1];
	const lastBlockPath = nodeEntries[nodeEntries.length - 1][1];

	return getRange(editor, firstBlockPath, lastBlockPath);
};
