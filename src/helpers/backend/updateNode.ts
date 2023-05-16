import { GraphViewContextInterface } from '../../packages/graph/context/GraphViewContext';

export type NodeUpdate = 'resize' | 'drag' | 'title' | 'icon' | 'color';

export const updateNode = (
	type: NodeUpdate,
	newVal: any,
	nodeID: string,
	context: GraphViewContextInterface | null
) => {
	let graphNodes = context?.nodeVisualData_Graph;
	let nodeData = context?.nodeData_Graph;
	if (!graphNodes || !nodeData) return;

	switch (type) {
		case 'drag':
			const [x, y] = [newVal.x, newVal.y];
			context?.addAction(nodeID, 'DRAG', {
				new: {
					x: x,
					y: y,
				},
				old: {
					x: graphNodes[nodeID].x,
					y: graphNodes[nodeID].y,
				},
			});
			graphNodes[nodeID].x = x;
			graphNodes[nodeID].y = y;

			context?.setnodeVisualData_Graph({ ...graphNodes });

			break;
		case 'resize':
			if (!graphNodes[nodeID].y || !graphNodes[nodeID].x) return;
			const newSize = [newVal.width, newVal.height];
			const oldX = graphNodes[nodeID].x;
			const oldY = graphNodes[nodeID].y;
			let valX;
			let valY;
			if (newVal.tag === 'top') {
				valY =
					graphNodes[nodeID].y +
					graphNodes[nodeID].height -
					newSize[1];
				if (Number.isFinite(valY)) {
					graphNodes[nodeID].y = valY;
				}
			}
			if (newVal.tag === 'left') {
				valX =
					graphNodes[nodeID].x +
					graphNodes[nodeID].width -
					newSize[0];
				if (Number.isFinite(valX)) {
					graphNodes[nodeID].x = valX;
				}
			}
			console.log('done ' + newVal.done);
			if (newVal.done) {
				context?.addAction(nodeID, 'NODE_SIZE', {
					new: {
						width: graphNodes[nodeID].width,
						height: graphNodes[nodeID].height,
						x: valX ? valX : oldX,
						y: valY ? valY : oldY,
					},
					old: {
						width: newVal.width,
						height: newVal.height,
						x: oldX,
						y: oldY,
					},
				});
				return;
			}

			graphNodes[nodeID].width = newSize[0];
			graphNodes[nodeID].height = newSize[1];
			context?.setnodeVisualData_Graph({ ...graphNodes });
			break;

		case 'title':
			context?.addAction(nodeID, 'NODE_TITLE', {
				oldTitle: nodeData[nodeID].title,
				title: newVal,
			});
			nodeData[nodeID].title = newVal;

			context?.setnodeData_Graph({ ...nodeData });
			break;
		case 'icon':
			context?.addAction(nodeID, 'NODE_ICON', {
				new: { icon: newVal },
				old: { icon: nodeData[nodeID].icon },
			});
			nodeData[nodeID].icon = newVal;
			context?.setnodeData_Graph({ ...nodeData });
			break;
		case 'color':
			context?.addAction(nodeID, 'NODE_COLOR', {
				new: { color: newVal },
				old: { color: nodeData[nodeID].color },
			});
			nodeData[nodeID].color = newVal;
			context?.setnodeData_Graph({ ...nodeData });
			break;
	}
};
