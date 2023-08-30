// ------------------------------------------------ PACMAN  ------------------------------------------------ 
// Pacman's first move
var pacmanPos = { x: 13, y: 23 }; 
// Define direction constants
const DIRECTION = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
  };
  
  // Set the initial direction
  var currentDirection = DIRECTION.LEFT;
  var nextDirection = null;
  // A flag that detects if there is an initial key pressed by the user
  var hasInitialKeyPress = false;
  // Pacman is paused / stopped by default
  var isPacmanStopped = false;
  

/*
IMPORTANT:


Right: 
  Moving "right" means increasing the X-coordinate value.
  So, if you have a point at coordinates (x, y), 
  moving right from that point would result in the new coordinates 
  being (x + 1, y).

Left: 
  Moving "left" means decreasing the X-coordinate value. 
  If you have a point at coordinates (x, y), 
  moving left from that point would result in the new coordinates 
  being (x - 1, y).

Up: 
  In a Cartesian coordinate system, moving "up" 
  means decreasing the Y-coordinate value.
  For example, if you have a point at coordinates (x, y), 
  moving up from that point would result in the new coordinates 
  being (x, y - 1).

Down: 
  Conversely, moving "down" 
  means increasing the Y-coordinate value. 
  So, if you have a point at coordinates (x, y), 
  moving down from that point would result in the new coordinates 
  being (x, y + 1).
*/
function moveRight() 
{
  // Right to left tunnel corridor
  if(pacmanPos.x === 27 && pacmanPos.y === 14) 
  {
    const newPos = { x: 0, y: 14 };
    return newPos;
  }
  else 
  {
    const newPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
    return newPos;
 }
}//moveRight() 

function moveLeft() 
{
  // Left to right tunnel corridor
  if(pacmanPos.x === 0 && pacmanPos.y === 14) 
  {
    const newPos = { x: 27, y: 14 };
    return newPos;
  }
  else
  {
    const newPos = { x: pacmanPos.x - 1, y: pacmanPos.y }; 
    return newPos;
  }
}//moveLeft() 

function moveUp() 
{
  const newPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
  return newPos;
}//moveUp() 

function moveDown() 
{
  const newPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
  return newPos;
}//moveDown() 


// Function to update Pacman's position 
// by inserting the PacMan spritesheet correctly within maze corridors
function update_pacManPos() 
{
  const cell_size = 8; // the size of each grid cell is 8x8
  const pacman_size = 15; // the size of the Pacman sprite-emoji is 15x15

  // Calculate the centering offsets
  const x_offset = (cell_size - pacman_size) / 2;
  const y_offset = (cell_size - pacman_size) / 2; 

  // Calculate the adjusted / translated position
  x_translate = pacmanPos.x * cell_size + x_offset;
  y_translate = pacmanPos.y * cell_size + y_offset;

  // Set the position of Pacman 
  pacManEmoji.style.transform = `translate(${x_translate}px, ${y_translate}px)`;

  // Rotate/Modify the style properties of Pacman's emoji/face based on movement direction
  if (currentDirection === DIRECTION.RIGHT) 
  {
    pacManEmoji.style.transform += "scaleY(-1)";
  } 
  else if (currentDirection === DIRECTION.LEFT) 
  {
    pacManEmoji.style.transform += "scaleX(-1)";
  }
  else if (currentDirection === DIRECTION.UP) 
  {
    pacManEmoji.style.transform += "rotate(-90deg)";
  } 
  else if (currentDirection === DIRECTION.DOWN) 
  {
    pacManEmoji.style.transform += "rotate(90deg)";
  }   
}//update_pacManPos() 


// A function that is responsible for Pacman movement engine
function movePacman() 
{
  if (isPaused === true) 
  {
    return;
  }// if (isPaused === true) 
  else
  {
    previousPacmanPos = { x: pacmanPos.x, y: pacmanPos.y };
    //console.log("previousPacmanPos: ", JSON.stringify(previousPacmanPos));
  
    if(!isReady)
    {
      // Pacman's coordinates
      const pacmanX = (pacmanPos.x);
      const pacmanY = (pacmanPos.y);
      // Red ghost coordinates
      const ghostRX = Math.floor(redGhost.left / 8);
      const ghostRY = Math.floor(redGhost.top / 8);
      // Pink ghost coordinates
      const ghostPX = Math.floor(pinkGhost.left / 8);
      const ghostPY = Math.floor(pinkGhost.top / 8);
      // Blue ghost coordinates
      const ghostBX = Math.floor(blueGhost.left / 8);
      const ghostBY = Math.floor(blueGhost.top / 8);
      // Orange ghost coordinates
      const ghostOX = Math.floor(orangeGhost.left / 8);
      const ghostOY = Math.floor(orangeGhost.top / 8);
      
      // Detect if the coordinates of Pacman and any of the three ghosts are the same i.e. collision occurs
      if(
        (pacmanX === ghostRX && pacmanY === ghostRY) //0
        || 
        (pacmanX === ghostRX && pacmanY - 1 === ghostRY) //1
        ||
        (pacmanX - 1 === ghostRX && pacmanY === ghostRY) //2
        || 
        (pacmanX === ghostRX && pacmanY  === ghostRY - 1) //3
        ||
        (pacmanX  === ghostRX - 1 && pacmanY === ghostRY))  //4
      {
        //console.log("movePacman:Pacman and red ghost.");
    
         // Detect the specific collision
        // Set the flag to true that indicates with which ghost Pacman just collided
        collision_PnRG = true;
        // Pause movement
        isRedGhostStopped = true;
        isPacmanStopped = true;

        if(isGhostFreezed === true)
        {
          //console.log("movePacman: 185 collisionF");
          collisionF();
        }
        else if(isGhostFreezed === false && collision_PnRG === true)
        {
          //console.log("movePacman: 190 collision");
          collision();
        }
      }
      else if(
      (pacmanX === ghostPX && pacmanY === ghostPY) //0
      || 
      (pacmanX === ghostPX && pacmanY - 1 === ghostPY) //1
      ||
      (pacmanX - 1 === ghostPX && pacmanY === ghostPY) //2
      || 
      (pacmanX === ghostPX && pacmanY  === ghostPY - 1) //3
      ||
      (pacmanX  === ghostPX - 1 && pacmanY === ghostPY)) //4
      {
        //console.log("movePacman:Pacman and pink ghost.");
    
         // Detect the specific collision
        // Set the flag to true that indicates with which ghost Pacman just collided
        collision_PnPG = true;
        // Pause movement
        isPinkGhostStopped = true;
        isPacmanStopped = true;
     
        if(isGhostFreezed2 === true)
        {
          //console.log("movePacman: 216 collisionF");
          collisionF();
        }
        else if(isGhostFreezed2 === false && collision_PnPG === true)
        {
          //console.log("movePacman: 221 collision");
          collision();
        }
      }
      else if (
      (pacmanX === ghostBX && pacmanY === ghostBY) //0
      || 
      (pacmanX === ghostBX && pacmanY - 1 === ghostBY) //1
      ||
      (pacmanX - 1 === ghostBX && pacmanY === ghostBY) //2
      || 
      (pacmanX === ghostBX && pacmanY  === ghostBY - 1) //3
      ||
      (pacmanX  === ghostBX - 1 && pacmanY === ghostBY))  //4
      {
       // console.log("movePacman:Pacman and blue ghost.");
    
        // Detect the specific collision
        // Set the flag to true that indicates with which ghost Pacman just collided
        collision_PnBG = true;
        // Pause movement
        isBlueGhostStopped = true;
        isPacmanStopped = true;
        
        if(isGhostFreezed3 === true)
        {
          //console.log("movePacman: 247 collisionF");
          collisionF();
        }
        else if(isGhostFreezed3 === false && collision_PnBG === true)
        {
         // console.log("movePacman: 252 collision");
          collision();
        }
      }
      else if (
        (pacmanX === ghostOX && pacmanY === ghostOY) //0
        || 
        (pacmanX === ghostOX && pacmanY - 1 === ghostOY) //1
        ||
        (pacmanX - 1 === ghostOX && pacmanY === ghostOY) //2
        || 
        (pacmanX === ghostOX && pacmanY  === ghostOY - 1) //3
        ||
        (pacmanX  === ghostOX - 1 && pacmanY === ghostOY)) //4
      {
        //console.log("Pacman and orange ghost.");
    
         // Detect the specific collision
        // Set the flag to true that indicates with which ghost Pacman just collided
        collision_PnOG = true;
        // Pause movement
        isOrangeGhostStopped = true;
        isPacmanStopped = true;
        
        if(isGhostFreezed4 === true)
        {
          //console.log("movePacman: 278 collisionF");
          collisionF();
        }
        else if(isGhostFreezed4 === false && collision_PnOG === true)
        {
          //console.log("movePacman: 283 collision");
          collision();
        }
      }

  // The engine of moving Pacman

      // Determine the next position of Pacman based on the current direction
      if(isPacmanStopped === false)
      {    
        var nextPos;

        if (currentDirection === DIRECTION.UP) 
        {
          nextPos = moveUp();
        } 
        else if (currentDirection === DIRECTION.DOWN) 
        {
          nextPos = moveDown();
        } 
        else if (currentDirection === DIRECTION.LEFT) 
        {
          nextPos = moveLeft();
        } 
        else if (currentDirection === DIRECTION.RIGHT) 
        {
          nextPos = moveRight();
        }
        
        // Check if the next position is allowed
        if (!isPaused && isallowedStep(nextPos)) // If it is allowed, Pacman keeps moving, eating and updating his position
        {
          eatingInterval = eatingMoods(); 
          pacmanPos = nextPos;
          update_pacManPos();
          
          // Check if Pacman has eaten the cherry
          if (cherryDisplayed !== false)
          {
            //console.log("Cherry is somewhere in the maze!");
            checkCherryEaten(); 
          }
          else if(cherryDisplayed === false)
          {
            //console.log("Cherry is still NOT shown! ");
          }
        } 
        else // If it is not allowed, Pacman stop his movement
        {
          // Stop automatic movement
          clearInterval(autoMoveInterval);
          autoMoveInterval = null;
        }
      } //if(isPacmanStopped === false)
    }// if(!isReady)
  } // if (isPaused === false) 
}// movePacman()

// Function that gets the information about the indices of the the next position of Pacman 
function getNextPos(direction) 
{
  let nextPos;
  if (direction === DIRECTION.UP) 
  {
    nextPos = moveUp();
  } 
  else if (direction === DIRECTION.DOWN) 
  {
    nextPos = moveDown();
  } 
  else if (direction === DIRECTION.LEFT)
  {
    nextPos = moveLeft();
  } 
  else if (direction === DIRECTION.RIGHT) 
  {
    nextPos = moveRight();
  }
  return nextPos;
}//getNextPos(direction) 

// Listen what the user i.e. player will pressed as an arrow key button while playing the game
document.addEventListener("keydown",function (event) 
                                    {
                                      const key = event.key;

                                      if (!isPaused)
                                      {
                                        // Save the user's input as the next direction
                                        if (key === "ArrowUp") 
                                        {
                                          nextDirection = DIRECTION.UP;
                                        } 
                                        else if (key === "ArrowDown") 
                                        {
                                          nextDirection = DIRECTION.DOWN;
                                        } 
                                        else if (key === "ArrowLeft") 
                                        {
                                          nextDirection = DIRECTION.LEFT;
                                        } 
                                        else if (key === "ArrowRight") 
                                        {
                                          nextDirection = DIRECTION.RIGHT;
                                        }
                                      }

                                      // If Pacman is not currently moving automatically, start the automatic movement
                                      if (!autoMoveInterval && !isPaused && !isReady)// !isReady is a must, otherwise, if we press left arrow key the Pacman will eat the leftmost standing pellet before the game starts, which will be incorrect
                                      {
                                        autoMoveInterval = setInterval(
                                                                        function () 
                                                                        {
                                                                          // Check if we should stop the game, 
                                                                          // if Pacman ate all of the pellets and power pellets
                                                                          //  if(countEatenGazers === 0 && countEatenPellets === 8 ) //testing purposes
                                                                          if(countEatenGazers === 4 && countEatenPellets === 240 ) // original 
                                                                          {
                                                                            // alert("WINNER!");
                                                                            pacmanWinner = true;
                                                                            pacmanDead = false;
                                                                            endGame();
                                                                          }

                                                                          if (nextDirection) 
                                                                          {
                                                                            // Get next position and calculate its indices 
                                                                            const nextPos = getNextPos(nextDirection);
                                                                            
                                                                            // Check if the next direction is valid
                                                                            if (isallowedStep(nextPos)) 
                                                                            {
                                                                              // if next direction is valid,
                                                                              // save next direction as a current direction
                                                                              // and clear next direction content for later
                                                                              currentDirection = nextDirection;
                                                                              nextDirection = null;
                                                                            }
                                                                          }
                                                                          // Pacman keeps moving, eating and updating his position
                                                                          movePacman();
                                                                        }// function ()
                                                                        ,100 // The general speed of Pacman in the corridors 
                                                                      );
                                      }

                                      // Set the current direction if the user presses a key at the very beginning
                                      if (!hasInitialKeyPress && !isPaused && isReady) // while isReady label is shown on screen 
                                      {
                                          hasInitialKeyPress = true;
                                          if (key === "ArrowRight") 
                                          {
                                            currentDirection = DIRECTION.RIGHT;
                                          }
                                      }
                                      event.preventDefault();
                                    }
                          );

// Function to check if Pacman is moving by comparing the current with the previous indices
function isPacmanMoving() 
{
  return (
      pacmanPos.x !== previousPacmanPos.x ||
      pacmanPos.y !== previousPacmanPos.y
  );
}//isPacmanMoving() 



//---------------------- PACMAN animations----------------------

// Define the three Pacman images of eating moods
const allEatingMoods = [ //allEatingMoods.length is 3
  "pacman",
  "pacman2",
  "pacman0"
];
var eatingInterval;
var indx_mood = 0;

// Function that changes all of three Pacman eating faces
function eatingMoods() 
{
  // Change the mood index by incrementing it 
  indx_mood = (indx_mood + 1) % allEatingMoods.length; 
  // Moods:
    // if indx_mood = 0, 
      // we have: 0 + 1 % 3 = 1 % 3 = 1
    // if indx_mood = 1,
      // we have: 1 + 1 % 3 = 2 % 3 = 2
    // if indx_mood = 2,
      // we have: 2 + 1 % 3 = 3 % 3 = 0

  // We remove the previous eating mood of Pacman i.e. class 
  pacManEmoji.classList.remove(...allEatingMoods);
  // and add the new eating mood of Pacman
  pacManEmoji.classList.add(allEatingMoods[indx_mood]);
}// eatingMoods() 


// Define the three Pacman images of dead moods
const allDeadMoods = [ 
  "dead0_pacman",
  "dead1_pacman",
  "dead2_pacman",
  "dead3_pacman",
  "dead4_pacman",
  "dead5_pacman",
  "dead6_pacman",
  "dead7_pacman",
  "dead8_pacman",
  "dead9_pacman",
  "dead10_pacman"
];
var deadPacmanInterval;
var indx_dead = 0;

// Function that loops all eleven Pacman dead faces
function deadPacmanMoods() 
{
    // Change the mood index by incrementing it 
    indx_dead = (indx_dead + 1) % allDeadMoods.length; 
    // We remove the previous dead mood of Pacman i.e. class 
    pacManEmoji.classList.remove(...allDeadMoods);
    // and add the new dead mood of Pacman
    pacManEmoji.classList.add(allDeadMoods[indx_dead]);
}// deadPacmanMoods() 
