import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SplitPane, {
	Divider,
	SplitPaneBottom,
	SplitPaneLeft,
	SplitPaneRight,
	SplitPaneTop,
} from '../../components/organisms/split-pane/SplitPane';
import Document from './Document';

const SplitPaneWrapper: React.FC<{}> = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<SplitPane className='split-pane-row'>
				<SplitPaneLeft>
					<SplitPane className='split-pane-col'>
						<SplitPaneTop title={'Shelf'} children={<p>text</p>} />
						<SplitPaneTop
							title={'Connections'}
							children={<p>text</p>}
						/>
						<SplitPaneBottom />
					</SplitPane>
				</SplitPaneLeft>
				<Divider className='separator-col' />
				<SplitPaneRight children={<Document></Document>} />
			</SplitPane>
		</DndProvider>
	);
};
export default SplitPaneWrapper;
