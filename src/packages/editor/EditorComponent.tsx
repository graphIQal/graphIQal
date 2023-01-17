import {
  createComboboxPlugin,
  createNodeIdPlugin,
  ELEMENT_H1,
  Plate,
} from '@udecode/plate';
import React, { useEffect, useMemo, useState } from 'react';
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
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';
import { getCurrentUser } from '../../helpers/backend/userHelpers';

const EditorComponent: React.FC = () => {
  const [value, setValue] = useState([
    {
      type: ELEMENT_H1,
      id: 'asdkja',
      children: [{ text: 'title' }],
    } as MyH1Element,
    {
      type: 'block',
      id: 'aaaaa',
      children: [
        {
          type: 'p',
          id: 'aaaaa',
          children: [
            {
              text: 'This is a test',
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
        createComboboxPlugin(),
        createNodeIdPlugin(),
      ]),
    []
  );
  // `useCallback` here to memoize the function for subsequent renders.
  // const renderElement = useCallback((props: any) => {
  // 	return <Block {...props} />;
  // }, []);
  let user;
  user = getCurrentUser('8f94b276-711d-4eeb-9348-c73f55a98459');
  return (
    <div>
      <p>{'Hello ' + user}</p>
      <Plate<MyValue>
        editableProps={editableProps}
        value={value}
        onChange={(value) => {
          console.log(value);
        }}
        plugins={plugins}
      >
        <EditorFloatingMenu />
        <EditorSlashMenu />
      </Plate>
    </div>
  );
};

export default EditorComponent;
