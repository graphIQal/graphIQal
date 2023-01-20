import { MyEditor } from '../editor/plateTypes';

export const ItemTypes = {
	block: 'block',
};

export interface DragItemNode {
	/**
	 * Required to identify the node.
	 */
	id: string;
	sourceEditor: MyEditor;
	[key: string]: unknown;
}

export type DropLineDirection = '' | 'top' | 'bottom';

export type DropDirection = 'top' | 'bottom' | undefined;
