import React from 'react';
import { KeyedMutator } from 'swr';
import { v4 } from 'uuid';
import { createGraphView } from '../../../backend/functions/graph/mutate/createGraphView';
import { useToggle } from '../../../helpers/hooks/useToggle';
import { useViewData } from '../../context/ViewContext';
import IconCircleButton from '../../molecules/IconCircleButton';
import { Dropdown, ItemProps } from '../Dropdown';

export const SideTabs: React.FC<{
	children: any;
}> = ({ children }) => {
	const { windowVar, username, nodeId } = useViewData();
	const { value: showDropdown, toggle: setShowDropdown } = useToggle();
	if (!windowVar) return <div></div>;

	const items: ItemProps[] = [
		{
			text: 'Empty graph',
			onPress: () => {
				const id = v4();
			},
		},
		{ text: 'Duplicate graph', onPress: () => null },
	];
	return (
		<div className='absolute flex flex-row bg-blue-50 items-center align-middle top-0 w-fit overflow-x-scroll border-lining -ml-[1px]'>
			{children}
		</div>
	);
};
