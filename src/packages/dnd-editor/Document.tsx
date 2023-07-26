import React, { use, useEffect, useState } from 'react';
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

import { useViewData } from '../../components/context/ViewContext';
import DocumentSideTabs from '../../components/organisms/Tabs/DocumentSideTabs';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../editor/EditorComponent';
import {
	BlockElements,
	ELEMENT_BLOCK,
	ELEMENT_NODELINK,
	MyTitleElement,
} from '../editor/plateTypes';
import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';
import { saveShelf } from '../../backend/functions/general/document/mutate/saveShelf';
import { ShelfBlock } from '../shelf-editor/ShelfBlock/ShelfBlock';
import { Block } from '../editor/Elements/Elements';
import { createNormalizeTypesPlugin } from '@udecode/plate';

const SplitPaneWrapper: React.FC<{ viewId: string }> = () => {
	const { nodeId, username, currNode_data, documentVar, windowVar } =
		useViewData();

	const [document, setdocument] = useState([]);
	const [shelf, setshelf] = useState([]);

	// useEffect(() => {
	if ('title' in currNode_data.n && !currNode_data.n.document) {
		currNode_data.n.document = `
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
	if ('title' in currNode_data.n && !currNode_data.n.shelf) {
		currNode_data.n.shelf = `
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

	const connectionMap: any = {};

	currNode_data.connectedNodes.forEach((row) => {
		connectionMap[row.connected_node.id] = {
			r: row.r,
			...row.connected_node,
		};
	});
	// }, [currNode_data]);

	//key events: undo, redo, escaping drawing
	// useEffect(() => {
	// 	const listenerFunc = (evt: any) => {
	// 		if (
	// 			evt.code === 'KeyZ' &&
	// 			(evt.ctrlKey || evt.metaKey) &&
	// 			evt.shiftKey
	// 		) {
	// 			evt.stopPropagation();
	// 			evt.stopImmediatePropagation();
	// 			evt.preventDefault();
	// 		} else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
	// 			evt.stopImmediatePropagation();
	// 			evt.preventDefault();
	// 		}
	// 	};

	// 	document.addEventListener('keydown', (event) => listenerFunc(event));
	// 	return document.removeEventListener('keydown', (event) =>
	// 		listenerFunc(event)
	// 	);
	// }, []);

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
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<div className='pl-10 pt-10 pr-3 pb-3'>
						{currNode_data.n.document && (
							// <PlateProvider>
							<EditorComponent
								key={currNode_data.n.id}
								initialValue={[
									{
										type: 'title',
										id: 'Node Title',
										children: [
											{ text: currNode_data.n.title },
										],
									} as MyTitleElement,
									...createInitialValue(
										currNode_data.n.document
									),
								]}
								value={document}
								setValue={setdocument}
								id={'documentId'}
								save={saveDocument}
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
					<DocumentSideTabs
						editorComponent={
							currNode_data.n.shelf ? (
								<EditorComponent
									key={currNode_data.n.id + 'shelf'}
									initialValue={[
										...createInitialValue(
											currNode_data.n.shelf
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
					{/* I suspect this might be because it gets rendered in tabs afterthe fact. */}
					<Divider className='separator-row' />
					<div className='py-4 px-2 '>
						<div className='ml-[14px]'>
							<h2 className='font-bold ml-1 text-md'>Shelf</h2>
						</div>
						{currNode_data.n.shelf && (
							<EditorComponent
								key={currNode_data.n.id + 'shelf'}
								initialValue={[
									...createInitialValue(
										currNode_data.n.shelf
									),
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
export default SplitPaneWrapper;
