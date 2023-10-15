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

import { ConnectedNodesTag } from '@/components/molecules/ConnectedNodesTag';
import { connectionCategorisation } from '@/components/organisms/Tabs/RenderConnections';
import {
	emojiCategoryIcons,
	emojiSearchIcons,
} from '@/components/plate-ui/emoji-icons';
import { EmojiPicker } from '@/components/plate-ui/emoji-picker';
import { EmojiToolbarDropdown } from '@/components/plate-ui/emoji-toolbar-dropdown';
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
import Inbox from '../inbox-editor/Inbox';
import { withDraggable } from './components/withDraggable';
import { saveInbox } from '@/backend/functions/general/document/mutate/saveInbox';
import { Icons } from '@/components/icons';
import SearchBar from '@/components/organisms/SearchBar';
import CommandBar from '@/components/organisms/CommandBar';
import { FilterPopover } from '../editor/Components/Molecules/FilterPopover';
import { updateConnection } from '@/backend/functions/node/mutate/updateConnection';
import { createConnection } from '@/backend/functions/node/mutate/createConnection';
import {
	convertToConnectionType,
	getConnectionDirection,
} from '@/backend/schema';
import { deleteConnectionAPI } from '@/backend/functions/node/mutate/deleteConnection';
import { connectedNode_type } from '@/backend/functions/node/query/useGetNodeData';

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

	if (isLoading || !nodeDataSWR) {
		return (
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<div className='pl-10 pt-10 pr-3 pb-3'></div>
				</SplitPaneLeft>
				<Divider className='separator-col' />
				<SplitPaneRight>
					<div className='pl-10 pt-10 pr-3 pb-3'></div>
					{/* If I put shelf inside documentSideTabs it has issues with setting state and I'm not sure why tbh */}
					{/* I suspect this might be because it gets rendered in tabs afterthe fact. */}
					<Divider className='separator-row' />
				</SplitPaneRight>
			</SplitPane>
		);
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
		const value = JSON.parse(content);

		function traverse(obj: BlockElements[]) {
			if (typeof obj !== 'object' || obj === null) return;

			Object.entries(obj).forEach(([key, value]) => {
				// Key is either an array index or object key»
				if (value.type === ELEMENT_NODELINK) {
					value.icon = connectionMap[value.nodeId as string]
						? connectionMap[value.nodeId as string].icon
						: 'node';

					value.children = [
						{
							text: connectionMap[value.nodeId as string]
								? connectionMap[value.nodeId as string].title
								: 'Untitled',
						},
					];
				} else if (value.type === ELEMENT_BLOCK) {
					traverse(value.children as BlockElements[]);
				} else if (value.type === ELEMENT_NODE) {
					// console.log('ELEMENT_NODE, ', value);

					// Make a fetch and return it instead (if not part of connectionTitle)
					value.title = connectionMap[value.nodeId as string]
						? connectionMap[value.nodeId as string].title
						: 'Untitled';
					value.children = [
						{
							type: ELEMENT_NODETITLE,
							routeString: `/${username}/${value.nodeId}`,
							icon: connectionMap[value.nodeId as string]
								? connectionMap[value.nodeId as string].icon
								: 'node',
							id: value.children[0].id,
							children: [
								{
									text: connectionMap[value.nodeId as string]
										? connectionMap[value.nodeId as string]
												.title
										: 'Untitled',
								},
							],
						},
					];

					// @ts-ignore
					if (connectionMap[value.nodeId]) {
						// @ts-ignore
						if (connectionMap[value.nodeId].document) {
							value.children.push(
								...createInitialValue(
									// @ts-ignore
									connectionMap[value.nodeId].document
								)
							);
						} else {
						}
					}
				}
			});
		}

		traverse(value);

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
					<div className='flex flex-row justify-end align-middle items-center'>
						<IconCircleButton
							onClick={() => {
								setshowCutText(!showCutText);
							}}
							selected={showCutText}
							src='Cut'
							circle={false}
							color={'#FFCB45'}
						/>
						{barComponents.settings}
						{barComponents.favourite}
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

									console.log('newData');
									console.log(newData);

									SWRmutateCurrNode(
										deleteConnectionAPI({
											startNode,
											endNode,
											type: node.r.type,
										}),
										{
											optimisticData: {
												newData,
											},
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
									{ optimisticData: { newData } }
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
