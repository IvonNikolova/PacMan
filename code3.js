/* ***23.06.23************************* */


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
// const START_POS = 6;

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
 
 // 12
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

 // 24,index 23                      //startPacMan, first 6 at index 14, second 6 at 15
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
      cell.classList.add("starting-point");
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
      gazer.className = "power_pellet";
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


/*  **************************************************************** 4-5.06.2023 **************************************************************** */ 
// var container = document.querySelector(".grid");

// // Way 1 - WHAT I WANT for my 15x15 Pacman sprite-emoji
//   // (+) The visually correct positioning
//   // (-) Worse STEPS value i.e. 4, than the needed 8!

// // Starting coordinates
// var indx_x = 13.1*8; /* starting position of x */
// var indx_y = 22.5*8;/* starting position of y */
// // Each step according to correct position in the maze corridors
// var stepSize = 4; /* half of each cell, otherise, pacmanEmoji occupies wrong cells i.e. maze walls by moving up and down !!! */

// // Way 2 - NOT EXACTLY what I want for my 15x15 Pacman sprite-emoji
//   // (-) The positioning is wrong 
//   // (+) Better STEPS value i.e. 8, than 4!

// // Starting coordinates
// var indx_x = 104; /* 13*8 = 104 / 104 - starting position of x */
// var indx_y = 176;/* 22*8 = 176 / 180 - starting position of y */
// var stepSize = 8;  /* the steps  */

// // var pacMan;
// var pacmanEmoji;
// pacmanEmoji = document.createElement("div");
// pacmanEmoji.style.position = "absolute";
// maze_container.appendChild(pacmanEmoji); 

// function movePacMan(event) 
// {
   
//   var k = event.key;
//   /* 
//   Here, within this function, we are using mainly the class "pacman_1" for our emoji
//   by rotating/scaling this one image based on the choice of the arrow-keys. 
  
//   And the second class is "pacman_0" 
//   which is the whole yellow circle 
//   which we see mainly at the very start of the game.
//   */

//   // pacmanEmoji.className = "pacman_0"; // NO Testing v.1
//   pacmanEmoji.className = "pacman"; // Testing v.2

  
//   if (k === "ArrowLeft") 
//   {
//     // pacmanEmoji.className = "pacman_1";// NO Testing v.1
//     pacmanEmoji.className = "pacman"; // Testing v.2
//     pacmanEmoji.style.transform = "scaleX(-1)";
    
//   // or another method 
//     // pacmanEmoji = document.createElement("div");
//     // pacmanEmoji.className = "pacman_1";
//     // pacmanEmoji.style.position = "absolute";
//     // maze_container.appendChild(pacmanEmoji); 
//     // pacMan = document.querySelector(".left1_PacMan");
//     indx_x -= stepSize; // Move left   
//   } 
//   else if(k === "ArrowUp") 
//   {
//     // pacmanEmoji.className = "pacman_1";// NO Testing v.1
//     pacmanEmoji.className = "pacman";  // Testing v.2
  
//     pacmanEmoji.style.transform = "rotate(270deg)"; 
//     indx_y -= stepSize; // Move up
//   } 
//   else if(k === "ArrowRight") 
//   {
//     // pacmanEmoji.className = "pacman_1";// NO Testing v.1
//     pacmanEmoji.className = "pacman";  // Testing v.2

//     pacmanEmoji.style.transform = "scaleY(-1)";
//     indx_x += stepSize; // Move right
//   } 
//   else if(k === "ArrowDown") 
//   {
//     // pacmanEmoji.className = "pacman_1";// NO Testing v.1
//     pacmanEmoji.className = "pacman"; // Testing v.2

//     pacmanEmoji.style.transform = "rotate(90deg)";
//     indx_y += stepSize; // Move down
//   }
//   // else
//   // {
//   //   pacmanEmoji.className = "pacman_0"; 
//   //   indx_x = 13.1*8;
//   //   indx_y = 22.5*8;
//   // }

//   /* 
//   The pacmanEmoji element is prevented from going outside the bounds of its container 
//   by the usage of the following lines.

//   The indx_x and indx_y values are bound inside the acceptable range 
//   using the Math.max and Math.min functions. 
//   Here's how it works: 
//       Math.max(0, Math.min(indx_x, 224 - pacmanEmoji.offsetWidth));
//     So, Math.max(0, ...) make sure the result is not less than 0,
//     Math.min make sure that the result values do not go outside of the boundaries,
//     'pacmanEmoji.offsetWidth' represents the width of the pacmanEmoji element.
//   */
//   //  Prevention from going outside the width boundary:
//   indx_x = Math.max(0, Math.min(indx_x, (28-1)*8 - pacmanEmoji.offsetWidth));
//   //  Prevention from going outside the height boundary:
//   indx_y = Math.max(0, Math.min(indx_y, (31-1)*8 - pacmanEmoji.offsetHeight));

  
// // Way 1:
//   // var new_x, new_y;
//   // new_x = pacmanEmoji.style.left = indx_x + 'px';
//   // new_y = pacmanEmoji.style.top = indx_y + 'px';
//   // console.log("(x:"+new_x+", y:"+new_y+")");
// // Way 2:
//   var n = { x: 0, y: 0 };
//   n.x = pacmanEmoji.style.left = indx_x + 'px';
//   n.y = pacmanEmoji.style.top = indx_y + 'px';
//   console.log(JSON.stringify(n));

//   event.preventDefault(); // Stop the window from scrolling using the arrow-up and -down keys
// }
// document.addEventListener("keydown", movePacMan);




/* **************************************************************** 12.-13.06.2023 **************************************************************** */

// Select maze element
// see line  201: 
  // const maze_container = document.querySelector(".maze");

// The chosen direction 
/*
  Later, it will be assigned to different values 
  according to the pressed arrow keys.
 */


// Create a starting Pacman element 
var startingPacManEmoji = document.createElement("div");

startingPacManEmoji.style.position = "absolute";
startingPacManEmoji.className = "pacman0";
// Initial position of Pacman

startingPacManEmoji.style.top = 22.5 * 8 + "px";
startingPacManEmoji.style.left = 13.1 * 8 + "px";
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
console.log("All inserted Pellets: " + pellets.length); // 240

const gazers = document.querySelectorAll(".power_pellet"); 
console.log("All inserted Power pellets: " + gazers.length); // 4

const cherries = container.querySelectorAll(".cherry");
console.log("All inserted Cherries: " + cherries.length); // 240

function findFruits(x, y) 
{
  for (let i = 0; i < cherries.length; i++)  // pellts.length =  240
  {
    const cherry = cherries[i];
    const cherryPositionX = parseInt(cherry.style.left) / 8;
    const cherryPositionY = parseInt(cherry.style.top) / 8;

    if (cherryPositionX === x && cherryPositionY === y) 
    {
      return cherry;
    }
  }
  // Return null if at that position no pellet is found 
  return null; 
}


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


// Check if the taken step is allowed
  // considering the maze boundaries and its walls
function isValid(pos) 
{
  
  // Ensure that the position is in the boundaries of the maze
  // y rows
  // x columns
  if (pos.x >= 0 && pos.x < 28 && pos.y >= 0 && pos.y < 31) 
  {
    // Ensure that the position is not a wall
    // if (GPS_arr[pos.y][pos.x] !== 0) // 0's are the walls
    // {
    //   return true; // the step is allowed
    // }

    if (GPS_arr[pos.y][pos.x] !== 0) // It is NOT a 0 i.e. wall
    {
      if(GPS_arr[pos.y][pos.x] === 1) // Pellet cell
      {
        // scoresPellets += 10;
        // console.log("scoresPellets: " + scoresPellets);
    
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

      // Provide the Pacman coordinates / positions i.e. which pellet he just ate 
        // if such exists 
      const pelletAtPos = findPelletAtCoordinates(pos.x, pos.y); 
      if (pelletAtPos) // if it exists i.e. it is different than null
      {
        // The pellet at the specific position was just eaten
        // we should no more display it
        pelletAtPos.style.display = "none";
      }

        scores += 10; 
        scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
        scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
 
        points = scores;
        console.log("Scores: " + scores);
        console.log("sss: " + points);
if(points === 500 || points === 1000 || points === 2000 || points === 2500)
{
  // alert("cherry!");
  var cherry1 = document.createElement("div");
  cherry1.classList.add("cherry");
  cherry1.style.position = "absolute";
  cherry1.style.top = 22.5 * 8 + "px";
  cherry1.style.left = 13.1 * 8  + "px";

  //var mazeContainer = document.querySelector('maze');
  maze_container.appendChild(cherry1);

}


        // Avoid multiple score counting and eating of the same pellet
        GPS_arr[pos.y][pos.x] = 3;// it is NO more a PELLET position value

        return true; // the step is allowed
      }
      
      if(GPS_arr[pos.y][pos.x] === 2) // Gazer cell 
      {
      // Provide the Pacman coordinates / positions i.e. which gazer he just ate 
        // if such exists
        const gazerAtPos = findGazerAtCoordinates(pos.x, pos.y);
        if (gazerAtPos)  // if it exists i.e. it is different than null
        {
          // The gazer at the specific position  was just eaten
            // we should no more display it
          gazerAtPos.style.display = "none";
        }

      // Count the points
        // scoresGazers += 50;
        // console.log("scoresGazers: " + scoresGazers);
        scores += 50;
    
        scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
        scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
 
        points = scores;
        console.log("Scores: " + scores);
        console.log("sss: " + points);
if(points === 500 || points === 1000 || points === 2000 || points === 2500)
{
  // alert("cherry!");
  var cherry1 = document.createElement("div");
  cherry1.classList.add("cherry");
  cherry1.style.position = "absolute";
  cherry1.style.top = 13.1 * 8 + "px";
  cherry1.style.left = 22.5 * 8 + "px";

  //var mazeContainer = document.querySelector('maze');
  maze_container.appendChild(cherry1);

}
      // Avoid multiple score counting and eating of the same gazer
        GPS_arr[pos.y][pos.x] = 3;// it is NO more a GAZER position value

        return true; // the step is allowed
      }
      if(GPS_arr[pos.y][pos.x] === 3 || GPS_arr[pos.y][pos.x] === 5) //Empty cell || Tunnel cell 
      {
        // Do nothing special 
          // just pass through the empty cells or tunnel ones
        return true; // the step is allowed
      } 
    }
  }
  
  return false; //  the step is not allowed
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

function eatingMoods() 
{
  // Change the mood index by increemnting it 
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

  // setTimeout(eatingMoods, 250); 
}



function isallowedStep(pos) {
  if (pos.x >= 0 && pos.x < 28 && pos.y >= 0 && pos.y < 31) {
    // Ensure that the position is not a wall
    if (GPS_arr[pos.y][pos.x] !== 0) // 0's are the walls
    {
      return true; // the step is allowed
    }
  }
  return false;
}

// Define direction constants
const DIRECTION = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

// Set the initial direction
let currentDirection = DIRECTION.LEFT;
let nextDirection = null;

function update_pacManPos() {
  const cell_size = 8;
  const pacman_size = 15;

  const x_offset = (cell_size - pacman_size) / 2;
  const y_offset = (cell_size - pacman_size) / 2;

  const x_translate = pacmanPos.x * cell_size + x_offset;
  const y_translate = pacmanPos.y * cell_size + y_offset;

  startingPacManEmoji.style.display = "none";
  pacManEmoji.className = "pacman";

  maze_container.appendChild(pacManEmoji);

  pacManEmoji.style.transform = `translate(${x_translate}px, ${y_translate}px)`;
}

function moveRight() {
  const newPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
  if (isallowedStep(newPos)) {
    pacmanPos = newPos;
    update_pacManPos();
  }
}

function moveLeft() {
  const newPos = { x: pacmanPos.x - 1, y: pacmanPos.y };
  if (isallowedStep(newPos)) {
    pacmanPos = newPos;
    update_pacManPos();
  }
}

function moveUp() {
  const newPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
  if (isallowedStep(newPos)) {
    pacmanPos = newPos;
    update_pacManPos();
  }
}

function moveDown() {
  const newPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
  if (isallowedStep(newPos)) {
    pacmanPos = newPos;
    update_pacManPos();
  }
}

function movePacman() {
  // Determine the next position based on the current direction
  let nextPos;
  if (currentDirection === DIRECTION.UP) {
    nextPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
  } else if (currentDirection === DIRECTION.DOWN) {
    nextPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
  } else if (currentDirection === DIRECTION.LEFT) {
    nextPos = { x: pacmanPos.x - 1, y: pacmanPos.y };
  } else if (currentDirection === DIRECTION.RIGHT) {
    nextPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
  }

  // Check if the next position is allowed
  if (isallowedStep(nextPos)) {
    pacmanPos = nextPos;
    update_pacManPos();
  } else {
    // Pacman hit a wall, stop automatic movement
    clearInterval(autoMoveInterval);
    autoMoveInterval = null;
  }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Save the user's input as the next direction
  if (key === "ArrowUp") {
    nextDirection = DIRECTION.UP;
  } else if (key === "ArrowDown") {
    nextDirection = DIRECTION.DOWN;
  } else if (key === "ArrowLeft") {
    nextDirection = DIRECTION.LEFT;
  } else if (key === "ArrowRight") {
    nextDirection = DIRECTION.RIGHT;
  }

  // If Pacman is not currently moving automatically, start the automatic movement
  if (!autoMoveInterval) {
    autoMoveInterval = setInterval(function () {
      if (nextDirection) {
        // Check if the next direction is valid
        const nextPos = getNextPos(nextDirection);
        if (isallowedStep(nextPos)) {
          currentDirection = nextDirection;
          nextDirection = null;
        }
      }
      movePacman();
    }, 100);
  }
});

function getNextPos(direction) {
  let nextPos;
  if (direction === DIRECTION.UP) {
    nextPos = { x: pacmanPos.x, y: pacmanPos.y - 1 };
  } else if (direction === DIRECTION.DOWN) {
    nextPos = { x: pacmanPos.x, y: pacmanPos.y + 1 };
  } else if (direction === DIRECTION.LEFT) {
    nextPos = { x: pacmanPos.x - 1, y: pacmanPos.y };
  } else if (direction === DIRECTION.RIGHT) {
    nextPos = { x: pacmanPos.x + 1, y: pacmanPos.y };
  }
  return nextPos;
}



// Call the function to update the position of Pacman initially
update_pacManPos();

// Start the automatic movement of Pacman
let autoMoveInterval = setInterval(movePacman, 100);



// // Define the initial positions of the ghosts inside the house
// const ghost1 = { top: 112.5, left: 119, className: "up1_orangeGhost" }; // Ghost 1 initial position and ID
// const ghost2 = { top: 112.5, left: 89, className: "up1_blueGhost" };    // Ghost 2 initial position and ID
// const ghost3 = { top: 112.5, left: 104, className: "down1_pinkGhost" };   // Ghost 3 initial position and ID

// // Rest of the code...

// // Function to update the CSS position of a ghost
// // Function to update the CSS position of a ghost
// function updateGhostPosition(ghost) {
//   const ghostElements = document.getElementsByClassName(ghost.className);
//   Array.from(ghostElements).forEach((element) => {
//     element.style.top = `${ghost.top}px`;
//     element.style.left = `${ghost.left}px`;
//   });
// }

// updateGhostPosition(ghost1);


// Rest of the code...
// Define the initial positions of the ghosts inside the house
const orangeGhost = { top: 112.5, left: 119 };
const blueGhost = { top: 112.5, left: 89 };
const pinkGhost = { top: 112.5, left: 104 };

// Function to update the position of the orange ghost
function updateOrangeGhostPosition() {
  const orangeGhostElement = document.querySelector("up1_orangeGhost");
  orangeGhostElement.style.top = `${orangeGhost.top}px`;
  orangeGhostElement.style.left = `${orangeGhost.left}px`;
  maze_container.appendChild(orangeGhostElement);
}

// Function to update the position of the blue ghost
function updateBlueGhostPosition() {
  const blueGhostElement = document.querySelector("up1_blueGhost");
  blueGhostElement.style.top = `${blueGhost.top}px`;
  blueGhostElement.style.left = `${blueGhost.left}px`;
  maze_container.appendChild(blueGhostElement);
}

// Function to update the position of the pink ghost
function updatePinkGhostPosition() {
  const pinkGhostElement = document.querySelector("down1_pinkGhost");
  pinkGhostElement.style.top = `${pinkGhost.top}px`;
  pinkGhostElement.style.left = `${pinkGhost.left}px`;
  maze_container.appendChild(pinkGhostElement);
}

// Update the initial positions of the ghosts
updateOrangeGhostPosition();
updateBlueGhostPosition();
updatePinkGhostPosition();
