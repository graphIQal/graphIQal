import {
	Hotkeys,
	KeyboardHandlerReturnType,
	PlateEditor,
	Value,
} from '@udecode/plate';
import { MyEditor, MyValue } from '../../plateTypes';
import { indent } from './transforms/indent';
import { outdent } from './transforms/outdent';

export const onKeyDownTab =
	<V extends MyValue = MyValue, E extends MyEditor = MyEditor>(
		editor: E
	): KeyboardHandlerReturnType =>
	(e) => {
		if (Hotkeys.isTab(editor, e)) {
			e.preventDefault();
			indent(editor);
		}

		if (Hotkeys.isUntab(editor, e)) {
			e.preventDefault();
			outdent(editor);
		}
	};
