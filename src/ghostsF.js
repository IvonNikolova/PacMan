//--------------------------------- GHOSTS: AFRAID FROZEN STATE (after an eaten gazer) ---------------------------------

// Define a variable or an array to keep track of eaten gazers
var countEatenGazers = 0;
var countEatenPellets = 0;

// Original interval values for each ghost
const originalIntervals = {
  redG: 160, // Adjust this value as needed
  pinkG: 160, // Adjust this value as needed
  blueG: 160, // Adjust this value as needed
  orangeG: 160 
};
const frozenSpeed = 250;

//-------------------------1 RED------------------------------
// Flag to track if the ghost is freezed
var isGhostFreezed = false; 
var isGhostFreezedComesToEnd = false;

// Variable to keep track of the remaining time for the FREEZED state
var remainingFreezeTime = 0; 
let freezeTimerId = null; // To store the timer ID

// Function to handle gazer eating
function isEatenGazer() 
{

  // Reset the scared ghost multiplier
  scaredGhostMultiplier = 1;
  pointsAdded = 0;

// Set the freeze time for the current gazer to 5 seconds
const currentGazerFreezeTime = 6000;

// If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
if (!isGhostFreezed || isGhostFreezedComesToEnd) 
{
  // Clear the existing timer if it's still running
  clearTimeout(freezeTimerId);

  const originalInterval = originalIntervals.redG; // Change this based on the ghost
  // Make the ghost move slower during the freeze time
  clearInterval(moveRGtInterval);
  moveRGtInterval = setInterval(moveRedGhostInMaze, frozenSpeed); // Adjust this interval value

  // Start a new timer with the current gazer freeze time
  freezeTimerId = setTimeout(() => {
    isGhostFreezed = false;
    remainingFreezeTime = 0;

    // Return the ghost movement to the original speed
    clearInterval(moveRGtInterval);
    moveRGtInterval = setInterval(moveRedGhostInMaze, originalInterval);
  }, currentGazerFreezeTime);
  
  // Reset the last 2 seconds flag
  isGhostFreezedComesToEnd = false;

  // Set the flag isGhostFreezedComesToEnd to true for the last 2 seconds
  setTimeout(() => {
    isGhostFreezedComesToEnd = true;
  }, currentGazerFreezeTime - 3000); // Set it 2 seconds before the timer ends
}

// Set the ghost to the FREEZED state
isGhostFreezed = true;

// Other actions you want to perform when a gazer is eaten
}




//-------------------------2 PINK------------------------------
// Flag to track if the ghost is freezed
var isGhostFreezed2 = false; 
var isGhostFreezedComesToEnd2 = false;

// Variable to keep track of the remaining time for the FREEZED state
var remainingFreezeTime2 = 0; 
let freezeTimerId2 = null; // To store the timer ID


// Function to handle gazer eating
function isEatenGazer2() 
{


// Set the freeze time for the current gazer to 5 seconds
const currentGazerFreezeTime2 = 6000;

// If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
if (!isGhostFreezed2 || isGhostFreezedComesToEnd2) 
{
  // Clear the existing timer if it's still running
  clearTimeout(freezeTimerId2);
//+++++++++++++++++++++++
  const originalInterval2 = originalIntervals.pinkG; // Change this based on the ghost
  // Make the ghost move slower during the freeze time
  clearInterval(moveGsInterval);
  clearInterval(movePGInterval);
  movePGInterval = setInterval(movePinkGhostInHouse, frozenSpeed); 


  // Start a new timer with the current gazer freeze time
  freezeTimerId2 = setTimeout(() => {
    isGhostFreezed2 = false;
    remainingFreezeTime2 = 0;

//+++++++++++++++++++++++
    // Return the ghost movement to the original speed
clearInterval(moveGsInterval);
clearInterval(movePGInterval);
movePGInterval = setInterval(movePinkGhostInHouse, originalInterval2); 
  }, currentGazerFreezeTime2);
  
  // Reset the last 2 seconds flag
  isGhostFreezedComesToEnd2 = false;

  // Set the flag isGhostFreezedComesToEnd to true for the last 2 seconds
  setTimeout(() => {
    isGhostFreezedComesToEnd2 = true;
  }, currentGazerFreezeTime2 - 3000); // Set it 2 seconds before the timer ends
}

// Set the ghost to the FREEZED state
isGhostFreezed2 = true;

// Other actions you want to perform when a gazer is eaten
}

//----------------------------------3 BLUE--------------------------------
// Flag to track if the ghost is freezed
var isGhostFreezed3 = false; 
var isGhostFreezedComesToEnd3 = false;

// Variable to keep track of the remaining time for the FREEZED state
var remainingFreezeTime3 = 0; 
let freezeTimerId3 = null; // To store the timer ID


// Function to handle gazer eating
function isEatenGazer3() 
{
// Your logic to detect gazer eating goes here
// Set the freeze time for the current gazer to 5 seconds
const currentGazerFreezeTime3 = 6000;


// If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
if (!isGhostFreezed3 || isGhostFreezedComesToEnd3) 
{
  // Clear the existing timer if it's still running
  clearTimeout(freezeTimerId3);

//+++++++++++++++++++++++
  const originalInterval3 = originalIntervals.blueG; // Change this based on the ghost
  // Make the ghost move slower during the freeze time
  clearInterval(moveGsInterval);
  clearInterval(moveBGInterval);
  moveBGInterval = setInterval(moveBlueGhostInHouse, frozenSpeed); 


  // Start a new timer with the current gazer freeze time
  freezeTimerId3 = setTimeout(() => {
    isGhostFreezed3 = false;
    remainingFreezeTime3 = 0;
//+++++++++++++++++++++++
    // Return the ghost movement to the original speed
    clearInterval(moveGsInterval);
    clearInterval(moveBGInterval);
    moveBGInterval = setInterval(moveBlueGhostInHouse, originalInterval3); 

  }, currentGazerFreezeTime3);
  
  // Reset the last 2 seconds flag
  isGhostFreezedComesToEnd3 = false;

  // Set the flag isGhostFreezedComesToEnd to true for the last 2 seconds
  setTimeout(() => {
    isGhostFreezedComesToEnd3 = true;
  }, currentGazerFreezeTime3 - 3000); // Set it 2 seconds before the timer ends
}

// Set the ghost to the FREEZED state
isGhostFreezed3 = true;

// Other actions you want to perform when a gazer is eaten
}

//------------------------------------4 ORANGE--------------------------------
// Flag to track if the ghost is freezed
var isGhostFreezed4 = false; 
var isGhostFreezedComesToEnd4 = false;

// Variable to keep track of the remaining time for the FREEZED state
var remainingFreezeTime4 = 0; 
let freezeTimerId4 = null; // To store the timer ID


// Function to handle gazer eating
function isEatenGazer4() 
{
// Your logic to detect gazer eating goes here


// Set the freeze time for the current gazer to 5 seconds
const currentGazerFreezeTime4 = 6000;

// If the ghost is not already in the FREEZED state or a new gazer is eaten before the current timer ends
if (!isGhostFreezed4 || isGhostFreezedComesToEnd4) 
{
  // Clear the existing timer if it's still running
  clearTimeout(freezeTimerId4);
//+++++++++++++++++++++++
const originalInterval4 = originalIntervals.orangeG; // Change this based on the ghost
// Make the ghost move slower during the freeze time
clearInterval(moveGsInterval);
clearInterval(moveOGInterval);
moveOGInterval = setInterval(moveOrangeGhostInHouse, frozenSpeed); 

  // Start a new timer with the current gazer freeze time
  freezeTimerId4 = setTimeout(() => {
    isGhostFreezed4 = false;
    remainingFreezeTime4 = 0;

//+++++++++++++++++++++++
    // Return the ghost movement to the original speed
    clearInterval(moveGsInterval);
    clearInterval(moveOGInterval);
    moveOGInterval = setInterval(moveOrangeGhostInHouse, originalInterval4); 


  }, currentGazerFreezeTime4);
  
  // Reset the last 2 seconds flag
  isGhostFreezedComesToEnd4 = false;

  // Set the flag isGhostFreezedComesToEnd to true for the last 2 seconds
  setTimeout(() => {
    isGhostFreezedComesToEnd4 = true;
  }, currentGazerFreezeTime4 - 3000); // Set it 2 seconds before the timer ends
}

// Set the ghost to the FREEZED state
isGhostFreezed4 = true;

// Other actions you want to perform when a gazer is eaten
}








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
