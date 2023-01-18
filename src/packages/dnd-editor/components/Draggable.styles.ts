import { createStyles } from '@udecode/plate';
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
			className: '.slate-Draggable-gutterLeft',
		},
		gutterLeft: {
			css: { transform: 'translateX(-100%)' },
			className:
				'absolute top-0 flex h-full opacity-0 pointer-events-none cursor-text',
		},
		dragHandle: {
			className:
				'p-0 bg-transparent bg-no-repeat cursor-pointer overflow-hidden outline-none border-none',
		},
		dropLine: {
			className:
				`absolute left-0 right-0 h-0.5 opacity-100 ` +
				(props.direction === 'top' ? `-top-px ` : '') +
				(props.direction === 'bottom' ? `-bottom-px ` : ''),
			css: {
				backgroundColor: '#B4D5FF',
				height: ' 4px',
			},
		},
	};
};
