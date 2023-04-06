const gameBoard = (() => {
    
})

let gameSpaces = [];

//determine which player is going first (whoever selects X)
//pass emblem into changeStatus parameter 
//change to new player and emblem

function changeStatus(id) {
    let emblem = "O";
    document.getElementById(id).textContent = emblem;
}