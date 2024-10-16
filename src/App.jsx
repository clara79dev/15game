import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './components/Board';
import { coordsByIndex, findZeroIndex, getRandomInt, moveStepDown, moveStepLeft, moveStepRight, moveStepUp } from './utils/indexes';

const SCRAMBLE_INTERVAL = 50;

function App() {
  const [sequence, setSequence] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0
  ]);
  const [timerHandle, setTimerHandle] = useState(null);

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

  const scrambleStep = () => {
    setSequence(currentSequence => {
      const rowIdx = getRandomInt(0, 3);
      const colIdx = getRandomInt(0, 3);
      console.log(`rowIdx: ${rowIdx}, colIdx: ${colIdx}`);
      
      console.log(currentSequence);
      const [newSequence, lastDirection, lastDiscard] = multiStepMove(currentSequence, rowIdx, colIdx);
      console.log(`Direction: ${lastDirection}, Discard: ${lastDiscard}`);
      console.log(newSequence);
      
      return newSequence;
    });
  };

  const handleScrambleStart = () => {
    const timerHandle = setInterval(() => {
      scrambleStep();
    }, SCRAMBLE_INTERVAL);
    setTimerHandle(timerHandle);
  };

  const handleScrambleStop = () => {
    clearTimeout(timerHandle);
    setTimerHandle(null);
  };

  const stepMovingFunctionMap = {
    UP: moveStepUp,
    DOWN: moveStepDown,
    LEFT: moveStepLeft,
    RIGHT: moveStepRight,
    NONE: moveNoStep
  };

  const calculateMovement = (cellRow, emptyCellRow, cellCol, emptyCellCol) => {
    let direction = 'NONE';
    let discard = 0;

    if (cellRow === emptyCellRow) {
      discard = cellCol - emptyCellCol;
      if (discard > 0) {
        direction = 'RIGHT';
      } else if (discard < 0) {
        direction = 'LEFT';
      } else
        direction = 'NONE';
    } else if (cellCol === emptyCellCol) {
      discard = cellRow - emptyCellRow;
      if (discard > 0) {
        direction = 'DOWN';
      } else if (discard < 0) {
        direction = 'UP';
      } else
        direction = 'NONE';
    } else {
      direction = 'NONE';
    }

    console.log(`Target direction: ${direction}, Target discard: ${Math.abs(discard)}`);
    return [direction, Math.abs(discard)];
  };

  const isSelectedCellValid = (cellRow, emptyCellRow, cellCol, emptyCellCol) => {
    const sameRow = cellRow === emptyCellRow;
    const sameCol = cellCol === emptyCellCol;
    
    return sameRow || sameCol;
  };

  const multiStepMove = (array, cellRow, cellCol) => {
    const emptyCellIdx = findZeroIndex(array);
    const [emptyCellRow, emptyCellCol] = coordsByIndex(emptyCellIdx);

    if (!isSelectedCellValid(cellRow, emptyCellRow, cellCol, emptyCellCol)) {
      return [array, 'NONE', 0];
    }

    const [direction, discard] = calculateMovement(cellRow, emptyCellRow, cellCol, emptyCellCol);
    const moveFunction = stepMovingFunctionMap[direction];

    const newArray = new Array(discard).fill(0).reduce((functions, currValue, currIdx) => {
      functions.push(moveFunction);
      return functions;
    }, []).reduce((previousSequence, currentFunction, currentIdx) => {
      return currentFunction(previousSequence);
    }, array);

    return [newArray, direction, discard];
  };

  const handleMultiStepMove = (cellRow, cellCol) => {
    console.log(sequence);
    const [newSequence, lastDirection, lastDiscard] = multiStepMove(sequence, cellRow, cellCol);
    console.log(`Direction: ${lastDirection}, Discard: ${lastDiscard}`);

    console.log(newSequence);
    setSequence(newSequence);
  };

  const handleCellClick = ([cellRow, cellCol, cellIdx]) => {
    console.log(`handleCellClick => row: ${cellRow}, col: ${cellCol}, cellIdx: ${cellIdx}`);

    handleMultiStepMove(cellRow, cellCol);
  };

  return (
    <>
      <button onClick={handleScrambleStart} disabled={timerHandle != null}>Start scrambling</button>
      <button onClick={handleScrambleStop} disabled={timerHandle == null}>Stop scrambling</button>
      <Board sequence={sequence} onCellClick={handleCellClick}></Board>
      <p>
        <button onClick={handleMoveStepUp} disabled={timerHandle != null}>UP</button>
        <button onClick={handleMoveStepDown} disabled={timerHandle != null}>DOWN</button>
        <button onClick={handleMoveStepLeft} disabled={timerHandle != null}>LEFT</button>
        <button onClick={handleMoveStepRight} disabled={timerHandle != null}>RIGHT</button>
      </p>
    </>
  );
}

export default App;

