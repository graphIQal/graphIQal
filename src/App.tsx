import './App.css';
import { createClient, Provider } from 'urql';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplitPaneDocument from './pages/document/SplitPaneDocument';
import View from './components/layouts/View';
import Window from './components/layouts/Window';
import HomeNode from './pages/HomeNode';

const client = createClient({
	url: 'http://localhost:4000/',
});

function App() {
	return (
		<Provider value={client}>
			<BrowserRouter>
				<div className='w-full bg-base_white'>
					<Window>
						<View>
							<Routes>
								<Route path='/home' element={<HomeNode />} />
								<Route
									path='/document/:docTitle'
									element={<SplitPaneDocument />}
								/>
								<Route
									path='/document'
									element={<SplitPaneDocument />}
								/>
							</Routes>
						</View>
					</Window>
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
