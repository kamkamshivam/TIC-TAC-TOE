export default function GameOver({winner , reStart}) {
    return <div id="game-over">
        <h2>Game Over!</h2>
       {winner && <p>{winner} Won!</p>}
       {!winner && <p>Draw!</p>}
        <p><button onClick={reStart}>New Match!</button></p>
    </div>
}