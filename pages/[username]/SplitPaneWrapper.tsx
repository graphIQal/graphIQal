import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SplitPane, {
	Divider,
	SplitPaneBottom,
	SplitPaneLeft,
	SplitPaneRight,
	SplitPaneTop,
} from '../../src/components/organisms/split-pane/SplitPane';
import ShelfEditor from '../../src/packages/shelf-editor/ShelfEditor';
import Document from '../../src/pages/document/Document';

import { useRouter } from 'next/router';

const SplitPaneWrapper: React.FC<{}> = () => {
	const router = useRouter();
	const { username } = router.query;
	console.log(router);
	console.log(username);

	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<Document></Document>
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
