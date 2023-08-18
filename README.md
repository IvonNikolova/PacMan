# PacMan

<h2> What’s next for Friday 18/08/23: </h2>

1. Announce the winner i.e. Pacman, all pellets and gazers has to be eaten and the pacman should still have any lives left </br>
   1.2. Scores saved i.e.  store the highest points on the browser: localStorage </br>
2. Make the rest of the ghosts to move inside the maze </br>
   2.2. Do their normal animation: kill Pacman->start the game-> initial states for all ghosts and Pacman  </br>
   2.3. Do their freezing animation: bonus points-> initial states only of the eaten ghosts  </br>

<b> Bugs: </b>
   1. The cherry appearance bug (correct its appearance  - create a timeout (5 seconds and then to dissapear), no replicates (no more than one cherry)): Idea: to use setTimeout() **DONE 18.08.**  </br>
   2. The Pacman dead animation direction bug: Idea: to use boolean flag  **DONE 18.08.**  </br>

<b> Additional to be done tasks: </b> </br>
1. Intro page: change to flex box   </br>
2. Buttons start/pause - correct the PAUSE window to allow pressing the pause button even having the PAUSE window  Top left button is not able to be pressed if space pause is pressed **DONE 18.08.** </br>

 
<b>What it is planned for additional Future Plans:</b>
1. Appropriate algorithms for the ghosts </br>
2. Different states of the ghosts’ work in the maze</br>
   a. Scatter for 7 seconds, then Chase for 20 seconds.</br>
   b. Scatter for 7 seconds, then Chase for 20 seconds.</br>
   c. Scatter for 5 seconds, then Chase for 20 seconds.</br>
   d. Scatter for 5 seconds, then switch to Chase mode permanently</br>
References: https://gameinternals.com/understanding-pac-man-ghost-behavior
3. Ghosts’ dead animation with the eyes </br>
4. Music: at the beginning | while eating | while just moving | when colliding with a ghost | when dying
5. New levels: 2UP, 3UP...  </br>
      a. Add new fruits </br>
