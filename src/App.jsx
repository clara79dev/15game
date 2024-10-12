import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './components/Board';
import { coords, findZeroIndex, getRandomInt, moveDown, moveLeft, moveRight, moveUp } from './utils/indexes';

let intervalId;

function App() {
  const [sequence, setSequence] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0
  ]);

  const scrambleSequence = () => {
    const scrambledArray = sequence.slice();

    for (let i = scrambledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambledArray[i], scrambledArray[j]] = [scrambledArray[j], scrambledArray[i]];
    }

    setSequence(scrambledArray);
  }

  const handleMoveUp = () => {
    const newSequence = moveUp(sequence);
    setSequence(newSequence);
  }

  const handleMoveDown = () => {
    const newSequence = moveDown(sequence);
    setSequence(newSequence);
  }

  const handleMoveLeft = () => {
    const newSequence = moveLeft(sequence);
    setSequence(newSequence);
  }

  const handleMoveRight = () => {
    const newSequence = moveRight(sequence);
    setSequence(newSequence);
  }

  const movingFunctions = [
    handleMoveUp,
    handleMoveDown,
    handleMoveLeft,
    handleMoveRight
  ];

  const handleScrambleStart = () => {
    intervalId = setInterval(() => {
      const idx = getRandomInt(0, 3);
      console.log(idx);
      movingFunctions[idx]();
    }, 50);
  }

  const handleScrambleStop = () => {
    clearInterval(intervalId);
  }

  return (
    <>
      <button onClick={handleScrambleStart}>Start scrambling</button>
      <button onClick={handleScrambleStop}>Stop scrambling</button>
      <Board sequence={sequence}></Board>
      <p>
        <button onClick={handleMoveUp}>UP</button>
        <button onClick={handleMoveDown}>DOWN</button>
        <button onClick={handleMoveLeft}>LEFT</button>
        <button onClick={handleMoveRight}>RIGHT</button>
      </p>
    </>
  );
}

export default App;
