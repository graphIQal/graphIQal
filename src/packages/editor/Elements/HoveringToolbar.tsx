import React, { useRef, useEffect } from 'react';
import { Text, Transforms, Range, Editor } from 'slate';
import { useSlate, useFocused } from 'slate-react';
import BlockMenu from '../BlockMenu/BlockMenu';

const HoveringToolbar: React.FC<{}> = () => {
  const ref = useRef<any>();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.style.opacity = '0';
      return;
    }

    const domSelection = window.getSelection();
    if (domSelection == null || domSelection.rangeCount === 0) return;
    const domRange = domSelection.getRangeAt(0);

    const rect = domRange.getBoundingClientRect();

    el.style.opacity = '1';
    el.style.top = rect.top + window.pageYOffset - el.offsetHeight + 'px';
    el.style.left =
      rect.left +
      window.pageXOffset -
      el.offsetWidth / 2 +
      rect.width / 2 +
      'px';
  });

  const className = 'hovering_menu_item';

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        display: 'inline-block',
        padding: '8px 7px 6px',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        marginTop: '6px',
        backgroundColor: '#00000',
        height: 30,
        width: 30,
        borderRadius: '4px',
        marginLeft: '200px',
      }}
    >
      <BlockMenu
        className='hovering_menu'
        items={[
          {
            title: 'text',
            className: 'block_item',
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
            className: className,
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
            className: className,
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
            className: className,
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
            className: className,
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
          {
            title: 'test',
            className: className,
            onPress: () => {},
          },
        ]}
      />
    </div>
  );
};

export default HoveringToolbar;
