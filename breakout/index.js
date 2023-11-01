
const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 10]
let currentPosition = userStart
const boardWidth = 560

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