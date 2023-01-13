import {
	findNodePath,
	getNode,
	getNodeLevels,
	getNodes,
	getPreviousNode,
	moveNodes,
} from '@udecode/plate';
import {
	AnyObject,
	getNodeEntries,
	GetNodeEntriesOptions,
	getPluginInjectProps,
	PlateEditor,
	setElements,
	UnhangRangeOptions,
	unsetNodes,
	Value,
	withoutNormalizing,
} from '@udecode/plate-core';
import { COMMAND_NEST, MyEditor, MyValue } from '../../../plateTypes';

export interface SetIndentOptions<V extends Value> {
	/**
	 * getNodeEntries options
	 */
	getNodesOptions?: GetNodeEntriesOptions<V> & UnhangRangeOptions;

	/**
	 * Set other props than the indent one.
	 * These will be unset if indent = 0.
	 */
	setNodesProps?: ({ indent }: { indent: number }) => AnyObject;

	/**
	 * Nodes props to unset when indent = 0.
	 */
	unsetNodesProps?: string[];
}

/**
 * Add offset to the indentation of the selected blocks.
 */
export const setIndent = <V extends MyValue>(
	editor: PlateEditor<V>,
	{
		getNodesOptions,
		setNodesProps,
		unsetNodesProps = [],
	}: SetIndentOptions<V>
) => {
	const { nodeKey } = getPluginInjectProps(editor, COMMAND_NEST);

	const _nodes = getNodeEntries(editor, {
		block: true,
		mode: 'lowest',
		...getNodesOptions,
	});

	const nodes = Array.from(_nodes);

	if (editor.selection) {
		const path = editor.selection.anchor.path;
		console.log(editor.selection);
		console.log('path ', path);

		if (path[path.length - 2] > 0) {
			console.log(path);
			const parentPath = [...path].slice(0, path.length - 1);
			parentPath[path.length - 2] -= 1;
			const parentNode = getNode(editor, parentPath);
			console.log(parentPath);
			console.log(parentNode);
			// const node = getPreviousNode(editor);
			// console.log(node);
			if (parentNode && 'children' in parentNode) {
				// parentPath[parentPath.length - 2] = parentNode.children.length;
				// if there are children, it should look at the path above it.
				// It should always look at its level
				if (parentPath[parentPath.length - 2] > 0) {
					console.log(true);
				} else {
					console.log(false);
				}
			}
			moveNodes(editor, { to: [0] });
		}
	}
};
