# Memory Game Project

## Table of Contents

* [Game Rules](#game_rules)
* [Game Technical workflow](#technical)

## Game Rules

* There are eight pairs of cards on the game board.
* Once you click on a card, it will flip & show you its icon.
* When you click on another card & after that card flips:
	* In case this card icon matches the one that was flipped earlier then both cards will turn blue.
		* ![Correct match](/img/correct_move.png)
	* In case bothe cards don't match then both cards will be flipped on their back again.
		* ![Wrong match](/img/wrong_move.png)
* Every card you flip will be considered as a move & will be incremented in the counter you see above the game board.
	* After 17 moves you will loose one star, after 33, you'll loose two stars & after 49 moves all stars will be dimmed.
* After you successfully manage to match all pairs, a success window will open showing how many moves you've done & how long have you spent.
	* ![Completed Game](/img/complete.png)
	* ![Success Message](/img/success.png)

## technical

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
