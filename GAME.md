# Official Game Rules

## Objective
The objective of this **two player** game is to find and destroy all of the blocks that a player places on a grid. The player who successfully finds and destroys all of their opponent's blocks first is declared the winner.

### Invariants
The following are always true throught the game:

* Each player has an identical collection of blocks. The dimensions of these blocks are:
	* `ONEBYTWO`
	* `ONEBYTHREE`
	* `ONEBYFOUR`
	* `ONEBYFIVE`
	* `ONEBYSIX`
* Once the game has started, the blocks will always stay in the location which they were placed.
* Each player has an identical grid on which to place their blocks. The grid is represented as a `10 x 10` grid of cells.

### Precondition
Before a game is allowed to start, the following must be true:

* Each player must successfully place all of their blocks onto the grid.


Your objective is to implement an AI that can beat the default AI provided by Northwestern Mutual. You accomplish this by implementing the functions found in the `CandidateAI.js` file. There are five functions you can implement:
* `initializeSimulation` executed once per simulation so you can keep track of state information if you so choose.
* `initializeGame` executed once per game so you can keep track of state information if you so choose.
* `startGame` executed at the start of every game. This is where you must dock your ships.
* `shoot` executed every time it is your turn to shoot.
* `endGame` executed at the conclusion of every game so you can update simulation state information.

*<b>IMPORTANT NOTE</b>: You have the option below to enter your AI into a tournament-style competition. If you choose to do this, only the code in the above functions will be used. This means that if your `CandidateAI` uses code outside of these 5 functions, your AI will not function correctely in the tournament and your AI will be disqualified!*

## Getting Started
Your AI, `CandidateAI`, has access to an instance of a `Player` object which represents your player. Examine the `battleship.common.js` and `battleship.js`files which contain all of the **well-documented** source code. 

**There will be 999 games run per simulation.**

To run and test your project locally, click on the `Download Code as File` link below. This will download a copy of the project so you can develop locally.


## Tips
For a quickstart on how you might place your ships, keep track of state, and shoot, see the `CandidateAI.js` file which is pre-implemented with a basic AI.

Again, **please examine all the well-documented functions/objects/variables** so that you get an understand of what functions you have access to so you can construct your AI.

It may be useful to track the shots that you take. You can do this by creating a grid as shown below or just create an instance of a `Grid` object to use. *Note that if you use this option there will be object properties that you will inherit that won't be of any use to you. Hence, by creating your own grid you can customize properties you want to keep track of easier.*

```javascript
this.cells = [];
for(var i=0; i<10; ++i) {
    this.cells[i] = [];
    for(var j=0; j<10; ++j) {
        this.cells[i].push({
        	myProp1: something,
        	myProp2: something,
        	myProp3: something
        });
    }
}
```

## UI
After a successful simulation, you are presented with a simple UI with the following information
* scorecard
* player's accuracy by game
* player's average accuracy
* player's hits by game
* <b>Form to submit your AI to a tournament (see below)</b>

## Tournament
On `9/1`, all of the AI's that were submitted to the tournmant will be played against each other round robin style to determine the best algorithms. You will have until `8/31` to sumbit your AI to the competition. In the case of multiple submissions, only your last submission will be used. The best algorithm will win a prize!

####Rules
* Only one submission per participant.
* You must enter your algorithm under the email that is associated with your `HackerRank` account. This will be used to look up your contact info.
* Only code implented in the 5 functions above will be used. Attempts to implement code outside of these functions may results in a breaking AI which will be disqualified.
