import View from '../src/components/layouts/View';
import Window from '../src/components/layouts/Window';
import HomeNode from '../src/pages/HomeNode';
import Document from '../src/pages/document/Document.tsx';

function App() {
	return (
		<div className='App'>
			<Window>
				<View>
					<HomeNode />
				</View>
			</Window>
		</div>
	);
}

export default App;
