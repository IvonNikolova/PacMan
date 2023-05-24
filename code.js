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
// const main_container = document.querySelector(".grid");
const main_container = document.getElementsByClassName("grid")[0];
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

// The values of the objects within the grid  maze 
const WALL_VALUE = 0;
const PELLET_VALUE = 1;
const POWER_PELLET_VALUE = 2;
const NOTHING_VALUE = 3;
const GHOST_NEST_VALUE = 4;
const TUNNEL_TELEPORT_VALUE = 5;

// The container - 2d array which represents the objects as values 
    // Rows x Columns i.e. 28 x 31
const  maze_objects = [
     // 1 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     // 2
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    // 3
    [0, 1, 0, 0, 0, 0, 1, 0, 0, , 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // 4
    [0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0],
    // 5
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // 6
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    // 7
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // 8
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // 9
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    // 10
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 11
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 12
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 13
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 4, 4, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 14
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 4, 4, 4, 4, 4, 4, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 15
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 4, 4, 4, 4, 4, 4, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 16 ---- the tunnel teleport's row
    [5, 3, 3, 3, 3, 3, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 3, 3, 3, 3, 3, 5],
    // 17
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 18
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 19
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 20
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    // 21
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    // 22
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // 23
    [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    // 24
    [0, 2, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2, 0],
    // 25
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    // 26
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    // 27
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    // 28
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    // 29
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    // 30
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    // 31 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  
 /* --23.05.2023 -- */ 
// NOTE: Each box i.e. cell will be of width 8px
// NOTE: Each box i.e. cell will be of height 8px

// Loop through the maze cells and place the object in a certain locations
for (let i = 0; i < maze_objects.length; i++) 
{
  for (let j = 0; j < maze_objects[i].length; j++) 
  {
    if(maze_objects[i][j] == 1) 
    {
    // Create a new element of type "img" 
      var pellet_img = document.createElement("img");
      
    // Provide the image source of the pellet 
      //https://stackoverflow.com/questions/43072372/javascript-gallery-adding-images-with-for-loop
      pellet_img.setAttribute("src", "./assets/images/pellet" + ".png");
      
    // The coordinates
      //top (position) - vertical lines
      pellet_img.style.top = i * 8 + "px"; // multiply by 8 to match the grid size
       //left (position) - horizontal lines
       pellet_img.style.left = j * 8 + "px";

    // Set style to each object
    // https://www.w3schools.com/js/js_htmldom_css.asp
      pellet_img.style.position = "absolute";
      
    // The pellet element is added to the maze container element
      document.querySelector(".maze").appendChild(pellet_img);
    }
    else if(maze_objects[i][j] == 2) 
    {
    // Create a new element of type "img" 
      var power_pellet_img = document.createElement("img");

    // Provide the image source of the power pellet 
      //https://stackoverflow.com/questions/43072372/javascript-gallery-adding-images-with-for-loop
      power_pellet_img.setAttribute("src", "./assets/images/gazer" + ".png");
      
    // The coordinates
      //top (position) - vertical lines
      power_pellet_img.style.top = i * 8 + "px"; // multiply by 8 to match the grid size
      //left (position) - horizontal lines
      power_pellet_img.style.left = j * 8 + "px";

    // Set style to each object
    // https://www.w3schools.com/js/js_htmldom_css.asp
      power_pellet_img.style.position = "absolute";
      power_pellet_img.style.animation = "blink 0.5s infinite";

    // The power pellet element is added to the maze container element
      document.querySelector(".maze").appendChild(power_pellet_img);   
    }
  }
}


 /* --24.05.2023 -- */ 
