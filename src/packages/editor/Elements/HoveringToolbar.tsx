import React from 'react';
import { Text, Transforms } from 'slate';
import { useSlate } from 'slate-react';
import BlockMenu from '../BlockMenu/BlockMenu';

type HoveringToolbarProps = {
  opacity: '0%' | '100%';
  ref: any;
};
const HoveringToolbar: React.FC<HoveringToolbarProps> = ({ opacity, ref }) => {
  // const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  // const inFocus = useFocused();

  // useEffect(() => {
  //   const el = ref.current;
  //   const { selection } = editor;

  //   if (!el) {
  //     return;
  //   }

  //   if (
  //     !selection ||
  //     !inFocus ||
  //     Range.isCollapsed(selection) ||
  //     Editor.string(editor, selection) === ''
  //   ) {
  //     // setOpacity('0%');
  //     return;
  //   }

  //   const domSelection = window.getSelection();
  //   if (domSelection) {
  //     const domRange = domSelection.getRangeAt(0);
  //     const rect = domRange.getBoundingClientRect();
  //     el.style.opacity = '1';
  //     el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
  //     el.style.left = `${
  //       rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
  //     }px`;
  //   }
  // });

  //   const getPixelPosition = function(position, onScreen) {
  //     if (!position)
  //         position = this.session.selection.getCursor();
  //     var pos =
  //     var cursorLeft = this.$padding + pos.column * this.config.characterWidth;
  //     var cursorTop = (pos.row - (onScreen ? this.config.firstRowScreen : 0)) *
  //         this.config.lineHeight;

  //     return {left : cursorLeft, top : cursorTop};
  // };
  return (
    <div
      ref={ref}
      style={{
        opacity: opacity,
        display: 'inline-block',
        padding: '8px 7px 6px',
        position: 'absolute',
        zIndex: 1,

        // top: '-10000px',
        // left: '-10000px',
        marginTop: '6px',
        backgroundColor: '#00000',
        borderRadius: '4px',

        marginLeft: '200px',
      }}
    >
      <BlockMenu
        items={[
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
          {
            title: 'test',
            onPress: () => {},
          },
        ]}
      />
    </div>
  );
};

export default HoveringToolbar;
