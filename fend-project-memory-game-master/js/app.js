/**  Matching Game app **/


/// Variables' Section ///

// Constant to hold all pairs of cards icons' names, i.e.: fontawesome css classes
const CARDS_ICONS = ['fa-camera', 'fa-futbol-o', 'fa-anchor', 'fa-bug', 'fa-bicycle', 'fa-diamond', 'fa-twitter', 'fa-car',
'fa-camera', 'fa-futbol-o', 'fa-anchor', 'fa-bug', 'fa-bicycle', 'fa-diamond', 'fa-twitter', 'fa-car'];

// Game card base css classes, used to reset the game card icon
const CARD_ICON_BASE_CLASSES = 'fa fa-lg game-icons';

// Object to hold the css classes used accross the app
const cssClasses = {
	flip : 'flip',
	show : 'show',
	correct: 'correct',
	wrong : 'wrong',
	fullScreen : 'fullScreen',
	dim : 'dim'
};

// Counter to count every click the user does.
let moveCounter = 0;

// Tracking time by logging the gamer start time
let startDate = new Date();

// Create game cards objects' array
let cards = [];

// Retrieve all games boards cards html elements
let cardsHtmlElem = document.getElementsByClassName('game-icons');

// Retrieve all stars elements
let gameStars = document.getElementsByClassName('fa-star');

// Global variable to hold the last flipped card which will be used to match to
let lastFlippedCard;

///	End of Variables' Section ///

/**
 * @description Represents a Game Card
 * @constructor
 * @param {string} cardIcon - The icon present on the game card
 */
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


///	Functions' Section ///

/**
 * @description Initialize the game board by doing the following steps:
 * 				1- Shuffle the game cards' icons using 'shuffle' function
 *				2- Create a card array filled with game card's object
 *					- Fill each Card object with an icon
 *					- Attach the equivelant HtmlElement object
 *					- Attach onclick event on each card HtmlElement
 *						1- Increment gamer move count
 *						2- Update card flipping status, i.e. show or hide card
 *						3- In case there was an alreday flipped card then check if they match
 */
function startGameBoard() {
	let card;
	// Shuffle the game board icons
	let cardsIconsArr = shuffle(CARDS_ICONS);

	if(cardsHtmlElem != null && cardsIconsArr != null
		&& (cardsHtmlElem.length === cardsIconsArr.length)) {

		// Load the card array
		for(let i = 0; i< cardsIconsArr.length; i++) {
			// Reset any added classes & add the updated one
			cardsHtmlElem[i].className = `${CARD_ICON_BASE_CLASSES} ${cardsIconsArr[i]}`;
			// Create new card object
			card = new Card(cardsIconsArr[i]);
			card.htmlElement = cardsHtmlElem[i].parentElement;
			card.index = i;
			cards.push(card);

			// Add onclick event listener
			card.htmlElement.addEventListener('click', function() {
				/*
				 * If the card is already flipped then don't count a new move
				 * else increment the move counter & update the move value above the game deck
				 */
				if(!this.className.includes(cssClasses.show)){
					moveCounter++;
					document.getElementById('game-moves').innerHTML
						= moveCounter + ((moveCounter <= 1)?' Move':' Moves');
					calcualteMoveScore();
				}

				// Update card flipping status & check if it matches the already flipped one
				if(!cards[i].correct) {
					if(!cards[i].flipped) {
						cards[i].showCard();
					}
					// This hack was added to force execution order
					setTimeout(checkMatchingCards, 300, cards[i]);
				}
			});
		}

	} else {
		console.log(`Error: Game html cards element or/& Icons' array is empty`);
	}
}


/**
 * @description Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *	 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param {object} array - The array with items to shuffle
 */
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


/**
 * @description Track gamer card clicks,
 *       update the move count above the game deck
 *       & dims the game deck's stars accoording to the following conditions:
 *         - Dim one star if clicks are greater than 16 moves.
 *         - Dim two star if clicks are greater than 32 moves.
 *         - Dim three star if clicks are greater than 48 moves.
 *
 */
function calcualteMoveScore() {
	if(gameStars != null && gameStars.length == 3) {
		if(moveCounter > (cards.length * 3)) {
			updateElementClasses(gameStars[2], cssClasses.dim, true);
		} else if(moveCounter > (cards.length * 2)) {
			updateElementClasses(gameStars[1], cssClasses.dim, true);
		} else if(moveCounter > cards.length) {
			updateElementClasses(gameStars[0], cssClasses.dim, true);
		}
	}
}


/**
 * @description Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *	 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param {object} element - The HTML dom element that we need to update its css classes' value
 * @param {string} className - The css class name that needs to be added or removed
 * @param {boolean} add - In case a css class name needs to be added
 *                        then this value will be 'true' else use 'false' to remove it if it exists
 * @returns {string} HTML dom element updated css classes' string
 */
function updateElementClasses(element, className, add) {
	if(add && !element.className.includes(className)) {
		element.className = `${element.className} ${className}`;
	} else if(!add && element.className.includes(className)) {
		element.className = element.className.replace(className, '');
	}
	return element.className;
}


/**
 * @description Check if the given card matches the already flipped card
 * @param {object} card - An item from the 'Card' class which we need to check if it has a match
 */
function checkMatchingCards(card) {
	/*
	 * 1- Check if there already exists another flipped card
	 * 2- Check if the index of the last flipped card is not the same as the one we are trying to match
	 * 3- Check that the Game card icon is the same for the current card & the already flipped card
	 * 4- Mark both matched card as correct & change their css style class
	 * 5- Check if with this move the game has completed or not by calling function 'checkGameCompletetion'
	 * 6- In case the cards don't match then alert the user by shaking the cards & hide them both
	 */
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
			// This hack was added to force execution order
			setTimeout(function() {
				alertWrongCards(card, lastFlippedCard);
			}, 500);
		}
	} else {
		lastFlippedCard = card;
	}

}


/**
 * @description Incase cards dont match then shake the cards & hide them
 * @param {object} card - The recently clicked on game card
 * @param {object} lastCard - The last clicked on game card
 */
function alertWrongCards(card, lastCard){

	card.hideCard();
	lastCard.hideCard();

	updateElementClasses(card.htmlElement, cssClasses.wrong, false);
	updateElementClasses(lastCard.htmlElement, cssClasses.wrong, false);

	lastFlippedCard = null;
}


/**
 * @description Check if all cards are flipped & matched to display the Completion message
 * @returns {boolean} true in case all cards were matched & false otherwise
 */
function checkGameCompletetion() {
	// Check if all game cards were matched
	for(let card of cards) {
		if(!card.correct) {
			return false;
		}
	}

	// Update the success message by replacing placeholders for moves, time & stars
	let succesMsg = document.getElementsByClassName('success-sub-msg')[0];
	succesMsg.innerHTML = succesMsg.innerHTML.replace('#{move}', moveCounter).replace(
		'#{time}', calculateGameTime());


	let dimmedStars = document.getElementsByClassName('dim').length;
	if(dimmedStars > 0) {
		succesMsg.innerHTML
			= succesMsg.innerHTML.replace(
				'#{stars}', `& with ${3-dimmedStars} ${((3-dimmedStars) > 1)?'stars' : 'star' }`);
	} else {
		succesMsg.innerHTML = succesMsg.innerHTML.replace('#{stars}','');
	}

	// Maximize the success modal windows
	updateElementClasses(document.getElementById('game-modal'), cssClasses.fullScreen, true);
	updateElementClasses(document.getElementById('game-success-alert'), cssClasses.fullScreen, true);

	// Add an onclick event to hide the success modal windows when the background is clicked
	document.getElementById('game-modal').addEventListener('click', function(){
		document.getElementById('game-modal').className
			= (document.getElementById('game-modal').className).replace(cssClasses.fullScreen, '');
		document.getElementById('game-success-alert').className
			= (document.getElementById('game-success-alert').className).replace(cssClasses.fullScreen, '');
	});

	return true;
}


/**
 * @description Calculates the time in seconds between the game start & the game completion
 * @returns {number} time in seconds
 */
function calculateGameTime() {
	return (new Date() - startDate)/1000;
}


///	End of Functions' Section ///



/* Start the game board */
document.addEventListener('DOMContentLoaded',function(){
	startGameBoard();
});


