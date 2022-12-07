import React, { useCallback, useRef, useState } from 'react';

import { createEditor, Range, Text, Transforms } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

// TypeScript users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import BlockMenu from './BlockMenu/BlockMenu';
import EditorCommands from './EditorCommands';
import { CodeElement, DefaultElement, Leaf } from './Elements/Elements';
import HoveringToolbar from './Elements/HoveringToolbar';

type CustomElement = {
  format: 'paragraph' | 'code';
  type: 'block' | 'node' | 'connection';
  children: (CustomText | CustomElement)[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italics?: boolean;
  text_type: 'text' | 'h1' | 'h2' | 'h3';
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: CustomElement[] = [
  {
    type: 'block',
    format: 'paragraph',
    children: [{ text: 'TITLE PAGE', text_type: 'h1' }],
  },
  {
    type: 'block',
    format: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.', text_type: 'text' }],
  },
];

const EditorComponent: React.FC = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const ref = useRef();

  // ELEMENTS
  // Define a React component renderer for our code blocks.

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  const [opacity, setOpacity] = useState<'0%' | '100%'>('0%');
  const showMenu = () => {
    setOpacity('100%');
    // editor.insertNode()
  };

  const getItems = () => {
    return [
      {
        title: 'text',
        onPress: () => {
          Transforms.setNodes(
            editor,
            { text_type: 'text' },
            // Apply it to text nodes, and split the text node up if the
            // selection is overlapping only part of it.
            {
              match: (n) => Text.isText(n),
            }
          );
        },
      },
      {
        title: 'Header 1',
        onPress: () => {
          Transforms.setNodes(
            editor,
            { text_type: 'h1' },
            // Apply it to text nodes, and split the text node up if the
            // selection is overlapping only part of it.
            {
              match: (n) => Text.isText(n),
            }
          );
        },
      },
      {
        title: 'Header 2',
        onPress: () => {
          Transforms.setNodes(
            editor,
            { text_type: 'h2' },
            // Apply it to text nodes, and split the text node up if the
            // selection is overlapping only part of it.
            {
              match: (n) => Text.isText(n),
            }
          );
        },
      },
      {
        title: 'Header 3',
        onPress: () => {
          Transforms.setNodes(
            editor,
            { text_type: 'h3' },
            // Apply it to text nodes, and split the text node up if the
            // selection is overlapping only part of it.
            {
              match: (n) => Text.isText(n),
            }
          );
        },
      },
      {
        title: 'bold',
        onPress: () => {
          Transforms.setNodes(
            editor,
            { bold: true },
            // Apply it to text nodes, and split the text node up if the
            // selection is overlapping only part of it.
            {
              match: (n) => Text.isText(n),
              split: true,
            }
          );
        },
      },
    ];
  };

  return (
    <>
      <Slate editor={editor} value={initialValue}>
        <HoveringToolbar ref={ref} opacity={opacity} />

        <BlockMenu items={getItems()} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey && !event.metaKey) {
              switch (event.key) {
                case 'Tab':
                  event.preventDefault();
                  if (
                    editor.selection &&
                    Range.isCollapsed(editor.selection) &&
                    editor.selection.anchor.offset === 0
                  ) {
                    console.log('at start');
                  } else {
                    console.log('not at start');
                    editor.insertText('    ');
                  }
                  break;
                case '&':
                  event.preventDefault();
                  editor.insertText('and');
                  break;
                case '/':
                  showMenu();
                  break;
                default:
                  setOpacity('0%');
              }
            } else {
              switch (event.key) {
                // When "`" is pressed, keep our existing code block logic.
                case 'k': {
                  event.preventDefault();
                  EditorCommands.toggleCodeBlock(editor);
                  break;
                }

                // When "B" is pressed, bold the text in the selection.
                case 'b': {
                  event.preventDefault();
                  EditorCommands.toggleBoldMark(editor);
                  break;
                }

                // When "i" is pressed, italics the text in the selection.
                case 'i': {
                  event.preventDefault();
                  EditorCommands.toggleItalicsMark(editor);
                  break;
                }
              }
            }
          }}
        />
      </Slate>
    </>
  );
};

export default EditorComponent;
