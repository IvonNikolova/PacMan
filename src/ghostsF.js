//--------------------------------- GHOSTS: AFRAID FROZEN STATE (after an eaten gazer) ---------------------------------
// Original interval speed values for each ghost
const originalIntervals = {
  redG: 160, 
  pinkG: 160, 
  blueG: 160,
  orangeG: 160 
};
// Slower than the usual interval speed values for each ghost
const frozenSpeed = 250; 

//-------------------------1 RED------------------------------
// Flags to keep track of the remaining time for the afraid frozen state
var isGhostFreezed = false; 
var isGhostFreezedComesToEnd = false;
// Variable for the ID timeout of the afraid frozen state
var freezeTimerId = null; 

// Function that is activated when a gazer is eaten
  // it changes the ghost complete state 
  // from normal angry state
  // to frozen afraid state 
  // which gives Pacman a chance to eat the ghosts and to collect more bonus points
function isEatenGazer() 
{
  // Reset the scared ghost multiplier
  scaredGhostMultiplier = 1;
  pointsAdded = 0;

  // The afraid frozen time is set to 6 seconds = 6000 miliseconds
  const currentGazerFreezeTime = 6000;

  // If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
  if (!isGhostFreezed || isGhostFreezedComesToEnd) 
  {
    // Clear the existing timer 
    // if it's still on
    clearTimeout(freezeTimerId);

    // Set the original interval based on the ghost
    const originalInterval = originalIntervals.redG; 

    // Clear the possible running interval(s)
    clearInterval(moveRGtInterval);
    // The ghost has to move slower during the afraid state's time
    moveRGtInterval = setInterval(moveRedGhostInMaze, frozenSpeed); 

    // Start a new timer with the current gazer freeze time
    freezeTimerId = setTimeout(() => {
                                        isGhostFreezed = false;

                                        clearInterval(moveRGtInterval);
                                        // Back to the original speed of the ghost
                                        moveRGtInterval = setInterval(moveRedGhostInMaze, originalInterval);
                                      }, 
                                currentGazerFreezeTime);
                                        
    // Reset the last seconds flag
    isGhostFreezedComesToEnd = false;

    // Set the flag isGhostFreezedComesToEnd to true for the last 3 seconds
    setTimeout(() => {
                        isGhostFreezedComesToEnd = true;
                      }, 
                    currentGazerFreezeTime - 3000); // Set the last 3 seconds before the timer ends
  }

  // Set the ghost to the frozen afraid state
  isGhostFreezed = true;
}// isEatenGazer() 




//-------------------------2 PINK------------------------------
// Flags to keep track of the remaining time for the afraid frozen state
var isGhostFreezed2 = false; 
var isGhostFreezedComesToEnd2 = false;
// Variable for the ID timeout of the afraid frozen state
var freezeTimerId2 = null; 

// Function that is activated when a gazer is eaten
  // it changes the ghost complete state 
  // from normal angry state
  // to frozen afraid state 
  // which gives Pacman a chance to eat the ghosts and to collect more bonus points
function isEatenGazer2() 
{
  // The afraid frozen time is set to 6 seconds = 6000 miliseconds
  const currentGazerFreezeTime2 = 6000;

  // If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
  if (!isGhostFreezed2 || isGhostFreezedComesToEnd2) 
  {
    // Clear the existing timer 
    // if it's still on
    clearTimeout(freezeTimerId2);

    // Set the original interval based on the ghost
    const originalInterval2 = originalIntervals.pinkG; 

    // Clear the possible running interval(s)
    clearInterval(moveGsInterval);
    clearInterval(movePGInterval);
    // The ghost has to move slower during the afraid state's time
    movePGInterval = setInterval(movePinkGhostInHouse, frozenSpeed); 

    // Start a new timer with the current gazer freeze time
    freezeTimerId2 = setTimeout(() => {
                                        isGhostFreezed2 = false;

                                        clearInterval(moveGsInterval);
                                        clearInterval(movePGInterval);
                                        // Back to the original speed of the ghost
                                        movePGInterval = setInterval(movePinkGhostInHouse, originalInterval2); 
                                      }, 
                                currentGazerFreezeTime2);
    
    // Reset the last seconds flag
    isGhostFreezedComesToEnd2 = false;

    // Set the flag isGhostFreezedComesToEnd2 to true for the last 3 seconds
    setTimeout(() => {
                        isGhostFreezedComesToEnd2 = true;
                      }, 
              currentGazerFreezeTime2 - 3000); // Set the last 3 seconds before the timer ends
  }

  // Set the ghost to the frozen afraid state
  isGhostFreezed2 = true;
}// isEatenGazer2() 



//----------------------------------3 BLUE--------------------------------
// Flags to keep track of the remaining time for the afraid frozen state
var isGhostFreezed3 = false; 
var isGhostFreezedComesToEnd3 = false;
// Variable for the ID timeout of the afraid frozen state
var freezeTimerId3 = null; 


// Function that is activated when a gazer is eaten
  // it changes the ghost complete state 
  // from normal angry state
  // to frozen afraid state 
  // which gives Pacman a chance to eat the ghosts and to collect more bonus points
function isEatenGazer3() 
{
 // The afraid frozen time is set to 6 seconds = 6000 miliseconds
  const currentGazerFreezeTime3 = 6000;


  // If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
  if (!isGhostFreezed3 || isGhostFreezedComesToEnd3) 
  {
    // Clear the existing timer 
    // if it's still on
    clearTimeout(freezeTimerId3);

    // Set the original interval based on the ghost
    const originalInterval3 = originalIntervals.blueG;
    
    // Clear the possible running interval(s)
    clearInterval(moveGsInterval);
    clearInterval(moveBGInterval);
    // The ghost has to move slower during the afraid state's time
    moveBGInterval = setInterval(moveBlueGhostInHouse, frozenSpeed); 

    // Start a new timer with the current gazer freeze time
    freezeTimerId3 = setTimeout(() => {
                                        isGhostFreezed3 = false;

                                        clearInterval(moveGsInterval);
                                        clearInterval(moveBGInterval);
                                        // Back to the original speed of the ghost
                                        moveBGInterval = setInterval(moveBlueGhostInHouse, originalInterval3); 
                                      }, 
                                currentGazerFreezeTime3);
    
    // Reset the last seconds flag
    isGhostFreezedComesToEnd3 = false;

    // Set the flag isGhostFreezedComesToEnd2 to true for the last 3 seconds
    setTimeout(() => {
                        isGhostFreezedComesToEnd3 = true;
                      }, 
              currentGazerFreezeTime3 - 3000); // Set the last 3 seconds before the timer ends
  }

  // Set the ghost to the frozen afraid state
  isGhostFreezed3 = true;
}//isEatenGazer3() 

//------------------------------------4 ORANGE--------------------------------
// Flags to keep track of the remaining time for the afraid frozen state
var isGhostFreezed4 = false; 
var isGhostFreezedComesToEnd4 = false;
// Variable for the ID timeout of the afraid frozen state
let freezeTimerId4 = null; 

// Function that is activated when a gazer is eaten
  // it changes the ghost complete state 
  // from normal angry state
  // to frozen afraid state 
  // which gives Pacman a chance to eat the ghosts and to collect more bonus points
function isEatenGazer4() 
{
  // The afraid frozen time is set to 6 seconds = 6000 miliseconds
  const currentGazerFreezeTime4 = 6000;

  // If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
  if (!isGhostFreezed4 || isGhostFreezedComesToEnd4) 
  {
    // Clear the existing timer if it's still running
    clearTimeout(freezeTimerId4);

    // Clear the existing timer 
    // if it's still on
    const originalInterval4 = originalIntervals.orangeG; 

    // Clear the possible running interval(s)
    clearInterval(moveGsInterval);
    clearInterval(moveOGInterval);
    // The ghost has to move slower during the afraid state's time
    moveOGInterval = setInterval(moveOrangeGhostInHouse, frozenSpeed); 

    // Start a new timer with the current gazer freeze time
    freezeTimerId4 = setTimeout(() => {
                                        isGhostFreezed4 = false;

                                        clearInterval(moveGsInterval);
                                        clearInterval(moveOGInterval);
                                        // Back to the original speed of the ghost
                                        moveOGInterval = setInterval(moveOrangeGhostInHouse, originalInterval4); 
                                      }, 
                                currentGazerFreezeTime4);
  
  // Reset the last seconds flag
    isGhostFreezedComesToEnd4 = false;

    // Set the flag isGhostFreezedComesToEnd2 to true for the last 3 seconds
    setTimeout(() => {
                        isGhostFreezedComesToEnd4 = true;
                      }, 
              currentGazerFreezeTime4 - 3000); // Set the last 3 seconds before the timer ends
  }
  // Set the ghost to the frozen afraid state
  isGhostFreezed4 = true;
}// isEatenGazer4() 








//--------------------------------- BONUS POINTS  ---------------------------------

// From which eaten frozen ghost are the bonus points earned
var red = false, pink = false, blue = false, orange = false;
// Multiplier for the bonus points: +200, +400, +800, +1600
var scaredGhostMultiplier = 1;
// How many bonus points to the overall score were added per eaten fronzen ghost 
var pointsAdded = 0;

// Function to handle Pacman eating a scared ghost
function eatScaredGhost() 
{
  // Each eaten gazer provides the oppurtunity to win bonus points by eating an afraid ghost
  // The first eaten afraid ghost brings +200 points 
    // and each subsequent eaten ghost from the same gazer
    // brings point which are multiplied by 2 to the previous points 
  // So, the bonus points could be +200, +400,+800 or +1600.
  const calculations = 200 * scaredGhostMultiplier;
  scores += calculations;
  // Update the scores shown above the maze
  scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
  scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding

  // Follow how many points are added 
  pointsAdded = calculations; 
  // console.log("Points added: " + pointsAdded);

  // Depending on the flag information from collisionF(),
  // and depending on the just added points 'pointsAdded',
  // we know where on which ghost to place the bonus points class spritesheet
  if(red === true)
  {
    if(pointsAdded === 200)
    {
      redGhostElement.className = "bonus_200";
      red = false;
    }
    else if(pointsAdded === 400 )
    {
      redGhostElement.className = "bonus_400";
      red = false;
    }
    else if(pointsAdded === 800)
    {
      redGhostElement.className = "bonus_800";
      red = false;
    }
    else if(pointsAdded === 1600 )
    {
      redGhostElement.className = "bonus_1600";
      red = false;
    }
    // else 
    // {
    //   redGhostElement.className = "";
    //   red = false;
    // }
  }
  if(pink === true)
  {
    if(pointsAdded === 200)
    {
      pinkGhostElement.className = "bonus_200";
      pink = false;
    }
    else if(pointsAdded === 400 )
    {
      pinkGhostElement.className = "bonus_400";
      pink = false;
    }
    else if(pointsAdded === 800)
    {
      pinkGhostElement.className = "bonus_800";
      pink = false;
    }
    else if(pointsAdded === 1600 )
    {
      pinkGhostElement.className = "bonus_1600";
      pink = false;
    }
    // else 
    // {
    //   pinkGhostElement.className = "";
    //   pink = false;
    // }
  }
  if(blue === true)
  {
    if(pointsAdded === 200)
    {
    blueGhostElement.className = "bonus_200";
    blue = false;
    }
    else if(pointsAdded === 400 )
    {
    blueGhostElement.className = "bonus_400";
    blue = false;
    }
    else if(pointsAdded === 800)
    {
    blueGhostElement.className = "bonus_800";
    blue = false;
    }
    else if(pointsAdded === 1600 )
    {
    blueGhostElement.className = "bonus_1600";
    blue = false;
    }
    // else 
    // {
    //   blueGhostElement.className = "";
    //   blue = false;
    // }
  }
  if(orange === true)
  {
    if(pointsAdded === 200)
    {
    orangeGhostElement.className = "bonus_200";
    orange = false;
    }
    else if(pointsAdded === 400 )
    {
    orangeGhostElement.className = "bonus_400";
    orange = false;
    }
    else if(pointsAdded === 800)
    {
    orangeGhostElement.className = "bonus_800";
    orange = false;
    }
    else if(pointsAdded === 1600 )
    {
    orangeGhostElement.className = "bonus_1600";
    orange = false;
    }
    // else 
    // {
    //   orangeGhostElement.className = "";
    //   orange = false;
    // }
  }
  // Increase the multiplier for the next scared ghost
  scaredGhostMultiplier *= 2;
}// eatScaredGhost() 
