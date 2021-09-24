**CPSC-335 Project 1 - Larks Ant**

**Team Name:** AntEaters

**Team Members:** Farnam, Clem, Ramon

**Intro:**

This project is based on the Langton's Ant algortihm, where the TM ant is pllced on a grid aand
whose "braain" read the color of the cell it is on and based on that the bot willl performe the 
color-indicated action (changed its “nose” direction based on the color of the grid cell it was
on, Left for Black and Right for White), it then increments the color of the cell and then 
moves to the neighboring cell, following its "nose". 

**Changes made to the algorithm:**

We extended the ant to a "Larks" ant by adding a mode whereby the LLLarks ant will sometimes ignore
the color changes but instead continue in a straight lline for sequence of cell moves, which is done
by maintaining some state, a countdown. (Larks, or LRCS, means Left-Right-Countdown-Straight.)

**How we achieved this:**

First, as usual our K-color sequence is indexed color[0]..color[K-1].
Second, each color (equivalently, each color index) can map to one of 3 actions: Turn Left, Turn Right, and
Straight-Countdown.
Third, the bot FSM is in one of 3 states/modes: Normal or Straight or Countdown mode.
Here is the Larks ant brain FSM processing in detail:
1. Read the cell's color, translate to its color sequence index.
2. Obtain the action given the color index, & store it in the FSM counter // Just in case
If FSM is in Normal mode and an L/R action then
 3. Change nose direction accordingly
Else If FSM is in Normal mode and a Countdown-Straight action then
 3. Change to Countdown mode & don't change direction
Else if FSM is in Countdown Mode then // we'll go straight, no change in direction
 3a. If FSM counter is non-positive, then change FSM to Normal Mode
 3b. Decrement the FSM counter & don't change direction
4. Increment cell's color modulo the number of colors // ie, with wraparound
5. Move to neighbor cell // in nose direction

**Contents: **

-Folder which includes the assets used includes: draw-stuff.js, styles.css

-The main path of the zip includes:

  -cs-sketch.js includes the modified algorithm and logic of the program(JavaScript)
  
  -index.html: the base html to get a grid and required text for user actions 
  
  -p5.js: Library which is used to draw the grid, make movements on the gird 
  and change the color of the boxes on the grid
  
  -README.md which has description and requirements for the project

**External Requirements:**

There are no external requiremnts and any browser should support this project.

Setup and Installation:

Simply extract the files from the zip into one folder and run index.html

**Features:**

All features of the modified algortihm is done, refer to "How we achieved this" to 
see more about the features we've implemented

**Bugs: **

If the bot reaches the border an overflow off the border happens.
Let us know if there are any other bugs and we will assess them. 

  
