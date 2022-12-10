import React, { useRef, useEffect, useState } from 'react';
import { Text, Transforms, Range, Editor, PathRef } from 'slate';
import { useSlate, useFocused, ReactEditor } from 'slate-react';
import BlockMenu from '../BlockMenu/BlockMenu';

const FloatingMenu: React.FC<{}> = () => {
  const ref = useRef<any>();
  const editor = useSlate();
  const inFocus = useFocused();
  const [isOpen, setIsOpen] = useState(true);
  const left = useRef(0);
  let isCommandMenu = false;

  //   const getCurrentBlock = (editor: Editor)  =>{
  //     const { selection } = editor;

  //     if (!selection) {
  //       return { block: null, anchor: null, focus: null };
  //     }

  //     const { anchor, focus } = selection;
  //     const { path } = anchor
  //     const block = editor.children[path[0]] as Block;
  //     return { block, anchor, focus };
  //   }

  //   const focusBlock = (editor, path) => {
  //     ReactEditor.focus(editor);

  //     Transforms.select(editor, {
  //       anchor: { path: [path[0], 0], offset: 0 },
  //       focus: { path: [path[0], 0], offset: 0 },
  //     });
  //   }
  const openTagSelectorMenu = () => {
    // if (!isOpen) {
    // menuListRef.current?.scrollTo(0, 0)
    isCommandMenu = true;
    setIsOpen(true);
    // }

    // document.addEventListener('click', closeTagSelectorMenu, false)
  };
  useEffect(() => {
    // console.log(getCurrentBlock(editor))
    // console.log(Editor.before);

    const el = ref.current;
    const { selection } = editor;
    if (isCommandMenu) openTagSelectorMenu();
    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      !Range.isCollapsed(selection)
    ) {
      el.removeAttribute('style');
      return;
    }
    if (editor.selection) {
      const domSelection = window.getSelection();
      if (domSelection) {
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = 1;

        let elementHeight = 35;
        const [node] = Editor.parent(editor, editor.selection);
        try {
          elementHeight = ReactEditor.toDOMNode(
            editor,
            node
          ).getBoundingClientRect().height;
          console.log('height' + elementHeight);
          // eslint-disable-next-line no-empty
        } catch {}
        elementHeight = elementHeight > 30 ? 35 : elementHeight;
        el.style.top =
          rect.top +
          window.pageYOffset -
          el.offsetHeight +
          elementHeight +
          5 +
          'px';

        el.style.left = isOpen
          ? left.current
          : rect.left +
            window.pageXOffset -
            el.offsetWidth / 2 +
            rect.width / 2 -
            12 +
            'px';

        if (!isOpen) left.current = el.style.left;
      }
    }
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
      {isOpen && (
        <BlockMenu
        //   className='hovering_menu'
        />
      )}
    </div>
  );
};

export default FloatingMenu;
