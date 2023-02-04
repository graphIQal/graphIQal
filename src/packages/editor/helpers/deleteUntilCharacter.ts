import { isSelectionAtBlockStart } from '@udecode/plate';
import { MyEditor } from '../plateTypes';

export const deleteUntilCharacter = (char: string, editor: MyEditor) => {
	// Add while next character doesn't match string
	while (!isSelectionAtBlockStart(editor)) {
		//
		editor.deleteBackward('character');
		console.log(editor.selection);
	}
};
