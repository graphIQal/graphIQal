import { PlateEditor, Value } from '@udecode/plate';

import { MyEditor, MyValue } from '../../plateTypes';
import { normalizeNodeLink } from './normalisenodeLink';

export const withNodeLink = <
	V extends MyValue = MyValue,
	E extends MyEditor = MyEditor
>(
	editor: E
) => {
	editor.normalizeNode = normalizeNodeLink(editor);

	return editor;
};
