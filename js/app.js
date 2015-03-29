// variable for setting max number of Enemies

var numEnemies=4;

//array that holds all enemy instances
var allEnemies[];

// Enemies our player must avoid

function Enemy(){}
this.x=0;
this.y=row((Math.floor(Math.random() * (3-0)))); pick random row;
this.height=81;//enemy hieght
this.width;//enemy width
this.speed=(Math.floor(Math.random() * (200 - 30)+30));
this.sprite = 'images/enemy-bug.png';
this.leftSide=x;
this.rightSide=x+this.width;
this.topSide=this.y;
this.bottomSide=this.y+this.height;

//
//this function maps
//row number to location
//
//
function row(num)
  {
    if (num==0)
    {
      return 58;
    }
    else if(num==1)
    {
      return 140
    }
    else return 224;
  }
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
