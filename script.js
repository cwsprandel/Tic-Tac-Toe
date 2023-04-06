const Gameboard = (() => {
    const gameboard = ["X", "", "", "O", "X", "", "", "O", ""];

    const gameArea = document.getElementById("gameArea");

    const render = () => {
        const playArea = document.createElement("div");
        playArea.setAttribute("class", "gameBoard");
        playArea.setAttribute("id", "gameBoard");

        gameArea.appendChild(playArea);

        gameboard.forEach((emblem, index) => {
            //add the emblems to the board using the emblem
            const gamePosition = document.createElement("div");
            gamePosition.setAttribute("class","gameBtn");
            gamePosition.setAttribute("id", index)
            gamePosition.textContent = emblem;
            gamePosition.onclick = Game.markPosition

            playArea.appendChild(gamePosition);
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

