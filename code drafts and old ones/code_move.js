
// The values of the objects within the grid  maze 
const WALL_VALUE = 0;
const PELLET_VALUE = 1;
const POWER_PELLET_VALUE = 2;
const NOTHING_VALUE = 3;
const GHOST_NEST_VALUE = 4;
const TUNNEL_TELEPORT_VALUE = 5;
const START_POS = 6;
// The container - 2d array which represents the objects as values 
    // Rows x Columns i.e. 28 x 31 = 868 VALUES
const  GPS_arr = [
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
 // 15 ---- the tunnel teleport's row
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
 [0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0], //----> 24*8px = 192
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
/* --19.05.2023 -- */  
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
const main_container = document.querySelector(".grid");
// const main_container = document.getElementsByClassName("grid")[0];
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
        main_container.appendChild(cell); 
    is used to append the newly created <div> element (cell) 
    as a child to another HTML element - main_container.

    In the given code, 
        main_container, 
    refers to an existing HTML element 
    to which you want to append the (cell) element. 

    The appendChild() method is a built-in JavaScript method 
    that allows us to add a child element to a parent element.

    By using:
        main_container.appendChild(cell);,
    we are appending the 'cell' element as a child 
    to the main_container element. 

    This means that the 'cell' element will become a nested element 
    within the container element -  main_container, 
    in the HTML structure.  
*/
    main_container.appendChild(cell);
  }
}

// NOTE: Each box i.e. cell will be of width 8px
// NOTE: Each box i.e. cell will be of height 8px

const maze_container = document.querySelector(".maze");
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

 /* --2.06.2023 -- */ 
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









//  /* --4-5.06.2023 -- */ 

// var container = document.querySelector(".grid");
// // Starting coordinates
// var indx_x = 0; /* 104 - starting position of x */
// var indx_y = 0;/* 180 - starting position of y */

// var stepSize = 8; /* half of each cell, otherise, pacmanEmoji occupies wrong cells i.e. maze walls by moving up and down */

// // var pacMan;
// var pacmanEmoji;
// pacmanEmoji = document.createElement("div");
// pacmanEmoji.style.position = "absolute";
// maze_container.appendChild(pacmanEmoji); 

// function movePacMan(event) {
   
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

//   var new_x, new_y;

//   new_x = pacmanEmoji.style.left = indx_x + 'px';
//   // console.log("x:"+new_x);
//   // alert(new_x);
//   new_y = pacmanEmoji.style.top = indx_y + 'px';
//   console.log("(x:"+new_x+", y:"+new_y+")");
//   // alert(new_y);

//   event.preventDefault(); // Stop the window from scrolling using the arrow-up and -down keys
// }
// document.addEventListener("keydown", movePacMan);






 /* 7.06.2023 */
 // // Initial position of Pac-Man
// let pacmanPosition = { x: 0, y: 0 }; // Grid coordinates (0-based)

// // Function to update the Pac-Man's position on the screen
// function updatePacmanPosition() {
//   const pacmanElement = document.getElementById("pacman");
//   pacmanElement.style.left = `${pacmanPosition.x * 8}px`; // Multiply grid coordinates by cell size (8px)
//   pacmanElement.style.top = `${pacmanPosition.y * 8}px`; // Multiply grid coordinates by cell size (8px)
// }

// // Move Pac-Man function
// function movePacman(direction) {
//   // Update the position based on the direction
//   switch (direction) {
//     case "up":
//       pacmanPosition.y--;
//       break;
//     case "down":
//       pacmanPosition.y++;
//       break;
//     case "left":
//       pacmanPosition.x--;
//       break;
//     case "right":
//       pacmanPosition.x++;
//       break;
//     default:
//       return; // Invalid direction
//   }
  
//   // Keep Pac-Man within the bounds of the maze
//   pacmanPosition.x = Math.max(0, Math.min(pacmanPosition.x, 27)); // Assuming 28 horizontal cells (0 to 27)
//   pacmanPosition.y = Math.max(0, Math.min(pacmanPosition.y, 30)); // Assuming 31 vertical cells (0 to 30)
  
//   // Update Pac-Man's position on the screen
//   updatePacmanPosition();
// }

// // Example usage:
// movePacman("right"); // Move Pac-Man to the right




/* 9.06.2023 */

// // Which value sof the GPS_array are different from 0 ?
// const nonZeroElements = [];

// for (let i = 0; i < ROWS; i++) // 31 rows
// {
//   for (let j = 0; j < COLS; j++) //28 columns
//   {
//     const value = GPS_arr[i][j]; // Access the current element in the array
//     if (value !== 0) 
//     {
//       var coordinates = { x: j*8, y: i*8 };
//       nonZeroElements.push({ value, coordinates });
//     }
//   }
// }
// console.log(nonZeroElements);



/* 9.06.2023 */
// JavaScript code to move Pacman within the maze
const mazeElement = document.querySelector('.maze'); // Select maze element



 // Initial position of Pacman
 let pacmanPosition = { x: 13, y: 23 }; // Set initial position as per your maze layout
    
// pacmanElement.className = 'pacman';
// mazeElement.appendChild(pacmanElement);

 // Keyboard event listener
 document.addEventListener('keydown', (event) => {
   const key = event.key;
   
   // Move Pacman based on the arrow keys
   if (key === 'ArrowUp') 
   {
    // pacmanElement.className = 'pacman';
    // pacmanElement.style.transform = "rotate(270deg)"; 
     moveUp();
   } 
   else if (key === 'ArrowDown') 
   {
    // pacmanElement.className = 'pacman';
    // pacmanElement.style.transform = "rotate(90deg)";
     moveDown();
   } 
   else if (key === 'ArrowLeft') 
   {
    // pacmanElement.className = 'pacman';
    // pacmanElement.style.transform = "scaleX(-1)";
     moveLeft();
   } 
   else if (key === 'ArrowRight') 
   {
    // pacmanElement.className = 'pacman';
    // pacmanElement.style.transform = "scaleY(-1)";
     moveRight();
   }

   event.preventDefault();
 });
 
 // Function to move Pacman up
 function moveUp() 
 {
   // Calculate the new position
   const newPosition = { x: pacmanPosition.x, y: pacmanPosition.y - 1 };
   
   // Check if the new position is within the maze and not a wall
   if (isValidMove(newPosition)) 
   {
     // Update Pacman's position
     pacmanPosition = newPosition;
     updatePacmanPosition();
   }
 }
 
 // Function to move Pacman down
 function moveDown() 
 {
   // Calculate the new position
   const newPosition = { x: pacmanPosition.x, y: pacmanPosition.y + 1 };
   
   // Check if the new position is within the maze and not a wall
   if (isValidMove(newPosition)) 
   {
     // Update Pacman's position
     pacmanPosition = newPosition; 
     updatePacmanPosition();
   }
 }
 
 // Function to move Pacman left
 function moveLeft() 
 {
   // Calculate the new position
   const newPosition = { x: pacmanPosition.x - 1, y: pacmanPosition.y };
   
   // Check if the new position is within the maze and not a wall
   if (isValidMove(newPosition)) 
   {
     // Update Pacman's position
     pacmanPosition = newPosition;
     
     updatePacmanPosition();
   }
 }
 
 // Function to move Pacman right
 function moveRight() 
 {
   // Calculate the new position
   const newPosition = { x: pacmanPosition.x + 1, y: pacmanPosition.y };
   
   // Check if the new position is within the maze and not a wall
   if (isValidMove(newPosition)) 
   {
     // Update Pacman's position
     pacmanPosition = newPosition;
   
     updatePacmanPosition();
     
   }
 }
 
 // Function to check if a move is valid (within the maze and not a wall)
 function isValidMove(position) {
   // Check if the position is within the maze bounds
   if (
     position.x >= 0 &&
     position.x < 28 &&
     position.y >= 0 &&
     position.y < 31
   ) 
   {
     // Check if the position is not a wall
     if (GPS_arr[position.y][position.x] !== 0) 
     {
       return true; // Valid move
     }
   }
   
   return false; // Invalid move
 }
 
 // Function to update Pacman's position in the DOM
 function updatePacmanPosition() {
   // Remove the previous Pacman element
   const previousPacmanElement = document.querySelector('.pacman');
   if (previousPacmanElement) 
   {
     previousPacmanElement.remove();
   }
   
   // Create a new Pacman element and set its position
  //  pacmanElement = document.createElement('div');
  //  pacmanElement.className = 'pacman';
  //  pacmanElement.style.left = "1px";
  //  pacmanElement.style.top = "-22px";
  
  var pacmanElement = document.createElement('div');
  pacmanElement.style.position = "absolute";
  pacmanElement.className = 'pacman';
  pacmanElement.style.transform = `translate(${pacmanPosition.x * 8}px, ${pacmanPosition.y * 8}px)`;
   
   // Add the Pacman element to the maze
   mazeElement.appendChild(pacmanElement);
 }

