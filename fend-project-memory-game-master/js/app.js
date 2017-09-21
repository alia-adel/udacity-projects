/*
 * Create a list that holds all of your cards
 */

let cardsIcons = ['fa-camera', 'fa-futbol-o', 'fa-anchor', 'fa-bug', 'fa-bicycle', 'fa-diamond', 'fa-twitter', 'fa-car',
'fa-camera', 'fa-futbol-o', 'fa-anchor', 'fa-bug', 'fa-bicycle', 'fa-diamond', 'fa-twitter', 'fa-car'];

let cardIconBaseClasses = 'fa fa-lg game-icons';

let moveCounter = 0;

let startRating = 0;

let startDate = new Date();

let cssClasses = {
	flip : 'flip',
	show : 'show',
	correct: 'correct'
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
	console.log(`Adding flip class`);
	this.htmlElement.className = this.updateCardClasses(cssClasses.flip, true);
	console.log(`Adding show class`);
	//TODO fix the following line for proper card flip
	// this.htmlElement = setTimeout(this.updateCardClasses, 500, cssClasses.show, true);
	this.htmlElement.className = this.updateCardClasses(cssClasses.show, true);
};

Card.prototype.hideCard = function() {
 	this.flipped = false;
 	this.htmlElement.className = this.updateCardClasses(cssClasses.show, false);
 	this.htmlElement.className = this.updateCardClasses(cssClasses.flip, false);
};

Card.prototype.markCardCorrect = function() {
	this.correct = true;
	this.htmlElement = this.updateCardClasses(cssClasses.correct, true);
};

Card.prototype.updateCardClasses = function(className, add) {
	console.log(`Updating classes for card with index: ${this.index}`);
	if(add && !this.htmlElement.className.includes(className)) {
		this.htmlElement.className = `${this.htmlElement.className} ${className}`;
	} else if(!add && this.htmlElement.className.includes(className)) {
		console.log(`removing ${className} from card with index ${this.index}
			which had css class ${this.htmlElement.className}`);
		this.htmlElement.className = this.htmlElement.className.replace(className, '');
		console.log(`element after css classes removal:
			${this.htmlElement.className}`);
	}
	return this.htmlElement.className;
};


/* end of Card Class Definition */

// Create cards objects' array
let cards = [];


// Retrieve all games boards cards html elements
let cardsHtmlElem = document.getElementsByClassName('game-icons');

/*
 * 1- Shuffle icons
 * 2- create array of cards & set each object with an icon
 * 3- get all HTML Cards' Objects
 * 4- Attach evenlistener on Click & attach Html object on the array
 * 5- method on the class to show/hide card based on the html object
 */

function startCardBoard() {
	// Shuffle the game board icons
	let cardsIconsArr = shuffle(cardsIcons);

	let card;

	// Create a card array
	if(cardsHtmlElem != null && cardsIconsArr != null
		&& (cardsHtmlElem.length === cardsIconsArr.length)) {

		for(let i = 0; i< cardsIconsArr.length; i++) {
			// Reset any added classes
			cardsHtmlElem[i].className = `${cardIconBaseClasses} ${cardsIconsArr[i]}`;
			// Create new card object
			card = new Card(cardsIconsArr[i]);
			card.htmlElement = cardsHtmlElem[i].parentElement;
			card.index = i;
			cards.push(card);

			// Add card event listener
			card.htmlElement.addEventListener('click', function() {
				if(!this.className.includes(cssClasses.show)){
					moveCounter++;
					document.getElementById('game-moves').innerHTML = moveCounter;
				}

				// Update card status & check matches
				if(!cards[i].correct) {
					if(!cards[i].flipped) {
						cards[i].showCard();
					}
					checkMatchingCards(cards[i]);
				}
			});

		}

	} else {
		console.log(`Error: Icons' array empty`);
	}
};





/*
 * Check if the last clicked card matches the already opened one
 */
function checkMatchingCards(card) {
	console.log(`Checking card ${card.index} for matches`);
	let cardIcon = '';
	if(card.htmlElement.childNodes !=null && card.htmlElement.childNodes.length > 0
		&& card.htmlElement.childNodes[1].className != null) {
		cardIcon = card.htmlElement.childNodes[1].className.replace(cardIconBaseClasses, '').trim();
		console.log(`Card ${card.index} current icon is: ${cardIcon}`);
	}


	if(lastFlippedCard != null) {
		if(lastFlippedCard.flipped && !lastFlippedCard.correct
			&& card.index != lastFlippedCard.index && (card.icon === lastFlippedCard.icon)) {

			console.log(`Found another flipped card with index: ${lastFlippedCard.index}`);
			console.log(`Cards comparison success`);
			card.markCardCorrect();
			lastFlippedCard.markCardCorrect();
			lastFlippedCard = null;
			checkGameCompletetion();

		} else {
			console.log(`Cards didn't match so flipping cards back.`);
			card.hideCard();
			lastFlippedCard.hideCard();

			console.log(`Card with index ${card.index} has css classes ${card.htmlElement.className}
				&& its flipping status is ${card.flipped}
				as for the last flipped card with index ${lastFlippedCard.index} has css classes ${lastFlippedCard.htmlElement.className}
				&& its flipping status is ${lastFlippedCard.flipped}`);
			lastFlippedCard = null;
		}
	} else {
		lastFlippedCard = card;
	}

};



function checkGameCompletetion() {
	for(card of cards) {
		if(!card.correct) {
			return false;
		}
	}
	alert(`You have successfully completed the game in ${calculateGameTime()/1000} seconds!`);
	return true;
}

function calculateGameTime() {
	return new Date() - startDate;
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

