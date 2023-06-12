/**
 * Pill menu for filtering the nodes that are "in view"
 */

import React, { useContext } from 'react';
import { PillMenu } from '../../../components/molecules/PillMenu';
import { ItemProps } from '../../../components/organisms/Dropdown';
import { Tag } from '../../../components/molecules/Tag';
import TextButton from '../../../components/molecules/TextButton';
import { createNode } from '@udecode/plate';
import { saveGraphView } from '../../../backend/functions/graph/mutate/saveGraphView';
import { applyTags } from '../helpers/Filtering/applyTags';
import { useViewData } from '../../../components/context/ViewContext';
import { TitleWithNavigation } from '../../../components/molecules/TitleWithNavigation';
import IconCircleButton from '../../../components/molecules/IconCircleButton';
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
    pointer,
    undo,
    redo,
  } = useGraphViewData();

  const { username, nodeId } = useViewData();

  return (
    <div className=' relative flex flex-row p-3 justify-between mb-3 w-full align-middle items-center'>
      <div className='flex flex-row gap-x-5'>
        <div className='flex flex-row gap-x-3 align-middle items-center'>
          <IconCircleButton
            src='save'
            size={30}
            onClick={() => {
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
          />
          <div className='flex flex-row gap-x-1 align-middle items-center'>
            <IconCircleButton src='undo' onClick={undo} />
            <IconCircleButton src='redo' onClick={redo} />
          </div>
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
      <TitleWithNavigation />
    </div>
  );
};
