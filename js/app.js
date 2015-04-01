// variable for setting max number of Enemies

var numEnemies = 4;

//array that holds all enemy instances
var allEnemies = [];


//
//this function maps
//row number to location
//
//
function row(num) {
  if (num === 1) {
    return 70;
  }
  else if (num === 2) {
    return 153;
  }
    else {
      return 236;
    }
}

// Enemies our player must avoid

function Enemy() {
  this.x = 0;


  this.height = 83;//enemy hieght
  this.width = 101;//enemy width
  this.boardRow = Math.floor(Math.random() * (4 - 1)+1); //pick random row;
  this.y = row(this.boardRow); //pick random row;
  this.speed = randSpeed();
  this.sprite = 'images/enemy-bug.png';
  this.sprite.text = "here";
  this.leftSide = this.x;
  this.rightSide = this.x + this.width;
  this.topSide = this.y;
  this.bottomSide = this.y + this.height;
  this.ind = allEnemies.indexOf(this);
}

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images




function randSpeed() {
  var i =  (Math.floor(Math.random() * (200 - 30) + 30));
  return i;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  this.x += (this.speed * dt);
  this.ind = allEnemies.indexOf(this);
  if (this.x >= 505) {
    this.x = -102;
    //this.x=Math.random(Math.random) *(151-1)-175;
      this.boardRow = Math.floor(Math.random() * (4 - 1)+1); //pick random row;
  this.y = row(this.boardRow); //pick random row;
    this.speed = randSpeed();

  }
  return;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}






// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function()
  {
    this.x=202;
    this.y=405;
    this.height=83;
    this.width=101;
    this.row=5;
    this.sprite = 'images/char-boy.png';
    this.leftSide=this.x
    this.rightSide=this.x + this.width;
    this.topSide= this.y
    this.bottomSide = this.y + this.height;

  }

  Player.prototype.update = function(xDist,yDist)
  {
    //check position to make sure on canvas
    if (this.x + xDist >=0 && this.x +xDist <=404)
      {
        this.x+=xDist;
      }
    if (this.y + yDist >=-23 && this.y + yDist<=425)
      {
        this.y += yDist;
        if(yDist < 0 ){
          this.row -= 1;
        }else if (yDist !=0){
          this.row += 1;
      }

  }
// code to check for collision goes here

//compare player row with enemy row
// if they are the same, then see if x coords intersect

for (var i = 0; i < allEnemies.length;i++)
  {
    if (player.row === allEnemies[i].boardRow)
      {
        if (allEnemies[i].x > player.x -81 && allEnemies[i].x < player.x+player.width -20)
        {
          player.reset();
        }
      }
  }
    return;  
}

  Player.prototype.reset = function()
  {
    this.x=202;
    this.y=405;
    this.row=5;
  }

  Player.prototype.render = function()
  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    return;
  }


  Player.prototype.handleInput = function(keyCode)
  {

    switch (keyCode)
    {
      case 'left':
      player.update(-101,0);
      break;
      case 'up':
      player.update(0,-83);
      break;
      case 'right':
      player.update(101,0);
      break;
      case 'down':
      player.update(0,83);
      break;
      return;
    }
  }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function spawn()
  {
    //  set up a loop for to iterate through number of enemies
    for (var i = 0;i<numEnemies;i++)
      {
        //push enemy instance into array

        allEnemies.push(new Enemy());
      }
return;
}



var player =new Player();

spawn();

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
