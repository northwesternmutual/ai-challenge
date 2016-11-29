# Simulator Service 

> An AI Challenge microservice for simulations

## Description
Preforms a simulation of two AI implementations

## Quick Start
* **npm** `npm install && npm run dev`
* **yarn** `yarn && yarn run dev`

## Commands
* `npm run dev`: transpile es6 -> es5 and handle live changes via [nodemon](http://nodemon.io/) and enable debugging via [node-inspector](http://127.0.0.1:8082/?port=5859) 
* `npm run start`: transpile es6 -> es5 and start the application 
* `npm run test`: run all `*spec.js` files in the `spec/` directory
* `npm run coverage`: uses istanbul to determine the code coverage of the unit tests
* `npm run lint:dev`: cache the results in a `.eslintcache` file so that only changed files are checked  
* `npm run lint:prod`: lint files without results being cached 

## Configuration
Environment configuration is fasciliated through `./confg/NODE_ENV.json`

## API
#### Documentation
[Swagger Schema](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/northwesternmutual/ai-challenge/master/simulatorService/swagger.json?token=AVjpyf2XH3GDhJ-w78WKNy1DWmeW1RE1ks5YJmsUwA%3D%3D)

## Docker
A `Dockerfile` and `.dockerignore` are included that can be used to run this application in a docker container. The offical image can be found [here](https://hub.docker.com/r/northwesternmutual/aichallenge-simulator/).

## Documentation
Here is the documentation for the game engine source code found in `src/game/*.js`. 

### AI
##### `function AI(algObj, player)`
```javascript
/**
 * [constructor function for a AI object]
 * @param {Object} algObj [the algorithm associated with this player]
 * @param {Object} player [the player instance associated with this AI]
 */
```
##### `AI.prototype.initializeSimulation()`
```javascript
/**
 * [Called once per simulation so a player can keep track of state information if they so choose.]
 */
```
##### `AI.prototype.initializeGame()`
```javascript
/**
 * [Called once per game so a player can keep track of state information during the game if they so choose.]
 */
```
##### `AI.prototype.startGame()`
```javascript
/**
 * [This is where a player must place their Blocks. Called before each game. ]
 */
```
##### `AI.prototype.shoot()`
```javascript
/**
 * [called each time it is a player's turn to shoot]
 */
```
##### `AI.prototype.endGame()`
```javascript
/**
 * [called at the conclusion of each game. Can be used to record state information before a new game starts]
 */
```

### Block
##### `function Block(type, length)`
```javascript
/**
 * [constructor function for a Block object]
 * @param {Number} type   [the type of block]
 * @param {Number} length [the length of the block]
 */
```
##### `Block.prototype.initialize()`
```javascript
/**
 * [initializes a block]
 */
```
##### `Block.prototype.hit()`
```javascript
/**
 * [hit ths block]
 */
```
##### `Block.HORIZONTAL`
```javascript
/** @type {Number} [represents a horizontal orientation] */
```
##### `Block.VERTICAL`
```javascript
/** @type {Number} [represents a vertial orientation] */
```

### Cell
##### `function Cell()`
```javascript
/**
 * [constructor function for a Cell object]
 */
```
##### `Cell.prototype.setBlock(block)`
```javascript
/**
 * [binds a Block to this cell...meaning one of the cells that the block is docked on is this]
 * @param {Object} block [the Block to be set]
 */
```
##### `Cell.TYPE_EMPTY`
```javascript
/** @type {Number} [the cell has no Block on it and hasn't been 'hit' yet] */
```
##### `Cell.TYPE_BLOCK`
```javascript
/** @type {Number} [the cell has a Block on it and hasn't been 'hit' yet] */
```
##### `Cell.TYPE_MISS`
```javascript
/** @type {Number} [the cell has no Block on it and has been 'hit'] */
```
##### `Cell.TYPE_HIT`
```javascript
/** @type {Number} [the cell has a Block on it and has been 'hit'] */
```
##### `Cell.TYPE_CONQUERED`
```javascript
/** @type {Number} [the cell has a Block on it and this 'hit' resulted in conquering the Block. 
All cells the sunk Block uses are updated with this value] */
```

### Collection
##### `function Collection()`
```javascript
/**
 * [constructor function for a Collection object]
 */
```
##### `Collection.prototype.initialize()`
```javascript
/**
 * [initializes a Collection by initialzing each Block in the Collection]
 */
```
##### `Collection.prototype.isPlaced()`
```javascript
/**
 * [checks to see if every Block in the Collection has been placed on the grid]
 * @return {Boolean} [wheather each Block in the Collection has been placed on the grid]
 */
```
##### `Collection.prototype.isConquered()`
```javascript
/**
 * [checks to see if every Block in the Collection has been conquered]
 * @return {Boolean} [whether each Block in the Collection has been conquered]
 */
```
##### `Collection.prototype.getBlockByType(type)`
```javascript
/**
 * [get a reference to Block in the Collection that matches a given Block type or null if type doesn't match]
 * @param  {Number} type [the type of the Block]
 * @return {Object}      [a reference to Block in the Collection that matches a given Block type or null if type doesn't match]
 */
```
##### `Collection.prototype.hasMoved(state)`
```javascript
/**
 * [checks to see whether the Collection resides at the same location (current state) as it was at before (old state)]
 * @param  {Object}  state [the old state of the Collection that we are checking against]
 * @return {Boolean}       [whether the state has changed or not]
 */
```
##### `Collection.ONEBYTWO`
```javascript
/** @type {Number} [represents the ONEBYTWO ship] */
```
##### `Collection.ONEBYTHREE`
```javascript
/** @type {Number} [represents the ONEBYTHREE ship] */
```
##### `Collection.ONEBYFOUR`
```javascript
/** @type {Number} [represents the ONEBYFOUR ship] */
```
##### `Collection.ONEBYFIVE`
```javascript
/** @type {Number} [represents the ONEBYFIVE ship] */
```
##### `Collection.ONEBYSIX`
```javascript
/** @type {Number} [represents the ONEBYSIX ship] */
```

### Game
##### `function Game(playerOne, playerTwo, AIOne, AITwo)`
```javascript
/**
 * [constructor function for a Game object]
 * @param {Object} playerOne [the instance to the player one object]
 * @param {Object} playerTwo [the instance to the player two object]
 * @param {Object} AIOne	 [the instance to the player one AI]
 * @param {Object} AITwo	 [the instance to the player two AI]
 */
```
##### `Game.prototype.initialize()`
```javascript
/**
 * [initializes a Game by initializes both AIs and both players]
 */
```
##### `Game.prototype.playGame()`
```javascript
/**
 * [start and play a game]
 */
```
##### `Game.prototype.isOver()`
```javascript
/**
 * [checks to see whether game is over]
 * @return {Boolean} [whether game is over]
 */
```
##### `Game.prototype.getRandomPlayer()`
```javascript
/**
 * [get either player one or two randomly]
 * @return {Object} [the chose player at random]
 */
```
##### `Game.shoot(player, x, y)`
```javascript
/**
 * [attempt to shoot a cell]
 * @param  {Object} player [a reference to the Player object doing the shooting]
 * @param  {Number} x      [x coordinate]
 * @param  {Number} y      [y coordinate]
 * @return {Object}        [the state of the cell AFTER the hit and the type of block in the case of a hit. state will be null if shot in invalid and block will be null if no ship lies on the cell. e.g: { state: Cell.TYPE_MISS, block: null }]
 */
```

### Grid
##### `function Grid()`
```javascript
/**
 * [constructor function for a Grid object]
 */
```
##### `Grid.prototype.initialize()`
```javascript
/**
 * [initialize a grid by initializing its Collection and creating the grid]
 */
```
##### `Grid.prototype.create()`
```javascript
/**
 * [creates a 10x10 grid by creating a Cell object in each 2D array index]
 */
```
##### `Grid.prototype.getCell(x, y)`
```javascript
/**
 * [get a reference to the cell located at the 2D array index represented by x and y values or null if invalid]
 * @param  {Number} x [x coordinate]
 * @param  {Number} y [y coordinate]
 * @return {Object}   [reference to the cell located at the 2D array index represented by x and y values or null if invalid]
 */
```
##### `Grid.prototype.placeBlock(x, y, direction, blockType)`
```javascript
/**
 * [places a Block at the given location. The x, y are the top cell (if vertical) or left cell (if horizontal)]
 * @param  {Number} x         [x coordinate]
 * @param  {Number} y         [y coordinate]
 * @param  {Number} direction [the Block's orientation]
 * @param  {Number} blockType [the type of the Block]
 * @return {Boolean}          [was the Block successfully placed]
 */
```
##### `Grid.prototype.doesCollide(x, y, direction, block)`
```javascript
/**
 * [check to see whether a Block placed at the given coordinate and orientation will collide with an already placed Block. 
 * The x, y are the top cell (if vertical) or left cell (if horizontal)]
 * @param  {Number} x         [x coordinate]
 * @param  {Number} y         [y coordinate]
 * @param  {Number} direction [the Block's orientation]
 * @param  {Object} block     [reference to the Block object]
 * @return {Boolean}          [whether the Block collides with an already placed Block or not]
 */
```
##### `Grid.prototype.getBlockByCoord(x, y)`
```javascript
/**
 * [get reference to Block that lies on the given cell or null if invalid]
 * @param  {Number} x [x coordinate]
 * @param  {Number} y [y coordinate]
 * @return {Object}   [a reference to the Block that lies on the given cell or null if invalid]
 */
```
##### `Grid.prototype.inBounds(x, y, direction, block)`
```javascript
/**
 * [check to see whether a Block placed at the given coordinate and orientation will remain in the bounds of the grid. 
 * The x, y are the top cell (if vertical) or left cell (if horizontal)]
 * @param  {Number} x         [x coordinate]
 * @param  {Number} y         [y coordinate]
 * @param  {Number} direction [the Block's orientation]
 * @param  {Object} block     [reference to the Block object]
 * @return {Boolean}          [whether a Block placed at the given coordinate and orientation will remain in the bounds of the grid]
 */
```

### Player
##### `function Player(type)`
```javascript
/**
 * [constructor function for a Player object]
 * @param {Number} type [the type of the player. designates player one vs player two]
 */
```
##### `Player.prototype.initialize()`
```javascript
/**
 * [initializes a Player object by initializes it's grid]
 */
```
##### `Player.prototype.shoot(x, y)`
```javascript
/**
 * [attempt to hit a given coordinate. Calls Game.shoot]
 * @param  {Number} x [x coordinate]
 * @param  {Number} y [y coordinate]
 * @return {Object}   [the state of the cell AFTER the hit attempt. Return value is the same as Game.shoot]
 */
```
##### `Player.PLAYERONE`
```javascript
/** @type {Number} [represents player one] */
```
##### `Player.PLAYERTWO`
```javascript
/** @type {Number} [represents player two] */
```

### Simulation
##### `function Simulator(algOneObj, algTwoObj, numSims)`
```javascript
/**
 * [constructor function for a Game object]
 * @param {Object} algOneObj [the player one AI object from the db]
 * @param {Object} algTwoObj [the player two AI object from the db]
 * @param {Number} numSims 	 [the number of simulations]
 */
```
##### `Simulator.prototype.startSimulation(callback)`
```javascript
/**
 * [conduct a simulation]
 * @param {Function} callback [the function that will be called when a simulation is complete]
 */
```
