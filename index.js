let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const winnerBox = document.querySelector(".winnerBox")
const winnerText = document.querySelector(".winnerText")
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    winnerBox.classList.remove("appear")
    winnerText.innerHTML = ``
    winnerText.classList.remove("appear")
}

function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        if(playerHasWon() !==false){
            winnerText.innerHTML = `${currentPlayer} is winner!`
            winnerText.classList.add("appear")
            winnerBox.classList.add("appear")
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
    if(gameOver()){
        playerText.innerHTML = `DRAW DRAW`
        winnerText.classList.remove("appear")
        setTimeout(()=>{
            winnerText.innerHTML = ``
            restart()
        },3000);
    }
}

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

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
function gameOver(){
    for(let i of spaces){
        if(!i)return false
    }
    return true
}
restartBtn.addEventListener('click', restart)

function restart() {
    winnerText.innerHTML = ``
     winnerText.classList.remove("appear")
    spaces.fill(null)
    winnerBox.classList.remove("appear")
    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerText.innerHTML = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()