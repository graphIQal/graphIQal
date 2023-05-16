/**
 * Pill menu for filtering the nodes that are "in view"
 */

import React, { useContext } from 'react';
import { PillMenu } from '../../../components/molecules/PillMenu';
import { ItemProps } from '../../../components/organisms/Dropdown';
import { getTags } from '../../../helpers/backend/gettersConnectionInfo';
import GraphViewContext, {
	GraphViewContextInterface,
} from '../context/GraphViewContext';
import { Tag } from '../../../components/molecules/Tag';
import TextButton from '../../../components/molecules/TextButton';
import { createNode } from '@udecode/plate';
import { saveGraphView } from '../../../backend/functions/graph/saveGraphView';
import { applyTags } from '../helpers/Filtering/applyTags';
import ViewContext, {
	ViewContextInterface,
} from '../../../components/context/ViewContext';
import { TitleWithNavigation } from '../../../components/molecules/TitleWithNavigation';

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
	const viewContext = useContext(
		GraphViewContext
	) as GraphViewContextInterface;
	const {
		tags,
		graphViewId,
		nodeVisualData_Graph,
		nodeData_Graph,
		history,
		pointer,
	} = viewContext;

	const { username, nodeId } = useContext(
		ViewContext
	) as ViewContextInterface;

	return (
		<div className=' relative flex flex-row p-3 justify-between mb-3 w-full'>
			<div className='flex flex-row gap-x-3'>
				<TextButton
					text='Save Graph'
					onClick={() => {
						console.log('graphViewId');
						console.log(graphViewId);
						saveGraphView({
							username,
							graphViewId,
							nodeId,
							graphViewData: nodeVisualData_Graph,
							nodeData: nodeData_Graph,
							history: history,
							pointer: pointer,
						});
					}}
				></TextButton>
				{/* <TextButton
				text='Create Node'
				onClick={() => {
					console.log('hmm');
				}}
			></TextButton> */}
				{/* <PillMenu
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
				<div className='flex flex-row justify-items-stretch gap-x-2'>
					{Object.keys(tags).map((tag: string, i: number) => {
						return <Tag tag={tag} id={i} />;
					})}
					<TextButton
						text='Apply Tags'
						onClick={() => {
							applyTags(viewContext);
						}}
					></TextButton>
				</div>
			</div>
			<TitleWithNavigation />
		</div>
	);
};
