import { deselect } from '@udecode/plate';
import {
	Hotkeys,
	KeyboardHandlerReturnType,
	PlateEditor,
	Value,
} from '@udecode/plate-core';
import { MyEditor, MyValue } from '../../plateTypes';

export const onKeyDownTest =
	<V extends MyValue = MyValue, E extends MyEditor = MyEditor>(
		editor: E
	): KeyboardHandlerReturnType =>
	(e) => {
		e.preventDefault();
		console.log('test');
		deselect(editor);
	};
