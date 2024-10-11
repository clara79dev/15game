import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './components/Board';

function App() {
  const [sequence, setSequence] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0
  ]);

  return (
    <>
      <Board sequence={sequence}></Board>
    </>
  );
}

export default App;
