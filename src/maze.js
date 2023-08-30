// ------------------------------------------------ MAZE: PELLETS & POWER PELLETS  ------------------------------------------------ 

// The values of the objects within the maze grid
const WALL_VALUE = 0;
const PELLET_VALUE = 1;
const POWER_PELLET_VALUE = 2;
const NOTHING_VALUE = 3;
const GHOST_NEST_VALUE = 4;


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



/* 
    The grid. 
    The visual representation of each cell of the maze.

    So, we are going to add 28*31 i.e. 868 cells (divs) to the main container 
    i.e. the labyrinth or the so-called maze.

    NOTE: Each box i.e. cell will be of width 8px!
    NOTE: Each box i.e. cell will be of height 8px!
*/
function grid()
{
  const ROWS = 31;  // 248 maze height / 8 side-size = 31 height cells as rows 
  const COLS = 28; // 224 maze width / 8 side-size = 28 width cells as columns
  
  const grid_container = document.querySelector(".grid"); // const grid_container = document.getElementsByClassName("grid")[0];
  for (var row = 0; row < ROWS; row++) 
  {
    for (var col = 0; col < COLS; col++) 
    {
  
      // Create such element
            // (because the element wasn't predefined in the HTML file).
      const cell = document.createElement("div");
      cell.classList.add("grid-cells");
  
    // Style version 2: it is connected to the classes in 'style_grid.css', check it out
      // Set styling according to the appropriate class 
      // depending on the GPS_arr value 
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
  
      grid_container.appendChild(cell);
    }
  }
}//grid()

// A function that inserts the pellets and the power pellets at the appropriate positions 
// which the maze corridors according to the provided values of GPS_arr
function insertPellets()
{
    // Loop through the maze cells 
    // and place the pellet-objects in their certain locations
    for (let i = 0; i < GPS_arr.length; i++) 
    {
        for (let j = 0; j < GPS_arr[i].length; j++) 
        {
            if(GPS_arr[i][j] == 1) 
            {
            // Create such element for the pellets i.e. dots,
                // (because the element wasn't predefined in the HTML file).
                var pellet = document.createElement("div");
                pellet.className = "dot-pellet";

            
            // The coordinates
                //top (position) - vertical lines
                pellet.style.top = i * 8 + "px"; // multiply by 8 to match the grid size
                //left (position) - horizontal lines
                pellet.style.left = j * 8 + "px";

                // Set style to each object
                pellet.style.position = "absolute";
                
                // The pellet element is added to the maze container element
                maze_container.appendChild(pellet);
            }//if
            else if(GPS_arr[i][j] == 2) 
            {
            // Create such element for the gazers i.e. power pellets,
                // (because the element wasn't predefined in the HTML file).
                var gazer = document.createElement("div");
                gazer.className = "gazer-pellet";
            
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
            }// else if
        }// nested for
    }// outer for
}// insertPellets


/*  Finding and removing the pellets and gazers when Pacman eats them  */
// Function which checks if at that input specific coordinates x and y, 
  // a pellet exists
function findPelletAtCoordinates(x, y) 
{
  for (let i = 0; i < pellets.length; i++)  // pellts.length =  240
  {
    const pellet = pellets[i];
    const pelletPositionX = parseInt(pellet.style.left) / 8;
    const pelletPositionY = parseInt(pellet.style.top) / 8;

    // Compare the input coordinates and the coordinates of for any existing pellet
    if (pelletPositionX === x && pelletPositionY === y) 
    {
      // Return pellet if at that position a pellet is found 
        return pellet;
    }
  }
  // Return null if at that position no pellet is found 
  return null; 
}// findPelletAtCoordinates(x, y) 

// Function which checks if at that input specific coordinates x and y, 
  // a power pellet (gazer) exists
function findGazerAtCoordinates(x, y) 
{
  for (let i = 0; i < gazers.length; i++)  // gazers.length =  4
  {
    const gazer = gazers[i];
    const gazerPositionX = parseInt(gazer.style.left) / 8;
    const gazerPositionY = parseInt(gazer.style.top) / 8;

     // Compare the input coordinates and the coordinates of for any existing gazer
    if (gazerPositionX === x && gazerPositionY === y) 
    {
      // Return gazer if at that position a gazer is found 
      return gazer;
    }
  }
  // Return null if at that position no gazer is found 
  return null; 
}//findGazerAtCoordinates(x, y) 



// Check if the taken step is allowed
  // considering the maze boundaries, its walls and the ghost nest
  function isallowedStep(pos) 
  {
    // Ensure that the position is in the boundaries of the maze
    // y rows
    // x columns
    if (pos.x >= 0 && pos.x < 28 && pos.y >= 0 && pos.y < 31) 
    {
      // Check if it is not a wall and a ghost's house cell
      if (GPS_arr[pos.y][pos.x] !== 0 && GPS_arr[pos.y][pos.x] !== 4) 
      {
        // Check if it is a pellet or a power pellet cell
        if(GPS_arr[pos.y][pos.x] === 1 || GPS_arr[pos.y][pos.x] === 2)
        {

          if(GPS_arr[pos.y][pos.x] === 1) // Pellet cell
          {
          // Provide the Pacman coordinates / positions i.e. which pellet he just ate 
            // if such exists 
            const pelletAtPos = findPelletAtCoordinates(pos.x, pos.y); 
            if (pelletAtPos) // if it exists i.e. it is different than null
            {
              // The pellet at the specific position was just eaten
              // it should be no more displayed 
              pelletAtPos.style.display = "none";
            }
            // Count the points
            scores += 10; 
              
            // When Pacman eats a pellet
            countEatenPellets++;  // Increment the number of eaten pellets
            // console.log("PELLETS: ", countEatenPellets);
          }
          
          if(GPS_arr[pos.y][pos.x] === 2) // Gazer cell 
          {
            // Provide the Pacman coordinates / positions i.e. which gazer he just ate 
              // if such exists
            const gazerAtPos = findGazerAtCoordinates(pos.x, pos.y);
            
            if (gazerAtPos)  // if it exists i.e. it is different than null
            {
               // Handle the situation with the ghosts
              // i.e. change the normal angry state of the ghosts to an afraid frozen state
              isEatenGazer();
              isEatenGazer2();
              isEatenGazer3();
              isEatenGazer4();
              // The gazer at the specific position  was just eaten
             // it should be no more displayed 
              gazerAtPos.style.display = "none";
            }
            
            // Count the points of each eaten gazer
            scores += 50;

            // When Pacman eats a power pellet (a gazer):
            countEatenGazers++; // Increment the number of eaten gazers (1, 2, 3, or 4)
            //console.log("GAZERS: ", countEatenGazers);
          }

          // Scores
          scoreElement_highscore.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
          scoreElement_1up.textContent = scores.toString().padStart(8, '0'); // Update the score display with padding
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
            
            
              To sum up, we take the scores variable,
                          converts it to a string, 
                          adds leading zeros to ensure a minimum length of 4 characters, 
                          and then updates the text content of the result element with the formatted score value.
          */
            
          // Display the cherry              
          if (!cherryDisplayed && (scores >= 50 && scores <= 500) && !cherryInterval1Displayed) 
          {
            cherryInterval1Displayed = true;
            insertCherry();
          } 
          else if (!cherryDisplayed && (scores >= 1500 && scores <= 2000) && !cherryInterval2Displayed) 
          {
            cherryInterval2Displayed = true;
            insertCherry();
          } 
          else if (!cherryDisplayed && (scores >= 3000 && scores <= 4000) && !cherryInterval3Displayed) 
          {
            cherryInterval3Displayed = true;
            insertCherry();
          }

          // Avoid multiple score counting and eating of the same pellet or a gazer
          GPS_arr[pos.y][pos.x] = 3;// it is NO more a PALLET (1) or a GAZER (2)  value

          return true; // the step is allowed
        }

        if(GPS_arr[pos.y][pos.x] === 3 || GPS_arr[pos.y][pos.x] === 5) //an Empty cell OR a Tunnel cell 
        {
          // Do nothing special 
            // just pass through the empty cells or tunnel ones
          return true; // the step is allowed
        }
      }// different from 0 and 4
    }// end of the checking the maze boundaries statement
    return false; //  the step is not allowed    
}// isallowedStep(pos) 
  

