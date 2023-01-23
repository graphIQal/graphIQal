import './App.css';
import Home from './pages/Home';
import { createClient, Provider } from 'urql';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplitPaneDocument from './pages/document/SplitPaneDocument';

const client = createClient({
  url: 'http://localhost:4000/',
});

function App() {
  return (
    <Provider value={client}>
      <BrowserRouter>
        <div className='container'>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/document/:docTitle' element={<SplitPaneDocument />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
