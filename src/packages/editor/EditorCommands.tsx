import { Editor, Text, Transforms } from 'slate';

import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

// Define our own custom set of helpers.
const EditorCommands = {
  // isBoldMarkActive(editor: BaseEditor & ReactEditor) {
  //   const [match] = Array.from(
  //     Editor.nodes(editor, {
  //       match: (n) => Text.isText(n) && n.bold === true,
  //       universal: true,
  //     })
  //   );
  //   return !!match;
  // },
  // toggleBoldMark(editor: BaseEditor & ReactEditor) {
  //   Transforms.setNodes(
  //     editor,
  //     { bold: EditorCommands.isBoldMarkActive(editor) ? false : true },
  //     { match: (n) => Text.isText(n), split: true }
  //   );
  // },
  // isItalicsMarkActive(editor: BaseEditor & ReactEditor) {
  //   const [match] = Array.from(
  //     Editor.nodes(editor, {
  //       match: (n) => Text.isText(n) && n.italics === true,
  //       universal: true,
  //     })
  //   );
  //   return !!match;
  // },
  // toggleItalicsMark(editor: BaseEditor & ReactEditor) {
  //   Transforms.setNodes(
  //     editor,
  //     {
  //       italics: EditorCommands.isItalicsMarkActive(editor) ? false : true,
  //     },
  //     { match: (n) => Text.isText(n), split: true }
  //   );
  // },
  // isCodeBlockActive(editor: BaseEditor & ReactEditor) {
  //   const [match] = Array.from(
  //     Editor.nodes(editor, {
  //       match: (n) => {
  //         // console.log('match');
  //         // console.log(n);
  //         // console.log(Editor.isBlock(editor, n));
  //         return Editor.isBlock(editor, n) && n.format === 'code';
  //       },
  //     })
  //   );
  //   return !!match;
  // },
  // toggleCodeBlock(editor: BaseEditor & ReactEditor) {
  //   Transforms.setNodes(
  //     editor,
  //     {
  //       format: EditorCommands.isCodeBlockActive(editor) ? 'paragraph' : 'code',
  //     },
  //     { match: (n) => Editor.isBlock(editor, n) }
  //   );
  // },
};

export default EditorCommands;
