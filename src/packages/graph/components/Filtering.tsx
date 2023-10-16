/**
 * Pill menu for filtering the nodes that are "in view"
 */

import React from 'react';
import { useViewData } from '../../../components/context/ViewContext';
import IconCircleButton from '../../../components/molecules/IconCircleButton';
import { ItemProps } from '../../../components/organisms/Dropdown';
import { useGraphViewData } from '../context/GraphViewContext';

type FilteringProps = {
	xCategory: string;
	yCategory: string;
	getDropdownItemsX: () => ItemProps[];
	getDropdownItemsY: () => ItemProps[];
	getDropdownItems: () => ItemProps[];
};
export const Filtering: React.FC<FilteringProps> = ({
	xCategory,
	yCategory,
	getDropdownItems,
	getDropdownItemsX,
	getDropdownItemsY,
}) => {
	const {
		tags,
		graphViewId,
		nodeVisualData_Graph,
		nodeData_Graph,
		history,
		undo,
		redo,
	} = useGraphViewData();

	const { username, nodeId, currNode_data } = useViewData();

	return (
		<div>
			<div className=' absolute top-10 flex flex-row py-2 px-3 justify-between w-full align-middle items-center z-99'>
				<div className='flex flex-row gap-x-5'>
					<div className='flex flex-row gap-x-3 align-middle items-center'>
						<div className='flex flex-row gap-x-1 align-middle items-center'>
							<IconCircleButton src='undo' onClick={undo} />
							<IconCircleButton src='redo' onClick={redo} />
						</div>
						<h3 className='text-md font-semibold'>
							{currNode_data.n.title}
						</h3>
						{/* <TitleWithNavigation /> */}
					</div>
					{/* <TextButton
				text='Create Node'
				onClick={() => {
					console.log('hmm');
				}}
			></TextButton> */
					/* <PillMenu
        label='In View: '
        value={nodeInView}
        dropdownItems={getDropdownItems()}
      />
      <PillMenu
        label='X-Axis: '
        value={xCategory}
        dropdownItems={getDropdownItemsX()}
      />
      <PillMenu
        label='Y-Axis: '
        value={yCategory}
        dropdownItems={getDropdownItemsY()}
      /> */}
					{/* <div className='flex flex-row justify-items-stretch gap-x-2 align-middle items-center'>
					{tags.map(
						(
							tag: {
								id: string;
								title: string;
								color: string;
								icon: string;
							},
							i: number
						) => {
							return (
								<Tag tag={tag.title} id={tag.id} key={tag.id} />
							);
						}
					)}
					<TextButton
						text='Apply Tags'
						onClick={() => {
							applyTags(viewContext);
						}}
					></TextButton>
				</div> */}
				</div>
			</div>
		</div>
	);
};
