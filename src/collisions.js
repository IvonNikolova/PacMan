//--------------------------------- COLLISION between PACMAN and GHOST ---------------------------------

// Calculate how many lives of Pacman are gone
var countDownLives = 1; // At the very beginning by default one is counted down

// Flags informing the collision between who occurred
var collision_PnRG = false; // Pacman and red ghost collide
var collision_PnPG = false; // Pacman and pink ghost collide
var collision_PnBG = false; // Pacman and blue ghost collide
var collision_PnOG = false; // Pacman and orange ghost collide


// A function that alarms if a collision between Pacman and any ghost happen
    // NOTE: this kind of collision happens when the ghost is in angry normal state,
    // the other kind of collision is taken into account in the next function: collisionF() 
function collision() 
{
  if ( (collision_PnRG === true && isGhostFreezed  === false)  
    ||
    (collision_PnPG === true && isGhostFreezed2  === false)  
    ||
    (collision_PnBG == true && isGhostFreezed3  === false)  
    ||
    (collision_PnOG === true && isGhostFreezed4  === false)  
    ) 
  {
    //console.log("collision(): line 27");

    // Count down one more life if a collision happens
    countDownLives += 1;
    //console.log("countDownLives: " + countDownLives);

     // Reset the state of the following flag 
      // to allow the user to move right at the very beginning 
    hasInitialKeyPress = false;

    resetSomeThings();

    // Reset any other relevant variables, states or etc.
    isGhostFreezed = false;
    isGhostFreezed2 = false;
    isGhostFreezed3 = false;
    isGhostFreezed4 = false;
   
    pinkGTransitionStage = -1;
    orangeGTransitionStage = -1;
    blueGTransitionStage = -1;
    redGhostTransitionStage = -1;
    
    pacManEmoji.className = "";
    pacManEmoji.className = "pacman0";

    // Start the dead Pacman animation with a slight delay
    setTimeout(() => {
                        resetSomeThings();

                        clearInterval(autoMoveInterval);
                        collision_PnRG = false;
                        collision_PnPG = false;
                        collision_PnBG = false;
                        collision_PnOG = false;
                      
                        // To start the animation of dead pacman from the very beginning each time
                        indx_dead = 0;

                        // in order to not rotate the dead Pacman moods
                        pacManEmoji.style.transform = "none"; 
                        pacManEmoji.style.transform = `translate(${x_translate}px, ${y_translate}px)`;
                          
                        deadPacmanInterval = setInterval(deadPacmanMoods,250);
                      }, 
                300);
   
    // Check the lives number and remove one by one when's needed 
    if(countDownLives != 1)
    {
      if(countDownLives == 2)
      {
        let life_2 = document.getElementsByClassName("life2")[0]; 
        life_2.style.display = "none";
      }
      else if(countDownLives == 3)
      {
        let life_1 = document.getElementsByClassName("life1")[0]; 
        life_1.style.display = "none";
      }
    }
   
    // Pause the Pacman's movement
    isPacmanStopped = true;
    // Reset Pacman position
    pacmanPos = { x: 0, y: 0 }; 

    // If some lives of Pacman are left, 
    // do the following things
    if(countDownLives == 2 || countDownLives == 3)
    {
              // Wait for the specified delay time of 2000 as in readyLabel()
              setTimeout(() => {

                // Reset any other relevant variables or states
                collision_PnRG = false;
                collision_PnPG = false;
                collision_PnBG = false;
                collision_PnOG = false;

                // Stop the dead Pacman animation
                clearInterval(deadPacmanInterval);

                // Pacman initial positions
                currentDirection =  DIRECTION.LEFT;
                nextDirection = null;

                // Start the game again
                startGame();

      }, 3000);  
    }
    else
    {
      setTimeout(() => {
                          clearInterval(deadPacmanInterval);
                          clearInterval(autoMoveInterval);

                          pacmanDead = true;
                          pacmanWinner = false;
                      
                          endGame();
                        }, 
                  3000);  
    }
  }// if (collisionOccurred && isGhostFreezed === false) 
}//collision() 


// A function that alarms if a collision between Pacman and any ghost happen
    // NOTE: this kind of collision happens when the ghost is in afraid frozen state after a gazer was eaten by Pacman,
    // the other kind of collision is taken into account in the previous function: collision() 
function collisionF()
{
/* 
    Check some if-statements in order to understand between who the collision happened.
    This is important to be known because we have to do some spesific taks to that concrete ghost.
    To add the bonus-points spritesheet in the place where the ghost was eaten by Pacman; 
    to reset and clear some variables,states,intervals and timeouts;
    and last but not least to respawn them.
  */

  // Pacman and afraid frozen Red ghost 
  if(collision_PnRG === true && isGhostFreezed  === true ) 
  {
    //console.log("RG, both collision and freezing are true: 152");

    // To know which specific ghost ran into Pacman i.e. was eaten by Pacman 
    // in order to show the bonus points label 
    red = true;
    eatScaredGhost(); // The function that handles the bonus points when Pacman eats an afraid frozen ghost
     
    // Clear/reset any intervals and timeouts
    clearInterval(moveRGtInterval);
    clearTimeout(freezeTimerId);
    freezeTimerId = null;
    // Stop movement
     isRedGhostStopped = false; 
     isPacmanStopped = false;
    // Reset any other relevant variables or states
    collision_PnRG = false;
    isGhostFreezed = false;
    isGhostFreezedComesToEnd = false;

    // Respawning the red ghost from the ghost nest/house
    redGhost = { top: 107, left: 13.05 * 8, size: 16}; // First move positioning containing the coordinates of the ghost nest/house
    // The transition stage: from the nest to the maze corridors
    redGhostTransitionStage = 1;
    // Start the movement of the red ghost again at regular intervals
    moveRGtInterval = setInterval(moveRedGhostInHouse, 140); 
  }

  // Pacman and afraid frozen Pink ghost 
  if(collision_PnPG === true  && isGhostFreezed2  === true ) 
  {
   // console.log("G, both collision and freezing are true: 182");
    
    // To know which specific ghost ran into Pacman i.e. was eaten by Pacman 
    // in order to show the bonus points label 
    pink = true;
    eatScaredGhost();// The function that handles the bonus points when Pacman eats an afraid frozen ghost

    // Clear/reset any intervals and timeouts
    clearInterval(movePGInterval);
    clearInterval(moveGsInterval);
    clearTimeout(freezeTimerId2);
    freezeTimerId2 = null;
    // Stop movement
    isPinkGhostStopped = false;
    isPacmanStopped = false;
    // Reset any other relevant variables or states
    collision_PnPG = false;
    isGhostFreezed2 = false;
    isGhostFreezedComesToEnd2 = false;

    // Respawning the pink ghost from the ghost nest/house
    pinkGhost = { top: 107, left: 13.05 * 8};
    // The direction is 'up' in the nest
    pinkGDirection = "up";
    // The transition stage: from the nest to the maze corridors
    pinkGTransitionStage = 1;
    // Start the movement of the pink ghost again at regular intervals
    movePGInterval = setInterval(movePinkGhostInHouse, 160); 
  }


    // Pacman and afraid frozen Blue ghost 
  if(collision_PnBG === true && isGhostFreezed3  === true ) 
  {
    //console.log("BG, both collision and freezing are true: 216");

    // To know which specific ghost ran into Pacman i.e. was eaten by Pacman 
    // in order to show the bonus points label 
    blue = true;
    eatScaredGhost();// The function that handles the bonus points when Pacman eats an afraid frozen ghost

    // Clear/reset any intervals and timeouts
    clearInterval(moveGsInterval);
    clearInterval(moveBGInterval);
    clearTimeout(freezeTimerId3);
    freezeTimerId3 = null;
    // Stop movement
    isPacmanStopped = false;
    isBlueGhostStopped = false;
    // Reset any other relevant variables or states
    collision_PnBG = false;
    isGhostFreezed3 = false;
    isGhostFreezedComesToEnd3 = false;

    // Respawning the blue ghost from the ghost nest/house
    blueGhost = { top: 107, left: 11.05 * 8};
    // The direction is 'down' in the nest
    blueGDirection = "down";
    // The transition stage: from the nest to the maze corridors
    blueGTransitionStage = 1;
    // Start the movement of the blue ghost again at regular intervals
    moveBGInterval = setInterval(moveBlueGhostInHouse, 160); 
  }

    // Pacman and afraid frozen Orange ghost 
  if(collision_PnOG === true && isGhostFreezed4  === true )  
  {
    //console.log("OG, both collision and freezing are true: 249");

    // To know which specific ghost ran into Pacman i.e. was eaten by Pacman 
    // in order to show the bonus points label 
    orange = true;
    eatScaredGhost();// The function that handles the bonus points when Pacman eats an afraid frozen ghost

    // Clear/reset any intervals and timeouts
    clearInterval(moveGsInterval);
    clearInterval(moveOGInterval);
    clearTimeout(freezeTimerId4);
    freezeTimerId4 = null;
    // Stop movement
    isOrangeGhostStopped = false;
    isPacmanStopped = false; 
    // Reset any other relevant variables or states
    collision_PnOG = false;
    isGhostFreezed4 = false;
    isGhostFreezedComesToEnd4 = false;

    // Respawning the orange ghost from the ghost nest/house
    orangeGhost = { top: 107, left: 15.05 * 8};
    // The direction is 'down' in the nest
    orangeGDirection = "down";
    // The transition stage: from the nest to the maze corridors
    orangeGTransitionStage = 1;
    // Start the movement of the orange ghost again at regular intervals
    moveOGInterval = setInterval(moveOrangeGhostInHouse, 160); 
  }
}// collisionF()


function resetSomeThings()
{
    // Pacman has to stop when collision occurs
    isPacmanStopped = true;
    // All ghosts have to stop when collision occurs
    isRedGhostStopped = true;
    isPinkGhostStopped = true;
    isBlueGhostStopped = true;
    isOrangeGhostStopped = true;

    // Clear/reset any intervals and timeouts
    clearTimeout(timeOutPinkG);
    clearTimeout(timeOutBlueG);
    clearTimeout(timeOutOrangeG);
    
    clearTimeout(freezeTimerId);
    freezeTimerId = null;
    
    clearTimeout(freezeTimerId2);
    freezeTimerId2 = null;
    
    clearTimeout(freezeTimerId3);
    freezeTimerId3 = null;
    
    clearTimeout(freezeTimerId4);
    freezeTimerId4 = null;
    
    clearInterval(moveGsInterval);
    clearInterval(movePGInterval);
    clearInterval(moveBGInterval);
    clearInterval(moveOGInterval);

    // Clear classes
    redGhostElement.className = "";
    pinkGhostElement.className = "";
    blueGhostElement.className = "";
    orangeGhostElement.className = "";

    // Remove the cherry if such exist
    if (cherry) 
    {
      maze_container.removeChild(cherry);
      cherry = null; // Reset the reference
      cherryDisplayed = false; // Reset the flag
    }
}//resetSomeThings()