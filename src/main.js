// ************************************************************* MAIN FILE  ************************************************************* 

//--------------------------------- MAZE ---------------------------------
// See 'maze.js' for more.
// The only and only (the most important) container in the code
const maze_container = document.querySelector(".maze");

// Display the visual representation of the cells of the maze
// grid();

// Insert the pellets and power pellets in the maze corridors
insertPellets();

// Finding and removing the pellets and gazers when Pacman eats them 
const pellets = document.querySelectorAll(".dot-pellet");
  // console.log("All inserted Pellets: " + pellets.length); // 240
const gazers = document.querySelectorAll(".gazer-pellet"); 
  // console.log("All inserted Power pellets: " + gazers.length); // 4

// Define a variable or an array to keep track of eaten gazers
var countEatenGazers = 0;
var countEatenPellets = 0;
//--------------------------------- PACMAN ---------------------------------
// See 'pacman.js', 'collisions.js' for more.

// Create a Pacman element and append it to the container
const pacManEmoji = document.createElement("div");
maze_container.appendChild(pacManEmoji);

// Adjusted x and y coordinates of Pacman within th emaze corridors
var x_translate, y_translate;
// The automatic movement interval of Pacman
var autoMoveInterval;

// Define variable to track the previous positions of Pacman 
var previousPacmanPos; 


//--------------------------------- GHOSTS ---------------------------------
// See 'ghosts.js', 'ghostsF.js', 'collisions.js' for more.
// Create the red ghost element in the HTML document and append it to the main container
const redGhostElement = document.createElement("div");
maze_container.appendChild(redGhostElement);
// Create the ghosts' elements in the HTML document and append them to the main container
const blueGhostElement = document.createElement("div");
maze_container.appendChild(blueGhostElement);
const pinkGhostElement = document.createElement("div");
maze_container.appendChild(pinkGhostElement);
const orangeGhostElement = document.createElement("div");
maze_container.appendChild(orangeGhostElement);


// A variables containing the coordinates (top and left) information of each ghost first move
var redGhost, blueGhost, pinkGhost, orangeGhost;

// The ghost movement intervals and timeouts 
var moveRGtInterval;
var moveGsInterval, moveBGInterval, movePGInterval, moveOGInterval;
var timeOutPinkG, timeOutBlueG, timeOutOrangeG;

// Define the movement space/speed for the ghosts
const ghostSpeedSpace = 8;
// Define the movement boundaries for the ghosts within the nest - their house
const houseTop = 12.875 * 8;   //104 // Upper boundary of the house
const houseBottom = 14 * 8;   //128  // Lower boundary of the house 
const houseExit = 12 * 8;


// Define the movement direction for each ghost
var blueGDirection;// = "up";
var pinkGDirection;// = "down";
var orangeGDirection;// = "up";


//--------------------------------- GAME ------------------------------------
// See 'game.js' for more.
// Flag for the Ready label 
var isReady = true; // it is shown by default
// Flags for the Pacman state in the game
var pacmanDead = false, pacmanWinner = false;


// Call the function which starts the game i.e. the game engine
startGame();

//--------------------------------- SCORES ------------------------------------
var scores = 0;
const scoreElement_highscore = document.querySelector('.high-score');
const scoreElement_1up = document.querySelector('.one-up');

//--------------------------------- LEADERBOARD ---------------------------------
// See 'saveScore.js' for more.
// Update the scores in the leaderboard
updateScore();
//Uncomment to clear the local starage of saved scored results whenever we want
// localStorage.clear();



//--------------------------------- ANIMATIONS  ---------------------------------
// See also 'animations.js' for more.
// For the maze animation at the end when Pacman i.e. the player lose the game
const mazes = [ 
  "maze",
  "mazeWhite"
];
var indx_mazes = 0;
var mazesInterval;

//--------------------------------------------------------------------------------
// See also 'cherry.js' and 'buttons.js' for more.