import { PlateEditor, Value } from '@udecode/plate-core';

import { MyEditor, MyValue } from '../../plateTypes';
import { normalizeBlock } from './normaliser/normaliseBlock';

export const withBlock = <
	V extends MyValue = MyValue,
	E extends MyEditor = MyEditor
>(
	editor: E
) => {
	editor.normalizeNode = normalizeBlock(editor);

	return editor;
};
