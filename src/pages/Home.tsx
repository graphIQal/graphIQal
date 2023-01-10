import React from 'react';
import View from '../components/layouts/View';
import Window from '../components/layouts/Window';
import SplitPaneDocument from './document/SplitPaneDocument';

const Home: React.FC = () => {
	return (
		<div>
			<Window>
				<View>
					<SplitPaneDocument></SplitPaneDocument>
				</View>
			</Window>
		</div>
	);
};

export default Home;
