import React, { useContext, useEffect, useRef, useState } from 'react';
import IconTitle from '../molecules/IconTitle';
import TextButton from '../molecules/TextButton';
import IconCircleButton from '../molecules/IconCircleButton';
import { GraphNode } from '../../packages/graph/components/GraphNode';
import CollapsedGraphNode from './CollapsedGraphNode';
import { OnHoverMenu } from './OnHoverMenu';
import router from 'next/router';
import { NodeData } from '../../packages/graph/graphTypes';
import { checkIfVisible } from '../../helpers/frontend/checkIfVisible';
import { addExistingNodeToGraph } from '../../helpers/frontend/addExistingNodeToGraph';
import { fetcher, fetcherAll } from '../../backend/driver/fetcher';
import useSWR from 'swr';
import { useViewData } from '../context/ViewContext';
import {
	useGraphViewAPI,
	useGraphViewData,
} from '../../packages/graph/context/GraphViewContext';
import { useSession } from 'next-auth/react';

const SearchBar: React.FC = () => {
	const [showSearchBar, setShowSearchBar] = useState(false);

	const { nodeData_Graph, nodeVisualData_Graph, addAction } =
		useGraphViewData();
	const {
		changeNodeData_Graph,
		changeVisualData_Graph,
		changeAlert,
		changeNodeInFocusId,
	} = useGraphViewAPI();
	useEffect(() => {
		const listenerFunc = (evt: any) => {
			evt.stopImmediatePropagation();

			if (evt.code === 'KeyP' && (evt.ctrlKey || evt.metaKey)) {
				evt.preventDefault();
				setShowSearchBar(true);
			}
		};

		window.addEventListener('keydown', (event: any) => listenerFunc(event));
		return window.removeEventListener('keydown', (event: any) =>
			listenerFunc(event)
		);
	}, []);

	const { documentVar } = useViewData();
	const { data: session, status } = useSession();

	//state to hold the results from the search
	const [results, setResults] = useState<{ n: any }[]>([]);

	useEffect(() => {
		document.getElementById('search_bar')?.focus();
	}, [showSearchBar]);

	//navigating from keyboard
	const [highlighted, setHighlighted] = useState(0);

	//Hot keys for escape
	const plusKeyPressed = useRef<boolean>(false);
	const pKeyPressed = useRef<boolean>(false);

	const [searchVal, setSearchVal] = useState<string>('');
	const { data: searchResult } = useSWR(
		[
			searchVal.length > 0
				? `/api/general/search?homenodeId=${session?.user?.homenodeId}&search=${searchVal}`
				: null,
		],
		fetcherAll,
		{
			keepPreviousData: true,
		}
	);

	useEffect(() => {
		if (searchResult && searchResult[0]) {
			setResults(searchResult[0]);
		} else {
			setResults([]);
		}
	}, [searchResult && searchResult[0]]);

	if (!documentVar) return <div></div>;

	if (!showSearchBar) return <></>;

	if (status !== 'authenticated' || !session || !session.user) {
		<div
			className=' fixed top-[10%] left-[50%] translate-x-[-50%] w-[40%] min-h-[30%] bg-base_white flex flex-col gap-y-2 p-2 rounded-sm shadow-sm z-[100]'
			id='search_container'
		>
			Login to search (Guest account allowed for public graphs)
		</div>;
	}

	const getButtonItems = (result: any) => {
		return [
			{
				//this button should navigate to the views of the clicked node
				src: 'navigation',
				onClick: () => {
					console.log('result of query ' + JSON.stringify(result));
					router.push(
						`/${session?.user?.homenodeId}/${result.id}`,
						undefined
					);
					setShowSearchBar(false);
				},
			},
			{
				//this button should add the selected node to the graph
				src: 'plus',
				onClick: () => {
					addExistingNodeToGraph(
						{
							nodeData_Graph,
							nodeVisualData_Graph,
							changeNodeData_Graph,
							changeVisualData_Graph,
							changeAlert,
							addAction,
						},
						session?.user?.homenodeId
							? session?.user?.homenodeId
							: 'username',
						'',
						{
							id: result.id,
							title: result.title,
						}
					);
					setShowSearchBar(false);
				},
			},
			{
				//this button should put the selected node in focus
				src: 'spotlight',
				onClick: () => {
					changeNodeInFocusId(result.id);
					setShowSearchBar(false);
				},
			},
		];
	};

	const checkAndScroll = () => {
		const result = checkIfVisible(
			documentVar.getElementById('result' + highlighted),
			documentVar.getElementById('search_container')
		);
		if (result == 'bottom') {
			const scrollOffset = documentVar
				.getElementById('result' + highlighted)
				?.getBoundingClientRect().height;
			documentVar
				.getElementById('result_container')
				?.scrollBy(0, scrollOffset ? 3 * scrollOffset : 0);
		} else if (result == 'top') {
			const scrollOffset = documentVar
				.getElementById('result' + highlighted)
				?.getBoundingClientRect().height;
			documentVar
				.getElementById('result_container')
				?.scrollBy(0, scrollOffset ? -(3 * scrollOffset) : 0);
		}
	};

	// key events: handling search bar keys
	const handleKeys = (event: any) => {
		if (event.key == '=') {
			event.preventDefault();
			plusKeyPressed.current = true;
		}
		if (event.code == 'KeyP') {
			pKeyPressed.current = true;
		}
		if (
			(event.metaKey || event.ctrlKey) &&
			plusKeyPressed.current &&
			pKeyPressed.current
		) {
			event.stopPropagation();
			event.preventDefault();
			setShowSearchBar(false);
		}
		if (event.keyCode == 40) {
			event.preventDefault();
			if (highlighted < results.length - 1) {
				setHighlighted(highlighted + 1);
				checkAndScroll();
			} else {
				document.getElementById('result_container')?.scrollTo(0, 0);
				setHighlighted(0);
			}
		} else if (event.keyCode == 38) {
			event.preventDefault();
			if (highlighted > 0) {
				setHighlighted(highlighted - 1);
				checkAndScroll();
			} else {
				const elem = documentVar.getElementById('result_container');
				elem?.scrollTo(0, elem.getBoundingClientRect().height);
				setHighlighted(results.length - 1);
			}
		} else if (event.code == 'Enter') {
			router.push(
				`/${session?.user?.homenodeId}/${results[highlighted].n.id}`,
				undefined
			);
			setShowSearchBar(false);
		} else if (event.keyCode == 27) {
			setShowSearchBar(false);
		}
	};

	return (
		<div
			onKeyDown={handleKeys}
			onKeyUp={() => {
				plusKeyPressed.current = false;
				pKeyPressed.current = false;
			}}
			id='search_parent'
		>
			<div
				className=' fixed top-[10%] left-[50%] translate-x-[-50%] w-[40%] min-h-[30%] bg-base_white flex flex-col gap-y-2 p-2 rounded-sm shadow-sm z-[100]'
				id='search_container'
			>
				<div className='flex flex-row justify-between w-full align-middle items-center'>
					<form className='bg-base_white w-full p-1'>
						<input
							autoComplete='off'
							type='text'
							name='name'
							id='search_bar'
							placeholder='Search for a node...'
							className='bg-base_white w-full outline-none border-none'
							onChange={(newVal: any) =>
								setSearchVal(newVal.target.value)
							}
						/>
					</form>
					<IconCircleButton
						circle={false}
						src={'close'}
						onClick={() => setShowSearchBar(false)}
					/>
				</div>

				<div
					id='result_container'
					className='overflow-scroll max-h-[70vh] scroll'
				>
					{results.map((result, i) => {
						return (
							<div
								key={i}
								id={'result' + i}
								className={
									'flex flex-row gap-x-3 justify-between items-center align-middle hover:cursor-pointer p-2 border-y-[0.5px]  border-base_black border-opacity-10 ' +
									(i == highlighted
										? 'bg-selected_white'
										: '')
								}
								onMouseOver={() => setHighlighted(i)}
							>
								<div className='flex flex-row items-center align-middle'>
									<IconCircleButton
										circle={false}
										src='block'
										onClick={() => null}
									/>
									<h4 className='text-sm'>
										{result.n.title}
									</h4>
								</div>
								<OnHoverMenu
									buttonItems={getButtonItems(result.n)}
								/>
							</div>
						);
					})}
				</div>
			</div>

			<div
				onClick={() => setShowSearchBar(false)}
				className='absolute w-screen h-screen bg-black top-0 left-0 opacity-30 z-[99]'
			></div>
		</div>
	);
};
export default SearchBar;
