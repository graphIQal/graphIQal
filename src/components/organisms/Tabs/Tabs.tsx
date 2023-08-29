import React from 'react';
import { KeyedMutator } from 'swr';
import { v4 } from 'uuid';
import { createGraphView } from '../../../backend/functions/graph/mutate/createGraphView';
import { useToggle } from '../../../helpers/hooks/useToggle';
import { useViewData } from '../../context/ViewContext';
import IconCircleButton from '../../molecules/IconCircleButton';
import { Dropdown, ItemProps } from '../Dropdown';

export const Tabs: React.FC<{
	children: any;
	mutateGraphViews: KeyedMutator<any>;
}> = ({ children, mutateGraphViews }) => {
	const { windowVar, username, nodeId } = useViewData();
	const { value: showDropdown, toggle: setShowDropdown } = useToggle();
	if (!windowVar) return <div></div>;

	const items: ItemProps[] = [
		{
			text: 'Empty graph',
			onPress: () => {
				const id = v4();
				mutateGraphViews(
					createGraphView({ username, nodeId, graphViewId: id }),
					{
						optimisticData: (data: any) => {
							return [
								...data,
								{
									g: {
										properties: {
											id: id,
											title: 'Graph View',
										},
									},
								},
							];
						},
						revalidate: true,
						populateCache: false,
					}
				);
			},
		},
		{ text: 'Duplicate graph', onPress: () => null },
	];
	return (
		<div className='flex flex-row bg-blue-50 items-center align-middle top-0 w-fit overflow-x-scroll border-lining -ml-[1px]'>
			{children}
			<div className='ml-[0.5rem]'>
				<IconCircleButton
					circle={false}
					src='plus'
					onClick={setShowDropdown}
				/>
				{showDropdown && (
					<Dropdown
						items={items}
						list
						activeIndex={-1}
						windowVar={windowVar}
						showDropdown={showDropdown}
						setShowDropdown={setShowDropdown}
					/>
				)}
			</div>
		</div>
	);
};
