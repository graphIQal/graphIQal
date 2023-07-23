import {
	PlateEditor,
	getParentNode,
	ELEMENT_CODE_BLOCK,
	ELEMENT_CODE_LINE,
	isElement,
	setNodes,
} from '@udecode/plate';
import { AutoformatBlockRule } from '@udecode/plate-autoformat';
// import {
//   ELEMENT_CODE_BLOCK,
//   ELEMENT_CODE_LINE,
// } from '@udecode/plate-code-block';
import { toggleList, unwrapList } from '@udecode/plate-list';
import { isType } from 'graphql';
import { MyEditor } from '../../plateTypes';

export const preFormat: AutoformatBlockRule['preFormat'] = (editor) =>
	unwrapList(editor);

export const format = (
	editor: MyEditor | PlateEditor,
	customFormatting: any
) => {
	if (editor.selection) {
		const parentEntry = getParentNode(editor, editor.selection);
		if (!parentEntry) return;

		console.log('hmmm');
		const [node] = parentEntry;
		if (
			isElement(node)
			//   &&
			//   !isType(editor, node, ELEMENT_CODE_BLOCK) &&
			//   !isType(editor, node, ELEMENT_CODE_LINE)
		) {
			customFormatting();
		}
	}
};

export const formatList = (
	editor: MyEditor,
	elementType: string,
	additionalParams?: Object
) => {
	format(editor, () =>
		// toggleList(editor, {
		// 	type: elementType,
		// })
		setNodes(editor, {
			type: elementType,
			...additionalParams,
		})
	);
};

export const formatText = (editor: PlateEditor, text: string) => {
	format(editor, () => editor.insertText(text));
};
