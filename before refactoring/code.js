var points = 0;
/* ***17.06.23***********PACMAN ANIMATION, changing MULTIPLE faces in one cell************** */

/* ********************************* 19.05.2023 **************************************************************** */  

// The values of the objects within the grid  maze 
const WALL_VALUE = 0;
const PELLET_VALUE = 1;
const POWER_PELLET_VALUE = 2;
const NOTHING_VALUE = 3;
const GHOST_NEST_VALUE = 4;

const TUNNEL_TELEPORT_VALUE = 5;
const FRUIT_VALUE = 6;



// The container - 2d array which represents the objects as values 
    // Rows x Columns i.e. 28 x 31 = 868 VALUES
const  GPS_arr = [
  //0 1  2  3  4  5  6 7  8  9 10  11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27
  // 1                                                                                             // Y's       // X's
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//----> 1*8px = 8
  // 2
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],//----> 2*8px = 16
 // 3
 [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],//----> 3*8px = 24
 // 4
 [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0],//----> 4*8px = 32
 // 5
 [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],//----> 5*8px = 40
 // 6
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],//----> 6*8px = 48
 // 7
 [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],//----> 7*8px = 56
 // 8
 [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],//----> 8*8px = 64
 // 9
 [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],//----> 9*8px = 72
 
 // 10
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 10*8px = 80
 // 11
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 11*8px = 88
 
 // 12 - Red GHOST 
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 12*8px = 96
 // 13
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 4, 4, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 13*8px = 104
 // 14
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 4, 4, 4, 4, 4, 4, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 14*8px = 112
 // 15 ---- the tunnel teleport's row, (15,0) and (15,27)
 [5, 5, 5, 5, 5, 5, 1, 3, 3, 3, 0, 4, 4, 4, 4, 4, 4, 0, 3, 3, 3, 1, 5, 5, 5, 5, 5, 5 ],//----> 15*8px = 120
 // 16 
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 4, 4, 4, 4, 4, 4, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 16*8px = 128
 // 17
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 17*8px = 136
 // 18
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 18*8px = 144
 // 19
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 19*8px = 152
 // 20
 [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],//----> 20*8px = 160
 // 21
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],//----> 21*8px = 168
 // 22
 [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],//----> 22*8px = 176
                                                                                      
                                                                                      // ---->22.5*8=180
 // 23
 [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],//----> 23*8px = 184

 // 24,index 23     //startPacMan, first 3 value at index 13, second 3 value at 14
 [0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0], //----> 24*8px = 192
 // 25
 [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],//----> 25*8px = 200
 // 26
 [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],//----> 26*8px = 208
 // 27
 [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],//----> 27*8px = 216
 // 28
 [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],//----> 28*8px = 224
 // 29
 [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],//----> 29*8px = 232
 // 30
 [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],//----> 30*8px = 240
 // 31 
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//----> 31*8px = 248
];



// Add 28*31 i.e. 868 cells divs to the main container i.e. the labyrinth or the so-called maze
const ROWS = 31;  /* 248 maze height / 8 side-size = 31 height cells as rows */
const COLS = 28; /* 224 maze width / 8 side-size = 28 width cells as columns*/
/*
  The .querySelector(".grid"); is a method of the document object 
  that uses a CSS selector to select the first element 
  that matches the specified selector. 
  
  It returns a single element that matches the selector, 
  in this case, the element with the class "grid".
  This method is flexible and allows us to use any CSS selector, 
  including class selectors (.), ID selectors (#), or element selectors.

  On the other hand, 
    .getElementsByClassName() 
  is a method of the document object 
  that returns A COLLECTION of ALL ELEMENTS in the document 
  with the specified class name 
  (the name of the class without dot operator). 
    .getElementsByClassName() 
  returns an HTMLCollection, 
  which is similar to an array of elements. 
  To access individual elements, we have to use array indexing!
    The [0] at the end accesses the first element 
  in the collection returned by .getElementsByClassName(), 
  assuming there is at least one element with the "grid" class.
*/
const grid_container = document.querySelector(".grid");
// const grid_container = document.getElementsByClassName("grid")[0];
for (let row = 0; row < ROWS; row++) 
{
  for (let col = 0; col < COLS; col++) 
  {
/*
    The line: 
        const cell = document.createElement("div"); 
    is used to create a new <div> element in JavaScript 
    and assign it to the variable 'cell' with the const keyword.

    In JavaScript, the:
        document.createElement("div"); 
    method creates a new HTML element with the specified tag name. 
    In this case, it creates a <div> element.

    By using: 
        document.createElement("div");,
    we are dynamically creating a new <div> element in memory. 
    This allows us to programmatically generate 
    and manipulate elements on the fly 
    without directly adding them to the HTML markup.
*/
    const cell = document.createElement("div");
/* 
    By adding the "grid-cells" to the classList of the <div> element, 
    each cell element will inherit the style 
    that corresponds to "grid-cells".

    Using classList.add() allows us to easily add or toggle classes 
    on elements, 
    which can be useful for applying styles, 
    manipulating elements dynamically, 
    or targeting specific elements for event handling 
    or other operations.
*/
    cell.classList.add("grid-cells");

    // Set styling according to the appropriate class depending on the GPS_arr value 
    var value = GPS_arr[row][col];
    if (value === 0) 
    {
      cell.classList.add("boundary");
    } 
    else if(value === 1 || value === 2 || value === 3)
    {
      cell.classList.add("allowed");
    }
    else if(value === 4) 
    {
      cell.classList.add("ghost_nest");
    }
    else if(value === 5) 
    {
      cell.classList.add("tunnel");
    }
    else if(value === 6)
    {
      cell.classList.add("fruits");
    }

/* 
    The line:
        grid_container.appendChild(cell); 
    is used to append the newly created <div> element (cell) 
    as a child to another HTML element - grid_container.

    In the given code, 
        grid_container, 
    refers to an existing HTML element 
    to which you want to append the (cell) element. 

    The appendChild() method is a built-in JavaScript method 
    that allows us to add a child element to a parent element.

    By using:
        grid_container.appendChild(cell);,
    we are appending the 'cell' element as a child 
    to the grid_container element. 

    This means that the 'cell' element will become a nested element 
    within the container element -  grid_container, 
    in the HTML structure.  
*/
  grid_container.appendChild(cell);
  }
}

// NOTE: Each box i.e. cell will be of width 8px
// NOTE: Each box i.e. cell will be of height 8px

const maze_container = document.querySelector(".maze");

function putPellets()
{
// Loop through the maze cells and place the object in a certain locations
for (let i = 0; i < GPS_arr.length; i++) 
{
  for (let j = 0; j < GPS_arr[i].length; j++) 
  {
    if(GPS_arr[i][j] == 1) 
    {
      var pellet = document.createElement("div");
      pellet.className = "dot-pellet";

    // Create a new element of type "img" 
        //var pellet_img = document.createElement("img");
      
    // Provide the image source of the pellet 
    //https://stackoverflow.com/questions/43072372/javascript-gallery-adding-images-with-for-loop
        //pellet_img.setAttribute("src", "./assets/images/pellet" + ".png");
      
    // The coordinates
      //top (position) - vertical lines
      pellet.style.top = i * 8 + "px"; // multiply by 8 to match the grid size
       //left (position) - horizontal lines
      pellet.style.left = j * 8 + "px";

    // Set style to each object
    // https://www.w3schools.com/js/js_htmldom_css.asp
    pellet.style.position = "absolute";
      
    // The pellet element is added to the maze container element
      maze_container.appendChild(pellet);
    }
    else if(GPS_arr[i][j] == 2) 
    {
    // Version 1, Use directly the CSS class for the image of the pellets
      var gazer = document.createElement("div");
      gazer.className = "gazer-pellet";
    // Version 2, Create a new element of type "img" 
          //var power_pellet_img = document.createElement("img");
    // Provide the image source of the power pellet 
    //https://stackoverflow.com/questions/43072372/javascript-gallery-adding-images-with-for-loop
            //power_pellet_img.setAttribute("src", "./assets/images/gazer" + ".png");
      
    // The coordinates
      //top (position) - vertical lines
      gazer.style.top = i * 8 + "px"; // multiply by 8 to match the grid size
      //left (position) - horizontal lines
      gazer.style.left = j * 8 + "px";

    // Set style to each object
    // https://www.w3schools.com/js/js_htmldom_css.asp
      gazer.style.position = "absolute";
      gazer.style.animation = "blink 0.5s infinite";

    // The power pellet element is added to the maze container element
      maze_container.appendChild(gazer);   
    }
    
    
  } 
}
}
putPellets();
 /* **************************************************************** 2.06.2023 **************************************************************** */ 
 /* get info which arrow key is pressed from the keyboard in the console */
//  document.addEventListener('keyup', 
 
//  function(event) {
//   var key = event.key;
//           switch(key) 
//           {
//             case 'ArrowUp':
//               console.log("Up arrow key pressed");

//               break;
//             case 'ArrowDown':
//               console.log("Down arrow key pressed");
//               break;
//             case 'ArrowLeft':
//               console.log("Left arrow key pressed");
//               break;
//             case 'ArrowRight':
//               console.log("Right arrow key pressed");
//               break;
//           }
// }
// );




/* **************************************************************** 12.-13.06.2023 **************************************************************** */


// Create a starting Pacman element 
var startingPacManEmoji = document.createElement("div");

startingPacManEmoji.style.position = "absolute";
startingPacManEmoji.className = "pacman0";
// Initial position of Pacman
startingPacManEmoji.style.top = 22.5 * 8 + "px";
startingPacManEmoji.style.left = 13.05 * 8 + "px";
// Add the Pacman element to the maze
maze_container.appendChild(startingPacManEmoji);

// Create a Pacman element 
var pacManEmoji = document.createElement("div");


// JavaScript Object Properties
// https://www.w3schools.com/js/js_object_properties.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects
var pacmanPos = { x: 13, y: 23 };  //  Using object initializers we set initial row and column
/*
About transform :
  https://www.w3schools.com/css/css3_2dtransforms.asp

About translate :
  https://www.w3schools.com/cssref/css_pr_translate.php
  https://stackoverflow.com/questions/68901453/how-to-translate-img-from-its-position-on-button-click
  https://stackoverflow.com/questions/32634715/using-css-transform-translate-with-reactjs

About ${} :
  https://css-tricks.com/template-literals/#:~:text=The%20%24%7B%7D%20syntax%20allows%20us,Literal%20for%20the%20name%20variable.
*/
pacManEmoji.style.transform = `translate(${pacmanPos.x * 8}px, ${pacmanPos.y * 8}px)`;




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

 /* **************************************************************** 14-15.06.2023 **************************************************************** */ 
const scoreElement_highscore = document.querySelector('.high-score');
const scoreElement_1up = document.querySelector('.one-up');

var scores = 0;
var scoresPellets = 0;
var scoresGazers = 0;
 /* **************************************************************** 14-15.06.2023 **************************************************************** */ 

const container = document.querySelector(".maze");

const pellets = container.querySelectorAll(".dot-pellet");
// console.log("All inserted Pellets: " + pellets.length); // 240

const gazers = document.querySelectorAll(".gazer-pellet"); 
// console.log("All inserted Power pellets: " + gazers.length); // 4



function findPelletAtCoordinates(x, y) 
{
  for (let i = 0; i < pellets.length; i++)  // pellts.length =  240
  {
    const pellet = pellets[i];
    const pelletPositionX = parseInt(pellet.style.left) / 8;
    const pelletPositionY = parseInt(pellet.style.top) / 8;

    if (pelletPositionX === x && pelletPositionY === y) 
    {
      return pellet;
    }
  }
  // Return null if at that position no pellet is found 
  return null; 
}

// Find a gazer at the input x and y coordinates
function findGazerAtCoordinates(x, y) 
{
  for (let i = 0; i < gazers.length; i++)  // gazers.length =  4
  {
    const gazer = gazers[i];
    const gazerPositionX = parseInt(gazer.style.left) / 8;
    const gazerPositionY = parseInt(gazer.style.top) / 8;

    if (gazerPositionX === x && gazerPositionY === y) 
    {
      return gazer;
    }
  }
  // Return null if at that position no gazer is found 
  return null; 
}



// --------------------------- EATEN GAZER -> BLUE GHOST 6.08.2023 ---------------------------
// Define a variable or an array to keep track of eaten gazers
var countEatenGazers = 0;
var countEatenPellets = 0;

// Flag to track if the ghost is freezed
var isGhostFreezed = false; 
var isGhostFreezedComesToEnd = false;

// Variable to keep track of the remaining time for the FREEZED state
var remainingFreezeTime = 0; 
let freezeTimerId = null; // To store the timer ID



//+++++++++++++++++++++++
// Original interval values for each ghost
const originalIntervals = {
  redG: 160, // Adjust this value as needed
  pinkG: 160, // Adjust this value as needed
  blueG: 160, // Adjust this value as needed
  orangeG: 160 
};
const frozenSpeed = 250;

// Function to handle gazer eating
function isEatenGazer() 
{
  // Your logic to detect gazer eating goes here
  
  // For example, when Pacman eats a gazer:
  countEatenGazers++; // Increment the number of eaten gazers (1, 2, 3, or 4)

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

//+++++++++++++++++++++++
    const originalInterval = originalIntervals.redG; // Change this based on the ghost
    // Make the ghost move slower during the freeze time
    clearInterval(redGInterval);
    redGInterval = setInterval(moveRedGhost, frozenSpeed); // Adjust this interval value




    // Start a new timer with the current gazer freeze time
    freezeTimerId = setTimeout(() => {
      isGhostFreezed = false;
      remainingFreezeTime = 0;

//+++++++++++++++++++++++
      // Return the ghost movement to the original speed
      clearInterval(redGInterval);
      redGInterval = setInterval(moveRedGhost, originalInterval);
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
//----------2 PINK--------------------------------
// Flag to track if the ghost is freezed
var isGhostFreezed2 = false; 
var isGhostFreezedComesToEnd2 = false;

// Variable to keep track of the remaining time for the FREEZED state
var remainingFreezeTime2 = 0; 
let freezeTimerId2 = null; // To store the timer ID


// Function to handle gazer eating
function isEatenGazer2() 
{
  // Your logic to detect gazer eating goes here

  
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
    clearInterval(moveG);
    clearInterval(movePG);
    movePG = setInterval(movePinkGhostInHouse, frozenSpeed); 


    // Start a new timer with the current gazer freeze time
    freezeTimerId2 = setTimeout(() => {
      isGhostFreezed2 = false;
      remainingFreezeTime2 = 0;

//+++++++++++++++++++++++
      // Return the ghost movement to the original speed
clearInterval(moveG);
 clearInterval(movePG);
 movePG = setInterval(movePinkGhostInHouse, originalInterval2); 
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

//----------3 BLUE--------------------------------
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
    clearInterval(moveG);
    clearInterval(moveBG);
    moveBG = setInterval(moveBlueGhostInHouse, frozenSpeed); 


    // Start a new timer with the current gazer freeze time
    freezeTimerId3 = setTimeout(() => {
      isGhostFreezed3 = false;
      remainingFreezeTime3 = 0;
//+++++++++++++++++++++++
      // Return the ghost movement to the original speed
      clearInterval(moveG);
      clearInterval(moveBG);
      moveBG = setInterval(moveBlueGhostInHouse, originalInterval3); 

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

//----------4 ORANGE--------------------------------
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
clearInterval(moveG);
clearInterval(moveOG);
moveOG = setInterval(moveOrangeGhostInHouse, frozenSpeed); 

    // Start a new timer with the current gazer freeze time
    freezeTimerId4 = setTimeout(() => {
      isGhostFreezed4 = false;
      remainingFreezeTime4 = 0;

//+++++++++++++++++++++++
      // Return the ghost movement to the original speed
      clearInterval(moveG);
      clearInterval(moveOG);
      moveOG = setInterval(moveOrangeGhostInHouse, originalInterval4); 


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

// // Function to handle gazer eating
// function isEatenGazer() 
// {
//   // Your logic to detect gazer eating goes here

//   // For example, when Pacman eats a gazer:
//   countEatenGazers++; // Increment the number of eaten gazers (1, 2, 3, or 4)

//   // Set the freeze time for the current gazer to 5 seconds
//   const currentGazerFreezeTime = 5000;

//   // Add the freeze time of the current gazer to the total remaining freeze time
//   remainingFreezeTime += currentGazerFreezeTime;

//   // If the ghost is not already in the FREEZED state, 
//   //set it to FREEZED and start the timer
//   if (!isGhostFreezed) 
//   {
//     isGhostFreezed = true;

//     // Start the timer to unfreeze the ghost after the remaining freeze time
//     freezeTimerId = setTimeout(() => {
//       isGhostFreezed = false;
//       remainingFreezeTime = 0;
//     }, remainingFreezeTime);

//   } 
//   else 
//   {
//   // If the ghost is already freezed, 
//     // clear the existing timer 
//     clearTimeout(freezeTimerId);
//     // and start a new one with the updated remaining freeze time
//     freezeTimerId = setTimeout(() => {
//       isGhostFreezed = false;
//       remainingFreezeTime = 0;
//     }, currentGazerFreezeTime);
//   }

//   // Other actions you want to perform when a gazer is eaten
// }




var cherryDisplayed = false; // Flag to track if a cherry is currently displayed
var cherryTimeout = null; // To store the timeout ID for hiding the cherry

var cherry = null;

var isCherryEaten = false;

var fruitPos = { x: 13.5, y: 23 }; //  Using object initializers we set initial row and column
var isFunctionInvoked = false;



// Check if the taken step is allowed
  // considering the maze boundaries and its walls
function isallowedStep(pos) 
{
  
  // Ensure that the position is in the boundaries of the maze
  // y rows
  // x columns
  if (pos.x >= 0 && pos.x < 28 && pos.y >= 0 && pos.y < 31) 
  {
    // console.log("Pacman positions: " + pos.y + "," + pos.x);
    // Ensure that the position is not a wall
    // if (GPS_arr[pos.y][pos.x] !== 0) // 0's are the walls
    // {
    //   return true; // the step is allowed
    // }

    if (GPS_arr[pos.y][pos.x] !== 0 && GPS_arr[pos.y][pos.x] !== 4) // It is NOT a 0 i.e. wall
    {
      if(GPS_arr[pos.y][pos.x] === 1 || GPS_arr[pos.y][pos.x] === 2)
      {
          /*
  1.  scores: It is assumed that scores is a variable that holds the score value, 
      possibly as a number or string.

  2. scores.toString(): The toString() method is called on the scores variable to convert 
      the score value to a string. 
      This is necessary because the padStart() method works with strings.

  3. padStart(4, '0'): The padStart() method is called on the string representation of the score. 
      It adds leading zeros to the string to ensure that it has a minimum length of 4 characters.
        -> 4: The first argument to padStart() is the target length of the resulting string. 
        In this case, it is set to 4, indicating that 
        the final string should have a minimum length of 4 characters.
        -> '0': The second argument is the padding string that will be added to the start of the string. 
        In this case, it is set to '0', meaning that leading zeros will be added.
        For example, if the score is 12, the padStart() method will add two leading zeros to make it 0012. 
        If the score is 1234, no padding will be added since it already has four digits.

  4. scoreElement_highscore.textContent: Assuming that result references an element in the DOM, 
        the textContent property is used to set the text content of that element.
              textContent: It represents the plain text content of an element, excluding any HTML tags. 
              By assigning a value to this property, the displayed text of the element will be updated.


        In summary, the line of code you provided takes the scores variable,
          converts it to a string, adds leading zeros to ensure a minimum length of 4 characters, 
          and then updates the text content of the result element with the formatted score value.
  */
          if(GPS_arr[pos.y][pos.x] === 1) // Pellet cell
          {
          // Provide the Pacman coordinates / positions i.e. which pellet he just ate 
            // if such exists 
            const pelletAtPos = findPelletAtCoordinates(pos.x, pos.y); 
            if (pelletAtPos) // if it exists i.e. it is different than null
            {
              // The pellet at the specific position was just eaten
              // we should no more display it
              pelletAtPos.style.display = "none";
             
            }
          
            countEatenPellets++; 
            // Count the points
          scores += 10; 
            
        }
        
        if(GPS_arr[pos.y][pos.x] === 2) // Gazer cell 
        {
          // Provide the Pacman coordinates / positions i.e. which gazer he just ate 
            // if such exists
            const gazerAtPos = findGazerAtCoordinates(pos.x, pos.y);
            
            if (gazerAtPos)  // if it exists i.e. it is different than null
            {
              // Increase the number of eaten gazers
              isEatenGazer();
              isEatenGazer2();
              isEatenGazer3();
              isEatenGazer4();
              // The gazer at the specific position  was just eaten
                // we should no more display it
              gazerAtPos.style.display = "none";
            }

           
           
            // Count the points of each eaten gazer
            scores += 50;


           
        }

        // Scores
          scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
          scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
      
          // console.log("Scores: " + scores);
         
          if (!cherryDisplayed && (scores >= 50 && scores <= 500) && !cherryInterval1Displayed) 
          {
            cherryInterval1Displayed = true;
            insertCherry();
          } 
          else if (!cherryDisplayed && (scores >= 1000 && scores <= 2500) && !cherryInterval2Displayed) 
          {
            cherryInterval2Displayed = true;
            insertCherry();
          } 
          else if (!cherryDisplayed && (scores >= 3500 && scores <= 5000) && !cherryInterval3Displayed) 
          {
            cherryInterval3Displayed = true;
            insertCherry();
          }
          

    
        


        }
          // Avoid multiple score counting and eating of the same gazer
          GPS_arr[pos.y][pos.x] = 3;// it is NO more a PALLET (1) or a GAZER (2)  value

          return true; // the step is allowed
        }

      }// end of if value is 1 OR 2, pellet OR gazer

     

      if(GPS_arr[pos.y][pos.x] === 3 || GPS_arr[pos.y][pos.x] === 5) //Empty cell || Tunnel cell 
      {
        // Do nothing special 
          // just pass through the empty cells or tunnel ones
        return true; // the step is allowed
      }

      

          // Fruits 
          
          // print out the number of the eaten gazers until now
         // console.log("GAZERS = " + countEatenGazers);
         // console.log("PELLETS = " + countEatenPellets);
         
        //  if(countEatenGazers === 4 && countEatenPellets === 240)
        //  {
           

        //    alert("WINNER!");
        //    pacmanWinner = true;
        //    pacmanDead = false;
        //    gameOverlabel();
        //    // saveHighScore();

        //  }


        // console.log("++++countEatenGazers =  "+countEatenGazers);
        // console.log("++++countEatenPellets =  "+countEatenPellets);

        // if(countEatenGazers === 4 && countEatenPellets === 240 )
        // {
        //   alert("WINNER!");
        //   pacmanWinner = true;
        //   pacmanDead = false;
        //   gameOverlabel();
        // }
      return false; //  the step is not allowed    
  }

 



 

  let cherryInterval1Displayed = false; // Flag for interval range 1
  let cherryInterval2Displayed = false; // Flag for interval range 2
  let cherryInterval3Displayed = false; // Flag for interval range 3
  
function insertCherry()
{
  

  if (!cherryDisplayed )
  {
   // isShownCherry = 1;
    cherryDisplayed = true;

  cherry = document.createElement("div");
  // cherry1.classList.add("maze_cherry");
  
  // Initial position of the cherry
  // cherry1.style.top = fruitPos.y * 8 + "px";
  // cherry1.style.left = fruitPos.x * 8 + "px";
  // alert("cherry!");
  // console.log(GPS_arr[13][23]);


  const cellSize = 8; // the size of each grid cell is 8x8
  const cherrySize = 15; // the size of the fruit sprite-emoji is 16x16

  // const x_offset = (cell_size - fruit_size) / 2; //8-16/2 = -8/2 = -4
  // const y_offset = (cell_size - fruit_size) / 2; 

  // // Calculate the translated position
  // const x_translate = fruitPos.x * cell_size + x_offset;
  // const y_translate = fruitPos.y * cell_size + y_offset;


  // Calculate the adjusted position for the cherry within the maze
  const adjustedX = fruitPos.x * cellSize - (cherrySize - cellSize) / 2;
  const adjustedY = fruitPos.y * cellSize - (cherrySize - cellSize) / 2;

  // Set the position of the existing and fruit  element
  // cherry1.style.transform = `translate(${x_translate}px, ${y_translate}px)`;

 
  cherry.className = "maze_cherry";
  cherry.style.position = "absolute";
  cherry.style.display = "block";

  cherry.style.width = cherrySize + "px";
  cherry.style.height = cherrySize + "px";
  cherry.style.top = adjustedY + "px";
  cherry.style.left = adjustedX + "px";

  // GPS_arr[23][13] = 6;
  // GPS_arr[23][14] = 6;
  maze_container.appendChild(cherry);



  // const cherrySize = 15; // Size of the cherry image (15x15 pixels)
  // const cellSize = 8; // Size of each maze cell (8x8 pixels)

  // Calculate the adjusted position for the cherry within the maze
  // const adjustedX = fruitPos.x * cellSize - (cherrySize - cellSize) / 2;
  // const adjustedY = fruitPos.y * cellSize - (cherrySize - cellSize) / 2;

  // Create a new cherry image element
  // const cherry = document.createElement("img");
  // cherry.src = "cherry.png"; // Replace "cherry.png" with the actual path to your cherry image
  // cherry.className = "maze_cherry";
  // cherry.style.position = "absolute";
  // cherry.style.visibility = "visible";


  // Add the cherry image element to the maze container
  // container.appendChild(cherry);



  // cherries = container.querySelectorAll(".maze_cherry");
  // var len = cherries.length;

  // console.log("All inserted Cherries: " + len); // 240


  // Set a timeout to hide the cherry after 10 seconds
    // Set a timeout to hide the cherry after 10 seconds
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



/* **************************************************************** 17.06.2023 **************************************************************** */
// https://makersaid.com/array-of-images-in-javascript/

// Define the three Pacman images of eating moods
const allEatingMoods = [ //allEatingMoods.length is 3
  "pacman",
  "pacman2",
  "pacman0"
];

var indx_mood = 0;

// var eatingMoodsTimeout = null;
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

 
  //setTimeout(eatingMoods, 100); // way 1 - CHANGING MULTIPLE FACES in ONE CELL
 // nothing // way 2 - CHANGING ONE BY ONE FACES i.e. ONE FACE EACH CELL
}
var x_translate, y_translate;

// Function to update Pacman's position in the DOM
function update_pacManPos() 
{

/* Insert the PacMan sprite-emoji correctly within maze corridors */
  const cell_size = 8; // the size of each grid cell is 8x8
  const pacman_size = 15; // the size of the Pacman sprite-emoji is 15x15

  // Calculate the centering offsets
  /*
    Note: This formula is created and combined of the pros(+) from the ways 
    of the code from 4-5.06.2023:
      Way 1 - WHAT I WANT for my 15x15 Pacman sprite-emoji,
        (+) The visually correct positioning
        (-) Worse STEPS value i.e. 4, than the needed 8 because of each cell size!

      Way 2 - NOT EXACTLY what I want for my 15x15 Pacman sprite-emoji
        (-) The positioning is wrong 
        (+) Better STEPS value i.e. 8, than 4!
  */

  // Here, we define each step to be 3.5 instead of 4 like in WAY 1
  // because this Pacman sprite-emoji size is 15x15 
  // not like in earlier styling code when the Pacman sprite-emoji was 16x16, so, (-8) / 2 = 4 (earlier case)
  const x_offset = (cell_size - pacman_size) / 2; // (-7) / 2 = 3.5
  const y_offset = (cell_size - pacman_size) / 2; // (-7) / 2 = 3.5

  // Calculate the translated position
    x_translate = pacmanPos.x * cell_size + x_offset;
    y_translate = pacmanPos.y * cell_size + y_offset;

  // Use another one Pacman sprite-emoji which is the main one
  //pacManEmoji.className = "pacman";
  // pacManEmoji.classList.add(allEatingMoods[indx_mood]);

  // maze_container.appendChild(pacManEmoji);

  // Set the position of the existing and main Pacman element
  pacManEmoji.style.transform = `translate(${x_translate}px, ${y_translate}px)`;

//   console.log("Pacman positions: " + pacmanPos.x + "," + pacmanPos.y);
//   console.log("Pacman translate-positions: " + x_translate + "," + y_translate);

// previousPacmanPos = { x: pacmanPos.x, y: pacmanPos.y };
// console.log("previousPacmanPos: ", JSON.stringify(previousPacmanPos));

//extractPPositionValues(x_translate, y_translate);

  // Modify the style properties based on movement direction
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
  
/*
    If we place the setTimeout(movePacman, 200) 
    inside the movePacman() function, 
    it means that the timeout will be set after each movement of the pacman.
    
    This can lead to a delay between each movement, 
    causing the pacman to move in a jerky manner.

    On the other hand, 
    by placing the setTimeout(movePacman, 200) 
    inside the updatePacmanPosition function, 
    the timeout is set after updating the pacman's position 
    and animating it. 

    This ensures a consistent delay between each animation frame, 
    resulting in smoother movement.
*/ 
/*   
  setTimeout  vs  setInterval

  setTimeout(expression, timeout); 
      runs the code/function once after the timeout.

  setInterval(expression, timeout); 
      runs the code/function repeatedly, 
      with the length of the timeout between each repeat.
*/
}



function moveRight() 
{
  if(pacmanPos.x === 27 && pacmanPos.y === 14) 
  {
    const newPos = { x: 0, y: 14 };
    // if (isallowedStep(newPos)) 
    // {
    //   // Update Pacman's position
    //   pacmanPos = newPos;
    //   update_pacManPos();
    // }
    return newPos;
  }
  else 
  {
    const newPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
    // if (isallowedStep(newPos)) {
    //   pacmanPos = newPos;
    //   update_pacManPos();
    // }
    return newPos;
 }
}

function moveLeft() 
{

  if(pacmanPos.x === 0 && pacmanPos.y === 14) 
  {
    const newPos = { x: 27, y: 14 };

    // if (isallowedStep(newPos)) 
    // {
    //   // Update Pacman's position
    //   pacmanPos = newPos;
    //   update_pacManPos();
    // }
    return newPos;
  }
  else
  {
    const newPos = { x: pacmanPos.x - 1, y: pacmanPos.y }; //left
    // if (isallowedStep(newPos)) {
    //   pacmanPos = newPos;
    //   update_pacManPos();
    // }
    return newPos;
  }
}



function moveUp() 
{
  const newPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
  // if (isallowedStep(newPos)) {
  //   pacmanPos = newPos;
  //   update_pacManPos();
  // }
  return newPos;
}

function moveDown() 
{
  const newPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
  // if (isallowedStep(newPos)) {
  //   pacmanPos = newPos;
  //   update_pacManPos();
  // }

  return newPos;
}





// var isPaused = false;

// const pauseButton = document.getElementById("pause");
// const resumeButton = document.getElementById("resume");

// pauseButton.addEventListener("click", pauseGame);
// resumeButton.addEventListener("click", resumeGame);

// function pauseGame() 
// {
//   isPaused = true;
// }
// function resumeGame() 
// {
//   isPaused = false;
// }

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
var isReady = false;
var hasInitialKeyPress = false;
var moveG;
var eatingInterval;
var isPacmanStopped = false;


function movePacman() 
{
  if (isPaused === true) 
  {
    // clearInterval(moveG);
    // moveG = null;
    return;
  }
  else
  {
   // moveG = setInterval(moveG,150);
    // clearInterval(moveG);


    previousPacmanPos = { x: pacmanPos.x, y: pacmanPos.y };
    //console.log("previousPacmanPos: ", JSON.stringify(previousPacmanPos));
  // Determine the next position based on the current direction
   

    
if(isReady)
{

  //console.log("movePacman: ghosts' state:" + isGhostFreezed);
      const pacmanX = (pacmanPos.x);
      const pacmanY = (pacmanPos.y);

      const ghostRX = Math.floor(redGhost.left / 8);
      const ghostRY = Math.floor(redGhost.top / 8);
      

      const ghostPX = Math.floor(pinkGhost.left / 8);
      const ghostPY = Math.floor(pinkGhost.top / 8);

      const ghostBX = Math.floor(blueGhost.left / 8);
      const ghostBY = Math.floor(blueGhost.top / 8);
      
      const ghostOX = Math.floor(orangeGhost.left / 8);
      const ghostOY = Math.floor(orangeGhost.top / 8);
      

      if (
        (pacmanX === ghostRX && pacmanY === ghostRY) //0
        || 
        (pacmanX === ghostRX && pacmanY - 1 === ghostRY) //1
        ||
        (pacmanX - 1 === ghostRX && pacmanY === ghostRY) //2
        || 
        (pacmanX === ghostRX && pacmanY  === ghostRY - 1) //3
        ||
        (pacmanX  === ghostRX - 1 && pacmanY === ghostRY)  //4
       
      )
        {
          console.log("movePacman:Pacman and red ghost.");
      
          collisionOccurred = true;
          // Pause red ghost movement
          isRedGhostStopped = true;
          isPacmanStopped = true;

          if(isGhostFreezed === true)
          {
            console.log("movePacman: 1440 synchF");
            synchronizeModificationF();
          }
          else if(isGhostFreezed === false && collisionOccurred === true)
          {
            console.log("movePacman: 1444 synch");
            synchronizeModification();
          }
    
      }

      
      else if (
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
        console.log("movePacman:Pacman and pink ghost.");
    
        collisionOccurred2 = true;
        // Pause red ghost movement
   
        isPinkGhostStopped = true;
        isPacmanStopped = true;
     
        if(isGhostFreezed2 === true)
        {
          console.log("movePacman: 1474 synchF");
          synchronizeModificationF();
        }
        else if(isGhostFreezed2 === false && collisionOccurred2 === true)
        {
          console.log("movePacman: 1479 synch");
          
          synchronizeModification();
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
        (pacmanX  === ghostBX - 1 && pacmanY === ghostBY)  //4
       
      )
        {
          console.log("movePacman:Pacman and blue ghost.");
      
          collisionOccurred3 = true;
          // Pause red ghost movement
         
          isBlueGhostStopped = true;
          isPacmanStopped = true;
          
          if(isGhostFreezed3 === true)
          {
            console.log("movePacman: 1509 synchF");
            synchronizeModificationF();
          }
          else if(isGhostFreezed3 === false && collisionOccurred3 === true)
          {
            console.log("movePacman: 1514 synch");
           
            synchronizeModification();
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
        (pacmanX  === ghostOX - 1 && pacmanY === ghostOY)  //4
       
      )
        {
          console.log("Pacman and orange ghost.");
      
          collisionOccurred4 = true;
          // Pause red ghost movement
          isOrangeGhostStopped = true;
          isPacmanStopped = true;
         
          if(isGhostFreezed4 === true)
          {
            console.log("movePacman: 1542 synchF");
            synchronizeModificationF();
          }
          else if(isGhostFreezed4 === false && collisionOccurred4 === true)
          {
            console.log("movePacman: 1546 synch");
           
            synchronizeModification();
          }
      }



  

 

    if(isPacmanStopped === false)
    {
//console.log("!isPacmanStopped = ", !isPacmanStopped);

      let nextPos;

      if (currentDirection === DIRECTION.UP) 
      {
        //nextPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
        nextPos = moveUp();
      } 
      else if (currentDirection === DIRECTION.DOWN) 
      {
        //nextPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
        nextPos = moveDown();
      } 
      else if (currentDirection === DIRECTION.LEFT) 
      {
        //nextPos = { x: pacmanPos.x - 1, y: pacmanPos.y };
        nextPos = moveLeft();
      } 
      else if (currentDirection === DIRECTION.RIGHT) 
      {
        //nextPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
        nextPos = moveRight();
      }
      // console.log("++++countEatenGazers =  "+countEatenGazers);
      // console.log("++++countEatenPellets =  "+countEatenPellets);

      if(countEatenGazers === 4 && countEatenPellets === 240 )
      {
        alert("WINNER!");
        pacmanWinner = true;
        pacmanDead = false;
        gameOverlabel();
      }
    
      // Check if the next position is allowed
      if (!isPaused && isallowedStep(nextPos)) 
      {
        pacmanPos = nextPos;
        update_pacManPos();
        
        eatingInterval = eatingMoods(); //setTimeout(eatingMoods, 100); // way 2 - CHANGING ONE BY ONE FACES i.e. ONE FACE EACH CELL
        // nothing here   // way 1 - CHANGING MULTIPLE FACES in ONE CELL
        // moveG = setInterval(moveG,150);

        // Check if Pacman has eaten the cherry
        if (cherryDisplayed !== false)
        {
console.log("Cherry is somewhere in the maze!");
          checkCherryEaten(); 
        }
        else if(cherryDisplayed === true)
        {
console.log("Cherry is still NOT shown! ");
        }

        
      } 
      else 
      {
        // Pacman hit a wall, stop automatic movement
        clearInterval(autoMoveInterval);
        autoMoveInterval = null;

       
      }

      
    }
   
    
    }
  } 
}



document.addEventListener("keydown", function (event) 
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
  if (!autoMoveInterval && !isPaused)
  {
    
   

    autoMoveInterval = setInterval(
                                    function () 
                                    {
                                      if (nextDirection) 
                                      {
                                        // Check if the next direction is valid
                                        const nextPos = getNextPos(nextDirection);
                                        // if next direction is valid,
                                          // save next direction as a current direction
                                          // and clear next direction content for later
                                        if (isallowedStep(nextPos)) 
                                        {
                                          currentDirection = nextDirection;
                                          nextDirection = null;
                                        }
                                      }
                                    
                                      movePacman();
                                     
                                    }// function ()

                                    ,100 // The general speed of Pacman in the corridors 
                                  );
    
  }



  // Set the current direction if the user presses a key at the very beginning
  if (!hasInitialKeyPress && !isPaused && !isReady) // while isReady label is shown on screen 
   {
 
    
    hasInitialKeyPress = true;
    if (key === "ArrowRight") 
    {
      currentDirection = DIRECTION.RIGHT;
    }
  }

  event.preventDefault();
});

function getNextPos(direction) 
{
  let nextPos;
  if (direction === DIRECTION.UP) 
  {
    //nextPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
    nextPos = moveUp();
  } 
  else if (direction === DIRECTION.DOWN) 
  {
    //nextPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
    nextPos = moveDown();
  } 
  else if (direction === DIRECTION.LEFT)
  {
    // nextPos = { x: pacmanPos.x - 1, y: pacmanPos.y };
    nextPos = moveLeft();
  } 
  else if (direction === DIRECTION.RIGHT) 
  {
    // nextPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
    nextPos = moveRight();
  }
  return nextPos;
}




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

    eatCherry();

    // console.log("****************da!****************");
    
    // // Pacman has eaten the cherry
    // // Perform the desired actions here, such as updating the score, removing the cherry, etc.
    // // You can remove the cherry by removing its element from the DOM, for example:
    // //cherry1.parentNode.removeChild(cherry1);

    // cherry1.style.display = "none";
    // cherry1 = null;
 
  }
}

function eatCherry()
{
  // console.log("****************eat cherry da!****************");
  // Increment points
  scores += 100;
  scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
  scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding

  
  if (cherry) 
  {
    maze_container.removeChild(cherry);
    cherry = null; // Reset the reference
    cherryDisplayed = false; // Reset the flag
  }
}



// // Call the function to update the position of Pacman initially
// update_pacManPos();

// Start the automatic movement of Pacman
let autoMoveInterval = setInterval(movePacman,100);




// ------------------------------------------------ PAUSE  ------------------------------------------------ 


const pauseCover = document.getElementById("pause-window-cover");
const buttonsMode = document.getElementById("buttons");
let isPaused = false;

function switchButtonsMode() 
{
  if (isPaused === true) 
  {
    isPaused = false;
    buttonsMode.classList.remove("resume");
    buttonsMode.classList.add("pause");
    

    pauseCover.style.display = "none"; // Hide the pause overlay
  } 
  else if (isPaused === false) 
  {
    isPaused = true;
    buttonsMode.classList.remove("pause");
    buttonsMode.classList.add("resume");

    pauseCover.style.display = "block"; // Show the pause window cover

  }
}

document.addEventListener("keydown", 
  function (event) 
  {
    if (event.code === "Space") 
    {
      switchButtonsMode(); 
    }
  }
);

buttonsMode.addEventListener("click", switchButtonsMode);

// ------------------------------------------------ RESTART GAME ------------------------------------------------ 

document.getElementById('restart').addEventListener('click', function() {
  window.location.href = "game.html"; // Replace with your desired URL
});


// ------------------------------------------------ RED GHOST ------------------------------------------------ 
  
// WAY 2
// Create the red ghost element and add it to the maze container
var redGhostElement = document.createElement("div");
redGhostElement.classList.add("left1_redGhost");
redGhostElement.style.position = "absolute";
// vertical line:top is y = column = up and down
// horizontal line: left is x = row = left and right
redGhostElement.style.top = 10.5 * 8 + "px"; // Initial positioning 
redGhostElement.style.left = 13.05 * 8 + "px"; // Initial positioning 
maze_container.appendChild(redGhostElement);

// First move positioning
var redGhost = { top: 11.5 * 8, left: 13.05 * 8, size: 16};
//const redGhost = { top: 92, left: 104.4, size: 16}; 

// Define the direction constants
const DIRECTION2 = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right"
};

// Set the initial direction for the red ghost
var redGhostDirection = DIRECTION2.LEFT;

// console.log("INITIAL DIRECTION is " + redGhostDirection);
// const cellSize_init = 8;
// const ghostSize_init = 16;
// const halfCellSize_init = cellSize_init / 2;;
// const halfGhostSize_init = ghostSize_init / 2;
// console.log(" ---------------------------- ");
// console.log(" initial info: redGhost.top = " + redGhost.top );
// console.log(" initial info: redGhost.left = " + redGhost.left);
// // Calculate the row and column of the current cell
// const row_init = Math.floor(redGhost.top / cellSize_init);
// const col_init = Math.floor(redGhost.left / cellSize_init);
// const cellCenterTop_init = row_init * cellSize_init + halfCellSize_init;
// const cellCenterLeft_init = col_init * cellSize_init + halfCellSize_init;
// const xTranslate_init = cellCenterLeft_init - halfGhostSize_init;
// const yTranslate_init = cellCenterTop_init - halfGhostSize_init;
// console.log(" ---------------------------- ");
// console.log("initial: yTranslate = " + yTranslate_init);
// console.log("initial: xTranslate = " + xTranslate_init);

let lastRedGhostDirection = DIRECTION2.LEFT;

const freezedFaces = ["freezed_Ghost1", "freezed_Ghost2"];
var freezed_Rindx = 0;
var freezed_Pindx = 0;
var freezed_Bindx = 0;
var freezed_Oindx = 0;

function changeRGFreeze()
{
  freezed_Rindx = (freezed_Rindx + 1) % freezedFaces.length; 
  redGhostElement.classList.remove(...freezedFaces);
  redGhostElement.classList.add(freezedFaces[freezed_Rindx]);
}

function changePGFreeze()
{
  freezed_Pindx = (freezed_Pindx + 1) % freezedFaces.length; 
  pinkGhostElement.classList.remove(...freezedFaces);
  pinkGhostElement.classList.add(freezedFaces[freezed_Pindx]);
}

function changeBGFreeze()
{
  freezed_Bindx = (freezed_Bindx + 1) % freezedFaces.length; 
  blueGhostElement.classList.remove(...freezedFaces);
  blueGhostElement.classList.add(freezedFaces[freezed_Bindx]);
}

function changeOGFreeze()
{
  freezed_Oindx = (freezed_Oindx + 1) % freezedFaces.length; 
  orangeGhostElement.classList.remove(...freezedFaces);
  orangeGhostElement.classList.add(freezedFaces[freezed_Oindx]);
}

const grayGFaces = ["freezed_Ghost1", "freezed_Ghost2", "grayScared_Ghost1", "grayScared_Ghost2"];
var grayRG_indx = 0;
var grayPG_indx = 0;
var grayBG_indx = 0;
var grayOG_indx = 0;

function changeRGGrayFreeze()
{
  grayRG_indx = (grayRG_indx + 1) % grayGFaces.length; 
  redGhostElement.classList.remove(...grayGFaces);
  redGhostElement.classList.add(grayGFaces[grayRG_indx]);
}



function changePGGrayFreeze()
{
  grayPG_indx = (grayPG_indx + 1) % grayGFaces.length; 
  pinkGhostElement.classList.remove(...grayGFaces);
  pinkGhostElement.classList.add(grayGFaces[grayPG_indx]);
}


function changeBGGrayFreeze()
{
  grayBG_indx = (grayBG_indx + 1) % grayGFaces.length; 
  blueGhostElement.classList.remove(...grayGFaces);
  blueGhostElement.classList.add(grayGFaces[grayBG_indx]);
}


function changeOGGrayFreeze()
{
  grayOG_indx = (grayOG_indx + 1) % grayGFaces.length; 
  orangeGhostElement.classList.remove(...grayGFaces);
  orangeGhostElement.classList.add(grayGFaces[grayOG_indx]);
}


var isRedGhostStopped = false; // Variable to track if red ghost movement is reset to the initial position in i.e. the ghost is dead
var isPinkGhostStopped = false;
var isBlueGhostStopped = false;
var isOrangeGhostStopped = false;

var isRG = false;
var isPG = false;
var isBG = false;
var isOG = false;

function ghostRdirfaces()
{
 // console.log("Red ghost: DIRECTION is " + redGhostDirection);
 if(redGhostDirection == DIRECTION2.UP)
 {
   //console.log("U: isGhostFreezed = " + isGhostFreezed);
   //console.log("U: isGhostFreezedComesToEnd = " + isGhostFreezedComesToEnd);


   if(isGhostFreezed === false)
   {
     // Remove all classes from redGhostElement
     redGhostElement.className = "";
     // changeRG_up();
     changeRGhostMood("up");
      
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
   {
     redGhostElement.className = "";
     changeRGFreeze();
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
   {
       redGhostElement.className = "";
       changeRGGrayFreeze();
   }
   

 }
 else if(redGhostDirection === DIRECTION2.DOWN)
 {
   //console.log("D: isGhostFreezed = " + isGhostFreezed);
   //console.log("D: isGhostFreezedComesToEnd = " + isGhostFreezedComesToEnd);

   if(isGhostFreezed === false)
   {
   // Remove all classes from redGhostElement
   redGhostElement.className = "";
   // changeRG_down();
   changeRGhostMood("down");
   
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
   {
     redGhostElement.className = "";
     changeRGFreeze();
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
   {
       redGhostElement.className = "";
       changeRGGrayFreeze();
   }
 }
 else if(redGhostDirection === DIRECTION2.LEFT)
 {
  // console.log("L: isGhostFreezed = " + isGhostFreezed);
  // console.log("L: isGhostFreezedComesToEnd = " + isGhostFreezedComesToEnd);

   if(isGhostFreezed === false)
   {
   // Remove all classes from redGhostElement
   redGhostElement.className = "";
   // changeRG_left();
   changeRGhostMood("left");
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
   {
     redGhostElement.className = "";
     changeRGFreeze();
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
   {
       redGhostElement.className = "";
       changeRGGrayFreeze();
   }

 }
 else if(redGhostDirection === DIRECTION2.RIGHT)
 {
   //console.log("R: isGhostFreezed = " + isGhostFreezed);
   //console.log("R: isGhostFreezedComesToEnd = " + isGhostFreezedComesToEnd);

   if(isGhostFreezed === false)
   {
   // Remove all classes from redGhostElement
   redGhostElement.className = "";
   // changeRG_right();
   changeRGhostMood("right");
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
   {
     redGhostElement.className = "";
     changeRGFreeze();
   }
   else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
   {
       redGhostElement.className = "";
       changeRGGrayFreeze();
   }
 }


}

function moveRedGhost() 
{
  // Define the movement speed for the red ghost
  const cellSize = 8;
  
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
    console.log("GHOST: Red ghost killed Pacman.");
    // //0
    // console.log("pacmanX: ", pacmanX, "== ghostX: ", ghostX);
    // console.log("&& pacmanY: " ,pacmanY, " ghostY: ",  ghostY);

    // console.log("||");//1
    // console.log("pacmanX: ", pacmanX, "== ghostX: ", ghostX);
    // console.log("&& pacmanY - 1: " ,pacmanY - 1, " ghostY: ",  ghostY);

    // console.log("||");//2
    // console.log("pacmanX - 1: " ,pacmanX - 1, "== ghostX: ",  ghostX);
    // console.log("&& pacmanY: ", pacmanY, " ghostY: ", ghostY);

    // console.log("||");//3
    // console.log("pacmanX: " ,pacmanX, "== ghostX: ",  ghostX);
    // console.log("&& pacmanY: ", pacmanY, " ghostY - 1: ", ghostY-1);
    
    // console.log("||");//4
    // console.log("pacmanX: " ,pacmanX, "== ghostX - 1: ",  ghostX-1);
    // console.log("&& pacmanY: ", pacmanY, " ghostY: ", ghostY);

    if (!isPacmanMoving()) 
    {
      if(collisionOccurred != true)
      {
        collisionOccurred = true;
        // Pause red ghost movement
        isRedGhostStopped = true;
        isPacmanStopped = true;

      if(isGhostFreezed === true)
      {
        console.log("2108");
        synchronizeModificationF();
      }
      else
      {
        console.log("2113");
        synchronizeModification();
      }
    }
    }
}


if (!isRedGhostStopped) // when isRedGhostStopped is true do the following thing:
{
//console.log("---------------isGhostFreezedComesToEnd-----------",isGhostFreezedComesToEnd);
//console.log("---------------isGhostFreezed-----------",isGhostFreezed);

  // moveEachGhostInMaze();
  //console.log(!isRedGhostStopped);
  if (!isPaused) 
  {
    ghostRdirfaces();
   
    const row = Math.floor(redGhost.top / 8);
    const col = Math.floor(redGhost.left / 8);


     // LEFT to right
    if(row === 14 && col === 0) 
    {
      //console.log("GHOST IN TUNNEL: LEFT to right");
    //row
    redGhost.top = 112; 
    //col
    redGhost.left = 212; //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
    }  
    // RIGHT to left
    else if (row === 14 && col === 27) 
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

    
        const possibleMoves = [];

        // Check if the movement in each direction is valid
        if (isValidMove(row - 1, col) && lastRedGhostDirection !== DIRECTION2.DOWN) 
        {
            // changeRG_up();
        possibleMoves.push(DIRECTION2.UP);
        }
        if (isValidMove(row + 1, col) && lastRedGhostDirection !== DIRECTION2.UP) 
        {
            // changeRG_down();
        possibleMoves.push(DIRECTION2.DOWN);
        }
        if (isValidMove(row, col - 1) && lastRedGhostDirection !== DIRECTION2.RIGHT) 
        {
        //   changeRG_left();
        possibleMoves.push(DIRECTION2.LEFT);
        }
        if (isValidMove(row, col + 1) && lastRedGhostDirection !== DIRECTION2.LEFT) 
        {
            // changeRG_right();
        possibleMoves.push(DIRECTION2.RIGHT);
        }

        if (possibleMoves.length > 0) 
        {
        // If there are valid moves available, 
        // pick a random one 
        // and update the direction
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        redGhostDirection = possibleMoves[randomIndex];

        // Update the cell-based position based on the movement direction
        if (redGhostDirection === DIRECTION2.UP) 
        {
        
            redGhost.top -= cellSize;
        } 
        else if (redGhostDirection === DIRECTION2.DOWN) 
        {
        
            redGhost.top += cellSize;
        } 
        else if (redGhostDirection === DIRECTION2.LEFT) 
        {
        
            redGhost.left -= cellSize;
        } 
        else if (redGhostDirection === DIRECTION2.RIGHT) 
        {
        
            redGhost.left += cellSize;
        }

        // Update the last movement direction
        lastRedGhostDirection = redGhostDirection;

        // Update the position of the red ghost
        
        updateMazeGPos(redGhost, redGhostElement);
        } 

        else 
        {
          // If no valid moves are available, randomly choose a new direction
          redGhostDirection = getRandomDirection();
        }
    }
  }
  }
}




// function moveEachGhostInMaze(ghost, 
//                               ghostElement, 
//                               ghostDirection,
//                               lastGhostDirection, 
//                               isGhostFreezed, 
//                               isGhostFreezedComesToEnd)
// {
//   //console.log(!isRedGhostStopped);
//   if (!isPaused) 
//   {
//     if(ghostDirection == DIRECTION2.UP)
//     {

//     if(isGhostFreezed === false && isGhostFreezedComesToEnd === false)
//     {
//       // Remove all classes from ghostElement
//       ghostElement.className = "";
//       changeRG_up();
//       //<-----------------------------------------------------------
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
//     {
//       ghostElement.className = "";
//       changeFreeze();
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
//     {
//       ghostElement.className = "";
//       changeGrayFreeze();
//     }


//   }
//   else if(ghostDirection === DIRECTION2.DOWN)
//   {
//     if(isGhostFreezed === false)
//     {
//       ghostElement.className = "";
//       changeRG_down();
//          //<-----------------------------------------------------------
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
//     {
//       ghostElement.className = "";
//       changeFreeze();
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
//     {
//       ghostElement.className = "";
//       changeGrayFreeze();
//     }
//   }
//   else if(ghostDirection === DIRECTION2.LEFT)
//   {
    
//     if(isGhostFreezed === false)
//     {
//       ghostElement.className = "";
//       changeRG_left();
//          //<-----------------------------------------------------------
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
//     {
//       ghostElement.className = "";
//       changeFreeze();
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
//     {
//       ghostElement.className = "";
//       changeGrayFreeze();
//     }

//   }
//   else if(ghostDirection === DIRECTION2.RIGHT)
//   {
    
//     if(isGhostFreezed === false)
//     {
//       ghostElement.className = "";
//       changeRG_right();
//          //<-----------------------------------------------------------
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
//     {
//       ghostElement.className = "";
//       changeFreeze();
//     }
//     else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
//     {
//       ghostElement.className = "";
//       changeGrayFreeze();
//     }
//   }



//     const row = Math.floor(ghost.top / 8);
//     const col = Math.floor(ghost.left / 8);

//     //console.log("ghost ROW = " + row);
//     //console.log("ghost COL = " + col);
  
 
//      // LEFT to right
//     if(row === 14 && col === 0) 
//     {
//       //console.log("GHOST IN TUNNEL: LEFT to right");
//       //row
//       ghost.top = 112; 
//       //col
//       ghost.left = 212; //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
//     }  
//     // RIGHT to left
//     else if (row === 14 && col === 27) 
//     {
//       //console.log("GHOST IN TUNNEL: RIGHT to left");

//       // Set the red ghost's position to the destination teleportation cell 
//       //row - Update the pixel position for top
//       ghost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
//       //col -  Update the pixel position for left
//       ghost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
//     }
//     else
//     {

    
//         const possibleMoves = [];

//         // Check if the movement in each direction is valid
//         if (isValidMove(row - 1, col) && lastGhostDirection !== DIRECTION2.DOWN) 
//         {
//             // changeRG_up();
//         possibleMoves.push(DIRECTION2.UP);
//         }
//         if (isValidMove(row + 1, col) && lastGhostDirection !== DIRECTION2.UP) 
//         {
//             // changeRG_down();
//         possibleMoves.push(DIRECTION2.DOWN);
//         }
//         if (isValidMove(row, col - 1) && lastGhostDirection !== DIRECTION2.RIGHT) 
//         {
//         //   changeRG_left();
//         possibleMoves.push(DIRECTION2.LEFT);
//         }
//         if (isValidMove(row, col + 1) && lastGhostDirection !== DIRECTION2.LEFT) 
//         {
//             // changeRG_right();
//             possibleMoves.push(DIRECTION2.RIGHT);
//         }

//         if (possibleMoves.length > 0) 
//         {
//           // If there are valid moves available, 
//           // pick a random one 
//           // and update the direction
//           const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//           ghostDirection = possibleMoves[randomIndex];

//           // Update the cell-based position based on the movement direction
//           if (ghostDirection === DIRECTION2.UP) 
//           {
//               ghost.top -= cellSize;
//           } 
//           else if (ghostDirection === DIRECTION2.DOWN) 
//           {
//               ghost.top += cellSize;
//           } 
//           else if (ghostDirection === DIRECTION2.LEFT) 
//           {
//               ghost.left -= cellSize;
//           } 
//           else if (ghostDirection === DIRECTION2.RIGHT) 
//           {
//               ghost.left += cellSize;
//           }

//           // Update the last movement direction
//           lastGhostDirection = ghostDirection;

//           // Update the position of the red ghost
//           updateMazeGPos(ghost, ghostElement);
//         } 
//         else 
//         {
//           // If no valid moves are available, randomly choose a new direction
//           ghostDirection = getRandomDirection();
//         }
//     }
//   }
// }//moveEachGhostInMaze




// Function to update the position of all ghosts in the maze
function updateMazeGPos(ghost, ghostElement) 
{
  const cellSize = 8;
  const ghostSize = redGhost.size;
  const halfCellSize = cellSize / 2;;
  const halfGhostSize = ghostSize / 2;
 
//   console.log(" ---------------------------- ");
//   console.log(" redGhost.top = " + redGhost.top );
//   console.log(" redGhost.left = " + redGhost.left);

  // Calculate the row and column of the current cell
  let row = Math.floor(ghost.top / cellSize);
  let col = Math.floor(ghost.left / cellSize);



    // Calculate the center position of the current cell
    const cellCenterTop = row * cellSize + halfCellSize;
    const cellCenterLeft = col * cellSize + halfCellSize;
    
    // Calculate the new position of the red ghost
   
    var xTranslate = cellCenterLeft - halfGhostSize;
    var yTranslate = cellCenterTop - halfGhostSize;


    //   console.log(" ---------------------------- ");
    //   console.log("new top is yTranslate = " + yTranslate);
    //   console.log("new left is xTranslate " + xTranslate);

    // Update the CSS position of the red ghost
    ghostElement.style.top = `${yTranslate}px`;
    ghostElement.style.left = `${xTranslate}px`;

    // Call the function to extract the values each time they change
    // extractGPositionValues(xTranslate, yTranslate);

  //compareLastMoves();
    
}


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
        return (GPS_arr[row][col] !== 0  && GPS_arr[row][col] !== 1  && GPS_arr[row][col] !== 2  && GPS_arr[row][col] !== 4);
//original logic, not for
      //return (GPS_arr[row][col] !== 0 && GPS_arr[row][col] !== 4);
}

// Function to randomly choose a new direction for the red ghost
function getRandomDirection() 
{
  const possibleDirections = [DIRECTION2.UP, DIRECTION2.DOWN, DIRECTION2.LEFT, DIRECTION2.RIGHT];
  const dir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
  
  return dir;
}
  
//-------------------- ANIMATION OF RED GHOST-------
const ghostRMoods = {
  left: ["left1_redGhost", "left2_redGhost", "left1_redGhost"],
  right: ["right1_redGhost", "right2_redGhost", "right1_redGhost"],
  down: ["down1_redGhost", "down2_redGhost", "down1_redGhost"],
  up: ["up1_redGhost", "up2_redGhost", "up1_redGhost"]
};

const ghostRIndices = {
  left: 0,
  right: 0,
  down: 0,
  up: 0
};

function changeRGhostMood(direction) 
{
  ghostRIndices[direction] = (ghostRIndices[direction] + 1) % ghostRMoods[direction].length;
  redGhostElement.classList.remove(...ghostRMoods[direction]);
  redGhostElement.classList.add(ghostRMoods[direction][ghostRIndices[direction]]);
}

//------------

const ghostPMoods = {
  left: ["left1_pinkGhost", "left2_pinkGhost", "left1_pinkGhost"],
  right: ["right1_pinkGhost", "right2_pinkGhost", "right1_pinkGhost"],
  down: ["down1_pinkGhost", "down2_pinkGhost", "down1_pinkGhost"],
  up: ["up1_pinkGhost", "up2_pinkGhost", "up1_pinkGhost"]
};

const ghostPIndices = {
  left: 0,
  right: 0,
  down: 0,
  up: 0
};

function changePGhostMood(direction) 
{
  ghostPIndices[direction] = (ghostPIndices[direction] + 1) % ghostPMoods[direction].length;
  pinkGhostElement.classList.remove(...ghostPMoods[direction]);
  pinkGhostElement.classList.add(ghostPMoods[direction][ghostPIndices[direction]]);
}

const ghostBMoods = {
  left: ["left1_blueGhost", "left2_blueGhost", "left1_blueGhost"],
  right: ["right1_blueGhost", "right2_blueGhost", "right1_blueGhost"],
  down: ["down1_blueGhost", "down2_blueGhost", "down1_blueGhost"],
  up: ["up1_blueGhost", "up2_blueGhost", "up1_blueGhost"]
};

const ghostBIndices = {
  left: 0,
  right: 0,
  down: 0,
  up: 0
};

function changeBGhostMood(direction) 
{
  ghostBIndices[direction] = (ghostBIndices[direction] + 1) % ghostBMoods[direction].length;
  blueGhostElement.classList.remove(...ghostBMoods[direction]);
  blueGhostElement.classList.add(ghostBMoods[direction][ghostBIndices[direction]]);
}

const ghostOMoods = {
  left: ["left1_orangeGhost", "left2_orangeGhost", "left1_orangeGhost"],
  right: ["right1_orangeGhost", "right2_orangeGhost", "right1_orangeGhost"],
  down: ["down1_orangeGhost", "down2_orangeGhost", "down1_orangeGhost"],
  up: ["up1_orangeGhost", "up2_orangeGhost", "up1_orangeGhost"]
};

const ghostOIndices = {
  left: 0,
  right: 0,
  down: 0,
  up: 0
};

function changeOGhostMood(direction) 
{
  ghostOIndices[direction] = (ghostOIndices[direction] + 1) % ghostOMoods[direction].length;
  orangeGhostElement.classList.remove(...ghostOMoods[direction]);
  orangeGhostElement.classList.add(ghostOMoods[direction][ghostOIndices[direction]]);
}
// Define the pink ghost images of moving moods
// const rfaces_l = [  "left1_redGhost", "left2_redGhost", "left1_redGhost"];
// const rfaces_r = [ "right1_redGhost", "right2_redGhost", "right1_redGhost"];
// const rfaces_d = [ "down1_redGhost", "down2_redGhost", "down1_redGhost"];
// const rfaces_u = [ "up1_redGhost", "up2_redGhost", "up1_redGhost"];

// var r_indx_l = 0;
// var r_indx_r = 0;
// var r_indx_u = 0;
// var r_indx_d = 0;

// function changeRG_left() 
// {
//     r_indx_l = (r_indx_l + 1) % rfaces_l.length; 
//     // console.log("r_indx_l" + r_indx_l);
//     redGhostElement.classList.remove(...rfaces_l);
//     redGhostElement.classList.add(rfaces_l[r_indx_l]);
// }

// function changeRG_right() 
// {
//     r_indx_r = (r_indx_r + 1) % rfaces_r.length; 
//     // console.log("r_indx_r" + r_indx_r);
//     redGhostElement.classList.remove(...rfaces_r);
//     redGhostElement.classList.add(rfaces_r[r_indx_r]);
// }

// function changeRG_up() 
// {
//     r_indx_u = (r_indx_u + 1) % rfaces_u.length; 
//     // console.log("r_indx_u" + r_indx_u);
//     redGhostElement.classList.remove(...rfaces_u);
//     redGhostElement.classList.add(rfaces_u[r_indx_u]);
// }

// function changeRG_down() 
// {
//     r_indx_d = (r_indx_d + 1) % rfaces_d.length; 
//     // console.log("r_indx_d" + r_indx_d);
//     redGhostElement.classList.remove(...rfaces_d);
//     redGhostElement.classList.add(rfaces_d[r_indx_d]);
// }
// ----------------------------------------------- COLLISION between the red ghost and Pacman ----------------------------------------------------
/*
        redGhost.top = 12 -> 12 / 8 = 1.5, floor(1.5) = 1
        redGhost.left = 168.4 -> 168,4 / 8 = 21.05, floor(21.05) = 21

        Pacman positions: 21,1

        ---------------------------- 

        new top is yTranslate = 4
        new left is xTranslate = 164

        Pacman translate-positions: 164.5, 4.5 -> floor(4.5) and floor(164.5) to get 4 and 164
*/






  




// ------------------------------------------------ GHOSTS  ------------------------------------------------ 

// Starting intial positions of the ghosts in the nest 
var blueGhost = { top: 107, left: 11.05 * 8};
/* top: 112px;  i.e. 112/8 = 14 */ // option 2
/* left: 88px;   i.e.  88/8 = 11 */

var pinkGhost = { top: 107, left: 13.05 * 8};
/* top: 112px;  i.e. 112/8 = 14 */ // option 2
/* left: 104px; i.e.  104/8 = 13 */

var orangeGhost = { top: 107, left: 15.05 * 8};
/* top: 112px;  i.e. 112/8 = 14 */ // option 2
/* left: 120px; i.e.  120/8 = 15 */



// Define the movement boundaries for the ghosts
const houseTop = 12.875 * 8;       //104 // Upper boundary of the house
const houseBottom = 14 * 8;   //128  // Lower boundary of the house (top position + ghost height)



// Create the ghost elements in the HTML document
const blueGhostElement = document.createElement("div");
blueGhostElement.classList.add("up1_blueGhost");
blueGhostElement.style.position = "absolute";
blueGhostElement.style.top = `${blueGhost.top}px`;
blueGhostElement.style.left = `${blueGhost.left}px`;
maze_container.appendChild(blueGhostElement);

const pinkGhostElement = document.createElement("div");
pinkGhostElement.classList.add("down1_pinkGhost");
pinkGhostElement.style.position = "absolute";
pinkGhostElement.style.top = `${pinkGhost.top}px`;
pinkGhostElement.style.left = `${pinkGhost.left}px`;
maze_container.appendChild(pinkGhostElement);

const orangeGhostElement = document.createElement("div");
orangeGhostElement.classList.add("up1_orangeGhost");
orangeGhostElement.style.position = "absolute";
orangeGhostElement.style.top = `${orangeGhost.top}px`;
orangeGhostElement.style.left = `${orangeGhost.left}px`;
maze_container.appendChild(orangeGhostElement);



// Define the blue ghost images of moving moods
const bfaces = [ 
  // "left1_blueGhost",
  // "left2_blueGhost",
  // "right1_blueGhost",
  // "right2_blueGhost",
  "up1_blueGhost",
  "up2_blueGhost",
  "down1_blueGhost",
  "down2_blueGhost"
];

var b_indx = 0;

function changeBG() 
{
  b_indx = (b_indx + 1) % bfaces.length; 
  blueGhostElement.classList.remove(...bfaces);
  blueGhostElement.classList.add(bfaces[b_indx]);
}

// Define the pink ghost images of moving moods
const pfaces = [ 
  // "left1_pinkGhost",
  // "left2_pinkGhost",
  // "right1_pinkGhost",
  // "right2_pinkGhost",
 
  "down1_pinkGhost",
  "down2_pinkGhost",
  "up1_pinkGhost",
  "up2_pinkGhost"
];

var p_indx = 0;

function changePG() 
{
  p_indx = (p_indx + 1) % pfaces.length; 
  pinkGhostElement.classList.remove(...pfaces);
  pinkGhostElement.classList.add(pfaces[p_indx]);
}




// Define the orange ghost images of moving moods
const ofaces = [ 
  // "left1_orangeGhost",
  // "left2_orangeGhost",
  // "right1_orangeGhost",
  // "right2_orangeGhost",
  "up1_orangeGhost",
  "up2_orangeGhost", 
  "down1_orangeGhost",
  "down2_orangeGhost"
];

var o_indx = 0;

function changeOG() 
{
  o_indx = (o_indx + 1) % ofaces.length; 
  orangeGhostElement.classList.remove(...ofaces);
  orangeGhostElement.classList.add(ofaces[o_indx]);
}


// Function to update the CSS position of a ghost
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
}


// Define the movement direction for each ghost
let blueGhostDirection = "up";
let pinkGhostDirection = "down";
let orangeGhostDirection = "up";

// Define the movement space/speed for the ghosts
const ghostSpeedSpace = 8; // Adjust the space as needed


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Function to move the ghosts inside the house
// function moveGhosts() 
// {
// if(!isPaused)// If the pause button is not pressed, the three ghosts are not paused, too
// {
//     // Update blue ghost position
//     if (blueGhostDirection === "up") 
//     {
//       blueGhost.top -= ghostSpeedSpace;
//       if (blueGhost.top <= houseTop) 
//       {
//         blueGhost.top = houseTop;
//         blueGhostDirection = "down";
//       }
//     } 
//     else 
//     {
//       blueGhost.top += ghostSpeedSpace;
//       if (blueGhost.top >= houseBottom) 
//       {
//         blueGhost.top = houseBottom;
//         blueGhostDirection = "up";
//       }
//     }

//     // Update pink ghost position
//     if (pinkGhostDirection === "up") 
//     {
//       pinkGhost.top -= ghostSpeedSpace;
//       if (pinkGhost.top <= houseTop) 
//       {
//         pinkGhost.top = houseTop;
//         pinkGhostDirection = "down";
//       }
//     } 
//     else 
//     {
//       pinkGhost.top += ghostSpeedSpace;
//       if (pinkGhost.top >= houseBottom) 
//       {
//         pinkGhost.top = houseBottom;
//         pinkGhostDirection = "up";
//       }
//     }

//     // Update orange ghost position
//     if (orangeGhostDirection === "up") 
//     {
//       orangeGhost.top -= ghostSpeedSpace;
//       if (orangeGhost.top <= houseTop) 
//       {
//         orangeGhost.top = houseTop;
//         orangeGhostDirection = "down";
//         // orangeGhostElement.classList.add("down1_orangeGhost");
//       }
//     } 
//     else 
//     {
//       orangeGhost.top += ghostSpeedSpace;
//       if (orangeGhost.top >= houseBottom) 
//       {
//         orangeGhost.top = houseBottom;
//         orangeGhostDirection = "up";
//       }
//     }

 
//     // Update the CSS position of each ghost
//     updateNestGPos(blueGhost, blueGhostElement);
//     updateNestGPos(pinkGhost, pinkGhostElement);
//     updateNestGPos(orangeGhost, orangeGhostElement);

//     changeOG();
//     changePG();
//     changeBG();
   
//   }
// }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const houseExit = 12 * 8;



var moveBG, movePG, moveOG;
var t1, t2, t3;
// Function to move the ghosts inside the house
function moveGhosts() 
{
  if(!isPaused)
  {
      clearInterval(moveG);
      movePG = setInterval(movePinkGhostInHouse, 160); 
      moveBG = setInterval(moveBlueGhostInHouse, 160); 
      moveOG = setInterval(moveOrangeGhostInHouse, 160);
    
    // Clear the intervals after 10 seconds
    t1 = setTimeout(() => {
      clearInterval(moveG);
      clearInterval(movePG);
    
      pinkGhostTransitionStage = 1; // Move to the next stage
      movePG = setInterval(movePinkGhostInHouse, 160); 
      
    }, 1000); // 5000 milliseconds = 5 seconds
        


    t2 = setTimeout(() => {
      clearInterval(moveG);
      clearInterval(moveBG);
      
      blueGhostTransitionStage = 1; // Move to the next stage
      moveBG = setInterval(moveBlueGhostInHouse, 160); 
    }, 3000); // 5000 milliseconds = 5 seconds
        


    t3 = setTimeout(() => {
      clearInterval(moveG);
      clearInterval(moveOG);

      orangeGhostTransitionStage = 1; // Move to the next stage
      moveOG = setInterval(moveOrangeGhostInHouse, 160);

    }, 5000); // 5000 milliseconds = 5 seconds
        
  }
}

var redGhostTransitionStage = 0; // Initialize transition stage

function moveRedGhostInHouse()
{
  if (!isPaused) 
  {

  if (redGhostTransitionStage === 1) 
  {
    // Transition stage 1: Move pink ghost to the new initial position
    redGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
    if (redGhost.top < 11 * 8) 
    {
      redGhost.top = 10.5 * 8;

      // clearInterval(moveG); // Clear the interval
      // clearInterval(movePG); // Clear the interval
      
      redGhostTransitionStage = 2; // Transition complete
      // Call your function to start moving pink ghost in the maze here
      //startMovingPinkGhostInMaze();
    }

    updateNestGPos(redGhost, redGhostElement);
    // changePG();
    ghostRdirfaces();
  }
  else if(redGhostTransitionStage === 2)
  {
        redGhostDirection = DIRECTION2.LEFT;  
        ghostRdirfaces();
        redGhostTransitionStage = 3;
        
        redGhost = { top: 11.5 * 8, left: 13.05 * 8, size:16};
        updateMazeGPos(redGhost, redGhostElement);
       
      
    }
    else if(redGhostTransitionStage === 3)
    {
     
        moveRedGhost();
       

    } 
  }
}


var pinkGhostTransitionStage = 0; // Initialize transition stage

function movePinkGhostInHouse() 
{
  if (!isPaused) {
    if (pinkGhostTransitionStage === 0) {
      // Transition stage 0: Move pink ghost to the top of the house
      if (pinkGhostDirection === "up") 
      {
        pinkGhost.top -= ghostSpeedSpace;
        if (pinkGhost.top <= houseTop) 
        {
          pinkGhost.top = houseTop;
          pinkGhostDirection = "down";
        }
        // console.log("UP: pinkGhost.top = " + pinkGhost.top /8+ " pinkGhost.left = " + pinkGhost.left /8 );

      } 
      else 
      {
        pinkGhost.top += ghostSpeedSpace;
        if (pinkGhost.top >= houseBottom) 
        {
          pinkGhost.top = houseBottom;
          pinkGhostDirection = "up";
        }
        //console.log("DOWN: pinkGhost.top = " + pinkGhost.top /8+ " pinkGhost.left = " + pinkGhost.left  /8);
      }
      updateNestGPos(pinkGhost, pinkGhostElement);
   changePG();
      ghostPdirfaces();
    } 
   

    if (pinkGhostTransitionStage === 1) 
    {
      // Transition stage 1: Move pink ghost to the new initial position
      pinkGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (pinkGhost.top < 11 * 8) 
      {
        pinkGhost.top = 10.5 * 8;

        // clearInterval(moveG); // Clear the interval
        // clearInterval(movePG); // Clear the interval
        
        pinkGhostTransitionStage = 2; // Transition complete
        // Call your function to start moving pink ghost in the maze here
        //startMovingPinkGhostInMaze();
      }

      updateNestGPos(pinkGhost, pinkGhostElement);
      // changePG();
      ghostPdirfaces();
    }
    else if(pinkGhostTransitionStage === 2)
    {
          pinkGhostDirection = "left";  
          ghostPdirfaces();
          pinkGhostTransitionStage = 3;
          
          pinkGhost = { top: 11.5 * 8, left: 13.05 * 8};
          updateMazeGPos(pinkGhost, pinkGhostElement);
         
        
      }
      else if(pinkGhostTransitionStage === 3)
      {
       
          movePinkGhostInMaze();
         

      } 
  }
}



function ghostPdirfaces()
{

    // console.log("Red ghost: DIRECTION is " + redGhostDirection);
    if(pinkGhostDirection == "up")
    {
     
  
      if(isGhostFreezed2 === false)
      {
        // Remove all classes from redGhostElement
        pinkGhostElement.className = "";
        // changeRG_up();
        changePGhostMood("up");
         
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === false)
      {
        pinkGhostElement.className = "";
        changePGFreeze();
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === true)
      {
         pinkGhostElement.className = "";
        changePGGrayFreeze();
      }
      
  
    }
    else if(pinkGhostDirection === "down")
    {
     
      if(isGhostFreezed2 === false)
      {
      // Remove all classes from redGhostElement
      pinkGhostElement.className = "";
      // changeRG_down();
      changePGhostMood("down");
      
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === false)
      {
        pinkGhostElement.className = "";
        changePGFreeze();
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === true)
      {
        pinkGhostElement.className = "";
          changePGGrayFreeze();
      }
    }
    else if(pinkGhostDirection === "left")
    {
     
      if(isGhostFreezed2 === false)
      {
        // Remove all classes from redGhostElement
        pinkGhostElement.className = "";
        // changeRG_left();
        changePGhostMood("left");
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === false)
      {
        pinkGhostElement.className = "";
        changePGFreeze();
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === true)
      {
        pinkGhostElement.className = "";
        changePGGrayFreeze();
      }
  
    }
    else if(pinkGhostDirection === "right")
    {
      
      if(isGhostFreezed2 === false)
      {
      // Remove all classes from redGhostElement
      pinkGhostElement.className = "";
      // changeRG_right();
      changePGhostMood("right");
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === false)
      {
        pinkGhostElement.className = "";
        changePGFreeze();
      }
      else if(isGhostFreezed2 === true && isGhostFreezedComesToEnd2 === true)
      {
          pinkGhostElement.className = "";
          changePGGrayFreeze();
      }
    }
  
}

var lastPinkGhostDirection = "left";

// Function to move the pink ghost in the maze
function movePinkGhostInMaze() 
{


  
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
    console.log("Pink ghost killed Pacman.");

     if (!isPacmanMoving()) 
    {
      if(collisionOccurred2 != true)
      {
      collisionOccurred2 = true;
      // Pause red ghost movement
      isPinkGhostStopped = true;
      isPacmanStopped = true;

     

     if(isGhostFreezed2 === true)
      {
        console.log("3197");
        synchronizeModificationF();
      }
      else
      {
        console.log("3202");
        synchronizeModification();
      }
    }
  }
}

 

if (!isPinkGhostStopped) // when isRedGhostStopped is true do the following thing:
{
if (!isPaused) 
  {
  var row = Math.floor(pinkGhost.top / 8);
  var col = Math.floor(pinkGhost.left / 8);
    
  // LEFT to right
  if(row === 14 && col === 0) 
  {
    //console.log("GHOST IN TUNNEL: LEFT to right");
  //row
  pinkGhost.top = 112; 
  //col
  pinkGhost.left = 212; //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
  }  
  // RIGHT to left
  else if (row === 14 && col === 27) 
  {
    //console.log("GHOST IN TUNNEL: RIGHT to left");

    // Set the red ghost's position to the destination teleportation cell 
    //row - Update the pixel position for top
    pinkGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
    //col -  Update the pixel position for left
    pinkGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
  }
  else
  {
    const possibleMoves = [];
    
    
    // // Check if the movement in each direction is valid
    if (isValidMove(row - 1, col)&& lastPinkGhostDirection !== "down") 
    {
      possibleMoves.push("up");
    }
    if (isValidMove(row + 1, col) && lastPinkGhostDirection !== "up") 
    {
      possibleMoves.push("down");
    }
    if (isValidMove(row, col - 1) && lastPinkGhostDirection !== "right") 
    {
      possibleMoves.push("left");
    }
    if (isValidMove(row, col + 1) && lastPinkGhostDirection !== "left") 
    {
      possibleMoves.push("right");
    }

    if (possibleMoves.length > 0) 
    {
      // Choose a random valid move and update pinkGhostDirection
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      pinkGhostDirection = possibleMoves[randomIndex];
  // console.log("HERE!");

    // Update pink ghost position based on pinkGhostDirection
    if (pinkGhostDirection === "up") 
    {
      pinkGhost.top -= 8;
      //console.log("pinkGhost.top -= ghostSpeed  = " + pinkGhost.top);
    } 
    else if (pinkGhostDirection === "down") 
    {
      pinkGhost.top += 8;
      //console.log("pinkGhost.top += ghostSpeed  =  " + pinkGhost.top);
    } 
    else if (pinkGhostDirection === "left") 
    {
      pinkGhost.left -= 8;
      //console.log("pinkGhost.left -= ghostSpeed  =  " + pinkGhost.left);
    } 
    else if (pinkGhostDirection === "right") 
    {
      pinkGhost.left += 8;
      //console.log("pinkGhost.left += ghostSpeed  =  " + pinkGhost.left);
    }

     // Update the last movement direction
    lastPinkGhostDirection = pinkGhostDirection;

    // Update the position of the red ghost
    // updateRedGhostPosition();
    //updateGhostPosition(pinkGhost, pinkGhostElement);
  }
  else 
        {
          // If no valid moves are available, randomly choose a new direction
          pinkGhostDirection = getRandomDirection();
        }
        ghostPdirfaces();
        updateMazeGPos(pinkGhost, pinkGhostElement);

}
  }
}}



var orangeGhostTransitionStage = 0; // Initialize transition stage

function moveOrangeGhostInHouse() 
{
  if(!isPaused)// && scores < 100)// If the pause button is not pressed, the three ghosts are not paused, too
  {
    if(orangeGhostTransitionStage === 0)
    {
      // Update orange ghost position
      if (orangeGhostDirection === "up") 
      {
        orangeGhost.top -= ghostSpeedSpace;
        if (orangeGhost.top <= houseTop) 
        {
          orangeGhost.top = houseTop;
          orangeGhostDirection = "down";
          // orangeGhostElement.classList.add("down1_orangeGhost");
        }
      } 
      else 
      {
        orangeGhost.top += ghostSpeedSpace;
        if (orangeGhost.top >= houseBottom) 
        {
          orangeGhost.top = houseBottom;
          orangeGhostDirection = "up";
        }
      }
      // Update the CSS position of each ghost
      updateNestGPos(orangeGhost, orangeGhostElement);
      // changeOG();
      
       if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === false)
      {
        orangeGhostElement.className = "";
        changeOGFreeze();
      }
      else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === true)
      {
        orangeGhostElement.className = "";
        changeOGGrayFreeze();
      }
      else
      {
         // Remove all classes from redGhostElement
         orangeGhostElement.className = "";
         changeOG();
      }
      
      // ghostOdirfaces();
    }
    else if(orangeGhostTransitionStage === 1)
    {
      orangeGhostDirection = "left";

      // Transition stage 1: Move orange ghost to the second transition step
      orangeGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (orangeGhost.top <= 13 * 8) 
      {
        orangeGhost.top = 13 * 8;
        orangeGhost.left = 13.05 * 8;
        orangeGhostTransitionStage = 2; // Move to the next stage
      }

      ghostOdirfaces();
      updateNestGPos(orangeGhost, orangeGhostElement);
      
     
      // changeOG();
    }
    else if(orangeGhostTransitionStage === 2)
    {

// Transition stage 2: Move blue ghost smoothly out of the house
//  if (orangeGhostDirection === "up") 
//  {
  orangeGhostDirection = "up";
        orangeGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
         if (orangeGhost.top < 11 * 8) 
         {
          orangeGhost.top = 10.5 * 8;
 
          
           orangeGhostTransitionStage = 3; // Move to the next stage
           //clearInterval(moveBlueGhostInHouseInterval); // Clear the interval
           // Call your function to start moving blue ghost in the maze here
           //startMovingBlueGhostInMaze();
         }
  //changeOG();
  ghostOdirfaces();
      updateNestGPos(orangeGhost, orangeGhostElement);
     
//  }
     }
     else if(orangeGhostTransitionStage === 3)
     {
           orangeGhostDirection = "left"; 
           ghostOdirfaces();
           orangeGhostTransitionStage = 4;
           
           orangeGhost = { top: 11.5 * 8, left: 13.05 * 8};
           updateMazeGPos(orangeGhost, orangeGhostElement);
           
         
       }
       else if(orangeGhostTransitionStage === 4)
       {
           moveOrangeGhostInMaze();
          
   
       } 
  }}




function ghostOdirfaces()
{
// console.log("Red ghost: DIRECTION is " + redGhostDirection);
if(orangeGhostDirection == "up")
{
 

  if(isGhostFreezed4 === false)
  {
    // Remove all classes from redGhostElement
    orangeGhostElement.className = "";
    // changeRG_up();
    changeOGhostMood("up");
     
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === false)
  {
    orangeGhostElement.className = "";
    changeOGFreeze();
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === true)
  {
    orangeGhostElement.className = "";
    changeOGGrayFreeze();
  }
  

}
else if(orangeGhostDirection === "down")
{
 
  if(isGhostFreezed4 === false)
  {
  // Remove all classes from redGhostElement
  orangeGhostElement.className = "";
  // changeRG_down();
  changeOGhostMood("down");
  
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === false)
  {
   orangeGhostElement.className = "";
    changeOGFreeze();
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === true)
  {
   orangeGhostElement.className = "";
      changeOGGrayFreeze();
  }
}
else if(orangeGhostDirection === "left")
{
  if(isGhostFreezed4 === false)
  {
    // Remove all classes from redGhostElement
    orangeGhostElement.className = "";
    // changeRG_left();
    changeOGhostMood("left");
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === false)
  {
   orangeGhostElement.className = "";
    changeOGFreeze();
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === true)
  {
     orangeGhostElement.className = "";
    changeOGGrayFreeze();
  }

}
else if(orangeGhostDirection === "right")
{
  
  if(isGhostFreezed4 === false)
  {
  // Remove all classes from redGhostElement
  orangeGhostElement.className = "";
  // changeRG_right();
  changeOGhostMood("right");
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === false)
  {
     orangeGhostElement.className = "";
    changeOGFreeze();
  }
  else if(isGhostFreezed4 === true && isGhostFreezedComesToEnd4 === true)
  {
   orangeGhostElement.className = "";
   changeOGGrayFreeze();
  }
}
}


var lastOrangeGhostDirection = "left";

// Function to move the pink ghost in the maze
function moveOrangeGhostInMaze() 
{
 
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
      console.log("Orange ghost killed Pacman.");
  
    if (!isPacmanMoving()) 
    {
      if(collisionOccurred != true)
      {
      collisionOccurred4 = true;
      // Pause red ghost movement
       isOrangeGhostStopped = true;
      isPacmanStopped = true;
     

      

      if(isGhostFreezed4 === true)
      {
        console.log("3560");
        synchronizeModificationF();
      }
      else
      {
        console.log("3565");
        synchronizeModification();
      }
    }}
  }
  


  if (!isOrangeGhostStopped) // when isRedGhostStopped is true do the following thing:
{

  if (!isPaused) 
  {
  var row = Math.floor(orangeGhost.top / 8);
  var col = Math.floor(orangeGhost.left / 8);
   
// LEFT to right
if(row === 14 && col === 0) 
{
  //console.log("GHOST IN TUNNEL: LEFT to right");
//row
orangeGhost.top = 112; 
//col
orangeGhost.left = 212; //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
}  
// RIGHT to left
else if (row === 14 && col === 27) 
{
  //console.log("GHOST IN TUNNEL: RIGHT to left");

  // Set the red ghost's position to the destination teleportation cell 
  //row - Update the pixel position for top
  orangeGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
  //col -  Update the pixel position for left
  orangeGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
}
else
{
    const possibleMoves = [];
    
   
    // // Check if the movement in each direction is valid
    if (isValidMove(row - 1, col)&& lastOrangeGhostDirection !== "down") 
    {
      possibleMoves.push("up");
    }
    if (isValidMove(row + 1, col) && lastOrangeGhostDirection !== "up") 
    {
      possibleMoves.push("down");
    }
    if (isValidMove(row, col - 1) && lastOrangeGhostDirection !== "right") 
    {
      possibleMoves.push("left");
    }
    if (isValidMove(row, col + 1) && lastOrangeGhostDirection !== "left") 
    {
      possibleMoves.push("right");
    }

    if (possibleMoves.length > 0) 
    {
      // Choose a random valid move and update pinkGhostDirection
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      orangeGhostDirection = possibleMoves[randomIndex];


    // Update orange ghost position based on pinkGhostDirection
    if (orangeGhostDirection === "up") 
    {
      orangeGhost.top -= 8;
    } 
    else if (orangeGhostDirection === "down") 
    {
      orangeGhost.top += 8;
    } 
    else if (orangeGhostDirection === "left") 
    {
      orangeGhost.left -= 8;
    } 
    else if (orangeGhostDirection === "right") {
      orangeGhost.left += 8;
    }

     // Update the last movement direction
    lastOrangeGhostDirection = orangeGhostDirection;

    // Update the position of the red ghost
    // updateRedGhostPosition();
    //updateGhostPosition(pinkGhost, pinkGhostElement);
  }
  else 
  {
          // If no valid moves are available, randomly choose a new direction
          orangeGhostDirection = getRandomDirection();
  }
  ghostOdirfaces();
  updateMazeGPos(orangeGhost, orangeGhostElement);
}
}}}






// function moveBlueGhostInHouse() 
// {
//   if(!isPaused)// && scores < 100)// If the pause button is not pressed, the three ghosts are not paused, too
//   {
//     // Update blue ghost position
//     if (blueGhostDirection === "up") 
//     {
//       blueGhost.top -= ghostSpeedSpace;
//       if (blueGhost.top <= houseTop) 
//       {
//         blueGhost.top = houseTop;
//         blueGhostDirection = "down";
//       }
//     } 
//     else 
//     {
//       blueGhost.top += ghostSpeedSpace;
//       if (blueGhost.top >= houseBottom) 
//       {
//         blueGhost.top = houseBottom;
//         blueGhostDirection = "up";
//       }
//     }

//     updateNestGPos(blueGhost, blueGhostElement);
//     changeBG();
//   }
// }
var blueGhostTransitionStage = 0; // Initialize transition stage for blue ghost

function moveBlueGhostInHouse() 
{
  if (!isPaused) 
  {
    if (blueGhostTransitionStage === 0) 
    {
      // Transition stage 0: Move blue ghost to the first transition step
      // blueGhost.top -= ghostSpeedSpace;
      // if (blueGhost.top <= houseTop) 
      // {
      //   blueGhost.top = houseTop;
      //   // blueGhostTransitionStage = 1; // Move to the next stage
      // }


      // Update blue ghost position
    if (blueGhostDirection === "up") 
    {
      blueGhost.top -= ghostSpeedSpace;
      if (blueGhost.top <= houseTop) 
      {
        blueGhost.top = houseTop;
        blueGhostDirection = "down";
      }
    } 
    else 
    {
      blueGhost.top += ghostSpeedSpace;
      if (blueGhost.top >= houseBottom) 
      {
        blueGhost.top = houseBottom;
        blueGhostDirection = "up";
      }

    } 
   
    if(isGhostFreezed3 === false)
    {
       // Remove all classes from redGhostElement
       blueGhostElement.className = "";
       changeBG();
    }
    else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === false)
    {
      blueGhostElement.className = "";
      changeBGFreeze();
    }
    else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === true)
    {
      blueGhostElement.className = "";
      changeBGGrayFreeze();
    }
    
    //changeBG();
    // ghostBdirfaces();

    updateNestGPos(blueGhost, blueGhostElement);

  }
    else if (blueGhostTransitionStage === 1) 
    {
      blueGhostDirection = "right";

      // Transition stage 1: Move blue ghost to the second transition step
      blueGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
      if (blueGhost.top <= 13 * 8) 
      {
        blueGhost.top = 13 * 8;
        blueGhost.left = 13.05 * 8;
        blueGhostTransitionStage = 2; // Move to the next stage
      }
     
      // changeBG();
      ghostBdirfaces();
      updateNestGPos(blueGhost, blueGhostElement);
    } 
    else if (blueGhostTransitionStage === 2) 
    {
      blueGhostDirection = "up";
      // Transition stage 2: Move blue ghost smoothly out of the house
      // if (blueGhostDirection === "up") 
      // {
        blueGhost.top -= ghostSpeedSpace / 2; // Move at half speed for smoother transition
        if (blueGhost.top < 11 * 8) 
        {
          blueGhost.top = 10.5 * 8;

         
          blueGhostTransitionStage = 3; // Move to the next stage
          //clearInterval(moveBlueGhostInHouseInterval); // Clear the interval
          // Call your function to start moving blue ghost in the maze here
          //startMovingBlueGhostInMaze();
        }
      // }
      // if (blueGhostDirection === "down") 
      // {
      //   blueGhost.top += ghostSpeedSpace;
      //   if (blueGhost.top >= houseBottom) 
      //   {
      //     blueGhost.top = houseBottom;
      //     blueGhostDirection = "up";
      //   }

      // } 
     
      // changeBG();
      ghostBdirfaces();
      updateNestGPos(blueGhost, blueGhostElement);
    }
    else if(blueGhostTransitionStage === 3)
    {
          blueGhostDirection = "left"; 
         
          blueGhostTransitionStage = 4;
          // blueGhost.top = 11.5 * 8;
          // blueGhost.left = 13.05 * 8;
         blueGhost = { top: 11.5 * 8, left: 13.05 * 8};
          updateMazeGPos(blueGhost, blueGhostElement);
          // changeBG();
          ghostBdirfaces();
        
      }
      else if(blueGhostTransitionStage === 4)
      {
        moveBlueGhostInMaze();
         
          // changeBG();
      } 

   
  }
}


function ghostBdirfaces()
{
// console.log("Red ghost: DIRECTION is " + redGhostDirection);
if(blueGhostDirection == "up")
{
 

  if(isGhostFreezed3 === false)
  {
    // Remove all classes from redGhostElement
    blueGhostElement.className = "";
    // changeRG_up();
    changeBGhostMood("up");
     
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === false)
  {
    blueGhostElement.className = "";
    changeBGFreeze();
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === true)
  {
    blueGhostElement.className = "";
    changeBGGrayFreeze();
  }
  

}
else if(blueGhostDirection === "down")
{
 
  if(isGhostFreezed3 === false)
  {
  // Remove all classes from redGhostElement
  blueGhostElement.className = "";
  // changeRG_down();
  changeBGhostMood("down");
  
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === false)
  {
    blueGhostElement.className = "";
    changeBGFreeze();
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === true)
  {
    blueGhostElement.className = "";
      changeBGGrayFreeze();
  }
}
else if(blueGhostDirection === "left")
{
  if(isGhostFreezed3 === false)
  {
    // Remove all classes from redGhostElement
    blueGhostElement.className = "";
    // changeRG_left();
    changeBGhostMood("left");
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === false)
  {
    blueGhostElement.className = "";
    changeBGFreeze();
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === true)
  {
    blueGhostElement.className = "";
    changeBGGrayFreeze();
  }

}
else if(blueGhostDirection === "right")
{
  
  if(isGhostFreezed3 === false)
  {
  // Remove all classes from redGhostElement
  blueGhostElement.className = "";
  // changeRG_right();
  changeBGhostMood("right");
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === false)
  {
    blueGhostElement.className = "";
    changeBGFreeze();
  }
  else if(isGhostFreezed3 === true && isGhostFreezedComesToEnd3 === true)
  {
    blueGhostElement.className = "";
   changeBGGrayFreeze();
  }
}
}


var  lastBlueGhostDirection = "left";


// Function to move the pink ghost in the maze
function moveBlueGhostInMaze() 
{
 
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
          console.log("Blue ghost killed Pacman.");
      
          if (!isPacmanMoving()) 
          {   
            if(collisionOccurred3 != true)
            {  
          collisionOccurred3 = true;
          // Pause red ghost movement
           isBlueGhostStopped = true;
          isPacmanStopped = true;
         

          if(isGhostFreezed3 === true)
          {
            console.log("3963");
            synchronizeModificationF();
          }
          else
          {
            console.log("3967");
            synchronizeModification();
          }
        }}
    }


if (!isBlueGhostStopped) // when isRedGhostStopped is true do the following thing:
{
 if (!isPaused) 
  {
  var row = Math.floor(blueGhost.top / 8);
  var col = Math.floor(blueGhost.left / 8);

   // LEFT to right
if(row === 14 && col === 0) 
{
  //console.log("GHOST IN TUNNEL: LEFT to right");
//row
blueGhost.top = 112; 
//col
blueGhost.left = 212; //26.5*8 = 212,..., IT HAS TO BE different from col 27, otherwise, inifinite move
}  
// RIGHT to left
else if (row === 14 && col === 27) 
{
  //console.log("GHOST IN TUNNEL: RIGHT to left");

  // Set the red ghost's position to the destination teleportation cell 
  //row - Update the pixel position for top
  blueGhost.top = 112; //14*8 = 112, later, 112 - 4 = 108 translated pos 
  //col -  Update the pixel position for left
  blueGhost.left = 1 * 8; // IT HAS TO BE different from col 0, otherwise, inifinite move
}
else
{
 
    const possibleMoves = [];
    
   
    // // Check if the movement in each direction is valid
    if (isValidMove(row - 1, col) && lastBlueGhostDirection !== "down") 
    {
      possibleMoves.push("up");
    }
    if (isValidMove(row + 1, col) && lastBlueGhostDirection !== "up") 
    {
      possibleMoves.push("down");
    }
    if (isValidMove(row, col - 1) && lastBlueGhostDirection !== "right") 
    {
      possibleMoves.push("left");
    }
    if (isValidMove(row, col + 1) && lastBlueGhostDirection !== "left") 
    {
      possibleMoves.push("right");
    }

    if (possibleMoves.length > 0) 
    {
      // Choose a random valid move and update pinkGhostDirection
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      blueGhostDirection = possibleMoves[randomIndex];


    // Update orange ghost position based on pinkGhostDirection
    if (blueGhostDirection === "up") 
    {
      blueGhost.top -= 8;
    } 
    else if (blueGhostDirection === "down") 
    {
      blueGhost.top += 8;
    } 
    else if (blueGhostDirection === "left") 
    {
      blueGhost.left -= 8;
    } 
    else if (blueGhostDirection === "right") {
      blueGhost.left += 8;
    }

     // Update the last movement direction
    lastBlueGhostDirection = blueGhostDirection;
  }
  else 
  {
          // If no valid moves are available, randomly choose a new direction
          blueGhostDirection = getRandomDirection();
  }

  ghostBdirfaces();
  updateMazeGPos(blueGhost, blueGhostElement);
}
}
}}

//--------------------------------- COLLISION between PACMAN and GHOST ---------------------------------
// Define variables to track the previous positions of Pacman and the red ghost
var previousPacmanPos; // = { x: pacmanPos.x, y: pacmanPos.y };
var previousRedGhostPos; //= { top: redGhost.top, left: redGhost.left };

var collisionOccurred = false;
var collisionOccurred2 = false;
var collisionOccurred3 = false;
var collisionOccurred4 = false;

// Function to check if Pacman is moving 
function isPacmanMoving() 
{
  return (
      pacmanPos.x !== previousPacmanPos.x ||
      pacmanPos.y !== previousPacmanPos.y
  );
}

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

var indx_dead = 0;
var deadPacmanInterval;
function deadPacmanMoods() 
{

    // Change the mood index by incrementing it 
    indx_dead = (indx_dead + 1) % allDeadMoods.length; 
    // We remove the previous dead mood of Pacman i.e. class 
    pacManEmoji.classList.remove(...allDeadMoods);

    // and add the new dead mood of Pacman
    pacManEmoji.classList.add(allDeadMoods[indx_dead]);

  
}



var countDownLives = 1;


// var isRedGhostStopped = false; // Variable to track if red ghost movement is reset to the initial position in i.e. the ghost is dead
// var isPinkGhostStopped = false;
// var isBlueGhostStopped = false;
// var isOrangeGhostStopped = false;

// var isRG = false;
// var isPG = false;
// var isBG = false;
// var isOG = false;
function synchronizeModification() 
{
 
  // console.log("collisionOccurred = ", collisionOccurred);
  // console.log("collisionOccurred2 = ", collisionOccurred2);
  // console.log("collisionOccurred3 = ", collisionOccurred3);
  // console.log("collisionOccurred4 = ", collisionOccurred4);
  // console.log("RED, Flag 1: ", isGhostFreezed, " Flag 2: ", isGhostFreezedComesToEnd);
  // console.log("PINK, Flag 1: ", isGhostFreezed2, " Flag 2: ", isGhostFreezedComesToEnd2);
  // console.log("BLUE, Flag 1: ", isGhostFreezed3, " Flag 2: ", isGhostFreezedComesToEnd3);
  // console.log("ORANGE, Flag 1: ", isGhostFreezed4, " Flag 2: ", isGhostFreezedComesToEnd4);


  
  if ( (collisionOccurred === true && isGhostFreezed  === false)  
    ||
    (collisionOccurred2 === true && isGhostFreezed2  === false)  
    ||
    (collisionOccurred3 == true && isGhostFreezed3  === false)  
    ||
    (collisionOccurred4 === true && isGhostFreezed4  === false)  
    ) 
  {

    console.log("4153");
    countDownLives += 1;
   
    hasInitialKeyPress = false;

    isPacmanStopped = true;


    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    
    clearTimeout(freezeTimerId);
    freezeTimerId = null;
   
    clearTimeout(freezeTimerId2);
    freezeTimerId2 = null;
   
    clearTimeout(freezeTimerId3);
    freezeTimerId3 = null;
   
    clearTimeout(freezeTimerId4);
    freezeTimerId4 = null;
   

    clearInterval(moveG);
    clearInterval(movePG);
    clearInterval(moveBG);
    clearInterval(moveOG);





    // Stop  ghosts movement
    isRedGhostStopped = true;
    isPinkGhostStopped = true;
    isBlueGhostStopped = true;
    isOrangeGhostStopped = true;

    isGhostFreezed = false;
    isGhostFreezed2 = false;
    isGhostFreezed3 = false;
    isGhostFreezed4 = false;
    
    redGhostElement.style.top = 10.5 * 8 + "px"; // Initial positioning 
    redGhostElement.style.left = 13.05 * 8 + "px"; // Initial positioning 

    redGhostElement.className = "";
    pinkGhostElement.className = "";
    blueGhostElement.className = "";
    orangeGhostElement.className = "";

    // First move positioning
    redGhost = { top: 11.5 * 8, left: 13.05 * 8, size: 16};
   
    // blueGhost = { top: 107, left: 11.05 * 8};
    // pinkGhost = { top: 107, left: 13.05 * 8};
    // orangeGhost = { top: 107, left: 15.05 * 8}; 
  
    pinkGhostTransitionStage = -1;
    orangeGhostTransitionStage = -1;
    blueGhostTransitionStage = -1;
    redGhostTransitionStage = -1;
    
   
    pacManEmoji.className = "";
    pacManEmoji.className = "pacman0";

    
      // Start the dead Pacman animation with a slight delay
    setTimeout(() => {
      isPacmanStopped = true;

      
    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);
    
    clearTimeout(freezeTimerId);
    freezeTimerId = null;
   
    clearTimeout(freezeTimerId2);
    freezeTimerId2 = null;
   
    clearTimeout(freezeTimerId3);
    freezeTimerId3 = null;
   
    clearTimeout(freezeTimerId4);
    freezeTimerId4 = null;
   

    clearInterval(moveG);
    clearInterval(movePG);
    clearInterval(moveBG);
    clearInterval(moveOG);
    clearInterval(autoMoveInterval);
    collisionOccurred = false;
    collisionOccurred2 = false;
    collisionOccurred3 = false;
    collisionOccurred4 = false;
      redGhostElement.className = "";
      pinkGhostElement.className = "";
      blueGhostElement.className = "";
      orangeGhostElement.className = "";

        // To start the animation of dead pacman from the very beginning each time
        indx_dead = 0;

    // in order to not rotate the dead Pacman moods
        pacManEmoji.style.transform = "none"; 
        pacManEmoji.style.transform = `translate(${x_translate}px, ${y_translate}px)`;
        
        if (cherry) 
        {
          maze_container.removeChild(cherry);
          cherry = null; // Reset the reference
          cherryDisplayed = false; // Reset the flag
        }
       
  
        deadPacmanInterval = setInterval(deadPacmanMoods,250);
    }, 300);
   
    //console.log("countDownLives: " + countDownLives);

    if(countDownLives != 1)
    {
      // if(countDownLives == 1)
      // {
      //   let life_3 = document.getElementsByClassName("life3")[0]; 
      //   life_3.style.display = "none";
      // }
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

   
   
    isPacmanStopped = true;
    pacmanPos = { x: 0, y: 0 }; 
    if(countDownLives == 2 || countDownLives == 3)// || countDownLives == 3)
    {
     

              // Wait for the specified delay time of 2000 as in readyLabel()
              setTimeout(() => {

                 // Reset any other relevant variables or states
      collisionOccurred = false;
      collisionOccurred2 = false;
      collisionOccurred3 = false;
      collisionOccurred4 = false;

                redGhostElement.classList.add("left1_redGhost");

                // Stop the dead Pacman animation
                // pacManEmoji.className = "pacman0";
                // pacManEmoji.style.transform = `translate(${13.1 * 8}px, ${22.5 * 8}px)`;      

                autoMoveInterval = setInterval(movePacman,100);
                clearInterval(deadPacmanInterval);
          
                

                  currentDirection =  DIRECTION.LEFT;
                  nextDirection = null;


                readylabel();

      }, 3000);  
    }
    else
    {
      // Reset any other relevant variables or states
      //collisionOccurred = false;

      // Wait for the specified delay time of 2000 as in readyLabel()
      setTimeout(() => {
        
        
        clearInterval(deadPacmanInterval);
        clearInterval(autoMoveInterval);

        pacmanDead = true;
        pacmanWinner = false;
    
        gameOverlabel();

      }, 3000);  

    }

  }// if (collisionOccurred && isGhostFreezed === false) 
  
}






var red = false, pink = false, blue = false, orange = false;

function synchronizeModificationF()
{

//console.log("- collisionOccurred = ", collisionOccurred," and isGhostFreezed = ", isGhostFreezed);




  if(collisionOccurred === true && isGhostFreezed  === true ) 
  {
    
    red = true;
    eatScaredGhost();


    console.log("RG, both collision and freezing are true: 4365");
      // Stop red ghost movement
      // isRedGhostStopped = true;
      clearInterval(redGInterval);
      clearTimeout(freezeTimerId);
      freezeTimerId = null;
      
       // Reset any other relevant variables or states
     collisionOccurred = false;
     isGhostFreezed = false;
     isGhostFreezedComesToEnd = false;
     isRedGhostStopped = false;
     isPacmanStopped = false;

     // redGhostElement.className = "";

      // First move positioning
     
     redGhost = { top: 107, left: 13.05 * 8, size: 16};


   
      redGhostTransitionStage = 1;
      // Call the moveRedGhost function at regular intervals
    
      redGInterval = setInterval(moveRedGhostInHouse, 140); 
  }

  
   if(collisionOccurred2 === true  && isGhostFreezed2  === true ) 
  {

    pink = true;
    eatScaredGhost();

    

    console.log("G, both collision and freezing are true: 4424");
       // Stop  ghost movement
       //isPinkGhostStopped = true;

      
        clearInterval(movePG);
        clearInterval(moveG);
       clearTimeout(freezeTimerId2);
       freezeTimerId2 = null;

     //  pinkGhostElement.className = "";


         // Reset any other relevant variables or states
      collisionOccurred2 = false;
      isGhostFreezed2 = false;
      isGhostFreezedComesToEnd2 = false;
      isPinkGhostStopped = false;
      isPacmanStopped = false;
        

        pinkGhost = { top: 107, left: 13.05 * 8};
       
        pinkGhostDirection = "up";
        pinkGhostTransitionStage = 1;

      
        // Call the moveRedGhost function at regular intervals
        
        movePG = setInterval(movePinkGhostInHouse, 160); 
          

    }
   // console.log("- collisionOccurred3 = ", collisionOccurred3," and isGhostFreezed3 = ", isGhostFreezed3);

     if(collisionOccurred3 === true && isGhostFreezed3  === true ) 
    {
      blue = true;
      eatScaredGhost();


      isPacmanStopped = false;
      console.log("BG, both collision and freezing are true: 4471");


      clearInterval(moveG);
      clearInterval(moveBG);
      clearTimeout(freezeTimerId3);
      freezeTimerId3 = null;
      

     // blueGhostElement.className = "";
      // isBlueGhostStopped = true;

        // Reset any other relevant variables or states
        collisionOccurred3 = false;
        isGhostFreezed3 = false;
        isGhostFreezedComesToEnd3 = false;
        isBlueGhostStopped = false;


        blueGhost = { top: 107, left: 11.05 * 8};
     
        blueGhostDirection = "down";

        blueGhostTransitionStage = 1;

        // Call the moveRedGhost function at regular intervals
        
        moveBG = setInterval(moveBlueGhostInHouse, 160); 

    }

    //console.log("- collisionOccurred4 = ", collisionOccurred4," and isGhostFreezed4 = ", isGhostFreezed4);
     if(collisionOccurred4 === true && isGhostFreezed4  === true )  
    {
      
        orange = true;
        eatScaredGhost();

        

        isPacmanStopped = false; 
        console.log("OG, both collision and freezing are true: 4516");


        clearInterval(moveG);
        clearInterval(moveOG);
        clearTimeout(freezeTimerId4);
        freezeTimerId4 = null;
        

        //orangeGhostElement.className = "";

        // Reset any other relevant variables or states
        collisionOccurred4 = false;
        isGhostFreezed4 = false;
        isGhostFreezedComesToEnd4 = false;
        isOrangeGhostStopped = false;


    
        orangeGhost = { top: 107, left: 15.05 * 8};

        orangeGhostDirection = "down";

        orangeGhostTransitionStage = 1;

        // Call the moveRedGhost function at regular intervals
       
        moveOG = setInterval(moveOrangeGhostInHouse, 160); 
          
      

        // Resume ghost and pacman movement
    }


}






















var redGInterval;


// autoMoveInterval = setInterval(movePacman, 140); 
function readylabel() 
{
  clearInterval(moveG);
  clearInterval(movePG);
  clearInterval(moveBG);
  clearInterval(moveOG);
  clearInterval(redGInterval);

  pinkGhostTransitionStage = 0;
  orangeGhostTransitionStage = 0;
  blueGhostTransitionStage = 0;

  blueGhost = { top: 107, left: 11.05 * 8};
  pinkGhost = { top: 107, left: 13.05 * 8};
  orangeGhost = { top: 107, left: 15.05 * 8}; 

  blueGhostDirection = "up";
  pinkGhostDirection = "down";
  orangeGhostDirection = "up";

  updateNestGPos(pinkGhost, pinkGhostElement);
  updateNestGPos(blueGhost, blueGhostElement);
  updateNestGPos(orangeGhost, orangeGhostElement);

  pinkGhostElement.classList.add("down1_pinkGhost");
  blueGhostElement.classList.add("up1_blueGhost");
  orangeGhostElement.classList.add("up1_orangeGhost");

  const labelReady = document.createElement("div");
  labelReady.classList.add("label-ready");
  maze_container.appendChild(labelReady);

  isReady = false;

  // Hidde the cherry if pacman dies once and the game starts over again but the cherry was not eaten in the previous life of pacman
  if (cherry) 
  {
    maze_container.removeChild(cherry);
    cherry = null;
    cherryDisplayed = false;
    clearTimeout(cherryTimeout);
  }
  
  
  pacmanPos = { x: 13, y: 23 }; 
  pacManEmoji.className = "pacman0";
  pacManEmoji.style.transform = `translate(${13.05 * 8}px, ${22.5 * 8}px)`;      

  

  isPacmanStopped = true;
  isRedGhostStopped = true;
  isPinkGhostStopped = true;
  isBlueGhostStopped = true;
  isOrangeGhostStopped = true;
  setTimeout(() => {
    maze_container.removeChild(labelReady);
    isReady = true;

    // Call the moveGhosts function at regular intervals
    moveG  = setInterval(moveGhosts, 160); 


    let life_3 = document.getElementsByClassName("life3")[0]; 
   life_3.style.display = "none";

    // WAY 2: Call the moveRedGhost function at regular intervals
    redGInterval = setInterval(moveRedGhost, 140); // Adjust the interval as needed (in milliseconds)
    

    startingPacManEmoji.style.display = "none";
    // Remove the starting Pacman sprite-emoji
    
    maze_container.appendChild(pacManEmoji);

     // Resume ghost and pacman movement
     isPacmanStopped = false;
     isRedGhostStopped = false;
     isPinkGhostStopped = false;
     isBlueGhostStopped = false;
     isOrangeGhostStopped = false;

     // Call the function to update the position of Pacman initially
update_pacManPos();
     //autoMoveInterval = setInterval(movePacman,140);
  }, 
    3000); 
}

readylabel();



var pacmanDead = false, pacmanWinner = false;

function gameOverlabel() 
{

  isPacmanStopped = true;
  isRedGhostStopped = true;
  isPinkGhostStopped = true;
  isBlueGhostStopped = true;
  isOrangeGhostStopped = true;
  clearInterval(autoMoveInterval);
  clearInterval(moveG);
      clearInterval(movePG);
      clearInterval(moveBG);
      clearInterval(moveOG);
  clearInterval(redGInterval);


  // Remove the Pacman sprite-emoji
  pacManEmoji.style.display = "none"; 
  redGhostElement.style.display = "none"; 
  pinkGhostElement.style.display = "none"; 
  orangeGhostElement.style.display = "none"; 
  blueGhostElement.style.display = "none"; 


  if (cherry) 
  {
    maze_container.removeChild(cherry);
    cherry = null;
    cherryDisplayed = false;
    clearTimeout(cherryTimeout);
  }

if(pacmanDead == true)
{
  const labelGameOver = document.createElement("div");
  labelGameOver.classList.add("label-gameover");
  maze_container.appendChild(labelGameOver);

   setTimeout(() => {
  // Remove all objects of out container
    maze_container.innerHTML = "";
    mazesInterval = setInterval(endMaze,200);
    // maze_container.remove();
    //const maze = document.querySelector(".maze");
    setTimeout(() => {
      window.location.href = "game.html";
  }, 2500);
 }, 
 4000);
}
else if(pacmanWinner == true)
{

saveHighScore();
  // const labelGameOver = document.createElement("div");
  // labelGameOver.classList.add("label-gameover");
  // maze_container.appendChild(labelGameOver);

  // Remove all objects of out container
  maze_container.innerHTML = "";
  // maze_container.remove();
  //const maze = document.querySelector(".maze");

  mazesInterval = setInterval(endMaze,200);

    setTimeout(() => {
      clearInterval(mazesInterval);
      window.location.href = "game.html";
    }, 
    3000);
}




}



// Define the three Pacman images of dead moods
const mazes = [ 
  "maze",
  "mazeWhite"
];

var indx_mazes = 0;
var mazesInterval;

function endMaze()
{
  if(!isPaused)
  {
  // Change the mood index by incrementing it 
  indx_mazes = (indx_mazes + 1) % mazes.length; 
  // We remove the previous dead mood of Pacman i.e. class 
  maze_container.classList.remove(...mazes);

  // and add the new dead mood of Pacman
  maze_container.classList.add(mazes[indx_mazes]);
  }
}













// Function to show the input form
function saveHighScore() 
{
  const playerName = prompt("Congratulations! You've scored " + scores + " points. Please enter your name:");
  if (playerName) 
  {
    var highScore = scores; // Assuming that all pellets and power pellets are eaten 

    const currentTime = new Date().toLocaleString(); // Current timestamp
    const playerData = { name: playerName, score: highScore, timestamp: currentTime };

    const savedData = localStorage.getItem("highScores");
    
    const highScores = savedData ? JSON.parse(savedData) : [];
    highScores.push(playerData);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    
    alert("Your score was saved!");


      // Update high scores list
      updateHighScoresList();
  }
}

// Function to update the high scores list in the sidebar
// Function to update the high scores list in the sidebar
function updateHighScoresList() {
  const savedData = localStorage.getItem("highScores");
  const highScores = savedData ? JSON.parse(savedData) : [];

  // Sort the highScores array in descending order based on the score
  highScores.sort((a, b) => b.score - a.score);

  const highScoresList = document.getElementById("highScoresList");
  
  // Clear previous list items
  highScoresList.innerHTML = "";

  // Populate the list with high scores
  highScores.forEach(scoreData => {
    const li = document.createElement("li");
    li.textContent = `${scoreData.name}: ${scoreData.score} (${scoreData.timestamp})`;
    highScoresList.appendChild(li);
  });
}

// Call this function initially to populate the high scores list
updateHighScoresList();




// Clear the local starage whenever you want
//localStorage.clear();


/*
Google Chrome:
1. Right-click on the webpage and select "Inspect" or press Ctrl+Shift+I (or Cmd+Option+I on Mac) to open the Chrome DevTools.
2. Go to the "Application" tab (or "Storage" tab in older versions).
3. In the left sidebar, you'll find "LocalStorage" under the "Storage" section.
4. Click on your website's domain to see the stored data, including the high scores you saved.
*/


function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


var scaredGhostMultiplier = 1;
 // Initialize the variable to store points added globally
 var pointsAdded = 0;
// Function to handle Pacman eating a scared ghost
function eatScaredGhost() 
{
  const calculations = 200 * scaredGhostMultiplier; // Calculate points based on current multiplier
  scores += calculations;

  scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
  scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding

  pointsAdded = calculations; // Store the points added globally
  console.log("Points added: " + pointsAdded);


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
}