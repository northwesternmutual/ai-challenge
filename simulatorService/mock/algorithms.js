export let algorithm = {
    initializeSimulation: '',
    shoot: 'var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);',
    initializeGame: 'var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}',
    startGame: 'this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);',
    endGame: ''
};

export let initializeGameError = {
    initializeSimulation: '',
    shoot: 'var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);',
    initializeGame: 'error',
    startGame: 'this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);',
    endGame: ''
};

export let startGameError = {
    initializeSimulation: '',
    shoot: 'var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);',
    initializeGame: 'var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}',
    startGame: 'error',
    endGame: ''
};

export let shootError = {
    initializeSimulation: '',
    shoot: 'error',
    initializeGame: 'var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}',
    startGame: 'this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);',
    endGame: ''
};

export let endGameError = {
    initializeSimulation: '',
    shoot: 'var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);',
    initializeGame: 'var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}',
    startGame: 'this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);',
    endGame: 'error'
};

export let initializeSimulationError = {
    initializeSimulation: 'error',
    shoot: 'var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);',
    initializeGame: 'var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}',
    startGame: 'this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);',
    endGame: ''
};

export let getAlgorithmsResult = {
    algOne: '{"_id":"123abc","email":"frankgreco@northwesternmutual.com","name":"frank greco jr","initializeSimulation":"","initializeGame":"var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}","startGame":"this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);","shoot":"var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);","endGame":"","date":"1475186162289"}',
    algTwo: '{"_id":"456def","email":"frankgreco@northwesternmutual.com","name":"frank greco jr","initializeSimulation":"","initializeGame":"var x=-1,y=0;this.getNextCoord=function(){if(++x>9){x=0;++y;}return{x:x,y:y};}","startGame":"this.player.grid.placeBlock(0,0,Block.VERTICAL,Collection.ONEBYTWO);this.player.grid.placeBlock(1,0,Block.VERTICAL,Collection.ONEBYTHREE);this.player.grid.placeBlock(2,0,Block.VERTICAL,Collection.ONEBYFOUR);this.player.grid.placeBlock(3,0,Block.VERTICAL,Collection.ONEBYFIVE);this.player.grid.placeBlock(4,0,Block.VERTICAL,Collection.ONEBYSIX);","shoot":"var coords=this.getNextCoord();var result=this.player.shoot(coords.x, coords.y);","endGame":"","date":"1475186162289"}'
};
