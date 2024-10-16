import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Board from './components/Board';
import Winner from './components/Winner';
import { coordsByIndex, findZeroIndex, getRandomInt, moveStepDown, moveStepLeft, moveStepRight, moveStepUp, arraysEqual } from './utils/indexes';

const SCRAMBLE_INTERVAL = 50;

const INITIAL_CONFIGURATION = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0
];

function App() {
  const [sequence, setSequence] = useState(INITIAL_CONFIGURATION);
  const [timerHandle, setTimerHandle] = useState(null);
  const [winner, setWinner] = useState(false);

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

    if (!arraysEqual(sequence, newSequence) && arraysEqual(newSequence, INITIAL_CONFIGURATION)) {
      setWinner(true);
    } else {
      setWinner(false);
    }
  };

  const handleCellClick = ([cellRow, cellCol, cellIdx]) => {
    console.log(`handleCellClick => row: ${cellRow}, col: ${cellCol}, cellIdx: ${cellIdx}`);

    handleMultiStepMove(cellRow, cellCol);
  };

  const handleRestart = () => {
    setWinner(false);
    setSequence(INITIAL_CONFIGURATION);
  };

  const winnerOrScrambling = () => timerHandle != null || winner;

  return (
    <>
      <h1>15 game</h1>
      {!winner && (
        <p>
          {timerHandle == null && <button className='scramble' onClick={handleScrambleStart} disabled={winnerOrScrambling()}>Start scrambling</button>}
          {timerHandle != null && <button className='scramble' onClick={handleScrambleStop} disabled={timerHandle == null}>Stop scrambling</button>}
          <button className='restart' onClick={handleRestart} disabled={timerHandle != null}>Restart</button>
        </p>
      )}
      {!winner && <Board sequence={sequence} onCellClick={handleCellClick}></Board>}
      { winner && <Winner onRestart={handleRestart}></Winner>}
      {!winner && (
        <p>
          <button className='move' onClick={handleMoveStepUp} disabled={winnerOrScrambling()}>UP</button>
          <button className='move' onClick={handleMoveStepDown} disabled={winnerOrScrambling()}>DOWN</button>
          <button className='move' onClick={handleMoveStepLeft} disabled={winnerOrScrambling()}>LEFT</button>
          <button className='move' onClick={handleMoveStepRight} disabled={winnerOrScrambling()}>RIGHT</button>
        </p>
      )}
    </>
  );
}

export default App;

