import React from 'react';
import Document from '../components/document/Document';
import View from '../components/organisational/View';
import Window from '../components/organisational/Window';

const Home: React.FC = () => {
	return (
		<div>
			<Window>
				<View>
					<Document></Document>
				</View>
			</Window>
		</div>
	);
};

export default Home;
