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

import { useRouter } from 'next/router';
import { createGraphView } from '../../backend/functions/graph/mutate/createGraphView';
import TextButton from '../../components/molecules/TextButton';
import DocumentSideTabs from '../../components/organisms/Tabs/DocumentSideTabs';
import SplitPane, {
	Divider,
	SplitPaneLeft,
	SplitPaneRight,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../editor/EditorComponent';
import { saveDocument } from '../../backend/functions/general/document/mutate/saveDocument';
import ViewContext, {
	ViewContextInterface,
} from '../../components/context/ViewContext';
import { ELEMENT_H1 } from '@udecode/plate';
import {
	MyH1Element,
	MyParagraphElement,
	MyBlockElement,
} from '../editor/plateTypes';

const SplitPaneWrapper: React.FC<{ viewId: string }> = ({ viewId }) => {
	const router = useRouter();
	// const { username, nodeId } = router.query;
	const {
		nodeId,
		username,
		showSearchBar,
		setShowSearchBar,
		documentVar,
		windowVar,
	} = useContext(ViewContext) as ViewContextInterface;

	const [value, setValue] = useState([
		{
			type: ELEMENT_H1,
			id: 'asdkj123123a',
			children: [{ text: '' }],
		} as MyH1Element,
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
						// { type: 'p', id: 'bbbbb', children: [{ text: 'hmm' }] },
					],
				} as MyParagraphElement,
			],
		} as MyBlockElement,
	]);

	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<EditorComponent value={value} />
				</SplitPaneLeft>
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
					<TextButton
						text='Save Document'
						onClick={() =>
							saveDocument({ nodeId, username, document: value })
						}
					/>
					<DocumentSideTabs />
				</SplitPaneRight>
			</SplitPane>
		</DndProvider>
	);
};
export default SplitPaneWrapper;
