//Node with just its title

import { useContext, useEffect, useRef, useState } from 'react';
import { addExistingNodeToGraph } from '../../helpers/frontend/addExistingNodeToGraph';
import GraphNodeContext, {
	GraphNodeContextInterface,
} from '../../packages/graph/context/GraphNodeContext';
import { useViewData } from '../context/ViewContext';
import IconCircleButton from '../molecules/IconCircleButton';
import { ItemProps } from './Dropdown';
import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../backend/driver/fetcher';
import {
	useGraphViewAPI,
	useGraphViewData,
} from '../../packages/graph/context/GraphViewContext';
import { updateNode } from '@/packages/graph/helpers/backend/updateNode';

const CollapsedGraphNode: React.FC<{
	toggleDropdown: () => void;
	showSearchDropdown: boolean;
	setShowSearchDropdown: (val: boolean) => void;
	setResults: (val: ItemProps[]) => void;
}> = ({
	toggleDropdown,
	showSearchDropdown,
	setShowSearchDropdown,
	setResults,
}) => {
	const { id, icon } = useContext(
		GraphNodeContext
	) as GraphNodeContextInterface;

	const { username } = useViewData();

	const { nodeData_Graph, nodeVisualData_Graph, addAction } =
		useGraphViewData();
	const { changeNodeData_Graph, changeVisualData_Graph, changeAlert } =
		useGraphViewAPI();

	const [searchVal, setSearchVal] = useState<string>('');

	const { data: searchResult } = useSWR(
		[
			searchVal.length > 0
				? `/api/general/search?username=${username}&search=${searchVal}`
				: null,
		],
		fetcherAll
	);

	const formRef = useRef<any>(null);

	useEffect(() => {
		if (searchResult && searchResult[0]) {
			const items: ItemProps[] = searchResult[0].map(
				(result: any, i: number) => {
					return {
						text: result.n.title,
						onPress: () => {
							formRef.current.value = result.n.title;
							addExistingNodeToGraph(
								{
									nodeData_Graph,
									nodeVisualData_Graph,
									changeNodeData_Graph,
									changeVisualData_Graph,
									changeAlert,
									addAction,
								},
								username,
								{ id, title: result.n.title }
							);
						},
					};
				}
			);
			setResults(items);
		} else {
			setResults([]);
		}
	}, [searchResult && searchResult[0]]);

	return (
		<>
			<div
				className={'w-full h-full flex justify-items-stretch flex-row '}
			>
				<div className='flex flex-row gap-x-3 w-full h-fit items-center'>
					<IconCircleButton
						src={icon ? icon : 'block'}
						onClick={toggleDropdown}
						circle={false}
					/>
					<input
						className='bg-transparent border-none outline-none w-full block font-semibold '
						type='text'
						name='name'
						id='node_title'
						placeholder='Type title or press /'
						// defaultValue={title}
						value={'idk, please fx this in CollpasedGraphNode.tsx'}
						ref={formRef}
						autoComplete='off'
						onChange={async (newVal: any) => {
							updateNode('title', newVal.target.value, id, {
								addAction,
								changeVisualData_Graph,
								nodeVisualData_Graph,
								nodeData_Graph,
								changeNodeData_Graph,
							});
							if (
								newVal.target.value[0] == '/' &&
								!showSearchDropdown
							) {
								setShowSearchDropdown(true);
							}
							if (showSearchDropdown) {
								if (newVal.target.value.length > 0) {
									setSearchVal(
										newVal.target.value.substring(1)
									);
								}
							}
						}}
					/>
				</div>
			</div>
		</>
	);
};
export default CollapsedGraphNode;
