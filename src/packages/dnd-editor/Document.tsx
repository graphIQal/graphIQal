import React, { useState } from 'react';
// import SplitPane, {
// 	Divider,
// 	SplitPaneBottom,
// 	SplitPaneLeft,
// 	SplitPaneRight,
// 	SplitPaneTop,
// } from '../../src/components/organisms/split-pane/SplitPane';
// import Document from '../../src/pages/document/Document';
import { v4 as uuidv4 } from 'uuid';

import { updateNodeFields } from '@/backend/functions/general/document/mutate/updateNodeFields';
import { createNormalizeTypesPlugin } from '@udecode/plate';
import { Emoji, useEmojiDropdownMenuState } from '@udecode/plate-emoji';

import { saveInbox } from '@/backend/functions/general/document/mutate/saveInbox';
import { createConnection } from '@/backend/functions/node/mutate/createConnection';
import { deleteConnectionAPI } from '@/backend/functions/node/mutate/deleteConnection';
import { updateNode } from '@/backend/functions/node/mutate/updateNode';
import { connectedNode_type } from '@/backend/functions/node/query/useGetNodeData';
import {
	convertToConnectionType,
	getConnectionDirection,
} from '@/backend/schema';
import { Icons } from '@/components/icons';
import { ConnectedNodesTag } from '@/components/molecules/ConnectedNodesTag';
import IconTitle from '@/components/molecules/IconTitle';
import CommandBar from '@/components/organisms/CommandBar';
import { connectionCategorisation } from '@/components/organisms/Tabs/RenderConnections';
import {
	emojiCategoryIcons,
	emojiSearchIcons,
} from '@/components/plate-ui/emoji-icons';
import { EmojiPicker } from '@/components/plate-ui/emoji-picker';
import { EmojiToolbarDropdown } from '@/components/plate-ui/emoji-toolbar-dropdown';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcherSingleReturn } from '../../backend/driver/fetcher';
import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';
import { useViewData } from '../../components/context/ViewContext';
import IconCircleButton from '../../components/molecules/IconCircleButton';
import DocumentSideTabs from '../../components/organisms/Tabs/DocumentSideTabs';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import { formatNodeConnectionstoMap } from '../../helpers/frontend/formatNodeConnectionstoMap.ts';
import { FilterPopover } from '../editor/Components/Molecules/FilterPopover';
import EditorComponent from '../editor/EditorComponent';
import { Block, InboxBlock, InboxNode } from '../editor/Elements/Elements';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODE,
	ELEMENT_NODELINK,
	ELEMENT_NODETITLE,
	MyTitleElement,
} from '../editor/plateTypes';
import { withDraggable } from './components/withDraggable';
import { detachNode } from '@/backend/functions/node/mutate/detachNode';
import { Skeleton } from '@/components/ui/skeleton';

export const emptyDocumentValue = [
	{
		type: 'block',
		id: uuidv4(),
		children: [{ type: 'p', id: uuidv4(), children: [{ text: '' }] }],
	},
];

const Document: React.FC<{
	viewId: string;
	barComponents: { [key: string]: JSX.Element };
}> = ({ barComponents }) => {
	const { nodeId, username } = useViewData();

	const {
		data: nodeDataSWR,
		isLoading,
		error,
		mutate: SWRmutateCurrNode,
	} = useSWR(
		[nodeId ? `/api/username/${nodeId}` : null],
		fetcherSingleReturn,
		{
			revalidateOnMount: true,
			revalidateOnFocus: false,
		}
	);

	const [document, setdocument] = useState([]);
	const [inbox, setinbox] = useState([]);

	const [shelf, setshelf] = useState([]);
	const [showCutText, setshowCutText] = useState(false);

	const { isOpen, setIsOpen, emojiPickerState } = useEmojiDropdownMenuState();

	const { toast } = useToast();
	const router = useRouter();

	if (isLoading || !nodeDataSWR) {
		return (
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<div className='pl-10 pt-10 pr-3 pb-3 gap-2'>
						<Skeleton className='h-5 w-full mt-10 mb-2' />
						<Skeleton className='h-10 w-20 mb-2' />
						<Skeleton className='h-5 w-full' />
					</div>
				</SplitPaneLeft>
				<Divider className='separator-col' />
				<SplitPaneRight>
					<div className='pl-10 pt-10 pr-3 pb-3'></div>
					<Divider className='separator-row' />
				</SplitPaneRight>
			</SplitPane>
		);
	}

	if (nodeDataSWR.connectedNodes[0].r === null) {
		router.push('/');
		return;
	}

	// console.log('nodeDataSWR');
	// console.log(nodeDataSWR);

	if ('title' in nodeDataSWR.n && !nodeDataSWR.n.document) {
		nodeDataSWR.n.document = JSON.stringify(emptyDocumentValue);
	}

	// useEffect(() => {
	if ('title' in nodeDataSWR.n && !nodeDataSWR.n.inbox) {
		nodeDataSWR.n.inbox = `
				[
					{
						"type": "block",
						"id": "${uuidv4()}",
						"children": [
							{ "type": "p", "id": "${uuidv4()}", "children": [{ "text": "Your inbox is empty!" }] }
					]
					}
				]`;
	}

	const titles = [
		'bg-PARENTS',
		'bg-CHILDREN',
		'bg-IS',
		'bg-ENCOMPASSES',
		'bg-NEEDED',
		'bg-NEEDS',
		'bg-FOLLOWED',
		'bg-FOLLOWS',
		'bg-RELATED',
		'bg-CUSTOM',
	];

	const connectionMap = formatNodeConnectionstoMap(nodeDataSWR);
	// console.log(connectionMap);
	const createInitialValue = (content: string): BlockElements[] => {
		let value = JSON.parse(content);

		function traverse(obj: BlockElements[]): BlockElements[] {
			return obj.map((value) => {
				if (value.type === ELEMENT_NODELINK) {
					if (connectionMap[value.nodeId as string]) {
						value.icon = connectionMap[value.nodeId as string].icon;
						value.children = [
							{
								text: connectionMap[value.nodeId as string]
									.title,
							},
						];
						return value;
					} else {
						return emptyDocumentValue[0].children[0];
					}
				} else if (value.type === ELEMENT_BLOCK) {
					value.children = traverse(
						value.children as BlockElements[]
					);
					return value;
				} else if (value.type === ELEMENT_NODE) {
					if (connectionMap[value.nodeId as string]) {
						value.title =
							connectionMap[value.nodeId as string].title;
						value.children = [
							{
								type: ELEMENT_NODETITLE,
								routeString: `/${username}/${value.nodeId}`,
								icon: connectionMap[value.nodeId as string]
									.icon,
								id: value.children[0].id,
								children: [
									{
										text: connectionMap[
											value.nodeId as string
										].title,
									},
								],
							},
						];

						if (connectionMap[value.nodeId].document) {
							value.children.push(
								...createInitialValue(
									// @ts-ignore
									connectionMap[value.nodeId].document
								)
							);
						}
						return value;
					} else {
						return emptyDocumentValue[0];
					}
				} else {
					return value;
				}
			});
		}

		value = traverse(value);

		return value;
	};

	return (
		<SplitPane className='split-pane-row z-20'>
			<SplitPaneLeft>
				<div className='w-full h-10 bg-base_white flex flex-row justify-between z-20 top-0 sticky'>
					<div className='flex flex-row gap-x-1 justify-start align-middle items-center'>
						{barComponents.favouriteBar}
						{barComponents.breadcrumb}
					</div>
					<div className='flex flex-row justify-end align-middle items-center align-items-center gap-1'>
						<IconCircleButton
							onClick={() => {
								setshowCutText(!showCutText);
							}}
							selected={showCutText}
							src='cut'
							className='h-5 w-5'
							circle={false}
							color={'#FFCB45'}
						/>
						{barComponents.settings}
						{barComponents.favourite}
						<DropdownMenu>
							<DropdownMenuTrigger>
								<div className='h-5 w-5 align-middle mr-3'>
									<IconCircleButton
										onClick={() => {}}
										selected={showCutText}
										src='dotMenu'
										color={'#FFCB45'}
										className='h-5 w-5 self-center'
									/>
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>
									Node Settings
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={async () => {
										const tempCopy = nodeDataSWR;

										// Find a parent node
										const parentNode =
											nodeDataSWR.connectedNodes.find(
												(node: connectedNode_type) =>
													node.r.type === 'HAS' &&
													node.r.fromNode === false
											);

										await detachNode({ nodeId });

										updateNode({
											nodeId: nodeId,
											nodeData: {
												deleted: false,
											},
										});

										// If a parent node exists, navigate to it
										if (parentNode) {
											router.push(
												`/${username}/${parentNode.connected_node.id}`
											);
										} else {
											// If no parent node exists, navigate back to the home node
											router.push(`/`);
										}

										const { dismiss } = toast({
											// @ts-ignore
											title: (
												<div className='flex flex-row'>
													<IconTitle
														icon={
															nodeDataSWR.n.icon
														}
														title={
															nodeDataSWR.n
																.title +
															' deleted'
														}
													/>
													<Button
														className='ml-2 inline'
														variant='outline'
														onClick={() => {
															updateNode({
																nodeId: nodeId,
																nodeData: {
																	deleted:
																		false,
																},
															});
															tempCopy.connectedNodes.forEach(
																(
																	node: connectedNode_type
																) => {
																	createConnection(
																		{
																			startNode:
																				node
																					.r
																					.fromNode
																					? nodeId
																					: node
																							.connected_node
																							.id,
																			endNode:
																				node
																					.r
																					.fromNode
																					? node
																							.connected_node
																							.id
																					: nodeId,
																			type: node
																				.r
																				.type,
																		}
																	);
																}
															);
															dismiss();
														}}
													>
														Undo
													</Button>
												</div>
											),
										});

										setTimeout(() => {
											dismiss();
										}, 3000);
									}}
								>
									<Icons.delete className='h-4 w-4 mr-2' />
									Delete
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Icons.history className='h-4 w-4 mr-2' />
									Show History
								</DropdownMenuItem>
								<DropdownMenuItem>Team</DropdownMenuItem>
								<DropdownMenuItem>
									Subscription
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<CommandBar />
				<div className='relative pl-10 pt-15 pt-10 pr-10 pb-3 '>
					<div className='flex flex-row gap-2 mb-4 w-full overflow-x-scroll scrollbar-hide'>
						{connectionCategorisation(
							nodeDataSWR.connectedNodes
						).map((item) => (
							<ConnectedNodesTag
								type={item.type}
								nodes={item.nodes}
								removeNode={(node, type) => {
									// Extract startNode and endNode from the node object

									const startNode = node.r.fromNode
										? nodeId
										: node.connected_node.id;
									const endNode = !node.r.fromNode
										? nodeId
										: node.connected_node.id;

									// Filter out the current connection from connectedNodes
									const newData = {
										connectedNodes:
											nodeDataSWR.connectedNodes.filter(
												(
													connection: connectedNode_type
												) =>
													!(
														connection.r
															.startNode ===
															startNode &&
														connection.r.endNode ===
															endNode &&
														connection.r.type ===
															node.r.type
													)
											),
										n: nodeDataSWR.n,
									};

									SWRmutateCurrNode(
										deleteConnectionAPI({
											startNode,
											endNode,
											type: node.r.type,
										}),
										{
											optimisticData: newData,
											populateCache: false,
										}
									);
								}}
							/>
						))}
						<FilterPopover
							itemName='Connection'
							onCreateFilter={({ nodes, type }) => {
								const newData = {
									connectedNodes: nodeDataSWR.connectedNodes,
									n: nodeDataSWR.n,
								};

								const relType = convertToConnectionType(type);

								SWRmutateCurrNode(
									nodes.forEach((node) => {
										// Check if the connection already exists
										const isFrom =
											getConnectionDirection(type);
										const startNode = isFrom
											? nodeId
											: node.id;
										const endNode = !isFrom
											? nodeId
											: node.id;

										const connectionExists =
											newData.connectedNodes.some(
												(connection: any) => {
													return (
														connection.startNode ===
															startNode &&
														connection.endNode ===
															endNode &&
														connection.type ===
															convertToConnectionType
													);
												}
											);

										// If the connection does not exist, create it and update newData
										if (!connectionExists) {
											createConnection({
												startNode,
												endNode,
												type: relType,
											});

											// Update newData
											newData.connectedNodes.push({
												r: { type: relType },
												connected_node: {
													...node,
												},
											});
										}
									}),
									{
										optimisticData: newData,
										populateCache: false,
									}
								);

								// 	// Check if the node is already there
								// 	const nodeExists = filters[type].some(
								// 		(existingNode: NodeDataType) =>
								// 			existingNode.id === newNode.id
								// 	);
								// 	// If the node is not there, add it to the front
								// 	if (!nodeExists) {
								// 		filters[type].unshift(newNode);
								// 	}
							}}
						/>
					</div>
					<div className='absolute z-10 ml-[14px]'>
						<EmojiToolbarDropdown
							control={
								// <ToolbarButton
								// 	pressed={isOpen}
								// 	isDropdown
								// 	tooltip='Emoji'
								// 	{...props}
								// >
								// 	<Icons.emoji />
								// </ToolbarButton>
								<div className='text-xl'>
									<IconCircleButton
										src={
											nodeDataSWR && nodeDataSWR.n.icon
												? nodeDataSWR.n.icon
												: 'node'
										}
										onClick={() => setIsOpen(!isOpen)}
										circle={false}
									/>
								</div>
							}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
						>
							<EmojiPicker
								{...emojiPickerState}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
								onSelectEmoji={async (emoji: Emoji) => {
									const newData = {
										connectedNodes:
											nodeDataSWR.connectedNodes,
										n: {
											...nodeDataSWR.n,
											icon: emoji.skins[0].native,
										},
									};

									await SWRmutateCurrNode(
										updateNodeFields({
											nodeId,
											username,
											fieldValObj: {
												icon: emoji.skins[0].native,
											},
										}),
										{
											optimisticData: newData,
											populateCache: false,
										}
									);
								}}
								icons={{
									categories: emojiCategoryIcons,
									search: emojiSearchIcons,
								}}
								// settings={options?.settings}
							/>
						</EmojiToolbarDropdown>
					</div>
					{nodeDataSWR.n.document && (
						<EditorComponent
							key={nodeId}
							// initialValue={nodeDataSWR.document}
							initialValue={[
								{
									type: 'title',
									id: 'Node Title',
									children: [{ text: nodeDataSWR.n.title }],
								} as MyTitleElement,
								...createInitialValue(nodeDataSWR.n.document),
							]}
							value={document}
							setValue={setdocument}
							id={'documentId'}
							save={async (params) => {
								const newData = {
									connectedNodes: nodeDataSWR.connectedNodes,
									n: {
										...nodeDataSWR.n,
										title: params.title,
										document: JSON.stringify(
											params.document.slice(1)
										),
									},
								};

								await SWRmutateCurrNode(saveDocument(params), {
									optimisticData: newData,
									populateCache: false,
								});
							}}
							customElements={{
								[ELEMENT_BLOCK]: withDraggable(Block),
							}}
							customPlugins={[
								createNormalizeTypesPlugin({
									options: {
										rules: [
											{
												path: [0],
												strictType: 'title',
											},
										],
									},
									// withOverrides: withValidChild,
								}),
							]}
							showCutText={showCutText}
						/>
					)}
				</div>
			</SplitPaneLeft>
			<Divider className='separator-col' />
			<SplitPaneRight>
				<div className='w-full h-10 bg-base_white flex flex-row justify-between z-10 top-0 sticky'>
					<div className='flex flex-row gap-x-1 justify-start align-middle items-center pl-2 w-full'>
						<input className='border rounded-full py-2 pl-4 leading-2 w-full focus:outline-none focus:shadow-outline text-sm p-10 h-[30px]' />
					</div>
					<div className='flex flex-row justify-end align-middle items-center '>
						<IconCircleButton
							src='search'
							size={40}
							onClick={() => console.log('search')}
							circle={false}
						/>
					</div>
				</div>
				<DocumentSideTabs />
				{/* If I put shelf inside documentSideTabs it has issues with setting state and I'm not sure why tbh */}
				{/* I suspect this might be because it gets rendered in tabs after the fact. */}
				<Divider className='separator-row' />
				<div className='py-4 pr-2 px-2'>
					<div className='font-bold ml-5 text-md flex pb-2'>
						<Icons.inbox />
						<span className='ml-2'>Inbox </span>
					</div>
					<EditorComponent
						key={nodeId + '-inbox'}
						value={inbox}
						setValue={setinbox}
						id={'shelfDocument'}
						save={async (params) => {
							const newData = {
								connectedNodes: nodeDataSWR.connectedNodes,
								n: {
									...nodeDataSWR.n,
									inbox: JSON.stringify(params.document),
								},
							};

							await SWRmutateCurrNode(saveInbox(params), {
								optimisticData: newData,
								populateCache: false,
							});
						}}
						customElements={{
							[ELEMENT_BLOCK]: withDraggable(InboxBlock),
							[ELEMENT_NODE]: withDraggable(InboxNode),
						}}
						initialValue={
							nodeDataSWR.n.inbox
								? [...createInitialValue(nodeDataSWR.n.inbox)]
								: []
						}
						customPlugins={[]}
					></EditorComponent>
				</div>
			</SplitPaneRight>
		</SplitPane>
	);
};
export default Document;
