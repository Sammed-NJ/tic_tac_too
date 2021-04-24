'use strict'

// SET LOGIC
let spaces = [null, null, null, null, null, null, null, null, null];
const O_text = 'O';
const X_text = 'X';
let currentPlayer = X_text;
let gameWinnerText = document.querySelector(".ply-text");

// DIV BOX IN AN ARRAY
const boxes = Array.from(document.getElementsByClassName("box"));

// DIV's THAT WILL BE MANUPULATED
const gameINTRO = document.querySelector(".game-intro");
const gameStart = document.querySelector(".start-btn");
const gameHeading = document.querySelector(".heading");
const mainGame = document.querySelector(".main-container");
const gameWinner = document.querySelector(".winner-container");
const gameReset = document.querySelector(".game-reset");

// PAGE LOADING STATE
gameINTRO.classList.remove("hide");
gameHeading.classList.add("hide");
mainGame.classList.add("hide");
gameWinner.classList.add("hide");

// PAGE WHEN GAME START BTN CLICKED
gameStart.addEventListener("click", function(){
    gameINTRO.classList.add("hide");
    gameHeading.classList.remove("hide");
    mainGame.classList.remove("hide");
    gameWinner.classList.add("hide");
});


// DRAWING THE GAME OUTLINE
const drawBoard = () => {
    boxes.forEach((box, index) => {

        let stringStyle = '';
        if(index < 3) {
            stringStyle += "border-bottom: 2px solid white;";
        }
        if(index % 3 === 0) {
            stringStyle += "border-right: 2px solid white;";
        }
        if(index % 3 === 2) {
            stringStyle += "border-left: 2px solid white;";
        }
        if(index > 5) {
            stringStyle += "border-top: 2px solid white;";
        }
        box.style = stringStyle;

        box.addEventListener('click', boxClicked);
    });
};

// CLICK TO DISPLAY THE SIGN X & O OR CURRENT PLAYER WON OR NOT!!
const boxClicked = (e) => {
    const id = e.target.id;

    if(!spaces[id]) {
        // UPDATING SPACES
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        let currentPlayerText = document.querySelector(".current-player");

        // IF THE THE PLAYER AS WON THEN DO THIS OR CONT.. PLAYING AND UPDATING SPACES
        if(plyerHasWon()){
            gameHeading.classList.add("hide");
            gameINTRO.classList.add("hide");
            mainGame.classList.add("hide");
            gameWinner.classList.remove("hide");
            gameWinnerText.innerText = `${currentPlayer} Has WON 🎉🎉`;
            return;
        }
        
        // SWITCHING THE CURRENT PLAYER
        currentPlayer = currentPlayer === X_text ? O_text : X_text;

        // SETTING THE CURRENT PLAYER INFO FOR USER
        currentPlayerText.innerText = `${currentPlayer} - turn`;
    }
};

// FUNCTION TO CHECK CURRENT PLAYER WON OR NO
const plyerHasWon = () => {
    if(spaces[0] === currentPlayer || spaces[8] === currentPlayer || spaces[4] === currentPlayer || spaces[2] === currentPlayer){
        console.log('gg');
        if( spaces[1] === currentPlayer && spaces[2] === currentPlayer ||
            spaces[1] === currentPlayer && spaces[7] === currentPlayer ||
            spaces[3] === currentPlayer && spaces[6] === currentPlayer ||
            spaces[3] === currentPlayer && spaces[5] === currentPlayer ||
            spaces[4] === currentPlayer && spaces[6] === currentPlayer ||
            spaces[4] === currentPlayer && spaces[8] === currentPlayer ||
            spaces[5] === currentPlayer && spaces[2] === currentPlayer ||
            spaces[7] === currentPlayer && spaces[6] === currentPlayer){
            return true;
        }
    }
};


gameReset.addEventListener('click', () => {
    gameINTRO.classList.remove("hide");
    gameHeading.classList.add("hide");
    mainGame.classList.add("hide");
    gameWinner.classList.add("hide");
    spaces = [null, null, null, null, null, null, null, null, null];
    boxes.forEach((box) => {
        box.innerText = '';
    });
    gameWinnerText.innerText = '';
    currentPlayer = X_text;
});

// CALLING DRAW BOARD FUNCTION
drawBoard();