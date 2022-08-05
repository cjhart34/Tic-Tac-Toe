const xColor = "green";
const oColor = "orange";
const emptyColor = "silver";

let xWins = 0;
let oWins = 0;
let draws = 0; 
let buttons = getButtonIds();
clearButtons();

let text = "<h3>Let's Play Tic-Tac-Toe</h3>";
text += "You’re player X. ";
text += "Try to get three Xs in a row. ";
text += "The computer, player O, will try to stop you. ";
text += "It’s your job to block the computer ";
text += "and try to win. ";
text += "<h3>Good luck!</h3>";
document.getElementById("info").innerHTML = text;
 
function getButtonIds() {
    let buttonArray = [];
    for (let b = 0; b < 9; b++) {
        let buttonId = document.getElementById("button" + b);
        buttonArray.push(buttonId);
    }
    return buttonArray;
}
function clearButtons() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = "-";
        buttons[i].style.color = emptyColor;
        buttons[i].style.backgroundColor = emptyColor;
    }
    updateScores();
}
   
function buttonClick(buttonNumber) {
    let button = buttons[buttonNumber];

    if (button.innerHTML === "-") {
    button.innerHTML = "X";
    button.style.backgroundColor = xColor;
    } else {
        return; //Don't do anything
    }
    if (checkForWin("X")) {
        xWins++;
        alert("X Wins!");
        clearButtons();
    } else if (checkForDraw()) {
        draws++;
        alert("It's a draw!");
        clearButtons();
    }
    computerTakesATurn();
}
   
function checkForDraw() {
    for (let b = 0; b < buttons.length; b++) {
        if (buttons[b].innerHTML === "-") {
            return false; //exit this function
        }
    }
  
    //If we're still here, it's a draw. The game is over.
    return true;
}
   
function checkForWin(XO) {
    if (buttons[0].innerHTML === XO &&
    buttons[1].innerHTML === XO &&
    buttons[2].innerHTML === XO) {
        return true;
    } else if (buttons[3].innerHTML === XO && buttons[4].innerHTML === XO && buttons[5].innerHTML === XO) {
        return true;
    } else if (buttons[6].innerHTML === XO && buttons[7].innerHTML === XO && buttons[8].innerHTML === XO) {
        return true;
    } else if (buttons[0].innerHTML === XO && buttons[3].innerHTML === XO && buttons[6].innerHTML === XO) {
        return true;
    } else if (buttons[1].innerHTML === XO && buttons[4].innerHTML === XO && buttons[7].innerHTML === XO) {
        return true;
    } else if (buttons[2].innerHTML === XO && buttons[5].innerHTML === XO && buttons[8].innerHTML === XO) {
        return true;
    } else if (buttons[0].innerHTML === XO && buttons[4].innerHTML === XO && buttons[8].innerHTML === XO) {
        return true;
    } else if (buttons[2].innerHTML === XO && buttons[4].innerHTML === XO && buttons[6].innerHTML === XO) {
        return true;
    }
    return false;
}
  
function computerTakesATurn() {
    //This checks for the computer to find a winning move
    for (let b = 0; b < buttons.length; b++) {
        let button = buttons[b];

        if (button.innerHTML !== "-") {
        //The space isn't blank, so there's no point checking for a win
            continue;
        }
        button.innerHTML = "O"; //set the space temporarily

        if (checkForWin("O")) {
            button.style.backgroundColor = oColor;
            oWins++;
            alert("O Wins!");
            clearButtons();
            return; //exit the function
        }
        button.innerHTML = "-"; //Reset the space.
    }
  
    //This second loop checks for a player winning move
    for (let b = 0; b < buttons.length; b++) {
        let button = buttons[b];

        if (button.innerHTML !== "-") {
        //The space isn't blank, so there's no point checking for a block
            continue;
        }
        button.innerHTML = "X"; //set the space temporarily

        if (checkForWin("X")) {
            button.innerHTML = "O"; //take over to block
            button.style.backgroundColor = oColor;
 
            if (checkForDraw()) {
                draws++;
                alert("It's a draw!");
                clearButtons();
            }

            return; //exit the function
        }
        button.innerHTML = "-"; //Reset the space.
    }

    let pickingASquare = true;
    while (pickingASquare) {
        let randomButton = Math.floor(Math.random() * buttons.length);
        let button = buttons[randomButton];
 
        if (buttons[4].innerHTML === "-") {
            button = buttons[4];
            pickingASquare = false;
        } else if (buttons[0].innerHTML === "-") {
            button = buttons[0];
            pickingASquare = false;
        } else if (buttons[2].innerHTML === "-") {
            button = buttons[2];
            pickingASquare = false;
        } else if (buttons[6].innerHTML === "-") {
            button = buttons[6];
            pickingASquare = false;
        } else if (buttons[8].innerHTML === "-") {
            button = buttons[8];
            pickingASquare = false;
        }
        if (!pickingASquare) {
            button.innerHTML = "O";
            button.style.backgroundColor = oColor;
        } else if (button.innerHTML === "-") {
            button.innerHTML = "O";
            button.style.backgroundColor = oColor;
            pickingASquare = false; //this causes loop to exit
        }
    }
  
    if (checkForWin("O")) {
        oWins++;
        alert("O Wins!");
        clearButtons();
    } else if (checkForDraw()) {
        draws++;
        alert("It's a draw!");
        clearButtons();
    }
}
  
function updateScores() {
    let result = document.getElementById("result");
  
    let text = "";
    text += "X Wins: " + xWins + "<br>";
    text += "O Wins: " + oWins + "<br>";
    text += "Draws: " + draws + "<br>";
 
    result.innerHTML = text;
}