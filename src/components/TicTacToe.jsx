import { useState, useEffect } from "react";
import Board from "./Board";

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winnerCombination = [
    // Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    // Columns
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },

    // Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass) {
    for (const { combo, strikeClass } of winnerCombination) {
        const [index1, index2, index3] = combo;
        const tileValue1 = tiles[index1];
        const tileValue2 = tiles[index2];
        const tileValue3 = tiles[index3];

        if (tileValue1 && tileValue1 === tileValue2 && tileValue1 === tileValue3) {
            setStrikeClass(strikeClass); 
            console.log("Winner found! Strike Class:", strikeClass);
            console.log("Winning Tiles:", index1, index2, index3);
            console.log("Tile Values:", tileValue1, tileValue2, tileValue3);
            return;
        }
    }
    console.log("No winner detected");
    setStrikeClass(null); 
}

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null)); // for what purpose this line needed
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();


    const handleTileClick = (index) => {
        if(tiles[index]!== null){
            return;
        }
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if(playerTurn=== PLAYER_X){
            setPlayerTurn(PLAYER_O);
        }else{
            setPlayerTurn(PLAYER_X);
        }
    };

    useEffect(()=>{
        checkWinner(tiles, setStrikeClass);
    },[tiles]);
    
    return(
        <div>
            <h1>
                Tic Tac Toe
            </h1>
            <Board playerTurn={playerTurn} tiles={tiles} onTileClick={handleTileClick} strikeClass={strikeClass}/>
        </div>
    )
}

export default TicTacToe;