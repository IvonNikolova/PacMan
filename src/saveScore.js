// ------------------------------------------------ SAVE THE HIGH SCORE IN LEADERBOARD ------------------------------------------------ 

// Function to save the high score after the player wins the game
function saveScore() 
{
  const playerName = prompt("Congratulations! You've scored " + scores + " points. Please enter your name:");

  // If the player enters his name,
  // do the following things
  if(playerName)  
  {
    // Save the score won by the game as the high score
    var playerScore = scores; 

    // Save the current date and time 
    const currentDateTime = new Date().toLocaleString(); 
    // Save that information per player as an object with three key-value pairs
    const playerID = { name: playerName, score: playerScore, today: currentDateTime };

    // Retrieve/Get the value associated with the key "record" from the local storage (as a JSON string)
    const savedData = localStorage.getItem("record");
    
    // Declare a variable named highScores and initializes it based on the retrieved data. 
    // If there is existing data, 
      // it is parsed from a string format to an array of objects using JSON.parse(savedData)
    const highScores = savedData ? JSON.parse(savedData) : []; 
                            //  If there is data retrieved from local storage (savedData is truthy),
                                //  it is parsed into an array and assigned to highScores. 
                             // If there is no existing data (or it's the first time), the parsed array assigned to highScores will be empty.


    // Add/push the new player data into the variable "highScores"
    highScores.push(playerID);
    // The updated array is then stored back in local storage  
    // and displayed 
          // First, JSON.stringify() is used to convert a JavaScript object or value into a JSON string before storing it in local storage.
          // Then, we save the modified array back to local storage, effectively updating the stored high scores data with the new player's information.
    localStorage.setItem("record", JSON.stringify(highScores)); 

    // Inform the player everything was sucessfully saved!
    alert("Your score was saved! Look at the leaderboard for more!");


    // Update high scores leaderboard
    updateScore();

    // Redirect to game.html i.e. same file 
    // like starting a new game 
    window.location.href = "game.html";
  }
}// saveHighScore() 


// Function to update the scores information in the leaderboard (sidebar)
function updateScore() 
{
  const savedData = localStorage.getItem("record");
  const highScores = savedData ? JSON.parse(savedData) : [];

  // Sort the highScores array in descending order based on the score
  // WAY 1
    // highScores.sort((a, b) => b.score - a.score); // DESC  // highScores.sort((a, b) => a.score - b.score); // ASC 
  // WAY 2
  highScores.sort((a, b) => { 
                              if (a.score === b.score) 
                              {
                                // If scores are equal, sort by today in ascending order
                                return new Date(a.today) - new Date(b.today);
                              }
                              return b.score - a.score;
                            }
                  );
                /*
                    In JavaScript is sorting mechanism, 
                    if the comparison function returns a negative value 
                      like (b.score - a.score), 
                    it means that the element a should come before the element b in the sorted array. 
                    
                    If the comparison function returns a positive value, 
                    it means that b should come before a. 
                    
                    And if it returns zero, their order remains unchanged.
                */

  // Create an object named "leaderboard" of id "highScoresList"
  const leaderboard = document.getElementById("highScoresList");
  // Clear previous items of the leaderboard
  leaderboard.innerHTML = "";

  // Add the winners to the list, 
   // then display their position.
  for (var i = 0; i < highScores.length; i++) 
  {
    const place = i + 1;
    const scoreData = highScores[i];
  
    const liElem = document.createElement("li");
    liElem.setAttribute("data-place", place); // Set data-place attribute
    liElem.textContent = `${scoreData.name}: ${scoreData.score} (${scoreData.today})`;

    leaderboard.appendChild(liElem);
  }
}//updateScore() 

