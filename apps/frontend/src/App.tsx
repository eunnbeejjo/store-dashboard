import './App.css';
import './global.css';
import Router from './routes';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return <Router />;
}

export default App;
