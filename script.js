let playboard = document.querySelector('.play-board')
let scoreEl = document.querySelector('.score')
let highScoreEl = document.querySelector('.high-score')

let gameover = false
let foodX, foodY
let snakeX = 5, snakeY = 10
let snakeBody = []
let velocityX = 0, velocityY = 0
let setIntervalValid
let score = 0

let highScore = localStorage.getItem('high-score') || 0 
highScoreEl.innerHTML = `high-score: ${highScore}`


const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

const handleGameOver = () => {
    clearInterval(setIntervalValid)
    alert('Game Over! Press Okay To Replay...')
    location.reload()
}
 
const changeDirections = (e) => {
    if(e.key === 'ArrowUp' && velocityY !== 1){
        velocityX = 0
        velocityY = -1
    }
    else if(e.key === 'ArrowDown' && velocityY !== -1){
        velocityX = 0
        velocityY = 1
    }
    else if(e.key === 'ArrowLeft' && velocityX !== 1){
        velocityX = -1
        velocityY = 0
    }
    else if(e.key === 'ArrowRight' && velocityX !== -1){
        velocityX = 1
        velocityY = 0
    }

    init()
}

const init = () => {
    let htmlMarkup = `<div class = "food" style = "grid-area : ${foodY} / ${foodX}"></div>`
    if(gameover) return handleGameOver()
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakeBody.push([foodX,foodY])
        score++

        highScore = score >= highScore ? score : highScore
        localStorage.setItem('high-score', highScore)
        scoreEl.innerHTML = `Score: ${score}`
        highScoreEl.innerHTML = `High-Score: ${highScore}`
    }

    for(let i = snakeBody.length -1 ; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX,snakeY]

    snakeX += velocityX
    snakeY += velocityY

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameover = true
    }
    
    for(let i = 0 ; i < snakeBody.length; i++){
        htmlMarkup += `<div class = "snake" style = "grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameover = true
        }
    }
    playboard.innerHTML = htmlMarkup
}
changeFoodPosition()
setIntervalValid =  setInterval(init,125)

document.addEventListener("keydown",changeDirections)