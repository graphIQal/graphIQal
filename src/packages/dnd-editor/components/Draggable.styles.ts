import { MyValue } from '../../editor/plateTypes';
import { BlockStyleProps } from './Draggable.types';

export const getBlockStyles = <V extends MyValue>(
	props: BlockStyleProps<V>
) => {
	return {
		root: {
			css: {
				backgroundColor: props.selected ? 'rgb(181, 215, 255)' : '',
				opacity: props.isDragging ? `50%` : '100%',
			},
			className:
				'group/' +
				'aa' +
				' .slate-Draggable-gutterLeft relative flex-row flex',
		},
		gutterLeft: {
			css: { transform: 'translateX(-100%)' },
			className:
				'flex h-full opacity-0 pointer-events-none cursor-text mr-1 group-hover/' +
				'aa' +
				':opacity-70 ',
		},
		dragHandle: {
			className:
				'p-0 bg-transparent bg-no-repeat cursor-pointer overflow-hidden outline-none border-none minWidth[18px] height[18px]',
		},
		blockToolbarWrapper: { className: `flex height[1.5em]` },
		blockToolbar: {
			className: `flex items-center mr-1 pointer-events-auto`,
		},
		dropLine: {
			className:
				`absolute left-0 right-0 h-0.5 opacity-100 ` +
				(props.direction === 'top' ? `-top-px ` : '') +
				(props.direction === 'bottom' ? `-bottom-px ` : ''),
			css: {
				backgroundColor: '#B4D5FF',
			},
		},
	};
};
