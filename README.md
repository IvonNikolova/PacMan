# PacMan

<h2>Future Work note: </h2>

Important to be done tasks:
1. Move the red ghost - test it using math.random **(DONE - 28.07.23)** <br />
   1.1.Correct red ghost problem with the first move. **(DONE - 30.07.23)** <br />
   1.2. Change the ghost direction with another valid one before colliding a wall if it is possible. **(DONE - 31.07.23)** <br />
      Explanation: take any opportunity for any valid direction, if such appears, while moving in the corridors, do not wait until the end - to collide a wall in order to change the direction. <br />
   1.2. Animation of the red ghost while moving. **(DONE - 31.07.23)** <br />
   1.3. Tunnel teleporting. **(DONE - 2.08.23)** <br />

2. The other three ghosts:<br />
   2.1. Synchronise them to pause with the pause button **(DONE - 25.07.23)** <br />
   2.2. Create an animation, loop their moods while moving **(DONE - 25.07.23)** <br />
   2.3. Make them get out of the nest according to the Pacman eaten dots i.e. scores<br />

Secondary to be done tasks: 
1. Storage the highest points on the browser: localStorage
2. Collisions with the ghosts <br />
   2.1. Lives of Pacman: decrease them
3. Freezed Ghosts - change the ghosts mode when a gazer is eaten **(DONE - 06.08.23)** <br />
   3.1. Count the bonus points when Pacman eats a freezed blue ghost

Additional to be done tasks: 
1. Intro page: change to flex box 
2. Cherry: correct its appearance  - create an interval (5 seconds and then to dissapear), no replicates (no more than one cherry)
3. Music: at the beginning | while eating | while just moving | when colliding with a ghost | when dying
4. Buttons start/pause - correct the PAUSE window to allow pressing the pause button even having the PAUSE window  Top left button is not able to be pressed if space pause is pressed



TO DO from the meeting from 02.08.23 <br />

I. Collision pacman and the ghosts - same coordinates,  
compare at each step pacman and red ghost coordinates <br />
- Призракът изяжда Пакман (спри движение  Interval на Пакман)<br />
- Анимация на мъртъв Пакман **(DONE - 10.08.-14.08.23)** <br />
- Намали животи **(DONE - 14.08.23)** <br />
- Започни от начална позиция + призрак  **(DONE - 7.08.23)** + Пакман  <br />


II. Gazer eaten by Pacman -> ghosts become afraid  (Interval)<br />
- Пакман изяжда Призракa **(DONE - 7.08.23)** <br /> 
- Анимация на мъртъв Призрак<br />
- Започни от начална позиция + призрак **(DONE - 7.08.23)**  <br />
- Добави бонус точки<br />

III. The game <br />
- Победа в полза на Пакман: всички pellets и gazers са изядени и има останали животи <br />
- Загуба в полза на Призраците **(DONE - 14.08.23)** <br />
