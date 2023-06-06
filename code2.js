


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


/* 04.06.23 */
// var start_y = 23;
// var start_x = 13;
// var startPacMan = document.createElement("div");
// startPacMan.className = "start_rightPacMan"; 
// startPacMan.style.top = (start_y - 1 + 0.55) * 8 + "px";
// startPacMan.style.left = (start_x) * 8 + "px";
// startPacMan.style.position = "absolute";
// maze_container.appendChild(startPacMan); 

const maze_container = document.querySelector(".maze");
var startPacMan = document.createElement("div");
var pacMan;
var grid_container = document.querySelector(".grid");
var positionX = 0;
var positionY = 0;
var stepSize = 4.5;

var containerRect = grid_container.getBoundingClientRect();
var containerWidth = 224;
var containerHeight = 248;

function movePacMan(event) {
  if (event.key === "ArrowLeft") 
  {
    startPacMan.className = "left1_PacMan"; 
    startPacMan.style.position = "absolute";
    maze_container.appendChild(startPacMan); 

    pacMan = document.querySelector(".left1_PacMan");

    positionX -= stepSize; // Move left
  } 
  else if (event.key === "ArrowUp") 
  {
    startPacMan.className = "up1_PacMan"; 
    startPacMan.style.position = "absolute";
    maze_container.appendChild(startPacMan); 

    pacMan = document.querySelector(".up1_PacMan");

    positionY -= stepSize; // Move up
  } 
  else if (event.key === "ArrowRight") 
  {
    startPacMan.className = "right1_PacMan"; 
    startPacMan.style.position = "absolute";
    maze_container.appendChild(startPacMan); 

    pacMan = document.querySelector(".right1_PacMan");

    positionX += stepSize; // Move right
  } 
  else if (event.key === "ArrowDown") 
  {
    startPacMan.className = "down1_PacMan"; 
    startPacMan.style.position = "absolute";
    maze_container.appendChild(startPacMan); 

    pacMan = document.querySelector(".down1_PacMan");

    positionY += stepSize; // Move down
  }

  positionX = Math.max(0, Math.min(positionX, containerWidth - pacMan.offsetWidth));
  positionY = Math.max(0, Math.min(positionY, containerHeight - pacMan.offsetHeight));


  pacMan.style.left = positionX + 'px';
  pacMan.style.top = positionY + 'px';

  event.preventDefault(); // Prevent window scrolling
}

document.addEventListener('keydown', movePacMan);
