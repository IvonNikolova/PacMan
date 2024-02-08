//--------------------------------- START and END the game ---------------------------------

// A function that is called when the game starts, like an engine
function startGame() 
{
  // Create an object that represents the starting label 'Ready!'
  const labelReady = document.createElement("div");
  labelReady.classList.add("label-ready");
  maze_container.appendChild(labelReady); // append label Ready
  isReady = true;// the label Ready is shown

// Reset some important game characters details as states, variables and etc.  
  resetMoves();
  resetCherry();
  resetGhosts();
  resetPacman();


  setTimeout(() =>  {
                      maze_container.removeChild(labelReady); // remove label Ready 
                      isReady = false; // the label Ready is no more shown
                    
                      // Remove one of the three given lives of Pacman right after the Ready label dissapear and Pacman starts moving
                      let life_3 = document.getElementsByClassName("life3")[0]; 
                      life_3.style.display = "none";

                      // Resume the movement of Pacman and the ghosts
                      isPacmanStopped = false;
                      isRedGhostStopped = false;
                      isPinkGhostStopped = false;
                      isBlueGhostStopped = false;
                      isOrangeGhostStopped = false;

                      // Call the moveGhosts function at regular intervals
                      moveGsInterval  = setInterval(moveGhosts, 160); 

                      // Call the moveRedGhost function at regular intervals
                      moveRGtInterval = setInterval(moveRedGhostInMaze, 140); // Adjust the interval as needed (in milliseconds)
                      
                      // Call the interval responsible for Pacman's automatic movement initially at the beginning
                      clearInterval(autoMoveInterval);
                      autoMoveInterval = setInterval(movePacman,100);
                      // Update the position of Pacman initially at the beginning
                      update_pacManPos();
                    }, 
            3000); 
}// startGame() 


// A function that is called when the game ends
  // if Pacman lose the game (no more lives left)
  // else if Pacman win the game (no more pellets and gazers left but have some lives left)
function endGame() 
{

  resetMoves();
  resetCherry();

  // Hide the sprite-emojis: Pacman and the ghosts
  pacManEmoji.style.display = "none"; 
  redGhostElement.style.display = "none"; 
  pinkGhostElement.style.display = "none"; 
  orangeGhostElement.style.display = "none"; 
  blueGhostElement.style.display = "none"; 


  if(pacmanDead == true)
  {
    // Show 'Game Over' label in the maze
    const labelGameOver = document.createElement("div");
    labelGameOver.classList.add("label-gameover");
    maze_container.appendChild(labelGameOver);

    // Set timeout for an animation of empty maze blinking blue and white 
    setTimeout(() => {
                        // Remove all objects of the container
                          maze_container.innerHTML = "";
                          mazesInterval = setInterval(endMaze,200);
    
                            // Set a nested timeout thad redirects to the same file i.e. starts the game at the very beginning before the outer timeout ends 
                          setTimeout(() =>  {
                                                clearInterval(mazesInterval);
                                                window.location.href = "game.html";
                                            }, 
                                    3900);
                      }, 
               4000);
  }
  else if(pacmanWinner == true)
  {
     // Display 'Winner' cover and gif on screen-window
    const winwin = document.getElementById("win-window-cover");
    winwin.style.display = "block";
    
    setTimeout(() =>  {  
                        // Hide 'Winner' cover and gif on screen-window
                        winwin.style.display = "none";
                        // Remove all objects of the container
                        maze_container.innerHTML = "";
                
                         // Design-way 1
                        saveScore();
                      },               
              4000);
      
     // Design-way 2
    // setTimeout(() =>  {
    //                     saveHighScore();
    //                   }, 
    //           4500);
  }
}// endGame() 

// A function that reset and clear any intervals and states of the main characters of the game
function resetMoves() 
{
  clearInterval(autoMoveInterval);

  clearInterval(moveRGtInterval);

  clearInterval(moveGsInterval);

  clearInterval(movePGInterval);
  clearInterval(moveBGInterval);
  clearInterval(moveOGInterval);

  isPacmanStopped = true;
  isRedGhostStopped = true;
  isPinkGhostStopped = true;
  isBlueGhostStopped = true;
  isOrangeGhostStopped = true;
}//resetMoves() 

// A function that .reset the appearance of the cherry fruit
function resetCherry() 
{
   // Hidde the cherry if pacman dies once 
   // and the game starts over again 
   // but the cherry was not eaten in the previous life of pacman
   if (cherry) 
   {
     maze_container.removeChild(cherry);
     cherry = null;
     cherryDisplayed = false;
     clearTimeout(cherryTimeout);
   }
}// resetCherry();

// A function that set ghosts' initial details as:
// emoji styles, starting positions and first move
function resetGhosts() 
{
  // vertical line:top is y = column = up and down
  // horizontal line: left is x = row = left and right

  // First move positioning
  redGhost = { top: 11.5 * 8, left: 13.05 * 8, size: 16};
  redGhostElement.classList.add("left1_redGhost");
  redGhostElement.style.position = "absolute";
  redGhostElement.style.top = 10.5 * 8 + "px"; // Starting initial positioning of the red ghost in the maze 
  redGhostElement.style.left = 13.05 * 8 + "px"; // Starting initial positioning of the red ghost in the maze

  // Starting intial positions of the ghosts in the nest 
  blueGhost = { top: 107, left: 11.05 * 8};
  blueGhostElement.classList.add("up1_blueGhost");
  blueGhostElement.style.position = "absolute";
  blueGhostElement.style.top = `${blueGhost.top}px`;
  blueGhostElement.style.left = `${blueGhost.left}px`;
 
  // Starting intial positions of the ghosts in the nest 
  pinkGhost = { top: 107, left: 13.05 * 8};
  pinkGhostElement.classList.add("down1_pinkGhost");
  pinkGhostElement.style.position = "absolute";
  pinkGhostElement.style.top = `${pinkGhost.top}px`;
  pinkGhostElement.style.left = `${pinkGhost.left}px`;

  // Starting intial positions of the ghosts in the nest 
  orangeGhost = { top: 107, left: 15.05 * 8}; 
  orangeGhostElement.classList.add("up1_orangeGhost");
  orangeGhostElement.style.position = "absolute";
  orangeGhostElement.style.top = `${orangeGhost.top}px`;
  orangeGhostElement.style.left = `${orangeGhost.left}px`;

  // The transition stages are reset i.e. all ghosts have to start now from the  ghosts' nest
  pinkGTransitionStage = 0;
  orangeGTransitionStage = 0;
  blueGTransitionStage = 0;
  
  // Reset the ghost movement within the ghosts' nest
  blueGDirection = "up";
  pinkGDirection = "down";
  orangeGDirection = "up";

  // Update their positions
  updateNestGPos(pinkGhost, pinkGhostElement);
  updateNestGPos(blueGhost, blueGhostElement);
  updateNestGPos(orangeGhost, orangeGhostElement);
}//resetGhosts() 

// A function that set Pacman initial details as emoji style, starting positions and first move
function resetPacman()
{
  // Pacman sprite-emoji  
  pacManEmoji.className = "pacman0";
  // Starting iinitial positioning     
  pacManEmoji.style.transform = `translate(${13.05 * 8}px, ${22.5 * 8}px)`;
  // First move after the starting initial positioning
  pacmanPos = { x: 13, y: 23 }; 
}//resetPacman()


