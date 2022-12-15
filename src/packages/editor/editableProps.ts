import { TEditableProps } from '@udecode/plate';
import { MyValue } from './plateTypes';

export const editableProps: TEditableProps<MyValue> = {
	spellCheck: true,
	autoFocus: false,
	readOnly: false,
	placeholder: 'Type…',
};
