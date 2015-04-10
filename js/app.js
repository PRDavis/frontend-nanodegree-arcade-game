// variable for setting max number of Enemies
var numEnemies = 4;

// variable for setting max number of Jewels
var numJewels = 4;

//array that holds all enemy instances
var allEnemies = [];

//array that holds all Jewel instances
var allJewels = [];

// var that holds the player score
var score = 0;

// var that holds the number of lives for the player
var lives = 3;

//enemy collision flag

var enemyCollision = false;
// next power up
var moreLifeInitial = 2000;
var moreLife = 2000;

//jewel collision flag
var jewelCollision = false;

//play level
var level = 1;

//this function maps
//row number to location
//
//
function row(num) 
  {
    if (num === 1) 
      {
        return 70;
      }
    else if (num === 2) 
      {
        return 153;
      }
    else 
      {
        return 236;
      }
  }

//get x location of random column
function col(num) 
  {
    var column=(num-1)*101;
    return column;
  }

// Enemies our player must avoid

function Enemy() 
  {
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
    return;
  }

//check to see if the powerup point threshhold has been crossed
//if so, add a life and update the moreLife var
function powerUP()
  {
    if (score>=moreLife)
      {
        lives++;
        moreLife+=moreLifeInitial;
      }
  return;
  }


function jewelScore()
  {
    
    score += 150;
    powerUP();
    return;
  }

//give points for reaching the water and check if player should get a powerup
function waterScore()
  {
    score += 250;
     powerUP();
    return;
  }

//randomize the speed of the enemies
function randSpeed() 
  {
    var i =  (Math.floor(Math.random() * (200 - 30) + 30));
    return i;
  }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) 
  {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    this.ind = allEnemies.indexOf(this);
    if (this.x >= 505) 
      {
        this.x = -102;
        this.boardRow = Math.floor(Math.random() * (4 - 1)+1); //pick random row;
        this.y = row(this.boardRow); //pick random row;
        this.speed = randSpeed();

      }
    return;
  }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() 
  {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    return;
  }

//this is the player class

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
    return;
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
        if(yDist < 0 )
          {
            this.row -= 1;
          }
        else if (yDist !=0)
          {
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
                enemyCollision=true;
                player.reset();
              }
          }
      }
     
//compare player row with jewel row
// if they are the same, then see if x coords intersect

    for (var i = 0; i < allJewels.length;i++)
      {
        if (player.row === allJewels[i].boardRow)
          {
            if (allJewels[i].x > player.x -81 && allJewels[i].x < player.x+player.width -20)
              {
                jewelCollision=true;
                allJewels.splice(i,1);
                jewelScore()
              }
          }
      }
    // update canvas also
    dashboardUpdate();

    //did player make it to the water? 
    if(this.row === 0)
    {
      //go to score function
      waterScore();
      //increment enemies
      numEnemies++;
      //empty enemy array
      allEnemies.length=0;
      //respawn enemies to get increment
      spawn();  
      // empty jewel array
      allJewels.length=0;
      // spawn jewels
      jewelSpawn();
      //level up
      level++;
      //reset player
      this.reset();
    }
    return; 
  }

  Player.prototype.reset = function()
    {
      this.x=202;
      this.y=405;
      this.row=5;
      if (enemyCollision === true)
        {
          lives -- ;
        }
      enemyCollision=false;
      if(lives <=0)
        {
          //print game over add game over function
          alert("Game Over");
          location.reload();
        }
      return;
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
jewelSpawn();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) 
  {
    var allowedKeys = 
      {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };

    player.handleInput(allowedKeys[e.keyCode]);
    return;
  })




  // Jewel Class

  function Jewel() 
    {
      this.x = 0;
      this.height = 83;//enemy hieght
      this.width = 101;//enemy width
      this.boardCol = Math.floor(Math.random() * (6 - 1)+1); //pick random row;
      this.x = col(this.boardCol); //pick random row; 
      this.boardRow = Math.floor(Math.random() * (4 - 1)+1); //pick random row;
      this.y = 40+row(this.boardRow); //pick random row and adjust for size change;
      this.gemCol = Math.floor(Math.random() * (5 - 1)+1);
      this.sprite = whichJewel(this.gemCol); 
      return;
    }


  function whichJewel(num)
    {
      if (num === 1) 
        {
          var spr='images/Gem Blue.png'
          return spr;
        }
      else if (num === 2) 
        {
          var spr='images/Gem Green.png'
          return spr;
        }
        else if (num === 3) 
        {
          var spr='images/Gem Red.png'
          return spr;
        }
      else 
        {
          var spr='images/Gem Orange.png'
          return spr;
        }
    } 
 Jewel.prototype.render = function()
  {
    // var locText="x: ="+ this.x + " y: ="+ this.y;
    // ctx.fillText(locText,this.x,this.y-10);

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90,90);
    return;
  }



  function jewelSpawn()
    {
      //  set up a loop for to iterate through number of enemies
      for (var i = 0;i<numJewels;i++)
        {
          //push enemy instance into array
          allJewels.push(new Jewel());
        }
      return;
    }



  function dashboardUpdate()
    {
      ctx.font = "24px helvetica";
      ctx.fillStyle = "black";
      ctx.fillRect(5,2,400,25)
      ctx.fillStyle = "white";
      ctx.fillRect(5,2,400,25)
      ctx.fillStyle = "black";
      var scoreOutput="Score: "+score+" "+"Lives: "+lives+" "+"Level: "+level;
      ctx.fillText(scoreOutput,10,22);
      return;
    }

