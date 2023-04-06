const Gameboard = (() => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

    const gameArea = document.getElementById("gameBoard");

    const render = () => {
        gameboard.forEach((emblem, index) => {
            //add the emblems to the board using the emblem 
            //use the index to place the emlbem in the correct position
            const gamePosition = document.createElement("button");
            gamePosition.setAttribute("class","gameBtn");

            gameArea.appendChild(gamePosition);
        });
    }

    return {
        render
    }
})();

const playerFactory = (name, emblem) => {
    return {
        name,
        emblem
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    let playerOneName = document.getElementById("player1").value;
    let playerTwoName = document.getElementById("player2").value;

    const startGame = () => {
        players = [
            playerFactory(playerOneName, "X"),
            playerFactory(playerTwoName, "O")
        ]

        if (players[0].emblem == "X") {
            currentPlayerIndex = 0;
        } else {
            currentPlayerIndex = 1;
        }
        gameOver = false;

        Gameboard.render();
    }
    return {
        startGame
    }
})();

const startButton = document.getElementById("gameStart")
startButton.addEventListener("click", () => {
    Game.startGame();
})

//determine which player is going first (whoever selects X)
//pass emblem into changeStatus parameter 
//change to new player and emblem

function changeStatus(id) {
    let emblem = "O";
    document.getElementById(id).textContent = emblem;
}

