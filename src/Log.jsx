export default function Log({turns}) {
    
    return <ol className="log">
        {/* info about which button is clicked : currenttly inGameBoard component */}
        {turns.map(turn => <li key={`${turn.square.row}${turn.square.col}`} className="log-li">{turn.player} selected{turn.square.row} , {turn.square.col}</li>)}
    </ol> 
    
}