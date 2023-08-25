/**
 * Hook that returns the updateSize method that will be used on resize
 */
import { useCallback } from 'react';
import { useGraphViewAPI, useGraphViewData } from '../context/GraphViewContext';
import { updateNode } from '../helpers/backend/updateNode';

//When box is resized
export const useResize = () => {
	const { nodeVisualData_Graph, nodeData_Graph, addAction } =
		useGraphViewData();
	const { changeNodeData_Graph, changeVisualData_Graph } = useGraphViewAPI();
	let updateSize = useCallback(
		(
			id: string,
			width: number,
			height: number,

			tag?: string,
			done?: boolean
		) => {
			updateNode(
				'resize',
				{
					width: width,
					height: height,
					tag: tag,
					done: done,
				},
				id,
				{
					addAction,
					changeVisualData_Graph,
					nodeVisualData_Graph,
					nodeData_Graph,
					changeNodeData_Graph,
				}
			);
		},
		[nodeVisualData_Graph, changeVisualData_Graph]
	);

	return updateSize;
};
