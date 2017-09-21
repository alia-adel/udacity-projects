/*
 * Create a list that holds all of your cards
 */

const CARDS_ICONS = ['fa-camera', 'fa-futbol-o', 'fa-anchor', 'fa-bug', 'fa-bicycle', 'fa-diamond', 'fa-twitter', 'fa-car',
'fa-camera', 'fa-futbol-o', 'fa-anchor', 'fa-bug', 'fa-bicycle', 'fa-diamond', 'fa-twitter', 'fa-car'];

const CARD_ICON_BASE_CLASSES = 'fa fa-lg game-icons';

let moveCounter = 0;

let startRating = 0;

let startDate = new Date();

// Create cards objects' array
let cards = [];

// Retrieve all games boards cards html elements
let cardsHtmlElem = document.getElementsByClassName('game-icons');

let cssClasses = {
	flip : 'flip',
	show : 'show',
	correct: 'correct',
	wrong : 'wrong',
	fullScreen : 'fullScreen',
	dim : 'dim'
};

let lastFlippedCard;

/* Card Class Definition */
let Card = function(cardIcon) {
	let obj = Object.create(Card.prototype);
	obj.icon = cardIcon;
	obj.flipped = false;
	return obj;
};

Card.prototype.showCard = function() {
	this.flipped = true;
	this.htmlElement.className = updateElementClasses(this.htmlElement, cssClasses.flip, true);
	this.htmlElement.className = updateElementClasses(this.htmlElement, cssClasses.show, true);
};

Card.prototype.hideCard = function() {
 	this.flipped = false;
 	this.htmlElement.className = updateElementClasses(this.htmlElement, cssClasses.show, false);
 	this.htmlElement.className = updateElementClasses(this.htmlElement, cssClasses.flip, false);
};

Card.prototype.markCardCorrect = function() {
	this.correct = true;
	this.htmlElement = updateElementClasses(this.htmlElement, cssClasses.correct, true);
};


/* end of Card Class Definition */



/*
 * 1- Shuffle icons
 * 2- create array of cards & set each object with an icon
 * 3- get all HTML Cards' Objects
 * 4- Attach evenlistener on Click & attach Html object on the array
 * 5- method on the class to show/hide card based on the html object
 */

function startCardBoard() {
	// Shuffle the game board icons
	let cardsIconsArr = shuffle(CARDS_ICONS);

	let card;

	// Create a card array
	if(cardsHtmlElem != null && cardsIconsArr != null
		&& (cardsHtmlElem.length === cardsIconsArr.length)) {

		for(let i = 0; i< cardsIconsArr.length; i++) {
			// Reset any added classes
			cardsHtmlElem[i].className = `${CARD_ICON_BASE_CLASSES} ${cardsIconsArr[i]}`;
			// Create new card object
			card = new Card(cardsIconsArr[i]);
			card.htmlElement = cardsHtmlElem[i].parentElement;
			card.index = i;
			cards.push(card);

			// Add card event listener
			card.htmlElement.addEventListener('click', function() {
				if(!this.className.includes(cssClasses.show)){
					moveCounter++;
					document.getElementById('game-moves').innerHTML = moveCounter + ((moveCounter <= 1)?' Move':' Moves');
					calcualteMoveScore();
				}

				// Update card status & check matches
				if(!cards[i].correct) {
					if(!cards[i].flipped) {
						cards[i].showCard();
					}
					setTimeout(checkMatchingCards, 300, cards[i]);
				}
			});

		}

	} else {
		console.log(`Error: Icons' array empty`);
	}
};

/*
 * Add/Remove classes from an element
 */
function updateElementClasses(element, className, add) {
	if(add && !element.className.includes(className)) {
		element.className = `${element.className} ${className}`;
	} else if(!add && element.className.includes(className)) {
		element.className = element.className.replace(className, '');
	}
	return element.className;
};


/*
 * Check if the last clicked card matches the already opened one
 */
function checkMatchingCards(card) {
	let cardIcon = '';
	if(card.htmlElement.childNodes !=null && card.htmlElement.childNodes.length > 0
		&& card.htmlElement.childNodes[1].className != null) {
		cardIcon = card.htmlElement.childNodes[1].className.replace(CARD_ICON_BASE_CLASSES, '').trim();
	}


	if(lastFlippedCard != null) {
		if(lastFlippedCard.flipped && !lastFlippedCard.correct
			&& card.index != lastFlippedCard.index && card.flipped && (card.icon === lastFlippedCard.icon)) {
			card.markCardCorrect();
			lastFlippedCard.markCardCorrect();
			lastFlippedCard = null;
			checkGameCompletetion();

		} else {
			updateElementClasses(card.htmlElement, cssClasses.wrong, true);
			updateElementClasses(lastFlippedCard.htmlElement, cssClasses.wrong, true);

			window.setTimeout(function() {
				alertWrongCards(card, lastFlippedCard);
			}, 500);
		}
	} else {
		lastFlippedCard = card;
	}

};

function alertWrongCards(card, lastCard){

	card.hideCard();
	lastCard.hideCard();

	updateElementClasses(card.htmlElement, cssClasses.wrong, false);
	updateElementClasses(lastCard.htmlElement, cssClasses.wrong, false);

	lastFlippedCard = null;
}

function calcualteMoveScore() {
	console.log(`Move counts ${moveCounter}`);
	if(moveCounter > CARDS_ICONS.length) {
		updateElementClasses(document.getElementById('star1'), cssClasses.dim, true);
	}
	if(moveCounter > (CARDS_ICONS.length * 2)) {
		updateElementClasses(document.getElementById('star2'), cssClasses.dim, true);
	}
	if(moveCounter > (CARDS_ICONS.length * 3)) {
		updateElementClasses(document.getElementById('star3'), cssClasses.dim, true);
	}
}

function calculateGameTime() {
	return (new Date() - startDate)/1000;
}



function checkGameCompletetion() {
	for(card of cards) {
		if(!card.correct) {
			return false;
		}
	}
	let succesMsg = document.getElementsByClassName('success-sub-msg')[0];
	console.log(succesMsg.innerHTML);
	succesMsg.innerHTML = succesMsg.innerHTML.replace('#{move}', moveCounter).replace(
		'#{time}', calculateGameTime()).replace(
		'#{stars}', (3-document.getElementsByClassName('dim').length));

	updateElementClasses(document.getElementById('game-modal'), cssClasses.fullScreen, true);
	updateElementClasses(document.getElementById('game-success-alert'), cssClasses.fullScreen, true);

	document.getElementById('game-modal').addEventListener('click', function(){
		document.getElementById('game-modal').className
			= (document.getElementById('game-modal').className).replace(cssClasses.fullScreen, '');
		document.getElementById('game-success-alert').className
			= (document.getElementById('game-success-alert').className).replace(cssClasses.fullScreen, '');
	});

	return true;
}



startCardBoard();



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

