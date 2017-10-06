
/**
 * @description: Represents a game character
 */
class GameCharacter {

    /**
     * @constructor
     * @param {string} sprite - Game Character image
     */
    constructor(sprite, posX, posY) {
        this.sprite = sprite;
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * @description: Renders the game character on the canvas
     * @param {number} posX - image rendered X position
     * @param {number} posY - image rendered Y position
     */
    render(posX, posY) {
        if(typeof posX === 'number' && typeof posY === 'number'){
            try {
                ctx.drawImage(Resources.get(this.sprite), posX, posY);
            } catch(e) {
                console.log(`Unable to render image beacuse of error:  ${e}`);
            }
        }
    }

    /**
     * @description: Resets the game character position to its insitial location
     * @param {number} posX - image rendered X position
     * @param {number} posY - image rendered Y position
     */
    resetLocation(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }

}


/**
 * @description: Represents the Enemy in the game & extends the GameCharacter functionalities
 */
class Enemy extends GameCharacter{
    /**
     * @constructor
     * @param {number} posX - Enemy position X
     * @param {number} posY - Enemy position Y
     * @param {number} speed - How many moves to jump per frame
     */
    constructor(posX, posY, speed){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        super('images/enemy-bug.png', posX, posY);
        this.initialX = posX;
        this.speed = speed;
        this.initialSpeed = this.speed;
    }

    /**
     * @description: Update the enemy speed by dt factor
     */
    update(dt) {
        if(dt > 0){
            this.speed = dt + this.speed;
        }
    }


    /**
     * @description: Draws the enemy on the screen
     */
    render() {
        let updatePosX = this.posX + this.speed;
        if((typeof updatePosX === 'number') && updatePosX < 500) {
            this.posX = updatePosX;
            super.render(this.posX, this.posY);

        } else {
            if(typeof this.posY === 'number' && typeof this.initialX === 'number') {
                this.posX = this.initialX;
                this.speed = this.initialSpeed;
                super.render((typeof this.initialX === 'number')? this.initialX:1, this.posY);
            }
        }
    }
}


/**
 * @description: Represents the player in the game & extends the GameCharacter functionalities
 */
class Player extends GameCharacter{
    /**
     * @constructor
     * @param {number} posX - Player position X
     * @param {number} posY - Player position Y
     */
    constructor(posX = 200, posY = 405){
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        super('images/char-pink-girl.png', posX, posY);
        this.reachedWater = false;
        this.score = 0;
        this.winningStarTime = -1 // Flag to hold the winning star rendering
    }


    /**
     * @description: Updates the player's score
     */
    update() {
        ctx.font = 'bold 16px Comic Sans MS';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ffff00';
        ctx.fillText(`Your Score: ${this.score}`, 8, 565);
    }


    /**
     * @description: Draws the character on the screen based on the given X & Y positions
     */
    render() {
        // Draw the player
        super.render(this.posX, this.posY);

        // Check if the player collided with an enemy
        if(didPlayerCollideWithEnenmy()) {
            // Reset the player's position
            super.resetLocation(200, 405);

            // Reset player's score
            this.score = 0;
        }

        // If the player reaches the water reset the player's position & update the score
        if(didPlayerReachWater()){

            // Drawing a star to congratulation the user
            ctx.drawImage(Resources.get('images/Star.png'), 2, -1);
            this.winningStarTime = new Date();

            // Reset the player's position
            super.resetLocation(200, 405);
            this.reachedWater = false;
        }

        // Draw a star for 0.5 second to congratulate the user
        if(this.winningStarTime != -1) {
            if((new Date() - this.winningStarTime) <= 500){
                ctx.drawImage(Resources.get('images/Star.png'), 2, -1);
            } else {
                this.winningStarTime = -1;
            }
        }


        // Update score section
        this.update();
    }


    /**
     * @description: Handles the player's movement based on the user's keyboard input
     * @param {string} move - The move done by the user i.e.: up, down, right or left
     */
    handleInput(move) {
        const moveX = 101;
        const moveY = 83;

        // Based on the recieved move parameter, increase/decrease the player's position & re-render the player
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
     * @description: Check if the player can move or it will be outside the canvas boundries
     * @param {number} posX - image rendered X position
     * @param {number} posY - image rendered Y position
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
}


/**
 * @description: Checks if the player collides with an enemy or not
 * Rectangle intersection function refrenced from:
 * https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
 */
function didPlayerCollideWithEnenmy() {
    let enemyDimension = {};

    // Set player's sprite dimension
    playerDimension = {
        x: player.posX,
        y: player.posY,
        width: 50,
        height: 71
    };

    for(enemy of allEnemies) {
        // Set enemy;s sprite dimension
        enemyDimension = {
            x: enemy.posX,
            y: enemy.posY,
            width: 80,
            height: 71
        };

        // Check if player dimension intersects with enemy dimension
        if (enemyDimension.x < playerDimension.x + playerDimension.width &&
            enemyDimension.x + enemyDimension.width > playerDimension.x &&
            enemyDimension.y < playerDimension.y + playerDimension.height &&
            enemyDimension.height + enemyDimension.y > playerDimension.y) {
            return true;
        }
    }

    return false;
}


/**
 * @description: Checks if player reached water
 */
function didPlayerReachWater() {
    if(player.posY <= 1) {
        // Extra check in case the player stays in place, to avoid score increment
        if(!player.reachedWater){
            this.reachedWater = true;
            player.score++;
        }
        return true;
    }
    return false;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
        new Enemy(-80,145,5),
        new Enemy(-80,230,4),
        new Enemy(-80,65,8)
    ];



// Place the player object in a variable called player
let player = new Player();


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

