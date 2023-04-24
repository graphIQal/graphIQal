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

import { useRouter } from 'next/router';
import ShelfEditor from '../../packages/shelf-editor/ShelfEditor';
import SplitPane, {
	Divider,
	SplitPaneBottom,
	SplitPaneLeft,
	SplitPaneRight,
	SplitPaneTop,
} from '../../components/organisms/split-pane/SplitPane';
import EditorComponent from '../../packages/editor/EditorComponent';
import { getDocument } from '../../backend/functions/getDocument';

const SplitPaneWrapper: React.FC<{}> = () => {
	const router = useRouter();
	const { username, nodeId } = router.query;

	// console.log(router);
	console.log(username, nodeId);

	useEffect(() => {
		// get Node
		console.log(router.query);
		console.log(username, nodeId);
		getDocument(nodeId as string, username as string);
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<EditorComponent />
				</SplitPaneLeft>
				<Divider className='separator-col' />
				<SplitPaneRight
					children={
						<SplitPane className='split-pane-col'>
							<SplitPaneTop
								title={'Shelf'}
								children={<ShelfEditor></ShelfEditor>}
							/>
							<SplitPaneTop
								title={'Connections'}
								children={<p>text</p>}
							/>
							<SplitPaneBottom />
						</SplitPane>
					}
				/>
			</SplitPane>
		</DndProvider>
	);
};
export default SplitPaneWrapper;
