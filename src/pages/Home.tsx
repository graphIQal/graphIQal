import React from 'react';
import Document from './document/Document';
import View from '../components/layouts/View';
import Window from '../components/layouts/Window';
import { DndProvider, useDragDropManager } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Home: React.FC = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div>
				<Window>
					<View>
						<Document></Document>
					</View>
				</Window>
			</div>
		</DndProvider>
	);
};

export default Home;
