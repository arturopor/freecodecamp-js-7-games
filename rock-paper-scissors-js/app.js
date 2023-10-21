
const computerChoiceDisplay = document.getElementById('computerChoice');
const userChoiceDisplay = document.getElementById('userChoice');
const resultDisplay = document.getElementById('result');

const possibleChoices = document.querySelectorAll('button');

let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
    userChoice = e.target.id
    // console.log(userChoice)
    userChoiceDisplay.innerHTML = userChoice
    generateComputerChoice()

    getResult()
}))

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3)+1

    // console.log(randomNumber)

    if (randomNumber === 1 ) {
        computerChoice = "Piedra"
    }
    else if (randomNumber === 2 ) {
        computerChoice = "Papel"
    }
    else if (randomNumber === 3 ) {
        computerChoice = "Tijeras"
    }
    computerChoiceDisplay.innerHTML = computerChoice
}

function getResult() {
    if (computerChoice === userChoice) {
        result = "¡Tenemos un empate!"
    }
    else if (computerChoice==="Piedra" && userChoice === "Papel") {
        result = "¡Ganaste! Papel envuelve a piedra."
    }
    else if (computerChoice==="Piedra" && userChoice === "Tijeras") {
        result = "Perdiste :-( Piedra rompe tijeras."
    }
    else if (computerChoice==="Papel" && userChoice === "Piedra") {
        result = "Perdiste :-( Papel envuelve a piedra."
    }
    else if (computerChoice==="Papel" && userChoice === "Tijeras") {
        result = "¡Ganaste! Tijeras corta papel."
    }
    else if (computerChoice==="Tijeras" && userChoice === "Piedra") {
        result = "¡Ganaste! Piedra rompe tijeras."
    }
    else if (computerChoice==="Tijeras" && userChoice === "Papel") {
        result = "Perdiste :-( Tijeras corta papel."
    }

    resultDisplay.innerHTML = result
}