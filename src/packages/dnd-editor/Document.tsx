import React, { useContext, useEffect, useState } from 'react';
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

import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';
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
	ELEMENT_TITLE,
	MyBlockElement,
	MyTitleElement,
} from '../editor/plateTypes';
import { useViewData } from '../../components/context/ViewContext';
import { PlateProvider } from '@udecode/plate';

const SplitPaneWrapper: React.FC<{ viewId: string }> = ({ viewId }) => {
	const { nodeId, username, currNode_data, documentVar, windowVar } =
		useViewData();

	const [value, setValue] = useState([]);

	// send a request to create content
	if ('title' in currNode_data.n && !currNode_data.n.content) {
		saveDocument({
			nodeId,
			username,
			document: [
				{
					type: 'block',
					id: uuidv4(),
					children: [
						{ type: 'p', id: uuidv4(), children: [{ text: '' }] },
					],
				},
			],
			title: currNode_data.n.title,
		});
	}

	//key events: undo, redo, escaping drawing
	useEffect(() => {
		const listenerFunc = (evt: any) => {
			if (
				evt.code === 'KeyZ' &&
				(evt.ctrlKey || evt.metaKey) &&
				evt.shiftKey
			) {
				evt.stopPropagation();
				evt.stopImmediatePropagation();
				evt.preventDefault();
				console.log('redo()');
			} else if (evt.code === 'KeyZ' && (evt.ctrlKey || evt.metaKey)) {
				evt.stopImmediatePropagation();
				evt.preventDefault();
				console.log('undo()');
			}
		};

		document.addEventListener('keydown', (event) => listenerFunc(event));
		return document.removeEventListener('keydown', (event) =>
			listenerFunc(event)
		);
	}, []);

	const connectionMap: any = {};

	currNode_data.connectedNodes.forEach((row) => {
		connectionMap[row.connected_node.id] = {
			r: row.r,
			...row.connected_node,
		};
	});

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
								: '',
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
					<div className='px-3 py-3'>
						{currNode_data.n.content && (
							// <PlateProvider>
							<EditorComponent
								initialValue={[
									{
										type: 'title',
										id: 'Node Title',
										children: [
											{ text: currNode_data.n.title },
										],
									} as MyTitleElement,
									...createInitialValue(
										currNode_data.n.content
									),
								]}
								value={value}
								setValue={setValue}
								id={'documentId'}
							/>
							// </PlateProvider>
						)}
					</div>
				</SplitPaneLeft>
				<Divider className='separator-col' />
				<SplitPaneRight>
					{/* <TextButton
						text='Create new graph view'
						onClick={() =>
							createGraphView(
								username as string,
								nodeId as string
							)
						}
					/> */}
					{/* <TextButton
						text='Save Document'
						onClick={() =>
							saveDocument({ nodeId, username, document: value })
						}
					/> */}
					<DocumentSideTabs />
				</SplitPaneRight>
			</SplitPane>
		</DndProvider>
	);
};
export default SplitPaneWrapper;
