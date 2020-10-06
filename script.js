//Variables
const start = document.getElementById('start');
const startBtn = document.querySelector('.begin');
const game = document.getElementById('game');
const phrases = ['baseball','football','soccer','basketball','hockey','boxing','golf', 'tennis','rugby','swimming','volleyball','wrestling','gymnastics'];
const tileWrapper = document.getElementById('tile');
const remaining = document.querySelector('p');
const heading = document.getElementById('heading');
const buttons = document.getElementsByTagName('BUTTON');
let lives = 5;
let score = 0;


//Functions

//generating a random word
function randomWord() {
	const index = Math.floor(Math.random()*phrases.length);
	return phrases[index];
}

//creating the displayed tiles based on the random word
function createTiles() {
	let word = randomWord();
	for (let i = 0; i < word.length; i++) {
		let li = document.createElement('li');
		li.textContent = `${word[i]}`;
		li.classList.add('letter');
		tileWrapper.appendChild(li);
	}
}

//checking the users guess against the word
function checkGuess(guess) {
	let checker = document.getElementsByClassName('letter');
	let letterArr = [];
	for (let i = 0; i < checker.length; i++) {
		letterArr.push(checker[i].textContent);
		if(guess === checker[i].textContent) {
			checker[i].style.color = 'black';
			score++;
		}
	}
	if (!letterArr.includes(guess)) {
		lives--;
		remaining.textContent = `Lives Remaining: ${lives}`;
	}
	if (score === checker.length) {
		game.style.display = 'none';
		heading.textContent = 'You Win! Play Again?';
		start.style.removeProperty('display');
		resetGame();
	}
	if (lives === 0) {
		game.style.display = 'none';
		heading.textContent = 'You Lose. Try Again?';
		start.style.removeProperty('display');
		resetGame();
	}
}

//resetting the game
function resetGame() {
	score = 0;
	lives = 5;
	tileWrapper.innerHTML = '';
	for (let i = 0; i < buttons.length; i++) {
		if (buttons[i].hasAttribute('disabled')) {
			buttons[i].removeAttribute('disabled');
		}
	}
}

//Event Listeners

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('body').style.visibility = 'visible';
	game.style.display = 'none';
});

//starting the game
startBtn.addEventListener("click", function() {
	start.style.display = 'none';
	game.style.removeProperty('display');
	document.querySelector('body').style.backgroundColor = '#4e88b7';
	remaining.textContent = `Lives Remaining: ${lives}`;
	createTiles();
});

//grabbing the letter guessed and passing it to the checkGuess function
game.addEventListener("click", function(event) {
	if(event.target.tagName === 'BUTTON') {
		let guess = event.target.textContent;
		event.target.setAttribute('disabled', true);
		checkGuess(guess);
	}
});