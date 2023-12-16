import { React, useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./components/WINNING_COMBINATIONS";
import GameOver from "./GameOver";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X : "Player 1",
    Y : "Player 2"
  })
  
  const gameBoard = [...initialGameBoard.map(array => [...array])];
  for(const turn of gameTurns ){
    const {square , player} = turn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  let winner  = null;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = "O";
      }

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange (symbol , newName)
  {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, 
        [symbol] : newName
      };
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} reStart={handleRestart}/>}
        <GameBoard onSelectsquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameBoard} />
        <Log turns={gameTurns} />
      </div>
    </main>
  )
}

export default App
