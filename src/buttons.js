// ------------------------------------------------ PAUSE  ------------------------------------------------ 
// The flag responsible for tracking if the game is paused or not
var isPaused = false;
// The pause cover applied on the window where the game is paused
const pauseCover = document.getElementById("pause-window-cover");
// The mode of the buttons
const bmode = document.getElementById("buttons");


function switchButtons() 
{
  if (isPaused === true) // When the game was paused
  {
    isPaused = false; // Reset flag
    bmode.classList.remove("resume"); // This is not shown
    bmode.classList.add("pause"); // "Pause" class is shown
    
    // Hide the pause cover on the window
    pauseCover.style.display = "none"; 
  } 
  else if (isPaused === false) // When the game was not paused
  {
    isPaused = true; // Reset flag
    bmode.classList.remove("pause"); // This is not shown
    bmode.classList.add("resume"); // "Resume" class is shown

    // Show the pause window cover on the window
    pauseCover.style.display = "block"; 
  }
}

bmode.addEventListener("click", switchButtons);


// If user press 'space' button 
document.addEventListener("keydown", function (event) 
  {
    if (event.code === "Space") 
    {
      switchButtons(); 
    }
  }
);



// ------------------------------------------------ "RESTART" GAME ------------------------------------------------ 

document.getElementById('restart').addEventListener('click', function() {
  window.location.href = "game.html"; 
});

// ------------------------------------------------ LEADERBOARD: side navigation bar --------------------------------
function openNav() 
{
  // When we open the side navigation bar for the leaderboard, it occupies 350px 
  document.getElementById("mySidenav").style.width = "350px";
}
  
function closeNav() 
{
  // When we close the side navigation bar for the leaderboard, it occupies 0px 
  document.getElementById("mySidenav").style.width = "0";
}
  

  