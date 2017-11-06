var speed = Math.random();
var X_START = 202;
var Y_START = 415;

// *enemy variables
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 63; //  changes here made the collisions more accurate; bug has to touch player
    this.width = 50;  //  changes here made the collisions more accurate; bug has to touch player
};

// *updates for enemy positions
Enemy.prototype.update = function(dt) {
    if (this.x < ctx.canvas.width) {
        this.x += (this.speed * dt);
    } else {
        this.x = 0;
        this.x += (this.speed * dt);
    }
};

// *enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var Player = function(x, y) {
    this.height = 83;
    this.width = 70;
    this.sprite = 'images/char-horn-girl.png';
    this.x = X_START;
    this.y = Y_START;
    this.lives = 3;
    this.score = 0;
    this.gameOver = false;
    this.gameWon = false;
};
Player.prototype.reset = function() {
    this.x = X_START;
    this.y = Y_START;
};
Player.prototype.handleInput = function(allowedKeys) {
    switch (allowedKeys) {
        case 'left':
            if (this.x > this.width) {
                this.x -= 101;
            }
            if (this.y === 0) {
                this.reset();
            }
            break;
        case 'right':
            if (this.x + 101 < 505 - this.width) {
                this.x += 101;
            }
            if (this.y === 0){
                this.reset();
            }
            break;
        case 'up':
            if (this.y > this.height) {
                this.y -= 83;
            } else if (this.y === this.height) {
                this.y = 0;
                this.score += 100;
                document.getElementById("myScoreDivId").innerHTML=player.score;
            } else {
                this.reset();
                }
            break;
        case 'down':
            if (this.y < (498 - this.height) && this.y !== 0) {
                this.y += 83;
            }
            if (this.y === 0){
                this.reset();
            }
            break;
    }
};
Player.prototype.collision = function() {
    if (this.lives > 1) {
        this.lives -= 1;
        this.reset();
    } else {
        this.lives = 0;
        this.reset();
    }
    document.getElementById("myLivesDivId").innerHTML=this.lives;
};
Player.prototype.won = function() {
    this.gameWon = true;
    this.x = -200;
    document.getElementById("myResultDivId").innerHTML='Cat catches Mouse! You WIN congratulations!!! Reload to play again';
    ;
};
Player.prototype.over = function() {
    this.gameOver = true;
    this.x = -200;
    document.getElementById("myResultDivId").innerHTML='Mouse outsmarts Cat! You LOSE Please reload the game and try again';  //changed to show what to do when player loses
;
};
Player.prototype.update = function () {
    if (this.score === 500) {
        this.won();
    }
    if (this.lives === 0 ) {
        this.over();
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// *the classes
var Star = function(x, y) {
    "use strict";
    this.height = 83;
    this.width = 70;
    this.x = Math.floor(Math.random() * (505 - this.width));
    this.y = Math.floor(Math.random() * (332 - this.height));
    this.sprite = 'images/Star.png';
};
Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Star.prototype.move = function(x, y) {
    if (this.x < ctx.canvas.height) {
        this.x -= 101;
   } else {
        this.x += 101;
    }
};
Star.prototype.reset = function(x, y) {
    this.x = this.x;
    this.y = this.y;
    this.sprite = 'images/Star.png';
};

var Rock = function(x, y) {
    "use strict";
    this.height = 83;
    this.width = 70;
    this.x = Math.floor(Math.random() * (505 - this.width));
    this.y = Math.floor(Math.random() * (332 - this.height));
    this.sprite = 'images/Rock.png';
};
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Rock.prototype.move = function(x, y) {
    if (this.x < ctx.canvas.height) {
        this.x -= 101;
   } else {
        this.x += 101;
    }
};
Rock.prototype.reset = function(x, y) {
    this.x = this.x;
    this.y = this.y;
    this.sprite = 'images/Rock.png';
};

// *variable to save the mouse
var Mouse = function(x, y) {
    this.x = 202;
    this.y = 200;
    this.sprite = 'images/mouse.png';
};
Mouse.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var allEnemies = [];
for (var i = 1; i < 4; i++) {
    allEnemies.push(new Enemy(this.x, (i * 83) - 20, this.speed * 100 * i));
}

// *variables
var player = new Player();
var star = new Star();
var mouse = new Mouse();
var rock = new Rock();

// *Checking collisons with the star
Star.prototype.update = function() {
    "use strict";
    this.checkCollision();
};

Star.prototype.checkCollision = function() {
    var playerIcon = {x: player.x, y: player.y, width: 70, height: 83};
    var starIcon = {x: this.x, y: this.y, width: 70, height: 83};
    if (playerIcon.x < starIcon.x + starIcon.width &&
        playerIcon.x + playerIcon.width > starIcon.x &&
        playerIcon.y < starIcon.y + starIcon.height &&
        playerIcon.height + playerIcon.y > starIcon.y) {
        this.collisionDetected();
    }
};

Star.prototype.collisionDetected = function() {
    "use strict";
    this.x = 900;
    this.y = 900;
};

// *Checking collisons with the rock
Rock.prototype.update = function() {
    "use strict";
    this.checkCollision();
};

Rock.prototype.checkCollision = function() {
    var playersIcon = {x: player.x, y: player.y, width: 70, height: 83};
    var rockIcon = {x: this.x, y: this.y, width: 70, height: 83};
    if (playersIcon.x < rockIcon.x + rockIcon.width &&
        playersIcon.x + playersIcon.width > rockIcon.x &&
        playersIcon.y < rockIcon.y + rockIcon.height &&
        playersIcon.height + playersIcon.y > rockIcon.y) {
        this.collisionDetected();
    }
};

Rock.prototype.collisionDetected = function() {
    "use strict";
    this.x = 900;
    this.y = 900;
};


// *player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
document.body.style.backgroundColor = '#0000ff';
