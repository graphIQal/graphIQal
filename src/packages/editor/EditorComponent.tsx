import {
  createComboboxPlugin,
  createNodeIdPlugin,
  Plate,
} from '@udecode/plate';
import React, { useMemo, useState } from 'react';
import { EditorFloatingMenu } from './Components/EditorFloatingMenu';
import { EditorSlashMenu } from './Components/EditorSlashMenu';
import { editableProps } from './editableProps';
import { createMyPlugins, MyParagraphElement, MyValue } from './plateTypes';
import { BlockPlugins } from './Plugins/BlockPlugins';
import { TextMarkPlugins } from './Plugins/TextMarkPlugins';
import { userQuery } from '../../helpers/backend/userHelpers';

const EditorComponent: React.FC = () => {
  const [value, setValue] = useState([
    {
      type: 'p',
      id: 'aaaaa',
      children: [
        {
          text: 'This is editable plain text with react and history plugins, just like a <textarea>!',
        },
        { type: 'p', id: 'bbbbb', children: [{ text: 'hmm' }] },
      ],
    } as MyParagraphElement,
  ]);

  const plugins = useMemo(
    () =>
      createMyPlugins([
        // Mark Plugins
        ...TextMarkPlugins,
        // elements
        ...BlockPlugins,
        // Commands,
        createComboboxPlugin(),
        createNodeIdPlugin(),
      ]),
    []
  );
  // `useCallback` here to memoize the function for subsequent renders.
  // const renderElement = useCallback((props: any) => {
  // 	return <Block {...props} />;
  // }, []);
  const userName = userQuery('8f94b276-711d-4eeb-9348-c73f55a98459');

  return (
    <div>
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
