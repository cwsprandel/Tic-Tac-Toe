const Gameboard = (() => {
    const gameboard = ["", "", "", "", "", "", "", "", ""];

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

    const updateBoard = (index, emblem) => {
        gameboard[index] = emblem;
        render();
    }

    return {
        render,
        updateBoard
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

        if (gameStarted != true) {
            Gameboard.render();
        }
        else {
            alert("there is already a game in progress");
        }

        gameStarted = true;
    }

    const positionSelected = (event) => {
        let position = event.target.id;
        Gameboard.updateBoard(position, players[currentPlayerIndex].emblem);
        currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
    }

    return {
        startGame,
        positionSelected
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

