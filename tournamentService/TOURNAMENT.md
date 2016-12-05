# Official Tournament Guide

## Objective
The objective is to implement an AI that can beat all other AI's submitted to the tournament. This is accomplished this by implementing and submitting the following five functions. These functions are prototypes of your AI object:
* `initializeSimulation` executed once per simulation so you can keep track of state information if you so choose.
* `initializeGame` executed once per game so you can keep track of state information if you so choose.
* `startGame` executed at the start of every game. This is where you must dock your ships.
* `shoot` executed every time it is your turn to shoot.
* `endGame` executed at the conclusion of every game so you can update simulation state information.

*<b>IMPORTANT NOTE</b>: In the current version of AI-Challenge, only the code in the above functions will be used since it is the only code that can be submitted to the tournament. This means that if your `AI` uses code outside of these 5 functions, your AI will not function correctely in the tournament and your AI will be disqualified! While this will be resolved in future versions of AI-Challenge, you can get around this by including any helper methods as properties of the AI Object. For example:*
```javascript
function initializeSimulation() {

	this.myHelperFunction = function() {
		//you can now use this function through your implementation.
	}

}
```

## Getting Started
As documented in the [game engine documentation](../simulatorService/GAME.md), your `AI` has access to an instance of a [`Player`](https://github.com/northwesternmutual/ai-challenge/tree/master/simulatorService#player) object which represents your player. For a quickstart on how you might place your ships, keep track of state, and shoot, see the [example](https://github.com/northwesternmutual/ai-challenge#algorithm-component) which is pre-implemented with a basic `AI`. In addition, the following optional objects are available to be instantiated if they are needed in a player's implementation:

* [`Block`](https://github.com/northwesternmutual/ai-challenge/tree/master/simulatorService#block)
* [`Cell`](https://github.com/northwesternmutual/ai-challenge/tree/master/simulatorService#cell)
* [`Collection`](https://github.com/northwesternmutual/ai-challenge/tree/master/simulatorService#collection)
* [`Grid`](https://github.com/northwesternmutual/ai-challenge/tree/master/simulatorService#grid)

Please see the [game engine documentation](../simulatorService/GAME.md) for specific details such as what functions and properties are availble to use for the above objects.

## Tips
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

## Rules
* There will be 1000 simulations per tournament unless otherwise configured.
* Only code implented in the 5 functions above will be used. Attempts to implement code outside of these functions may results in a breaking AI which will be disqualified.
* Due to the nature of the JavaScript language, certain object properties can be modified that are not meant to be modified and would result in the game invariants to be broken. While the game engine has been architected to minimize the visibility of objects that an AI should not modify, some still exist. Hence, after every Player's turn, the game engine will determine whether an AI has modified the state of the game in an improper way. If so, that AI will be disqualified.
* For security purposes, functions/objects such as `require`, `eval`, `exec`, `setInterval`, `setTimeout`, `Function` can not be used.
