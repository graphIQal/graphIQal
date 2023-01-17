import './App.css';
import Home from './pages/Home';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/',
});

function App() {
  return (
    <Provider value={client}>
      <div className='container'>
        <Home />
      </div>
    </Provider>
  );
}

export default App;
