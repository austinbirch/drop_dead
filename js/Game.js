//controller for game

//keypress faux-constants
var SPACE = 32;
var ARROW = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

//constructor - init objects 
var Game = function(){
	
	//keypress vars
	this.left_key_down = false
	this.right_key_down = false;
	
	//call the preloadImages routine - it will start the game via a callback
	this.imageManager = new ImageManager();

	//pre load the images	
	this.imageManager.addImage("runnerImage", "./images/runner.png");
	this.imageManager.addImage("blockImage", "./images/block.png");
	//pass the context also
	this.imageManager.loadImages(this, this.initObjects);
};

Game.prototype.initObjects = function() {	
	//store this context
	var oldthis = this;
	
	//player object
	this.player = null;
	//if player does not exist
	if (this.player == null){
		oldthis.player = new Player();
		//set the image using the imageManager
		oldthis.player.setPlayerImage(oldthis.imageManager);
	};
	
	this.block = null;
	this.block = new Block();
	this.block.setBlockImage(this.imageManager);
	
	this.blockAgain = new Block();
	this.blockAgain.setBlockImage(this.imageManager);
	this.blockAgain.setPosition(200, 200);
	
	this.blockThree = new Block();
	this.blockThree.setBlockImage(this.imageManager);
	this.blockThree.setPosition(300, 300);
					
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
	
	//put the player in the starting position
	this.player.setPosition(200, canvas.height - (this.player.getHeight()));
		
	//show the canvas	
	this.canvas.fadeIn(1000);

	//start the main loop
	this.timeout();
};

//main loop
Game.prototype.timeout = function(){
	this.update();
	this.draw();
	
	var self = this;
	var fps = 60;
	setTimeout(function() { self.timeout() }, 1000/fps);
};

//update the positions etc
Game.prototype.update = function(){
	
};


//actually draw
Game.prototype.draw = function(){
	//clear the screen
	this.context.fillStyle = "rgb(230,230,230)";
	this.context.fillRect(0, 0, this.canvas.width(), this.canvas.height());
	//draw the player
	this.player.draw(this.context);
	
	//draw the block
	this.block.draw(this.context);
	
	//draw the block
	this.blockAgain.draw(this.context);
	
	this.blockThree.draw(this.context);
		
};

//keydown event
Game.prototype.keyDown = function(e) {
	var keyCode = e.keyCode;
	
	//grab the right context
	var self = e.data.self;
	
	//which key was pressed?
	switch (keyCode) {
		case ARROW.LEFT:
			self.player.moveLeft();
			break;
		case ARROW.RIGHT:
			self.player.moveRight();
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
Game.prototype.keyUp = function(e) {
	var keyCode = e.keyCode;
	
	//grab the right context
	var self = e.data.self;
	
	//which key was pressed?
	switch (keyCode) {
		case ARROW.LEFT:
			self.player.stopMoveLeft();
			break;
		case ARROW.RIGHT:
			self.player.stopMoveRight();
			break;
		case ARROW.DOWN:
			break;
		case ARROW.UP:
			break;
		case SPACE:
			break;		
	};
	
};