var cardsObj = document.getElementsByClassName('memory-card');
var cards = Object.values(cardsObj);
var popup = document.getElementById('popup');


var hasFlippedCard = false;
var lockBoard = false;
var firstCard = 0;
var secondCard = 0;
var numMatches = 0;


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    var isMatch = firstCard.getAttribute("type") === secondCard.getAttribute("type");

    if (isMatch) {
        disableCards();
        numMatches++;
        if (numMatches === 6) {
            popupModal();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function startGame() {
    console.log(localStorage.getItem('wins'))
    if (localStorage.getItem('wins') == undefined || localStorage.getItem('wins') == 0) {
        localStorage.setItem('wins', 1);
    } else {
        localStorage.setItem('wins', parseInt(localStorage.getItem('wins')) + 1);
    }
    document.getElementById('wins').innerHTML = localStorage.getItem('wins');
    numMatches = 0;
    cards.forEach(card => card.classList.remove('flip'));
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
    popup.classList.add('hide');
}

function popupModal() {
    popup.classList.remove('hide');
}

function shuffle() {
    cards.forEach(card => {
        var randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
}

cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();

document.getElementById('wins').innerHTML = localStorage.getItem('wins') || 0;

function loadFact() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            var num = Math.floor(Math.random() * 2);
            document.getElementById("fact").innerHTML =
                data[num];
        }
    };
    xhttp.open("GET", "facts.json", true);
    xhttp.send();
}

// function getFact() {
//     var facts = loadFact();
//     document.getElementById('fact').innerHTML = facts;
// }

// TO DO
// Use AJAX