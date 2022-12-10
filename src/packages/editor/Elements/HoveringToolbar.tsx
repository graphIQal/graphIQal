// make toolbar a general component that just takes in children and stuff

import React, {
  useRef,
  useEffect,
  EffectCallback,
  MutableRefObject,
} from 'react';
import { Text, Transforms, Range, Editor } from 'slate';
import { useSlate, useFocused } from 'slate-react';
import BlockMenu from '../BlockMenu/BlockMenu';
import HoveringToolbarOrg from '../../../components/organisms/HoveringToolbarOrg';

const HoveringToolbar: React.FC<{}> = () => {
  const ref = useRef<any>();
  const editor = useSlate();
  const inFocus = useFocused();
  const onRender = (ref: MutableRefObject<any>) => {
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
  };

  const items = [
    {
      buttonText: 'text',
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
      buttonText: 'Header 1',
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
      buttonText: 'Header 2',
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
      buttonText: 'Header 3',
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
      buttonText: 'bold',
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

  return (
    <div ref={ref}>
      <HoveringToolbarOrg
        ref={ref}
        items={items}
        onRender={(ref: MutableRefObject<any>) => onRender(ref)}
      />
      {/* <BlockMenu
        className='hovering_menu'
        items={}
      /> */}
    </div>
  );
};

export default HoveringToolbar;
