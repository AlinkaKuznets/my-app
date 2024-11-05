import React, { useState, useEffect } from 'react'
import Board from './components/Board';
import Square from './components/Square';


const defaultSquares = (() => (new Array(9)).fill(null));

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

function App() {
  const [squares, setSquare] = useState(defaultSquares())
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const isComputerTurn = squares.filter(square => square !== null).length % 2 === 1;
    const LinesThatAre = (a, b, c) => {
      return lines.filter(squreIndexes => {
        const squreValues = squreIndexes.map(index => squares[index]);
        return JSON.stringify([a, b, c].sort()) === JSON.stringify(squreValues.sort());
      });
    };
    const emptyIndexes = squares
      .map((square, index) => square === null ? index : null)
      .filter(val => val != null)

    const playerWon = LinesThatAre('x', 'x', 'x').length > 0;
    const computerWon = LinesThatAre('o', 'o', 'o').length > 0;
    if (playerWon) {
      setWinner("x");
      setGameOver(true);
    } else if (computerWon) {
      setWinner("o");
      setGameOver(true);
    }

    const putComputerAt = index => {
      let newSquare = squares;
      newSquare[index] = "o";
      setSquare([...newSquare]);
    }
    if (isComputerTurn) {
      const linesToBlock = LinesThatAre("x", "x", null)
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const winningLines = LinesThatAre("o", "o", null)
      if (winningLines.length > 0) {
        const winIndex = winningLines[0].filter(index => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const randomIndex = emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)]
      putComputerAt(randomIndex);
    }
  }, [squares]);

  function handdleSquareClick(index) {
    let newSquare = squares;
    const isPlayerTurn = squares.filter(square => square !== null).length % 2 === 0;
    if (isPlayerTurn) {
      newSquare[index] = "x";
      setSquare([...newSquare]);
    }
  }

  function resetBoard() {
    setGameOver(false);
    setSquare(defaultSquares);
  }

  return (
    <main>
      <Board>
        {squares.map((square, index) => <Square
          x={square === "x" ? 1 : 0}
          o={square === "o" ? 1 : 0}
          onClick={() => handdleSquareClick(index)} />)
        }
      </Board>
      {!!winner && winner === "x" && gameOver && (
        <div>
          <div className='result green'>YOU WON</div>
          <button className="restart green" onClick={resetBoard}>Restart</button>
        </div>
      )}
      {!!winner && winner === "o" && gameOver && (
        <div>
          <div className='result red'>YOU LOST</div>
          <button className="restart red" onClick={resetBoard}>Restart</button>
        </div>
      )}
      {!gameOver &&
        (<button className="restart blue" onClick={resetBoard}>Restart</button>)}

    </main>
  );
}

export default App;
