import {
	PlateEditor,
	getParentNode,
	ELEMENT_CODE_BLOCK,
	ELEMENT_CODE_LINE,
	isElement,
} from '@udecode/plate';
import { AutoformatBlockRule } from '@udecode/plate-autoformat';
// import {
//   ELEMENT_CODE_BLOCK,
//   ELEMENT_CODE_LINE,
// } from '@udecode/plate-code-block';
import { toggleList, unwrapList } from '@udecode/plate-list';
import { isType } from 'graphql';

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) =>
	unwrapList(editor);

export const format = (editor: PlateEditor, customFormatting: any) => {
	if (editor.selection) {
		console.log('custom formatting part 1');

		const parentEntry = getParentNode(editor, editor.selection);
		console.log('parentEntry');
		console.log(parentEntry);
		if (!parentEntry) return;

		console.log('hmmm');
		const [node] = parentEntry;
		if (
			isElement(node)
			//   &&
			//   !isType(editor, node, ELEMENT_CODE_BLOCK) &&
			//   !isType(editor, node, ELEMENT_CODE_LINE)
		) {
			console.log('custom formatting');
			customFormatting();
		}
	}
};

export const formatList = (editor: PlateEditor, elementType: string) => {
	format(editor, () =>
		toggleList(editor, {
			type: elementType,
		})
	);
};

export const formatText = (editor: PlateEditor, text: string) => {
	format(editor, () => editor.insertText(text));
};
