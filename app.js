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
        if(noPlyerWon()){
            gameWinnerText.innerText = `NO ONE HAS WON 😢 SO SAD!!`;
            gameHeading.classList.add("hide");
            gameINTRO.classList.add("hide");
            mainGame.classList.add("hide");
            gameWinner.classList.remove("hide");
            console.log('instant');
            return;
        }

        // SWITCHING THE CURRENT PLAYER
        currentPlayer = currentPlayer === X_text ? O_text : X_text;

        // SETTING THE CURRENT PLAYER INFO FOR USER
        currentPlayerText.innerText = `${currentPlayer} - turn`;
    }
};


let noPlyerWon = () => {

    if(spaces[0, 1, 2] === currentPlayer && spaces[0, 4, 8] === currentPlayer && spaces[0, 3, 6] === currentPlayer){
        return true;
    }
    if(spaces[8, 5, 2] === currentPlayer && spaces[8, 7, 6] === currentPlayer){
        return true;
    }
    if(spaces[3, 4, 5] === currentPlayer && spaces[1, 4, 7] === currentPlayer){
        return true;
    }
    if(spaces[2, 4, 6] === currentPlayer && spaces[2, 5, 8] === currentPlayer){
        return true;
    }
};

// FUNCTION TO CHECK CURRENT PLAYER WON OR NO
let plyerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer){
            // console.log('win horz from 0');
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer){
            // console.log('win vert from 0');
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer){
            // console.log('win cross from 0');
            return true;
        }
    }
    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            // console.log('win vert from 8');
            return true;
        }
        if(spaces[7] === currentPlayer && spaces[6] === currentPlayer){
            // console.log('win horz from 8');
            return true;
        }
    }
    if(spaces[4] === currentPlayer){
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer){
            // console.log('win vert from 4');
            return true;
        }
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer){
            // console.log('win vert from 4');
            return true;
        }
    }
    if(spaces[2] === currentPlayer){
        if(spaces[4] === currentPlayer && spaces[6] === currentPlayer){
            // console.log('win cross from 2');
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