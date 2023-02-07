import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useLocation, useParams } from 'react-router-dom';
import SplitPane, {
	Divider,
	SplitPaneBottom,
	SplitPaneLeft,
	SplitPaneRight,
	SplitPaneTop,
} from '../../components/organisms/split-pane/SplitPane';
import ShelfEditor from '../../packages/shelf-editor/ShelfEditor';
import Document from './Document';

const SplitPaneWrapper: React.FC<{}> = () => {
	// const { state } = useLocation();

	// const currNode = GetNodeDocumentView(state.document.id).data?.nodeData[0]
	// 	.document;

	// console.log('In document of node: ' + JSON.stringify(currNode));

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
