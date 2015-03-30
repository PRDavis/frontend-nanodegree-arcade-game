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
this.speed=randSpeed();
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


function randSpeed(){
  (Math.floor(Math.random() * (200 - 30)+30));
  return;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=(this.speed*dt);
if (this.x >= 505)
  {
    this.x=-102;
    //this.x=Math.random(Math.random) *(151-1)-175;
    this.y=row((Math.floor(Math.random() * (3 - 0))));
    this.speed=randSpeed();
    this.didCollide(this,player);
  }
return;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.didCollide = function(enemy, player)
  {
var foe;
    for (foe=0;foe<allEnemies.length;foe++)
      {

console.log("****************************");
console.log("here is the iterator", foe);
console.log("****************************");
console.log("here is player.leftSide :",player.leftSide);
console.log("here is allEnemies[foe].rightSide :",allEnemies[foe].rightSide);
console.log("here is player.rightSide :",player.rightSide);
console.log("here is allEnemies[foe].leftSide :",allEnemies[foe].leftSide);
console.log("here is player.topSide :",player.topSide);
console.log("here is allEnemies[foe].bottomSide :",allEnemies[foe].bottomSide);
console.log("here is player.bottomSide :",allEnemies[foe].topSide);

console.log("here is test 1 :",(player.leftSide>(allEnemies[foe].rightSide)));
console.log("here is test 2 :",(player.rightSide < (allEnemies[foe].leftSide)));
console.log("here is test 3 :",(player.topSide>=(allEnemies[foe].bottomSide)));
console.log("here is test 4 :",(player.bottomSide <=(allEnemies[foe].topSide)));


        if((player.leftSide>(allEnemies[foe].rightSide) ||
          player.rightSide < (allEnemies[foe].leftSide) ||
          player.topSide>=(allEnemies[foe].bottomSide) ||
          player.bottomSide <=(allEnemies[foe].topSide)))
                {
                enemy.collison(this,player);
                }
        return;
      }
  }


  Enemy.prototype.collison = function(enemy,player)
  {

      {
          player.reset();
          return;
      }
  }




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function()
  {
    this.x=202;
    this.y=(392);
    this.height=81;
    this.width=101;
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
    if (this.y + yDist >=-20 && this.y + yDist<=425)
      {
        this.y+=yDist;
      }
    return;
  }

  Player.prototype.reset = function()
  {
    this.x=202;
    this.y=392;
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
      player.update(0,-85);
      break;
      case 'right':
      player.update(101,0);
      break;
      case 'down':
      player.update(0,85);
      break;
      return;
    }
  }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

function timer()
  {
    spawnTimer = setTimeout(function(){empty(),2000});
    return;
  }


stopTimer = function()
  {
    clearTimeout(spawnTimer);
    return;
  }


empty=function()
  {
    return; //empty dummy function
  }

function spawn()
  {
    // console.trace();
    //  set up a loop for to iterate through number of enemies
    for (var i = 0;i<numEnemies;i++)
      {

        //call the timer function

        timer();

        //push enemy instance into array

        allEnemies.push(new Enemy());

        //call the stop timer function
        stopTimer();

        //loop

      }
return;
}

spawn();

var player =new Player();

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
