/**
 * Description: A parent class that holds similar
 * game features for all the characters in the game.
 */
class GameCharacter {

    constructor(sprite) {
        this.sprite = sprite;
    }

    render(posX, posY) {
        // console.log(`Super render called: posX ${posX}, posY ${posY}, typeof image: ${Resources.get(this.sprite)}`);
        if(typeof posX === 'number' && typeof posY === 'number'){
            try {
                ctx.drawImage(Resources.get(this.sprite), posX, posY);
            } catch(e) {
                console.log(`Error occured unable to render image: \n ${e}`);
            }
        }
    }

    /**
     * Description: Resets the character to its initial location
     */
    resetLocation(posX = 1, posY = 1){
        this.posX = posX;
        this.posY = posY;
    }

}


/**
 * Description: Enemies our player must avoid
 */
class Enemy extends GameCharacter{
    // Class constructor
    constructor(posX, posY, speed){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        super('images/enemy-bug.png');
        this.posX = posX;
        this.posY = posY;
        this.initialX = posX;
        this.speed = speed;
        this.initialSpeed = this.speed;
        console.log(`Speed set at constructor: ${this.speed} & that sent as param: ${speed} posX: ${this.posX}`);
    }


    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(dt > 0){
            this.speed = dt + this.speed;
        }
    }


    // Draw the enemy on the screen, required method for game
    render() {
        let updatePosX = this.posX + this.speed;
        if((typeof updatePosX === 'number') && updatePosX < 500) {
            this.posX = updatePosX;
            super.render(this.posX, this.posY);

        } else {
            console.log(`location reset: ${this.initialX}`);
            if(typeof this.posY === 'number' && typeof this.initialX === 'number') {
                this.posX = this.initialX;
                this.speed = this.initialSpeed;
                super.render((typeof this.initialX === 'number')?this.initialX:1, this.posY);
            }
        }
    }



    resetLocation() {
        super.resetLocation(this.initialX, this.posY);
    }

}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/**
 * Description: The game Player
 */
class Player extends GameCharacter{


    // Class constructor
    constructor(posX = 200, posY = 405){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        super('images/char-pink-girl.png');
        this.posX = posX;
        this.posY = posY;

    }


    update() {

    }

    /**
     * Description: Draws the character on the screen based on the given X & Y positions
     */
    render() {
        super.render(this.posX, this.posY);
        didPlayerCollideWithEnenmy();
    }

    /**
     * Description: Handles the player movement based on user's keyboard input
     * @param - {string} The move done by the user, i.e.: up, down, right or left
     */
    handleInput(move) {
        const moveX = 101;
        const moveY = 83;

        switch(move) {
            case 'left':
                if(this.allowMove((this.posX-moveX), this.posY)){
                    this.posX=(this.posX-moveX);
                    super.render(this.posX, this.posY);
                }
                break;
            case 'up':
                if(this.allowMove(this.posX, (this.posY-moveY))){
                    this.posY=(this.posY-moveY);
                    super.render(this.posX, this.posY);
                }
                break;
            case 'right':
                if(this.allowMove((this.posX+moveX), this.posY)){
                    this.posX=(this.posX+moveX);
                    super.render(this.posX, this.posY);
                }
                break;
            case 'down':
                if(this.allowMove(this.posX, (this.posY+moveY))){
                    this.posY=(this.posY+moveY);
                    super.render(this.posX, this.posY);
                }
                break;
        }
    }

    /**
     * Description: check if the player can move or it will be outside the canvas boundries
     * @param:
     */
    allowMove(posX, posY){
        if(posX >= 500 || posX <= -3) {
            return false;
        }
        if(posY >= 488 || posY <= -11) {
            return false;
        }
        return true;
    }

    /**
     * Description: Resets the player to its initial location
     */
    resetLocation(){
        console.log(`Player location reset`);
        super.resetLocation(200, 405);
    }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
        new Enemy(-80,60,5),
        new Enemy(-80,145,3),
        new Enemy(-80,220,7),
        new Enemy(-80,60,10)
    ];

// Place the player object in a variable called player
let player = new Player();


/**
 * Description: checks if the player hits an enemy or not
 * refrence: https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
 */
function didPlayerCollideWithEnenmy() {
    let enemyDimension = {},
        playerDimension = {};

    for(enemy of allEnemies) {
        enemyDimension = {
            x: enemy.posX,
            y: enemy.posY,
            width: 101,
            height: 71
        };

        playerDimension = {
            x: player.posX,
            y: player.posY,
            width: 77,
            height: 83
        };
        console.log(`Enemy rectangle:
            X: ${enemyDimension.x}, ${enemyDimension.x + enemyDimension.width}
            Y: ${enemyDimension.y}, ${enemyDimension.y + enemyDimension.height}
            Player rectangle:
            X: ${playerDimension.x}, ${playerDimension.x + playerDimension.width}
            Y: ${playerDimension.y}, ${playerDimension.y + playerDimension.height}`);

        if (enemyDimension.x < playerDimension.x + playerDimension.width &&
            enemyDimension.x + enemyDimension.width > playerDimension.x &&
            enemyDimension.y < playerDimension.y + playerDimension.height &&
            enemyDimension.height + enemyDimension.y > playerDimension.y) {

            console.log(`Player collided with Enemy`);
            player.resetLocation();
            return true;

        }
    }

    return false;
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

