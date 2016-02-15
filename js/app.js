
/*
  This function would generate new positions
  for enemies, and return a new position
*/
function newPostion ()
{
   Ys = [220, 145, 50];
   x = Math.floor(Math.random()*(-500)-101);
   y = Ys[Math.floor(Math.random()*3)];
   return [x, y];
}



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    postion = newPostion();
    this.x = postion[0];
    this.y = postion[1];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If the enemy still in canvas just chage its postion
    // else generate a new postion
    if(this.x<505)
    {
        this.x += (200*dt + score);
    }
    else
    {
        postion = newPostion();
        this.x = postion[0];
        this.y = postion[1];
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function()
{
    var sprites = [
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-pink-girl.png',
        'images/char-boy.png',
        'images/char-princess-girl.png'
    ];

    this.sprite = sprites[Math.floor(Math.random()*sprites.length)];
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key)
{
    if(key =='left')
    {
        this.x -= 100;
    }
    else if(key == 'up'){
        this.y -= 85;
    }
    else if(key == 'right'){
        this.x += 100;
    }
    else if(key == 'down'){
        this.y += 85;
    }
};

Player.prototype.update = function(){

    // if player reaches the water reset player to starting point
    if(this.y < 1)
    {
        this.reset();
        score += 1;
    }
    // Stop player from moving down when at bottom of canvas
    else if(this.y > 400)
    {
            this.y -= 85;
    }
    // Stop player from moving left when at left end of canvas
    else if(this.x < 0)
    {
            this.x += 100;
    }
    // Stop player from moving Right when at Right end of canvas
    else if(this.x > 400)
    {
            this.x -= 100;
    }

    // Detect collision with enemies
    for(var enemy in allEnemies){
        if (Math.abs(this.y - allEnemies[enemy].y) <= 83 &&
            Math.abs(this.x - allEnemies[enemy].x) <= 101)
        {
            this.reset();
            deaths += 1;
        }
    }

    //Update Score Value
    document.getElementById('score').value = score;
    //Update deaths Value
    document.getElementById('deaths').value = deaths;
};

Player.prototype.reset = function()
{
   this.x = 200;
   this.y = 400;
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(i=0; i<3; i++)
{
    allEnemies.push(new Enemy());
}
var player = new Player();
var score = 0;
var deaths = 0;


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
