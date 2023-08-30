// ------------------------------------------------ FRUIT: CHERRY  ------------------------------------------------ 
// The cherry object
var cherry = null;
// Set the positions, where the object would appear
var fruitPos = { x: 13.5, y: 23 };
// A tracking flag: if a cherry object is displayed currently
var cherryDisplayed = false; 
 // The timeout ID's variable that hides the cherry object from the maze 
var cherryTimeout = null;

// Tracking flags for each of these three cases 
  // when the cherry should appear within the maze:
let cherryInterval1Displayed = false;  // For the interval range (case 1): (scores >= 50 && scores <= 500)
let cherryInterval2Displayed = false; // For the interval range (case 2): (scores >= 1500 && scores <= 2000)
let cherryInterval3Displayed = false; // For the interval range (case 3): (scores >= 3000 && scores <= 4000)

// A function to insert a fruit: cherry within the maze
function insertCherry()
{
if (!cherryDisplayed) // If it is not already displayed
{
  cherryDisplayed = true;

  // Create and assign the object to 'cherry' 
  cherry = document.createElement("div");


  const cellSize = 8; // the size of each grid cell is 8x8
  const cherrySize = 15; // the size of the fruit sprite-emoji is 16x16

  // Calculate the adjusted position for the cherry within the maze
  const adjusted_x = fruitPos.x * cellSize - (cherrySize - cellSize) / 2;
  const adjusted_y = fruitPos.y * cellSize - (cherrySize - cellSize) / 2;

  // Set class, size details and positions of the element
  cherry.className = "maze_cherry";
  cherry.style.display = "block";

  cherry.style.width = cherrySize + "px";
  cherry.style.height = cherrySize + "px";

  cherry.style.position = "absolute";
  cherry.style.top = adjusted_y + "px";
  cherry.style.left = adjusted_x + "px";

  // Append the element to the maze
  maze_container.appendChild(cherry);

  // Set a timeout to hide the cherry after 5 seconds
  cherryTimeout = setTimeout(() => {
    if (cherry) 
    {
      maze_container.removeChild(cherry);
      cherry = null;
      cherryDisplayed = false;
      clearTimeout(cherryTimeout);
    }
  }, 5000);
}
}

// A function to check if the cherry was eaten by Pacman
function checkCherryEaten() 
{
  const pacmanX = Math.floor(pacmanPos.x);
  const pacmanY = Math.round(pacmanPos.y);

  // console.log("pacmanX = Math.floor(pacmanPos.x): " + pacmanX);
  // console.log("pacmanY = Math.round(pacmanPos.y)" + pacmanY);

  if (cherryDisplayed !== false && 
    (pacmanX === Math.floor(fruitPos.x) || pacmanX === Math.ceil(fruitPos.x)) 
      && pacmanY === Math.round(fruitPos.y)
  ) 
  {
    // Pacman has eaten the cherry
    eatCherry();
  }
}//checkCherryEaten() 


// A function to update the scores status after 'the cherry was eaten' situation
function eatCherry()
{
// Update scores status
  scores += 100;
  scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
  scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding

// Remove the cherry if such exist
  if (cherry) 
  {
    maze_container.removeChild(cherry);
    cherry = null; // Reset the reference
    cherryDisplayed = false; // Reset the flag
  }
} //eatCherry()
