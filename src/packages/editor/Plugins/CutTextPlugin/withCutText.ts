import { PlateEditor, Value } from '@udecode/plate';

import { MyEditor, MyValue } from '../../plateTypes';
import { normaliseCutText } from './normaliseCutText';

export const withCutText = <
	V extends MyValue = MyValue,
	E extends MyEditor = MyEditor
>(
	editor: E
) => {
	editor.normalizeNode = normaliseCutText(editor);

	return editor;
};
