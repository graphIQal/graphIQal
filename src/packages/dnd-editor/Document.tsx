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

import { ELEMENT_H1 } from '@udecode/plate';
import { useRouter } from 'next/router';
import ViewContext, {
	ViewContextInterface,
} from '../../components/context/ViewContext';
import DocumentSideTabs from '../../components/organisms/Tabs/DocumentSideTabs';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../editor/EditorComponent';
import {
	MyBlockElement,
	MyH1Element,
	MyParagraphElement,
} from '../editor/plateTypes';
import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';

const SplitPaneWrapper: React.FC<{ viewId: string }> = ({ viewId }) => {
	const { nodeId, username, currNode_data, documentVar, windowVar } =
		useContext(ViewContext) as ViewContextInterface;

	const [value, setValue] = useState([
		{
			type: 'block',
			id: '123123990asdf',
			children: [
				{
					type: 'p',
					id: '33333',
					children: [
						{
							text: '',
						},
					],
				} as MyParagraphElement,
			],
		} as MyBlockElement,
	]);

	if (currNode_data.n && currNode_data.n.content === null) {
		console.log('hmm');
		// send a request to create content
		saveDocument({ nodeId, username, document: value });
	}

	if (currNode_data.n.content) {
		console.log('...JSON.parse(currNode_data.n.content)');
		console.log(currNode_data.n);
		console.log([...JSON.parse(currNode_data.n.content)]);
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					{currNode_data.n.content && (
						<EditorComponent
							value={[
								{
									type: ELEMENT_H1,
									id: 'Node Title',
									children: [{ text: currNode_data.n.title }],
								} as MyH1Element,
								...JSON.parse(currNode_data.n.content),
							]}
						/>
					)}
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
