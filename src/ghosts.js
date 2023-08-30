//--------------------------------- GHOSTS: ANGRY NORMAL STATE ---------------------------------

// Flags to track if a ghost movement is stopped because of its death 
var isRedGhostStopped = false; 
var isPinkGhostStopped = false;
var isBlueGhostStopped = false;
var isOrangeGhostStopped = false;

// Set the last direction for the ghosts
var lastRedGhostDirection = "left";
var lastPinkGDirection = "left";
var lastBlueGDirection = "left";
var lastOrangeGDirection = "left";
//----------------------------- MOVE RED GHOST in the maze and in the nest -------------------------------------------

// Set the initial direction for the red ghost
var redGDirection = "left";

// A function that moves the red ghost randomly 
  // and detect if a collision occurs between the ghost and Pacman in any of its states
function moveRedGhostInMaze() 
{
  // Define the movement step for the red ghost
  const cellSize = 8;
  
  // Coordinates of Pacman and of the Red ghost 
  const pacmanX = (pacmanPos.x);
  const pacmanY = (pacmanPos.y);
  const ghostX = Math.floor(redGhost.left / 8);
  const ghostY = Math.floor(redGhost.top / 8);

  if (
    (pacmanX === ghostX && pacmanY === ghostY) 
    || 
    (pacmanX === ghostX && pacmanY - 1 === ghostY) 
    ||
    (pacmanX - 1 === ghostX && pacmanY === ghostY) 
    || 
    (pacmanX === ghostX && pacmanY  === ghostY - 1) 
    ||
    (pacmanX  === ghostX - 1 && pacmanY === ghostY) 
  )
  {
    //console.log("GHOST: Red ghost killed Pacman.");
    
    if (!isPacmanMoving()) 
    {
      if(collision_PnRG != true)
      {
        // Detect the specific collision
        collision_PnRG = true;
        // Pause movement
        isRedGhostStopped = true;
        isPacmanStopped = true;

        // Do the specific collision method depending on the state
        if(isGhostFreezed === true)
        {
          //console.log("59");
          collisionF();
        }
        else
        {
          //console.log("64");
          collision();
        }
      }
    }
  }

  if (!isRedGhostStopped) // when isRedGhostStopped is false, do the following thing:
  {
    if (!isPaused) 
    {
      const row = Math.floor(redGhost.top / 8);
      const col = Math.floor(redGhost.left / 8);

      if(row === 14 && col === 0) // LEFT to right tunnel corridors
      {
        //row
        redGhost.top = 112; 
        //col
        redGhost.left = 212; //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
      }  
      else if (row === 14 && col === 27)// RIGHT to left tunnel corridors
      {
        //console.log("GHOST IN TUNNEL: RIGHT to left");
        // Set the red ghost's position to the destination teleportation cell 
        //row - Update the pixel position for top
        redGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
        //col -  Update the pixel position for left
        redGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
      }
      else
      {
        // Array for the possible moves
        const possibleMoves = [];

        // Check if the movement in each direction is valid
        if (isValidMove(row - 1, col) && lastRedGhostDirection !== "down") 
        {
          possibleMoves.push("up");
        }
        if (isValidMove(row + 1, col) && lastRedGhostDirection !== "up") 
        {
          possibleMoves.push("down");
        }
        if (isValidMove(row, col - 1) && lastRedGhostDirection !== "right") 
        {
          possibleMoves.push("left");
        }
        if (isValidMove(row, col + 1) && lastRedGhostDirection !== "left") 
        {
          possibleMoves.push("right");
        }

        if (possibleMoves.length > 0) 
        {
          // If there are valid moves available, 
            // generate a random one 
            // and update the direction
          const randomIndex = Math.floor(Math.random() * possibleMoves.length);
          redGDirection = possibleMoves[randomIndex];

          // Update the cell-based position based on the movement direction
          if (redGDirection === "up") 
          {
              redGhost.top -= cellSize;
          } 
          else if (redGDirection === "down") 
          {
              redGhost.top += cellSize;
          } 
          else if (redGDirection === "left") 
          {
              redGhost.left -= cellSize;
          } 
          else if (redGDirection === "right")
          {
              redGhost.left += cellSize;
          }

          // Update the last movement direction
          lastRedGhostDirection = redGDirection;

          // Update the position of the red ghost in the maze
          updateMazeGPos(redGhost, redGhostElement);
          // Change the style of red ghost's face 
          ghostFaces(redGhostElement,redGDirection,isGhostFreezed,isGhostFreezedComesToEnd, changeRGhostMood,changeRGFreeze,changeRGGrayFreeze);
        } 
        else 
        {
          // If no valid moves are available, 
          // randomly generate a new direction
          redGDirection = getRandomDirection();
        }// else if no valid moves are available, randomly choose a new direction
      }// else if its not a tunnel corridor
    }//if (!isPaused) 
  }//if (!isRedGhostStopped)
}//moveRedGhost() 


// Initialize transition stage of the red ghost 
  // from the nest to the maze corridors
var redGhostTransitionStage = 0; 

// A function that moves the red ghost from the nest to the maze corridors
  // this is called at the very beginning of the game or 
  // when the respawning process of the red ghost happens
function moveRedGhostInHouse()
{
  if (!isPaused) 
  {
    // Transition stage 1: Move red ghost out of the nest to its new inital position within the maze
    if (redGhostTransitionStage === 1) 
    {
      redGDirection = "up";
      redGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (redGhost.top < 11 * 8) 
      {
        redGhost.top = 10.5 * 8;
        // Go to the next transition stage
        redGhostTransitionStage = 2; 
      }
      // Update the position of the red ghost in the nest
      updateNestGPos(redGhost, redGhostElement);
      // Change the style of red ghost's face 
      ghostFaces(redGhostElement,redGDirection,isGhostFreezed,isGhostFreezedComesToEnd, changeRGhostMood,changeRGFreeze,changeRGGrayFreeze);
    }
     // Transition stage 2: Start moving from its new inital position within the maze corridors
    else if(redGhostTransitionStage === 2)
    {
      redGDirection = "left";  
      redGhost = { top: 11.5 * 8, left: 13.05 * 8, size:16};

      // Go to the next transition stage
      redGhostTransitionStage = 3;

      updateMazeGPos(redGhost, redGhostElement);
      ghostFaces(redGhostElement,redGDirection,isGhostFreezed,isGhostFreezedComesToEnd, changeRGhostMood,changeRGFreeze,changeRGGrayFreeze);
    }
    // Transition stage 3: Move red ghost in the maze corridors
    else if(redGhostTransitionStage === 3)
    {
      moveRedGhostInMaze();
    } 
  }
}// moveRedGhostInHouse()


// ------------------------------------------------ important FUNCTIONS ------------------------------------------------ 
// Function to check if the next movement is valid (not colliding with a wall)
function isValidMove(row, col) 
{
  // There is no actual need of these if-condition below 
  // because the ghost is synchronised with the 0's 
  // i.e. walls which are the actual stoppers i.e. boundaries
      //  GPS_arr is a 2D array containing maze layout as described earlier
      if (row < 0 || col < 0 || row >= 31 || col >= 28) 
      {
          return false; // The move is outside the maze boundaries
      }
// for testing only
        // return (GPS_arr[row][col] !== 0  && GPS_arr[row][col] !== 1  && GPS_arr[row][col] !== 2  && GPS_arr[row][col] !== 4);
//original logic, not for
      return (GPS_arr[row][col] !== 0 && GPS_arr[row][col] !== 4);
}// isValidMove(row, col) 

// Function to randomly generate a new direction for a ghost
function getRandomDirection() 
{
  const possibleDirections = ["up","down", "left", "right"];
  const dir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
  
  return dir;
}// getRandomDirection() 

// Function to update the position of all ghosts in the maze
function updateMazeGPos(ghost, ghostElement) 
{
  const cellSize = 8;
  const ghostSize = redGhost.size;
  const halfCellSize = cellSize / 2;;
  const halfGhostSize = ghostSize / 2;

  // Calculate the row and column of the current cell
  var row = Math.floor(ghost.top / cellSize);
  var col = Math.floor(ghost.left / cellSize);

  // Calculate the center position of the current cell
  const cellCenterTop = row * cellSize + halfCellSize;
  const cellCenterLeft = col * cellSize + halfCellSize;
  
  // Calculate the new position of the red ghost
  var xTranslate = cellCenterLeft - halfGhostSize;
  var yTranslate = cellCenterTop - halfGhostSize;

  // Update the CSS position of the red ghost
  ghostElement.style.top = `${yTranslate}px`;
  ghostElement.style.left = `${xTranslate}px`;
}//updateMazeGPos(ghost, ghostElement) 

// Function to update the position of a ghost within the nest
function updateNestGPos(ghost, ghostElement) 
{
/* 
    Template Literals:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        https://www.w3schools.com/js/js_string_templates.asp
    
    Template literals are enclosed by backtick (`) characters 
    instead of double or single quotes.

  Interpolation
    Template literals provide an easy way to interpolate variables and expressions into strings.
    The method is called string interpolation.
    The syntax is:  ${...}

    So, along with having normal strings, 
    template literals can also contain other parts called placeholders, 
    which are embedded expressions delimited by 
    a dollar sign and curly braces: ${expression}.
*/  
  ghostElement.style.top = `${ghost.top}px`;
  ghostElement.style.left = `${ghost.left}px`;
}// updateNestGPos(ghost, ghostElement) 



// ------------------------------------------------ MOVE GHOSTS IN THE NEST/HOUSE and TRANSIT THEM TO MAZE CORRIDORS------------------------------------------------ 
// Initialize transition stage of the blue ghost 
  // from the nest to the maze corridors
var pinkGTransitionStage = 0; // Initialize transition stage for the pink ghost
var blueGTransitionStage = 0; // Initialize transition stage for the blue ghost
var orangeGTransitionStage = 0; // Initialize transition stage for the orange ghost

// Function to move the ghosts inside their house
function moveGhosts() 
{
  if(!isPaused)// If the pause button is not pressed, the three ghosts are not paused, too
  {
    // Move blue,pink and orange ghosts in the nest
      clearInterval(moveGsInterval);
      movePGInterval = setInterval(movePinkGhostInHouse, 160); 
      moveBGInterval = setInterval(moveBlueGhostInHouse, 160); 
      moveOGInterval = setInterval(moveOrangeGhostInHouse, 160);
    

    // Provide separate timeouts for the pink, blue and orange ghosts
      // each timeout is different because they get out of the nest 
      // in different periods of time

    // Pink ghost gets out of the nest in 1 second 
      // after the beginning of the game
      // using the transition stages 
      // in order to enter smoothly the maze corridors
    timeOutPinkG = setTimeout(() => {
      clearInterval(moveGsInterval);
      clearInterval(movePGInterval);
    
      // Go to the next stage of the transition process: from the nest to the maze corridors
      pinkGTransitionStage = 1; 

      // Start moving from the nest/house
      movePGInterval = setInterval(movePinkGhostInHouse, 160); 
      
    }, 1000); // 1000 milliseconds = 1 second

    // Blue ghost gets out of the nest in 3 seconds 
      // after the beginning of the game and after the pink ghost
      // again using the transition stages 
      // in order to enter smoothly the maze corridors
    timeOutBlueG = setTimeout(() => {
      clearInterval(moveGsInterval);
      clearInterval(moveBGInterval);
      
      // Go to the next stage of the transition process: from the nest to the maze corridors
      blueGTransitionStage = 1; 

      // Start moving from the nest/house
      moveBGInterval = setInterval(moveBlueGhostInHouse, 160); 
    }, 3000); // 3000 milliseconds = 3 seconds
        
    // Orange ghost gets out of the nest in 5 seconds 
      // after the beginning of the game and after the pink - and blue ghosts
      // again using the transition stages 
      // in order to enter smoothly the maze corridors
    timeOutOrangeG = setTimeout(() => {
      clearInterval(moveGsInterval);
      clearInterval(moveOGInterval);

      // Go to the next stage of the transition process: from the nest to the maze corridors
      orangeGTransitionStage = 1; 

      // Start moving from the nest/house
      moveOGInterval = setInterval(moveOrangeGhostInHouse, 160);
    }, 5000); // 5000 milliseconds = 5 seconds
  }
}// moveGhosts() 







//----------------------------- MOVE PINK GHOST in the maze and in the nest -------------------------------------------

// A function that moves the pink ghost from the nest to the maze corridors
  // this is called at the very beginning of the game or 
  // when the respawning process of the pink ghost happens
function movePinkGhostInHouse() 
{
  if (!isPaused) 
  {
    // Transition stage 0: Move pink ghost up and down until it gets out of the nest
    if (pinkGTransitionStage === 0) 
    {
      // Moves the ghost up and down until it gets out of the nest
        // taking into account the boundarie sof the ghosts's nest/house
        // like houseTop and houseBottom
      if (pinkGDirection === "up") 
      {
        pinkGhost.top -= ghostSpeedSpace;
        if (pinkGhost.top <= houseTop) 
        {
          pinkGhost.top = houseTop;
          pinkGDirection = "down";
        }
      } 
      else 
      {
        pinkGhost.top += ghostSpeedSpace;
        if (pinkGhost.top >= houseBottom) 
        {
          pinkGhost.top = houseBottom;
          pinkGDirection = "up";
        }
      }
      // Update the position of the pink ghost in the nest
      updateNestGPos(pinkGhost, pinkGhostElement);
      // Change the style of pink ghost's face 
      ghostFaces(pinkGhostElement,pinkGDirection,isGhostFreezed2,isGhostFreezedComesToEnd2, changePGhostMood,changePGFreeze,changePGGrayFreeze);
    } 
    // Transition stage 1: Move orange ghost out of the nest to its new inital position within the maze
    if (pinkGTransitionStage === 1) 
    {
      pinkGDirection = "up";

      pinkGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (pinkGhost.top < 11 * 8) 
      {
        pinkGhost.top = 10.5 * 8;

        // Go to the next transition stage
        pinkGTransitionStage = 2; 
      }
       // Update the position of the pink ghost in the nest
      updateNestGPos(pinkGhost, pinkGhostElement);
      // Change the style of pink ghost's face 
      ghostFaces(pinkGhostElement,pinkGDirection,isGhostFreezed2,isGhostFreezedComesToEnd2, changePGhostMood,changePGFreeze,changePGGrayFreeze);
    }
    // Transition stage 2: Start moving from its new inital position within the maze corridors
    else if(pinkGTransitionStage === 2)
    {
      pinkGDirection = "left";  
      pinkGhost = { top: 11.5 * 8, left: 13.05 * 8};

      // Go to the next transition stage
      pinkGTransitionStage = 3;

      // Update the position of the pink ghost in the maze
      updateMazeGPos(pinkGhost, pinkGhostElement);
      // Change the style of pink ghost's face 
      ghostFaces(pinkGhostElement,pinkGDirection,isGhostFreezed2,isGhostFreezedComesToEnd2, changePGhostMood,changePGFreeze,changePGGrayFreeze);
    }
    // Transition stage 3: Move pink ghost in the maze corridors
    else if(pinkGTransitionStage === 3)
    {
      movePinkGhostInMaze();
    } 
  }
}//movePinkGhostInHouse() 


// Function to move the pink ghost in the maze
function movePinkGhostInMaze() 
{
  // Define the movement step for the red ghost
  const cellSize = 8;
    
  // Coordinates of Pacman and of the Red ghost 
  const pacmanX = (pacmanPos.x);
  const pacmanY = (pacmanPos.y);
  const ghostPX = Math.floor(pinkGhost.left / 8);
  const ghostPY = Math.floor(pinkGhost.top / 8);

  if (
    (pacmanX === ghostPX && pacmanY === ghostPY) //0
    || 
    (pacmanX === ghostPX && pacmanY - 1 === ghostPY) //1
    ||
    (pacmanX - 1 === ghostPX && pacmanY === ghostPY) //2
    || 
    (pacmanX === ghostPX && pacmanY  === ghostPY - 1) //3
    ||
    (pacmanX  === ghostPX - 1 && pacmanY === ghostPY)  //4
  )
  {
    //console.log("Pink ghost killed Pacman.");

    if (!isPacmanMoving()) //If Pacman is still
    {
      if(collision_PnPG != true)
      {
        // Detect the specific collision
        collision_PnPG = true;
        // Pause movement
        isPinkGhostStopped = true;
        isPacmanStopped = true;

        // Do the specific collision method depending on the state
        if(isGhostFreezed2 === true)
        {
          //console.log("483");
          collisionF();
        }
        else
        {
          //console.log("488");
          collision();
        }
      }
    }
  }

  if (!isPinkGhostStopped) // when isPinkGhostStopped is false, do the following thing:
  {
    if (!isPaused) 
    {
      var row = Math.floor(pinkGhost.top / 8);
      var col = Math.floor(pinkGhost.left / 8);

      if(row === 14 && col === 0)  // LEFT to right tunnel corridors
      {
        pinkGhost.top = 112;   //row
        pinkGhost.left = 212;  //col //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
      }  
      // RIGHT to left
      else if (row === 14 && col === 27) // RIGHT to left tunnel corridors
      {
        // Set the red ghost's position to the destination teleportation cell 
        //row - Update the pixel position for top
        pinkGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
        //col -  Update the pixel position for left
        pinkGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
      }
      else
      {
         // Array for the possible moves
        const possibleMoves = [];

        // Check if the movement in each direction is valid
        if (isValidMove(row - 1, col)&& lastPinkGDirection !== "down") 
        {
          possibleMoves.push("up");
        }
        if (isValidMove(row + 1, col) && lastPinkGDirection !== "up") 
        {
          possibleMoves.push("down");
        }
        if (isValidMove(row, col - 1) && lastPinkGDirection !== "right") 
        {
          possibleMoves.push("left");
        }
        if (isValidMove(row, col + 1) && lastPinkGDirection !== "left") 
        {
          possibleMoves.push("right");
        }

        if (possibleMoves.length > 0) 
        {
          // If there are valid moves available, 
            // generate a random one 
            // and update the direction
          const randomIndex = Math.floor(Math.random() * possibleMoves.length);
          pinkGDirection = possibleMoves[randomIndex];

          // Update the cell-based position based on the movement direction
          if (pinkGDirection === "up") 
          {
            pinkGhost.top -= cellSize;
          } 
          else if (pinkGDirection === "down") 
          {
            pinkGhost.top += cellSize;
          } 
          else if (pinkGDirection === "left") 
          {
            pinkGhost.left -= cellSize;
          } 
          else if (pinkGDirection === "right") 
          {
            pinkGhost.left += cellSize;
          }

          // Update the last movement direction
          lastPinkGDirection = pinkGDirection;
        }
        else 
        {
          // If no valid moves are available, 
          // randomly generate a new direction
          pinkGDirection = getRandomDirection();
        }
        // Update the position of the pink ghost in the maze
        updateMazeGPos(pinkGhost, pinkGhostElement);
        // Change the style of red ghost's face 
        ghostFaces(pinkGhostElement,pinkGDirection,isGhostFreezed2,isGhostFreezedComesToEnd2, changePGhostMood,changePGFreeze,changePGGrayFreeze);
      }
    }
  }
}// movePinkGhostInMaze() 


//----------------------------- MOVE BLUE GHOST in the maze and in the nest -------------------------------------------

// A function that moves the blue ghost from the nest to the maze corridors
  // this is called at the very beginning of the game or 
  // when the respawning process of the blue ghost happens
function moveBlueGhostInHouse() 
{
  if (!isPaused) 
  {
    // Transition stage 0: Move blue ghost up and down until it gets out of the nest
    if (blueGTransitionStage === 0) 
    {
      // Moves the ghost up and down until it gets out of the nest
        // taking into account the boundarie sof the ghosts's nest/house
        // like houseTop and houseBottom
      if (blueGDirection === "up") 
      {
        blueGhost.top -= ghostSpeedSpace;
        if (blueGhost.top <= houseTop) 
        {
          blueGhost.top = houseTop;
          blueGDirection = "down";
        }
      } 
      else 
      {
        blueGhost.top += ghostSpeedSpace;
        if (blueGhost.top >= houseBottom) 
        {
          blueGhost.top = houseBottom;
          blueGDirection = "up";
        }
      } 
      // Update the position of the blue ghost in the nest
      updateNestGPos(blueGhost, blueGhostElement);
      // Change the style of blue ghost's face 
      ghostFaces(blueGhostElement,blueGDirection,isGhostFreezed3,isGhostFreezedComesToEnd3, changeBGhostMood,changeBGFreeze,changeBGGrayFreeze);
    }
    // Transition stage 1: Move blue ghost one step right to center it in the nest
    else if (blueGTransitionStage === 1) 
    {
      blueGDirection = "right";

      blueGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (blueGhost.top <= 13 * 8) 
      {
        blueGhost.top = 13 * 8;
        blueGhost.left = 13.05 * 8;

        // Go to the next transition stage
        blueGTransitionStage = 2; 
      }
      // Update the position of the blue ghost in the nest
      updateNestGPos(blueGhost, blueGhostElement);
      // Change the style of blue ghost's face 
      ghostFaces(blueGhostElement,blueGDirection,isGhostFreezed3,isGhostFreezedComesToEnd3, changeBGhostMood,changeBGFreeze,changeBGGrayFreeze);
    } 
    // Transition stage 2: Move blue ghost out of the nest to its new inital position within the maze
    else if (blueGTransitionStage === 2) 
    {
      blueGDirection = "up";
      
      blueGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      
      if (blueGhost.top < 11 * 8) 
      {
        blueGhost.top = 10.5 * 8;

        // Go to the next transition stage
        blueGTransitionStage = 3; 
      }
      // Update the position of the blue ghost in the nest
      updateNestGPos(blueGhost, blueGhostElement);
      // Change the style of blue ghost's face 
      ghostFaces(blueGhostElement,blueGDirection,isGhostFreezed3,isGhostFreezedComesToEnd3, changeBGhostMood,changeBGFreeze,changeBGGrayFreeze);
    }
    // Transition stage 3: Start moving from its new inital position within the maze corridors
    else if(blueGTransitionStage === 3)
    {
      blueGDirection = "left"; 
      // blueGhost.top = 11.5 * 8;
      // blueGhost.left = 13.05 * 8;
      blueGhost = { top: 11.5 * 8, left: 13.05 * 8};
      
      // Go to the next transition stage
      blueGTransitionStage = 4;
      
      // Update the position of the blue ghost in the maze corridors
      updateMazeGPos(blueGhost, blueGhostElement);
      // Change the style of blue ghost's face 
      ghostFaces(blueGhostElement,blueGDirection,isGhostFreezed3,isGhostFreezedComesToEnd3, changeBGhostMood,changeBGFreeze,changeBGGrayFreeze);
    }
    // Transition stage 4: Move blue ghost in the maze corridors
    else if(blueGTransitionStage === 4)
    {
      moveBlueGhostInMaze();
    } 
  }
}// moveBlueGhostInHouse() 


// Function to move the pink ghost in the maze
function moveBlueGhostInMaze() 
{
  // Define the movement step for the red ghost
  const cellSize = 8;
  
  // Coordinates of Pacman and of the Red ghost 
  const pacmanX = (pacmanPos.x);
  const pacmanY = (pacmanPos.y);
  const ghostBX = Math.floor(blueGhost.left / 8);
  const ghostBY = Math.floor(blueGhost.top / 8);

  if (
  (pacmanX === ghostBX && pacmanY === ghostBY) //0
  || 
  (pacmanX === ghostBX && pacmanY - 1 === ghostBY) //1
  ||
  (pacmanX - 1 === ghostBX && pacmanY === ghostBY) //2
  || 
  (pacmanX === ghostBX && pacmanY  === ghostBY - 1) //3
  ||
  (pacmanX  === ghostBX - 1 && pacmanY === ghostBY)  //4
  )
  {
    //console.log("Blue ghost killed Pacman.");

    if (!isPacmanMoving()) 
    {   
      if(collision_PnBG != true)
      {  
        // Detect the specific collision
        collision_PnBG = true;
        // Pause movement
        isBlueGhostStopped = true;
        isPacmanStopped = true;

        // Do the specific collision method depending on the state
        if(isGhostFreezed3 === true)
        {
          // console.log("726");
          collisionF();
        }
        else
        {
          // console.log("731");
          collision();
        }
      }
    }
  }

  if (!isBlueGhostStopped) // when isBlueGhostStopped is false, do the following thing:
  {
    if (!isPaused) 
    {
      var row = Math.floor(blueGhost.top / 8);
      var col = Math.floor(blueGhost.left / 8);

      // LEFT to right
      if(row === 14 && col === 0) 
      {
        blueGhost.top = 112;  //row
        blueGhost.left = 212;  //col //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
      }  
      // RIGHT to left
      else if (row === 14 && col === 27) 
      {
        // Set the red ghost's position to the destination teleportation cell 
        //row - Update the pixel position for top
        blueGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
        //col -  Update the pixel position for left
        blueGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
      }
      else
      {
        // Array for the possible moves
        const possibleMoves = [];

        // // Check if the movement in each direction is valid
        if (isValidMove(row - 1, col) && lastBlueGDirection !== "down") 
        {
          possibleMoves.push("up");
        }
        if (isValidMove(row + 1, col) && lastBlueGDirection !== "up") 
        {
          possibleMoves.push("down");
        }
        if (isValidMove(row, col - 1) && lastBlueGDirection !== "right") 
        {
          possibleMoves.push("left");
        }
        if (isValidMove(row, col + 1) && lastBlueGDirection !== "left") 
        {
          possibleMoves.push("right");
        }

        if (possibleMoves.length > 0) 
        {
          // If there are valid moves available, 
            // generate a random one 
            // and update the direction
          const randomIndex = Math.floor(Math.random() * possibleMoves.length);
          blueGDirection = possibleMoves[randomIndex];

          // Update the cell-based position based on the movement direction
          if (blueGDirection === "up") 
          {
            blueGhost.top -= cellSize;
          } 
          else if (blueGDirection === "down") 
          {
            blueGhost.top += cellSize;
          } 
          else if (blueGDirection === "left") 
          {
            blueGhost.left -= cellSize;
          } 
          else if (blueGDirection === "right") 
          {
            blueGhost.left += cellSize;
          }

          // Update the last movement direction
          lastBlueGDirection = blueGDirection;
        }
        else 
        {
          // If no valid moves are available, 
          // randomly generate a new direction
          blueGDirection = getRandomDirection();
        }
        // Update the position of the blue ghost in the maze
        updateMazeGPos(blueGhost, blueGhostElement);
        // Change the style of blue ghost's face 
        ghostFaces(blueGhostElement,blueGDirection,isGhostFreezed3,isGhostFreezedComesToEnd3, changeBGhostMood,changeBGFreeze,changeBGGrayFreeze);
      }
    }
  }
}//moveBlueGhostInMaze() 


//----------------------------- MOVE ORANGE GHOST in the maze and in the nest -------------------------------------------

// A function that moves the orange ghost from the nest to the maze corridors
  // this is called at the very beginning of the game or 
  // when the respawning process of the orange ghost happens
function moveOrangeGhostInHouse() 
{
  if(!isPaused)
  {
    // Transition stage 0: Move orange ghost up and down until it gets out of the nest
    if(orangeGTransitionStage === 0)
    {
      // Moves the ghost up and down until it gets out of the nest
      // taking into account the boundarie sof the ghosts's nest/house
      // like houseTop and houseBottom
      if (orangeGDirection === "up") 
      {
        orangeGhost.top -= ghostSpeedSpace;
        if (orangeGhost.top <= houseTop) 
        {
          orangeGhost.top = houseTop;
          orangeGDirection = "down";
        }
      } 
      else 
      {
        orangeGhost.top += ghostSpeedSpace;
        if (orangeGhost.top >= houseBottom) 
        {
          orangeGhost.top = houseBottom;
          orangeGDirection = "up";
        }
      }
    // Update the position of the orange ghost in the nest
      updateNestGPos(orangeGhost, orangeGhostElement);
      // Change the style of orange ghost's face 
      ghostFaces(orangeGhostElement,orangeGDirection,isGhostFreezed4,isGhostFreezedComesToEnd4, changeOGhostMood,changeOGFreeze,changeOGGrayFreeze);
    }
    // Transition stage 1: Move orange ghost one step left to center it in the nest
    else if(orangeGTransitionStage === 1)
    {
      orangeGDirection = "left";

      orangeGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (orangeGhost.top <= 13 * 8) 
      {
        orangeGhost.top = 13 * 8;
        orangeGhost.left = 13.05 * 8;

        // Go to the next transition stage
        orangeGTransitionStage = 2;
      }
      // Update the position of the orange ghost in the nest
      updateNestGPos(orangeGhost, orangeGhostElement);
      // Change the style of orange ghost's face 
      ghostFaces(orangeGhostElement,orangeGDirection,isGhostFreezed4,isGhostFreezedComesToEnd4, changeOGhostMood,changeOGFreeze,changeOGGrayFreeze);
    }
    // Transition stage 2: Move orange ghost out of the nest to its new inital position within the maze
    else if(orangeGTransitionStage === 2)
    {
      orangeGDirection = "up";

      orangeGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (orangeGhost.top < 11 * 8) 
      {
        orangeGhost.top = 10.5 * 8;

        // Go to the next transition stage
        orangeGTransitionStage = 3; 
      }
       // Update the position of the orange ghost in the nest
      updateNestGPos(orangeGhost, orangeGhostElement);
      // Change the style of orange ghost's face 
      ghostFaces(orangeGhostElement,orangeGDirection,isGhostFreezed4,isGhostFreezedComesToEnd4, changeOGhostMood,changeOGFreeze,changeOGGrayFreeze);
    }
    // Transition stage 3: Start moving from its new inital position within the maze corridors
    else if(orangeGTransitionStage === 3)
    {
      orangeGDirection = "left"; 
      orangeGhost = { top: 11.5 * 8, left: 13.05 * 8};

      // Go to the next transition stage
      orangeGTransitionStage = 4;

      // Update the position of the orange ghost in the maze corridors
      updateMazeGPos(orangeGhost, orangeGhostElement);
      // Change the style of orange ghost's face 
      ghostFaces(orangeGhostElement,orangeGDirection,isGhostFreezed4,isGhostFreezedComesToEnd4, changeOGhostMood,changeOGFreeze,changeOGGrayFreeze);
    }
    // Transition stage 4: Move orange ghost in the maze corridors
    else if(orangeGTransitionStage === 4)
    {
        moveOrangeGhostInMaze();
    } 
  }
}//moveOrangeGhostInHouse() 


// Function to move the pink ghost in the maze
function moveOrangeGhostInMaze() 
{
  // Define the movement step for the red ghost
  const cellSize = 8;
  
  // Coordinates of Pacman and of the Red ghost 
  const pacmanX = (pacmanPos.x);
  const pacmanY = (pacmanPos.y);
  const ghostOX = Math.floor(orangeGhost.left / 8);
  const ghostOY = Math.floor(orangeGhost.top / 8);

  if (
    (pacmanX === ghostOX && pacmanY === ghostOY) //0
    || 
    (pacmanX === ghostOX && pacmanY - 1 === ghostOY) //1
    ||
    (pacmanX - 1 === ghostOX && pacmanY === ghostOY) //2
    || 
    (pacmanX === ghostOX && pacmanY  === ghostOY - 1) //3
    ||
    (pacmanX  === ghostOX - 1 && pacmanY === ghostOY)  //4
  )
  {
    //console.log("Orange ghost killed Pacman.");

    if (!isPacmanMoving()) 
    {
      if(collision_PnRG != true)
      {
        // Detect the specific collision
        collision_PnOG = true;
        // Pause movement
        isOrangeGhostStopped = true;
        isPacmanStopped = true;

        // Do the specific collision method depending on the state
        if(isGhostFreezed4 === true)
        {
          //console.log("962");
          collisionF();
        }
        else
        {
          //console.log("967");
          collision();
        }
      }
    }
  }

  if (!isOrangeGhostStopped)  // when isOrangeGhostStopped is false, do the following thing:
  {
    if (!isPaused) 
    {
      var row = Math.floor(orangeGhost.top / 8);
      var col = Math.floor(orangeGhost.left / 8);

      if(row === 14 && col === 0) // LEFT to right tunnel corridors
      {
        orangeGhost.top = 112;  //row
        orangeGhost.left = 212; // col //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
      }  
      else if (row === 14 && col === 27) // RIGHT to left tunnel corridors
      {
        // Set the red ghost's position to the destination teleportation cell 
        //row - Update the pixel position for top
        orangeGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
        //col -  Update the pixel position for left
        orangeGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
      }
      else
      {
        // Array for the possible moves
        const possibleMoves = [];

        // Check if the movement in each direction is valid
        if (isValidMove(row - 1, col)&& lastOrangeGDirection !== "down") 
        {
          possibleMoves.push("up");
        }
        if (isValidMove(row + 1, col) && lastOrangeGDirection !== "up") 
        {
          possibleMoves.push("down");
        }
        if (isValidMove(row, col - 1) && lastOrangeGDirection !== "right") 
        {
          possibleMoves.push("left");
        }
        if (isValidMove(row, col + 1) && lastOrangeGDirection !== "left") 
        {
          possibleMoves.push("right");
        }

        if (possibleMoves.length > 0) 
        {
          // If there are valid moves available, 
            // generate a random one 
            // and update the direction
          const randomIndex = Math.floor(Math.random() * possibleMoves.length);
          orangeGDirection = possibleMoves[randomIndex];

          // Update the cell-based position based on the movement direction
          if (orangeGDirection === "up") 
          {
            orangeGhost.top -= cellSize;
          } 
          else if (orangeGDirection === "down") 
          {
            orangeGhost.top += cellSize;
          } 
          else if (orangeGDirection === "left") 
          {
            orangeGhost.left -= cellSize;
          } 
          else if (orangeGDirection === "right") 
          {
            orangeGhost.left += cellSize;
          }

          // Update the last movement direction
          lastOrangeGDirection = orangeGDirection;
        }
        else 
        {
          // If no valid moves are available, 
          // randomly generate a new direction
          orangeGDirection = getRandomDirection();
        }
        // Change the style of orange ghost's face 
        ghostFaces(orangeGhostElement,orangeGDirection,isGhostFreezed4,isGhostFreezedComesToEnd4, changeOGhostMood,changeOGFreeze,changeOGGrayFreeze);
        // Update the position of the orange ghost in the maze
        updateMazeGPos(orangeGhost, orangeGhostElement);
      }
    }
  }
}//moveOrangeGhostInMaze() 





