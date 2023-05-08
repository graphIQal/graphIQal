import {
  createComboboxPlugin,
  createNodeIdPlugin,
  ELEMENT_H1,
  Plate,
} from '@udecode/plate';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { EditorFloatingMenu } from './Components/EditorFloatingMenu';
import { EditorSlashMenu } from './Components/EditorSlashMenu';
import { editableProps } from './editableProps';
import {
  createMyPlugins,
  MyBlockElement,
  MyH1Element,
  MyParagraphElement,
  MyValue,
} from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { CommandPlugins } from './Plugins/CommandPlugins';
import { FormatPlugins } from './Plugins/FormatPlugins';
import { createBlockPlugin } from './Plugins/NestedBlocksPlugin/BlockPlugin';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';
import TabContext, {
  TabContextInterface,
} from '../../components/context/ViewContext';

const EditorComponent: React.FC<{ textIn: string }> = ({ textIn }) => {
  const [value, setValue] = useState([
    {
      type: ELEMENT_H1,
      id: 'asdkj123123a',
      children: [{ text: textIn }],
    } as MyH1Element,
    {
      type: 'block',
      id: '123123990asdf',
      children: [
        {
          type: 'p',
          id: '33333',
          children: [
            {
              text: '1',
            },
            // { type: 'p', id: 'bbbbb', children: [{ text: 'hmm' }] },
          ],
        } as MyParagraphElement,
      ],
    } as MyBlockElement,
  ]);

  const plugins = useMemo(
    () =>
      createMyPlugins([
        // Mark Plugins
        ...TextMarkPlugins,
        // elements
        ...BlockPlugins,
        // Commands,
        ...CommandPlugins,
        ...FormatPlugins,
        createBlockPlugin(),
        createComboboxPlugin(),
        createNodeIdPlugin(),
      ]),
    []
  );
  // `useCallback` here to memoize the function for subsequent renders.
  // const renderElement = useCallback((props: any) => {
  // 	return <Block {...props} />;
  // }, []);

  return (
    <div>
      <Plate<MyValue>
        editableProps={editableProps}
        value={value}
        onChange={(value) => {
          console.log(value);
        }}
        plugins={plugins}
        id='editor'
      >
        <EditorFloatingMenu />
        <EditorSlashMenu />
      </Plate>
    </div>
  );
};

export default EditorComponent;
