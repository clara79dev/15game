import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './components/Board';
import { coordsByIndex, findZeroIndex, getRandomInt, moveStepDown, moveStepLeft, moveStepRight, moveStepUp } from './utils/indexes';

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
  };

  const handleMoveStepUp = () => {
    const newSequence = moveStepUp(sequence);
    setSequence(newSequence);
  };

  const handleMoveStepDown = () => {
    const newSequence = moveStepDown(sequence);
    setSequence(newSequence);
  };

  const handleMoveStepLeft = () => {
    const newSequence = moveStepLeft(sequence);
    setSequence(newSequence);
  };

  const handleMoveStepRight = () => {
    const newSequence = moveStepRight(sequence);
    setSequence(newSequence);
  };

  const moveNoStep = () => {
    // intentionally empty
  };

  const stepMoveHandlingFunctions = [
    handleMoveStepUp,
    handleMoveStepDown,
    handleMoveStepLeft,
    handleMoveStepRight
  ];

  const handleScrambleStart = () => {
    intervalId = setInterval(() => {
      const idx = getRandomInt(0, 3);
      console.log(idx);
      stepMoveHandlingFunctions[idx]();
    }, 50);
  };

  const handleScrambleStop = () => {
    clearInterval(intervalId);
  };

  const stepMovingFunctionMap = {
    UP: moveStepUp,
    DOWN: moveStepDown,
    LEFT: moveStepLeft,
    RIGHT: moveStepRight,
    NONE: moveNoStep
  };

  const calculateMovement = (cellRow, emptyCellRow, cellCol, emptyCellCol) => {
    if (cellRow === emptyCellRow) {
      const discard = cellCol - emptyCellCol;
      if (discard > 0) {
        return ['RIGHT', discard];
      } else if (discard < 0) {
        return ['LEFT', -discard];
      } else
        return ['NONE', 0];
    } else if (cellCol === emptyCellCol) {
      const discard = cellRow - emptyCellRow;
      if (discard > 0) {
        return ['DOWN', discard];
      } else if (cellRow - emptyCellRow < 0) {
        return ['UP', -discard];
      } else
        return ['NONE', 0];
    } else
      return ['NONE', 0];
  };

  const isSelectedCellInvalid = (cellRow, emptyCellRow, cellCol, emptyCellCol) => {
    return cellRow !== emptyCellRow && cellCol !== emptyCellCol;
  };

  const handleCellClick = ([cellRow, cellCol, cellIdx]) => {
    console.log(`handleCellClick => row: ${cellRow}, col: ${cellCol}, cellIdx: ${cellIdx}`);
    
    const emptyCellIdx = findZeroIndex(sequence);
    const [emptyCellRow, emptyCellCol] = coordsByIndex(emptyCellIdx);
    
    if (isSelectedCellInvalid(cellRow, emptyCellRow, cellCol, emptyCellCol)) {
      return;
    }

    const [direction, discard] = calculateMovement(cellRow, emptyCellRow, cellCol, emptyCellCol);
    const moveFunction = stepMovingFunctionMap[direction];

    const newSequence = new Array(discard).fill(0).reduce((functions, currValue, currIdx) => {
      functions.push(moveFunction);
      return functions;
    }, []).reduce((previousSequence, currentFunction, currentIdx)=>{
      return currentFunction(previousSequence);
    }, sequence);
    
    setSequence(newSequence);
  };

  return (
    <>
      <button onClick={handleScrambleStart}>Start scrambling</button>
      <button onClick={handleScrambleStop}>Stop scrambling</button>
      <Board sequence={sequence} onCellClick={handleCellClick}></Board>
      <p>
        <button onClick={handleMoveStepUp}>UP</button>
        <button onClick={handleMoveStepDown}>DOWN</button>
        <button onClick={handleMoveStepLeft}>LEFT</button>
        <button onClick={handleMoveStepRight}>RIGHT</button>
      </p>
    </>
  );
}

export default App;
