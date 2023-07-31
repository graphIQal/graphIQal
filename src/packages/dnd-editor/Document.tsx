import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import SplitPane, {
// 	Divider,
// 	SplitPaneBottom,
// 	SplitPaneLeft,
// 	SplitPaneRight,
// 	SplitPaneTop,
// } from '../../src/components/organisms/split-pane/SplitPane';
// import Document from '../../src/pages/document/Document';
import { v4 as uuidv4 } from 'uuid';

import { createNormalizeTypesPlugin } from '@udecode/plate';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcherSingleReturn } from '../../backend/driver/fetcher';
import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';
import { saveShelf } from '../../backend/functions/general/document/mutate/saveShelf';
import { useViewData } from '../../components/context/ViewContext';
import DocumentSideTabs from '../../components/organisms/Tabs/DocumentSideTabs';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../editor/EditorComponent';
import { Block } from '../editor/Elements/Elements';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODELINK,
	MyTitleElement,
} from '../editor/plateTypes';
import { ShelfBlock } from '../shelf-editor/ShelfBlock/ShelfBlock';
import { formatNodeConnectionstoMap } from '../../helpers/frontend/formatNodeConnectionstoMap.ts';
import IconCircleButton from '../../components/molecules/IconCircleButton';

const Document: React.FC<{
	viewId: string;
	barComponents: { [key: string]: JSX.Element };
}> = ({ barComponents }) => {
	const { nodeId } = useViewData();

	const {
		data: nodeDataSWR,
		isLoading,
		error,
		mutate: SWRmutateCurrNode,
	} = useSWR(
		[nodeId ? `/api/username/${nodeId}` : null],
		fetcherSingleReturn,
		{ revalidateOnMount: true, revalidateOnFocus: false }
	);

	const [document, setdocument] = useState([]);
	const [shelf, setshelf] = useState([]);

	// const {
	// 	data: nodeDataSWR,
	// 	trigger,
	// 	isMutating,
	// 	reset,
	// } = useSWRMutation(`/api/username/${nodeId}`, fetcherSingleReturn);

	// useEffect(() => {
	// 	console.log('nodeId, ', nodeId);
	// }, [nodeId]);

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

	if ('title' in nodeDataSWR.n && !nodeDataSWR.n.document) {
		nodeDataSWR.n.document = `
		[
			{
				"type": "block",
				"id": "${uuidv4()}",
				"children": [
					{ "type": "p", "id": "${uuidv4()}", "children": [{ "text": "" }] }
				]
			}
		]`;
	}

	// useEffect(() => {
	if ('title' in nodeDataSWR.n && !nodeDataSWR.n.shelf) {
		nodeDataSWR.n.shelf = `
				[
					{
						"type": "block",
						"id": "${uuidv4()}",
						"children": [
							{ "type": "p", "id": "${uuidv4()}", "children": [{ "text": "" }] }
						]
					}
				]`;
	}

	const connectionMap = formatNodeConnectionstoMap(nodeDataSWR);

	const createInitialValue = (content: string) => {
		const value = JSON.parse(content);

		function traverse(obj: BlockElements[]) {
			if (typeof obj !== 'object' || obj === null) return;

			Object.entries(obj).forEach(([key, value]) => {
				// Key is either an array index or object key
				if (value.type === ELEMENT_NODELINK) {
					value.children = [
						{
							text: connectionMap[value.nodeId as string]
								? connectionMap[value.nodeId as string].title
								: 'Untitled',
							underline: true,
						},
					];
				} else if (value.type === ELEMENT_BLOCK) {
					traverse(value.children as BlockElements[]);
				}
			});
		}

		traverse(value);

		return value;
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row z-20'>
				<SplitPaneLeft>
					<div className='w-full h-10 bg-base_white flex flex-row justify-between z-10 top-0 sticky'>
						<div className='flex flex-row gap-x-1 justify-start align-middle items-center'>
							{barComponents.favouriteBar}
							{/* <div>BreadCrumb</div> */}
						</div>
						<div className='flex flex-row justify-end align-middle items-center'>
							{barComponents.settings}
							{barComponents.favourite}
						</div>
					</div>
					<div className='pl-10 pt-16 pr-3 pb-3'>
						{nodeDataSWR.n.document && (
							// <PlateProvider>
							<EditorComponent
								key={nodeId}
								initialValue={[
									{
										type: 'title',
										id: 'Node Title',
										children: [
											{ text: nodeDataSWR.n.title },
										],
									} as MyTitleElement,
									...createInitialValue(
										nodeDataSWR.n.document
									),
								]}
								value={document}
								setValue={setdocument}
								id={'documentId'}
								save={async (params) => {
									const newData = {
										connectedNodes:
											nodeDataSWR.connectedNodes,
										n: {
											...nodeDataSWR.n,
											title: params.title,
											document: JSON.stringify(
												params.document.slice(1)
											),
										},
									};

									await SWRmutateCurrNode(
										saveDocument(params),
										{
											optimisticData: newData,
											populateCache: false,
										}
									);
								}}
								blockElement={Block}
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
									}),
								]}
							/>
							// </PlateProvider>
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
					<DocumentSideTabs
						editorComponent={
							nodeDataSWR.n.shelf ? (
								<EditorComponent
									key={nodeDataSWR.n.id + 'shelf'}
									initialValue={[
										...createInitialValue(
											nodeDataSWR.n.shelf
										),
									]}
									value={shelf}
									setValue={setshelf}
									id={'shelfDocument'}
									save={saveShelf}
									blockElement={ShelfBlock}
								/>
							) : (
								<></>
							)
						}
					/>
					{/* If I put shelf inside documentSideTabs it has issues with setting state and I'm not sure why tbh */}
					{/* I suspect this might be because it gets rendered in tabs after the fact. */}
					<Divider className='separator-row' />
					<div className='py-4 px-2 '>
						<div className='ml-[14px]'>
							<h2 className='font-bold ml-1 text-md'>Shelf</h2>
						</div>
						{nodeDataSWR.n.shelf && (
							<EditorComponent
								key={nodeDataSWR.n.id + 'shelf'}
								initialValue={[
									...createInitialValue(nodeDataSWR.n.shelf),
								]}
								value={shelf}
								setValue={setshelf}
								id={'shelfDocument'}
								save={saveShelf}
								blockElement={ShelfBlock}
							/>
						)}
					</div>
				</SplitPaneRight>
			</SplitPane>
		</DndProvider>
	);
};
export default Document;
