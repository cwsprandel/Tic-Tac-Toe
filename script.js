const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    const playArea = document.getElementById("playArea");

    const render = () => {
        playArea.innerHTML = "";

        const gameboardArea = document.createElement("div");
        gameboardArea.setAttribute("class", "gameBoard");
        gameboardArea.setAttribute("id", "gameBoard");

        playArea.appendChild(gameboardArea);

        gameboard.forEach((emblem, index) => {
            //add the emblems to the board using the emblem
            const gamePosition = document.createElement("div");
            gamePosition.setAttribute("class","gameBtn");
            gamePosition.setAttribute("id", index)
            gamePosition.textContent = emblem;
            gamePosition.onclick = Game.positionSelected;

            gameboardArea.appendChild(gamePosition);
        });
    }

    const gameboardReset = () => {
        playArea.innerHTML = "";
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }

    const updateBoard = (index, emblem) => {
        gameboard[index] = emblem;
        render();
    }

    let viewGameboard = gameboard;

    return {
        render,
        updateBoard,
        viewGameboard,
        gameboardReset
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
    let gameStarted;

    const playerOne = document.getElementById("playerOne");
    let playerOneName = document.getElementById("playerOne").value;
    const playerTwo = document.getElementById("playerTwo");
    let playerTwoName = document.getElementById("playerTwo").value;

    const startGame = () => {
        console.log(playerOne.value);
        console.log(playerOneName);

        if (playerOne.value === "" || playerTwo.value === "") {
            alert("please enter player names");
            return;
        }

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

        if (gameStarted != true) {
            Gameboard.render();
        }
        else {
            alert("there is already a game in progress");
        }

        gameStarted = true;
    }

    const resetGame = () => {
        playerOne.value = "";
        playerTwo.value = "";
        players = [];
        gameStarted = false;
        Gameboard.gameboardReset();
    }

    const positionSelected = (event) => {
        let position = event.target.id;

        if (Gameboard.viewGameboard[position] !== "") {
            return;
        }

        Gameboard.updateBoard(position, players[currentPlayerIndex].emblem);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
    }

    return {
        startGame,
        positionSelected,
        resetGame
    }
})();

const startButton = document.getElementById("gameStart")
startButton.addEventListener("click", () => {
    Game.startGame();
})

const resetButton = document.getElementById("gameReset")
resetButton.addEventListener("click", () => {
    Game.resetGame();
})

