//-------------------- DIFFERENT ANIMATIONS of the ghosts during their different states and depending on their directions --------------------

// The different spritesheets of the faces of each ghost 
// according to its state (angry normal or afraid frozen)
// and according to its direction 
function ghostFaces(
                    ghostElement, //redGhostElement
                        ghostDirection, //redGDirection
                            isGhostFreezed, //isGhostFreezed
                                isGhostFreezedComesToEnd, //isGhostFreezedComesToEnd
                                    func1,  //changeRGhostMood
                                        func2, //changeRGFreeze
                                            func3 //changeRGGrayFreeze
                    )
{
    // State: angry normal
    if(isGhostFreezed === false)
    {
        // Consider the direction!
        if(ghostDirection == "up")
        { 
            ghostElement.className = "";
            func1("up");
        }
        else if(ghostDirection === "down")
        {
            ghostElement.className = "";
            func1("down");
        }
        else if(ghostDirection === "left")
        {
            ghostElement.className = "";
            func1("left");
        }
        else if(ghostDirection === "right")
        {
            ghostElement.className = "";
            func1("right");
        }
    } // State: afraid frozen
    else if(isGhostFreezed === true)
    {
        if(isGhostFreezed === true && isGhostFreezedComesToEnd === false)
        {
            ghostElement.className = "";
            func2();
        }
        else if(isGhostFreezed === true && isGhostFreezedComesToEnd === true)
        {
            ghostElement.className = "";
            func3();
        }
    }
}// ghostFaces()




//-------------------- animation of ANGRY NORMAL RED ghost --------------------
// Animation array of red ghost according to its direction
const ghostRMoods = {
    left: ["left1_redGhost", "left2_redGhost", "left1_redGhost"],
    right: ["right1_redGhost", "right2_redGhost", "right1_redGhost"],
    down: ["down1_redGhost", "down2_redGhost", "down1_redGhost"],
    up: ["up1_redGhost", "up2_redGhost", "up1_redGhost"]
};

// Indices array of red ghost
const ghostRIndices = {
    left: 0,
    right: 0,
    down: 0,
    up: 0
};

// Red angry normal ghost
function changeRGhostMood(direction) 
{
    ghostRIndices[direction] = (ghostRIndices[direction] + 1) % ghostRMoods[direction].length;
    redGhostElement.classList.remove(...ghostRMoods[direction]);
    redGhostElement.classList.add(ghostRMoods[direction][ghostRIndices[direction]]);
}//changeRGhostMood(direction)
    
//-------------------- animation of ANGRY NORMAL PINK ghost --------------------
// Animation array of pink ghost according to its direction
const ghostPMoods = {
    left: ["left1_pinkGhost", "left2_pinkGhost", "left1_pinkGhost"],
    right: ["right1_pinkGhost", "right2_pinkGhost", "right1_pinkGhost"],
    down: ["down1_pinkGhost", "down2_pinkGhost", "down1_pinkGhost"],
    up: ["up1_pinkGhost", "up2_pinkGhost", "up1_pinkGhost"]
};
  
// Indices array of pink ghost
const ghostPIndices = {
    left: 0,
    right: 0,
    down: 0,
    up: 0
};

// Pink angry normal ghost
function changePGhostMood(direction) 
{
    ghostPIndices[direction] = (ghostPIndices[direction] + 1) % ghostPMoods[direction].length;
    pinkGhostElement.classList.remove(...ghostPMoods[direction]);
    pinkGhostElement.classList.add(ghostPMoods[direction][ghostPIndices[direction]]);
}//changePGhostMood(direction) 
  
//-------------------- animation of ANGRY NORMAL BLUE ghost --------------------
// Animation array of blue ghost according to its direction
const ghostBMoods = {
    left: ["left1_blueGhost", "left2_blueGhost", "left1_blueGhost"],
    right: ["right1_blueGhost", "right2_blueGhost", "right1_blueGhost"],
    down: ["down1_blueGhost", "down2_blueGhost", "down1_blueGhost"],
    up: ["up1_blueGhost", "up2_blueGhost", "up1_blueGhost"]
};

// Indices array of blue ghost
const ghostBIndices = {
    left: 0,
    right: 0,
    down: 0,
    up: 0
 };
  
// Blue angry normal ghost
function changeBGhostMood(direction) 
{
    ghostBIndices[direction] = (ghostBIndices[direction] + 1) % ghostBMoods[direction].length;
    blueGhostElement.classList.remove(...ghostBMoods[direction]);
    blueGhostElement.classList.add(ghostBMoods[direction][ghostBIndices[direction]]);
}//changeBGhostMood(direction) 
  

//-------------------- animation of ANGRY NORMAL ORANGE ghost --------------------
// Animation array of orange ghost according to its direction
const ghostOMoods = {
    left: ["left1_orangeGhost", "left2_orangeGhost", "left1_orangeGhost"],
    right: ["right1_orangeGhost", "right2_orangeGhost", "right1_orangeGhost"],
    down: ["down1_orangeGhost", "down2_orangeGhost", "down1_orangeGhost"],
    up: ["up1_orangeGhost", "up2_orangeGhost", "up1_orangeGhost"]
};
 
// Indices array of orange ghost
const ghostOIndices = {
    left: 0,
    right: 0,
    down: 0,
    up: 0
};
  
// Orange angry normal ghost
function changeOGhostMood(direction) 
{
  ghostOIndices[direction] = (ghostOIndices[direction] + 1) % ghostOMoods[direction].length;
  orangeGhostElement.classList.remove(...ghostOMoods[direction]);
  orangeGhostElement.classList.add(ghostOMoods[direction][ghostOIndices[direction]]);
}//changeOGhostMood(direction) 



//-------------------- animation of AFRAID FROZEN ghost --------------------
// Animation array of the afraid frozen moods
const freezedFaces = ["freezed_Ghost1", "freezed_Ghost2"];
// Indices
var freezed_Rindx = 0; // Red ghost index
var freezed_Pindx = 0; // Pink ghost index
var freezed_Bindx = 0; // Blue ghost index
var freezed_Oindx = 0; // Orange ghost index

// Red afraid frozen ghost
function changeRGFreeze()
{
    freezed_Rindx = (freezed_Rindx + 1) % freezedFaces.length; 
    redGhostElement.classList.remove(...freezedFaces);
    redGhostElement.classList.add(freezedFaces[freezed_Rindx]);
}//changeRGFreeze()

// Pink afraid frozen ghost
function changePGFreeze()
{
    freezed_Pindx = (freezed_Pindx + 1) % freezedFaces.length; 
    pinkGhostElement.classList.remove(...freezedFaces);
    pinkGhostElement.classList.add(freezedFaces[freezed_Pindx]);
}//changePGFreeze()

// Blue afraid frozen ghost
function changeBGFreeze()
{
    freezed_Bindx = (freezed_Bindx + 1) % freezedFaces.length; 
    blueGhostElement.classList.remove(...freezedFaces);
    blueGhostElement.classList.add(freezedFaces[freezed_Bindx]);
}//changeBGFreeze()

// Orange afraid frozen ghost
function changeOGFreeze()
{
    freezed_Oindx = (freezed_Oindx + 1) % freezedFaces.length; 
    orangeGhostElement.classList.remove(...freezedFaces);
    orangeGhostElement.classList.add(freezedFaces[freezed_Oindx]);
}//changeOGFreeze()
  

//-------------------- animation of AFRAID FROZEN GRAY ghost --------------------
// Animation array of the afraid frozen and gray moods
const grayGFaces = ["freezed_Ghost1", "freezed_Ghost2", "grayScared_Ghost1", "grayScared_Ghost2"];
// Indices
var grayRG_indx = 0; // Red ghost index
var grayPG_indx = 0; // Pink ghost index
var grayBG_indx = 0; // Blue ghost index
var grayOG_indx = 0; // Orange ghost index

// Red afraid frozen and gray ghost
function changeRGGrayFreeze()
{
    grayRG_indx = (grayRG_indx + 1) % grayGFaces.length; 
    redGhostElement.classList.remove(...grayGFaces);
    redGhostElement.classList.add(grayGFaces[grayRG_indx]);
}//changeRGGrayFreeze()

// Pink afraid frozen and gray ghost
function changePGGrayFreeze()
{
    grayPG_indx = (grayPG_indx + 1) % grayGFaces.length; 
    pinkGhostElement.classList.remove(...grayGFaces);
    pinkGhostElement.classList.add(grayGFaces[grayPG_indx]);
}//changePGGrayFreeze()

// Blue afraid frozen and gray ghost
function changeBGGrayFreeze()
{
    grayBG_indx = (grayBG_indx + 1) % grayGFaces.length; 
    blueGhostElement.classList.remove(...grayGFaces);
    blueGhostElement.classList.add(grayGFaces[grayBG_indx]);
}//changeBGGrayFreeze()

// Orange afraid frozen and gray ghost
function changeOGGrayFreeze()
{
    grayOG_indx = (grayOG_indx + 1) % grayGFaces.length; 
    orangeGhostElement.classList.remove(...grayGFaces);
    orangeGhostElement.classList.add(grayGFaces[grayOG_indx]);
}//changeOGGrayFreeze()
  
