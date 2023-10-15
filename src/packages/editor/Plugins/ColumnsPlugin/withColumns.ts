import { PlateEditor, Value } from '@udecode/plate';

import { MyEditor, MyValue } from '../../plateTypes';
import { normaliseColumns } from './normaliseColumns';

export const withColumns = <
	V extends MyValue = MyValue,
	E extends MyEditor = MyEditor
>(
	editor: E
) => {
	editor.normalizeNode = normaliseColumns(editor);

	return editor;
};
