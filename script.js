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
            const gamePosition = document.createElement("div");
            gamePosition.setAttribute("class","gameBtn");
            gamePosition.setAttribute("id", index)
            gamePosition.textContent = emblem;
            gamePosition.onclick = Game.positionSelected;

            gameboardArea.appendChild(gamePosition);
        });
    }

    const gameOverScreen = (winner) => {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        overlay.onclick = () => {
            overlay.style.display = "none";
        }

        const overlayText = document.getElementById("overlayText");
        if (winner) {
            overlayText.textContent = `${winner} wins the game!`
        } else {
            overlayText.textContent = "It's a draw..."
        }
    }

    const gameboardReset = () => {
        playArea.innerHTML = "";
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
        gameboardReset,
        gameOverScreen
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
    let clickCount = 0;
    let gameStarted;
    let gameOver = false;
    let winner = "";

    const playerOne = document.getElementById("playerOne");
    const playerTwo = document.getElementById("playerTwo");

    const startGame = () => {

        if (playerOne.value === "" || playerTwo.value === "") {
            alert("please enter player names");
            return;
        }

        players = [
            playerFactory(playerOne.value, "X"),
            playerFactory(playerTwo.value, "O")
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
        gameStarted = false;
        gameOver = false;
        clickCount = 0;
        currentPlayerIndex = 0;
        winner = "";
        for (let i=0; i<9; i++) {
            Gameboard.updateBoard(i,"");
        }
        Gameboard.gameboardReset
    }

    const positionSelected = (event) => {

        if (gameOver) {
            return;
        }

        let position = event.target.id;

        if (Gameboard.viewGameboard[position] !== "") {
            return;
        }

        Gameboard.updateBoard(position, players[currentPlayerIndex].emblem);
        clickCount++

        if (checkBoard(Gameboard.viewGameboard)){
            winner = players[currentPlayerIndex].name;
            gameOver = true;
        } else if (clickCount === 9) {
            gameOver = true;
        }

        if (gameOver) {
            Gameboard.gameOverScreen(winner);
        }

        currentPlayerIndex = currentPlayerIndex === 0 ? 1:0;
    }

    let checkBoard = (board) => {
        console.log(board);
        const winningCombos = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        for (let i = 0; i < winningCombos.length; i++) {
            const [a,b,c] = winningCombos[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]){
                return true;
            }
        }
        return false;
    }

    return {
        startGame,
        positionSelected,
        resetGame,
        checkBoard
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

