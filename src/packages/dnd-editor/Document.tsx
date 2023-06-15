import React, { useContext, useState } from 'react';
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
import { ELEMENT_TITLE, MyTitleElement } from '../editor/plateTypes';
import { useViewData } from '../../components/context/ViewContext';

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
					type: ELEMENT_TITLE,
					id: 'Node Title',
					children: [{ text: currNode_data.n.title }],
				} as MyTitleElement,
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

	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<div className='px-3 py-3'>
						{currNode_data.n.content && (
							<EditorComponent
								initialValue={[
									{
										type: 'title',
										id: 'Node Title',
										children: [
											{ text: currNode_data.n.title },
										],
									} as MyTitleElement,
									...JSON.parse(currNode_data.n.content),
								]}
								value={value}
								setValue={setValue}
								id={'documentId'}
							/>
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
