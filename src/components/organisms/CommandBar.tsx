import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { fetcher, fetcherAll } from '../../backend/driver/fetcher';
import { addExistingNodeToGraph } from '../../helpers/frontend/addExistingNodeToGraph';
import { checkIfVisible } from '../../helpers/frontend/checkIfVisible';
import {
	useGraphViewAPI,
	useGraphViewData,
} from '../../packages/graph/context/GraphViewContext';
import { useViewData } from '../context/ViewContext';
import IconCircleButton from '../molecules/IconCircleButton';
import { OnHoverMenu } from './OnHoverMenu';

import { NodeDataType } from '@/backend/schema';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from '../ui/command';
import { Icons } from '../icons';
import IconTitle from '../molecules/IconTitle';

const CommandBar: React.FC = () => {
	const [open, setopen] = useState(false);

	const { nodeData_Graph, nodeVisualData_Graph, addAction } =
		useGraphViewData();

	const {
		changeNodeData_Graph,
		changeVisualData_Graph,
		changeAlert,
		changeNodeInFocusId,
	} = useGraphViewAPI();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			e.stopImmediatePropagation();

			if (e.key === 'p' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setopen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	useEffect(() => {
		console.log(open);
	}, [open]);

	const { documentVar } = useViewData();
	const { data: session, status } = useSession();
	const [results, setResults] = useState<{ n: NodeDataType }[]>([]);

	const [searchVal, setSearchVal] = useState<string>('');
	const { data: searchResult, isLoading } = useSWR(
		[
			searchVal.length > 0
				? `/api/general/search?homenodeId=${session?.user?.homenodeId}&search=${searchVal}`
				: null,
		],
		fetcher,
		{
			keepPreviousData: true,
		}
	);
	useEffect(() => {
		console.log('results');
		console.log(results);
	}, [results]);

	useEffect(() => {
		console.log(searchResult);

		if (searchResult) {
			setResults([...searchResult]);
		} else {
			setResults([]);
		}
	}, [searchResult]);

	if (!documentVar) return <div></div>;

	return (
		<CommandDialog
			open={open}
			onOpenChange={setopen}
			shouldFilter={false}
			loop={true}
		>
			{status !== 'authenticated' || !session || !session.user ? (
				<CommandList>
					<CommandEmpty>
						{isLoading && (
							<Icons.loading className='w-4 h-4 animate-spin inline' />
						)}{' '}
						Login to search. Public
					</CommandEmpty>
					<CommandGroup>
						{isLoading && (
							<Icons.loading className='w-4 h-4 animate-spin m-2' />
						)}{' '}
					</CommandGroup>
				</CommandList>
			) : (
				<>
					<CommandInput
						placeholder='Type a command or search...'
						value={searchVal}
						onValueChange={(val) => setSearchVal(val)}
					/>
					<CommandList>
						<CommandEmpty>
							{isLoading && (
								<Icons.loading className='w-4 h-4 animate-spin inline' />
							)}{' '}
							No results found.
						</CommandEmpty>
						<CommandGroup heading='Nodes'>
							{isLoading && (
								<Icons.loading className='w-4 h-4 animate-spin m-2' />
							)}
							{results.map((node: any) => {
								return (
									<CommandItem
										key={node.n.id}
										id={node.n.title}
										className='justify-between hover:cursor-pointer'
										onSelect={(value) => {
											router.push(
												`/${session?.user?.homenodeId}/${node.n.id}`,
												undefined
											);
											setopen(false);
										}}
									>
										<IconTitle
											title={node.n.title}
											icon={node.n.icon}
										/>
										<div>
											<IconCircleButton
												src='navigation'
												circle={false}
												onClick={() => {
													router.push(
														`/${session?.user?.homenodeId}/${node.n.id}`,
														undefined
													);
													setopen(false);
												}}
											/>
											<IconCircleButton
												src='delete'
												className='ml-2'
												circle={false}
												onClick={() => {}}
											/>
										</div>
									</CommandItem>
								);
							})}
						</CommandGroup>
						<CommandGroup heading='Commands'>
							<CommandItem>
								<Icons.user className='mr-2 h-4 w-4' />
								<span>Profile</span>
								<CommandShortcut>⌘P</CommandShortcut>
							</CommandItem>

							<CommandItem>
								<Icons.settings className='mr-2 h-4 w-4' />
								<span>Settings</span>
								<CommandShortcut>⌘S</CommandShortcut>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</>
			)}
		</CommandDialog>
	);
};
export default CommandBar;
