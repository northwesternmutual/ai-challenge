# Official Game Manual

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
* Once the game has started, the blocks will always stay in the location in which they were placed.
* Each player has an identical grid on which to place their blocks. The grid is represented as a `10 x 10` grid of cells.

### Rules
* All blocks must be placed before the game can start.
* All blocks must be placed in either the horizonal or vertical direction.
* A block's placement must be fully contained with the player's grid.
* A block's placement must not overlap with another block's placement.
* Radomness will determine who shoots first.
* Each player will take turns shoots shooting at their opponent's grid.
* A player can only shoot at one cell per turn.
* If the shot lands on one of their opponent's blocks, the player is told what block was hit.
* A block is considered destroyed when all of the cells that a block occupies have been hit.
* If a player attempts to hit an invalid cell on their opponents grid (e.g. the cell doesn't exist), the player may re-shoot.
* If a player attempts to hit a a cell that they already hit, the player may re-shoot.
* A player is not allowed to re-located their blocks once the game has started.