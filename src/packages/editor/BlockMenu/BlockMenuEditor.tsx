// make toolbar a general component that just takes in children and stuff

import React, { useRef } from 'react';
import { Text, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import BlockMenu from '../../../components/organisms/BlockMenu';

const BlockMenuEditor: React.FC<{}> = () => {
  const ref = useRef<any>();
  const editor = useSlate();

  const items = [
    // {
    // 	buttonText: 'text',
    // 	onPress: () => {
    // 		Transforms.setNodes(
    // 			editor,
    // 			{ text_type: 'text' },
    // 			// Apply it to text nodes, and split the text node up if the
    // 			// selection is overlapping only part of it.
    // 			{
    // 				match: (n) => Text.isText(n),
    // 			}
    // 		);
    // 	},
    // },
    // {
    // 	buttonText: 'Header 1',
    // 	onPress: () => {
    // 		Transforms.setNodes(
    // 			editor,
    // 			{ text_type: 'h1' },
    // 			// Apply it to text nodes, and split the text node up if the
    // 			// selection is overlapping only part of it.
    // 			{
    // 				match: (n) => Text.isText(n),
    // 			}
    // 		);
    // 	},
    // },
    // {
    // 	buttonText: 'Header 2',
    // 	onPress: () => {
    // 		Transforms.setNodes(
    // 			editor,
    // 			{ text_type: 'h2' },
    // 			// Apply it to text nodes, and split the text node up if the
    // 			// selection is overlapping only part of it.
    // 			{
    // 				match: (n) => Text.isText(n),
    // 			}
    // 		);
    // 	},
    // },
    // {
    // 	buttonText: 'Header 3',
    // 	onPress: () => {
    // 		Transforms.setNodes(
    // 			editor,
    // 			{ text_type: 'h3' },
    // 			// Apply it to text nodes, and split the text node up if the
    // 			// selection is overlapping only part of it.
    // 			{
    // 				match: (n) => Text.isText(n),
    // 			}
    // 		);
    // 	},
    // },
    // {
    // 	buttonText: 'bold',
    // 	onPress: () => {
    // 		Transforms.setNodes(
    // 			editor,
    // 			{ bold: true },
    // 			// Apply it to text nodes, and split the text node up if the
    // 			// selection is overlapping only part of it.
    // 			{
    // 				match: (n) => Text.isText(n),
    // 				split: true,
    // 			}
    // 		);
    // 	},
    // },
    {
      buttonText: 'test',
      onPress: () => {
        Transforms.moveNodes(editor, { to: [0] });
      },
    },
  ];

  return <BlockMenu items={items} />;
};

export default BlockMenuEditor;
