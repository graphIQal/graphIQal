import './App.css';
import { createClient, Provider } from 'urql';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplitPaneDocument from './pages/document/SplitPaneDocument';
import View from './components/layouts/View';
import Window from './components/layouts/Window';
import HomeNode from './pages/HomeNode';
import Graph from './pages/graph/components/Graph';

const client = createClient({
  url: 'http://localhost:4000/',
});

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <div className='container'>
          <Window>
            <View>
              <Routes>
                <Route path='/home' element={<HomeNode />} />
                <Route
                  path='/document/:docTitle'
                  element={<SplitPaneDocument />}
                />
                <Route path='/document' element={<SplitPaneDocument />} />
                <Route path='/graph' element={<Graph />} />
              </Routes>
            </View>
          </Window>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
