import {React, useState} from "react";
export default function Player({initialName , symbol, isActive, onChangeName}) {
const [playerName , setPlayerName] = useState(initialName);
const [isEditing , setIsEditing] = useState(false);

function handleEditClick(){
    // setIsEditing(isEditing ? false : true);
    setIsEditing((editing)=>!editing); //best practice because these state chamge functions are scheduled
   { isEditing && onChangeName(symbol , playerName) }
}
function handleChange(e){
    setPlayerName(e.target.value);
}

let editablePlayerName = <span className="palyer-name" >{playerName}</span>;
let btnClick = "Edit";
if(isEditing){
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    btnClick = "Save";
}
    return (
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className="player">
                  {editablePlayerName}
                <span className="player">
                  {symbol}
                </span>
                 </span>
                <button onClick={handleEditClick}>{btnClick}</button>
            </li>
        </>
    )
}

{/* 
        Player.jsx 
        props : initialName ,symbol
        state: playerName , isEditing
        fun: handleEditCLick , handleChange
        
        
        1. By default we give editablePlayerName a span element. is isEditing is a true value, than it changes to an input field.
        2. handleClick btn will trigger when we click the button. It is further trigger setIsEditing to true which will help us to conditionally render Save/Edit btn.
        3. As the span has attribute value which will show the name of the player, which is playerName (a state). To save the edited player name, we first gather the keyboard 
           entries as an object 'here we name it as "e" ' via onChange attribute. then we update the playername via setPlayerName(e.target.value).


*/}