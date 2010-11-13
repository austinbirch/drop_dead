//controller for game

//keypress faux-constants
var SPACE = 32;
var ARROW = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

//constructor - init objects 
var Game = function(){
	
	//player object
	this.player =null;
	//if player does not exist
	if (this.player == null){
		this.player = new Player();
	};
			
	//actually start the game 
	this.initGame();
};

Game.prototype.initGame = function(){
	
	console.log("initGame");
	
	//set things up for game here
	this.canvas = $("canvas");
	this.context = this.canvas.get(0).getContext("2d");
	
	this.canvas.attr("width", 800);
	this.canvas.attr("height", 500);
		
	//start the main loop
	this.timeout();
};

//main loop
Game.prototype.timeout = function(){
	this.update();
	this.draw();
	
	var self = this;
	setTimeout(function() { self.timeout() }, 30);
};

//actually draw
Game.prototype.draw = function(){
	//clear the screen
	this.context.fillStyle = "rgb(230,230,230)";
	this.context.fillRect(0, 0, this.canvas.width(), this.canvas.height());
	//draw the player
	this.player.draw(this.context);
		
};


//update the positions etc
Game.prototype.update = function(){
	//update the player
	this.player.update(this.canvas);
	
	//update the player array
	for (var x in this.playerArray){
		if (this.playerArray[x].hasOwnProperty("playerImage")){
			this.playerArray[x].update(this.canvas);
		}
	}
};

//keydown event
Game.prototype.keyDown = function(e) {
	var keyCode = e.keyCode;
	
	//which key was pressed?
	switch (keyCode) {
		case ARROW.LEFT:
			break;
		case ARROW.RIGHT:
			break;
		case ARROW.DOWN:
			break;
		case ARROW.UP:
			break;
		case SPACE:
			break;		
	};
	
};


//keyup event	