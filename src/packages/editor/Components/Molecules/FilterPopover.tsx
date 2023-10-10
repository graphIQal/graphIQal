import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandInput,
	CommandItem,
	CommandGroup,
	CommandEmpty,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
// import { ConnectionTypes } from 'src/packages/graph/graphTypes';
import { useRouter } from 'next/router';
import { useViewData } from '@/components/context/ViewContext';
import { Icons } from '@/components/icons';
import {
	ConnectionTypes,
	DirectionalConnectionTypes,
	NodeData,
} from '@/packages/graph/graphTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import useSWR from 'swr';
import { fetcher } from '@/backend/driver/fetcher';
import { useSession } from 'next-auth/react';
import IconTitle from '@/components/molecules/IconTitle';
import { select } from 'slate';
// import { useViewData } from '../context/ViewContext';

export function FilterPopover({
	onCreateFilter,
}: {
	onCreateFilter: (filter: {
		nodes: NodeData[];
		type: DirectionalConnectionTypes;
	}) => void;
}) {
	const [open, setOpen] = useState(false);
	const [relationshipOpen, setrelationshipOpen] = useState(false);
	const [nodelistOpen, setnodelistOpen] = useState(false);

	const [relationshipValue, setRelationshipValue] = useState('');
	const [search, setSearch] = useState('');
	const [nodes, setnodes] = useState<{ n: NodeData }[]>([]);
	const [error, setError] = useState('');

	const [selectedNodes, setselectedNodes] = useState<NodeData[]>([]);

	const { data: session, status } = useSession();

	const renderTitles = () => {
		const outString = selectedNodes.map((node: NodeData) => (
			<IconTitle icon={node.icon} title={node.title + ', '} />
		));

		return outString;
	};

	const { data: searchResult } = useSWR(
		search.length > 0
			? `/api/general/search?homenodeId=${session?.user?.homenodeId}&search=${search}`
			: null,
		fetcher,
		{
			keepPreviousData: true,
		}
	);
	useEffect(() => {
		if (!open) {
			setRelationshipValue('');
			setSearch('');
			setselectedNodes([]);
		}
	}, [open]);

	useEffect(() => {
		// console.log('node res: ', searchResult);
		if (searchResult) {
			console.log('searchResult');
			console.log(searchResult);
			setnodes([...searchResult]);
		} else {
			setnodes([]);
		}
	}, [searchResult]);

	const try2 = [
		'text-PARENTS',
		'text-CHILDREN',
		'text-IS',
		'text-ENCOMPASSES',
		'text-NEEDED',
		'text-NEEDS',
		'text-FOLLOWED',
		'text-FOLLOWS',
		'text-RELATED',
		'text-CUSTOM',
	];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					onClick={() => {
						console.log('add new filter');
					}}
					variant='ghost'
				>
					<Icons.plus className='w-4 h-4 mr-1' />
					Add filter
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-fit' align='start'>
				<div className='grid gap-4'>
					<div className='space-y-2'>
						<h4 className='font-medium leading-none'>Filter</h4>
						<p className='text-sm text-muted-foreground'>
							Add a new filter
						</p>
					</div>
					<div className='grid gap-2'>
						<Popover
							open={relationshipOpen}
							onOpenChange={setrelationshipOpen}
						>
							<PopoverTrigger asChild>
								<Button
									className='flex-row justify-start'
									onClick={() => {
										console.log('add new filter');
									}}
									variant='outline'
								>
									<Icons.chevronsUpDown className='w-4 h-4 opacity-50 mr-2' />
									{relationshipValue ? (
										<div className='flex items-center truncate max-w-md'>
											<span
												className={
													'flex-row mr-1 text-' +
													relationshipValue
												}
											>
												<Icons.arrowLeftCircle className='w-4 h-4' />
											</span>
											<span>{relationshipValue}</span>
										</div>
									) : (
										'Choose Relationship'
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-fit p-0' align='start'>
								<Command loop={true}>
									<CommandInput placeholder='Relationship type' />
									<CommandEmpty>
										No relationship found
									</CommandEmpty>
									<CommandGroup>
										{Object.values(
											DirectionalConnectionTypes
										).map((type) => (
											<CommandItem
												key={type}
												className={cn(
													'items-center ',
													type === relationshipValue
														? 'bg-lining'
														: 'bg-white'
												)}
												onSelect={() => {
													setRelationshipValue(type);
													setrelationshipOpen(false);
												}}
											>
												<Icons.check
													className={cn(
														'mr-2 h-4 w-4',
														type ===
															relationshipValue
															? 'opacity-100'
															: 'hidden'
													)}
												/>
												<div
													className={
														'mr-1 text-' + type
													}
												>
													<Icons.arrowLeftCircle className='w-4 h-4' />
												</div>
												{type}
											</CommandItem>
										))}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<Popover
							open={nodelistOpen}
							onOpenChange={setnodelistOpen}
						>
							<PopoverTrigger asChild>
								<Button
									className='max-w-[400px] truncate overflow-ellipsis flex-row justify-start w-max'
									onClick={() => {
										console.log('add new filter');
									}}
									variant='outline'
								>
									<Icons.search className='w-4 h-4 mr-1 flex-shrink-0' />
									{selectedNodes.length > 0 ? (
										<>
											<span className='shrink-0 w-4 h-4 inline-flex items-center justify-center text-sm border-lining border font-bold leading-none rounded-full '>
												{selectedNodes.length}
											</span>
											{renderTitles()}
										</>
									) : (
										'Choose Nodes'
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='p-0' align='start'>
								<Command shouldFilter={false}>
									<CommandInput
										placeholder='Search Node'
										value={search}
										onValueChange={(val) => setSearch(val)}
									/>
									<CommandEmpty>No node found.</CommandEmpty>
									<CommandGroup className='overflow-y-scroll max-h-[300px] '>
										{Object.values(nodes).map((node) => (
											<CommandItem
												className={cn(
													'items-center overflow-ellipsis truncate',
													selectedNodes.some(
														(selectedNode) =>
															selectedNode.id ===
															node.n.id
													)
														? 'bg-lining'
														: ''
												)}
												key={node.n.id}
												onSelect={(value) => {
													const nodeExists =
														selectedNodes.find(
															(value) =>
																value.id ===
																node.n.id
														);

													if (nodeExists) {
														setselectedNodes(
															selectedNodes.filter(
																(value) =>
																	value.id !==
																	node.n.id
															)
														);
													} else {
														setselectedNodes([
															node.n,
															...selectedNodes,
														]);
													}
												}}
											>
												<Icons.check
													className={cn(
														'mr-2 h-4 w-4 shrink-0',
														selectedNodes.some(
															(selectedNode) =>
																selectedNode.id ===
																node.n.id
														)
															? 'opacity-100'
															: 'hidden'
													)}
												/>
												<IconTitle
													title={
														node.n.title
															? node.n.title
															: 'Untitled'
													}
													icon={node.n.icon}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<Button
							className='w-max justify-between flex-row'
							onClick={() => {
								if (
									!relationshipValue ||
									selectedNodes.length === 0
								) {
									setError(
										'Please select a relationship type and at least one node.'
									);
								} else {
									onCreateFilter({
										nodes: selectedNodes,
										type: relationshipValue as DirectionalConnectionTypes,
									});
									setOpen(false);
									setError(''); // clear the error if the filter is successfully created
								}
							}}
							variant='outline'
						>
							<Icons.plus className='w-4 h-4 mr-2' />
							Add Filter
						</Button>
						{error && (
							<div className='flex flex-row items-center'>
								<Icons.warning className='w-3 h-3 mr-2 text-red-500' />
								<span className='text-red-500 text-sm'>
									{error}
								</span>
							</div>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
