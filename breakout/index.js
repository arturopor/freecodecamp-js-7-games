
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
let score = 0
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 10]
let currentPosition = userStart
const boardWidth = 560
const boardHeight = 300
let timerId
const ballDiameter = 20

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let xDirection = -2
let yDirection = 2

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis+blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis+blockHeight]
    }
}

const blocks = [
]

function fillBlocksArray() {
    // console.log("enter fill")
    for (let j=1; j<=3; j++) {
        // console.log("i: " + i)
        for (let i=0;i<=4;i++) {
            // console.log("push")
            blocks.push(new Block(10+(110*i), 300-(30*j)))
        }
    }

}

// draw my block
function addBlocks() {
    for (let i=0; i<blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)

    }
}

fillBlocksArray()
// console.log(blocks)
addBlocks()

// add player
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

// Draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'

}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'

}

// Move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// draw ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 20)

// check for collisions
function checkForCollisions() {

    // check for block collisions
    for (let i=0; i<blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ( (ballCurrentPosition[1]+ballDiameter) > blocks[i].bottomLeft[1] &&
            (ballCurrentPosition[1]) < blocks[i].topLeft[1]
            )
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            // console.log(allBlocks)
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "¡HAS GANADO!"
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }


        }
    }

    // check WALL collisions
    if (
        ballCurrentPosition[0]>= (boardWidth-ballDiameter) || 
        ballCurrentPosition[1]>= (boardHeight-ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }

    // check for user collisions
    if (
        (ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && 
          ballCurrentPosition[1] < currentPosition[1]+blockHeight  )
    ) {
        changeDirection()
    }

    // check for game over
    if (ballCurrentPosition[1] <=0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = "Has perdido"
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }

    if (xDirection === -2 && yDirection === -2 ) {
        yDirection = 2
        return
    }

    if (xDirection === -2 && yDirection === 2 ) {
        xDirection = 2
        return
    }

}