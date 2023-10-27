
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
    {
        name: 'fries',
        img: 'images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'images/pizza.png',
    },
]

cardArray.sort( () => 0.5 - Math.random() )

//console.log("array tiene " + cardArray.length  + " elementos")

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')

let chosenCards = []
let chosenCardsId = []
const matchedCards = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.setAttribute('class', 'rounded mx-auto img-thumbnail m-1')
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
        
        // console.log(card, i)
    }
}

createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = chosenCardsId[0]
    const optionTwoId = chosenCardsId[1]

    console.log("Check for a match!!!")

    if (optionOneId == optionTwoId ) {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert("¡Has seleccionado la misma imagen!")
    }
    else if (chosenCards[0] == chosenCards[1]) {
        alert("¡¡Es una pareja!!")
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].removeEventListener('click', flipCard)

        matchedCards.push(chosenCards)
    }
    else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert("Prueba otra vez")
    }

    resultDisplay.textContent = matchedCards.length
    chosenCards = []
    chosenCardsId = []

    if (matchedCards.length == cardArray.length/2) {
        resultDisplay.textContent = "¡¡Felicidades, encontraste todas!!"
        confetti({
            particleCount: 150
          });
    }
}

function flipCard() {
    
    const cardId = this.getAttribute('data-id')

    // console.log('clicked', cardId, cardArray[cardId])
    // console.log(cardArray[cardId].name)
    chosenCards.push(cardArray[cardId].name)
    chosenCardsId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)

    if (chosenCards.length === 2) {
        setTimeout( checkMatch, 500)
    }
}