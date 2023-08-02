# PacMan

<h2>Future Work note from 20.07.2023: </h2>

Important to be done tasks:
1. Move the red ghost - test it using math.random **(DONE - 28.07.23)** <br />
   1.1.Correct red ghost problem with the first move. **(DONE - 30.07.23)** <br />
   1.2. Change the ghost direction with another valid one before colliding a wall if it is possible. **(DONE - 31.07.23)** <br />
      Explanation: take any opportunity for any valid direction, if such appears, while moving in the corridors, do not wait until the end - to collide a wall in order to change the direction.
   1.2. Animation of the red ghost while moving. **(DONE - 31.07.23)** <br />
   1.3. Tunnel teleporting. **(DONE - 31.07.23)** <br />

2. The other three ghosts:<br />
   2.1. Synchronise them to pause with the pause button **(DONE - 25.07.23)** <br />
   2.2. Create an animation, loop their moods while moving **(DONE - 25.07.23)** <br />
   2.3. Make them get out of the nest according to the Pacman eaten dots i.e. scores<br />

Secondary to be done tasks: 
1. Storage the highest points on the browser: localStorage
2. Collisions with the ghosts <br />
   2.1. Lives of Pacman: decrease them
3. Freezed Ghosts - change the ghosts mode when a gazer is eaten <br />
   3.1. Count the bonus points when Pacman eats a freezed blue ghost

Additional to be done tasks: 
1. Intro page: change to flex box 
2. Cherry: correct its appearance  - create an interval (5 seconds and then to dissapear), no replicates (no more than one cherry)
3. Music: at the beginning | while eating | while just moving | when colliding with a ghost | when dying
4. Buttons start/pause - correct the PAUSE window to allow pressing the pause button even having the PAUSE window  Top left button is not able to be pressed if space pause is pressed



TO DO from the meeting from 28.07.23
1. correct red ghost problem  with jumping and if the ghost collides a wall it changes randomly to another valid direction, but also, we need to add an option while moving in the corridors if a valid direction in a corridor appears it could change it, too, before collides a wall if it decides!
2. animation of the red ghost ! 
3. gazer eaten - ghosts become afraid 
    4. localstorage  !
    5. collision pacman and the ghosts - same coordinates, 
     compare at each step pacman and red ghost coordinates 
