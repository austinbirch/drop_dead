//controller for game

//keypress faux-constants
var SPACE = 32;
var ARROW = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

//block colors
var color_hash = { red: "rgba(255, 0, 0, 0.3)",
 										green: "rgba(0, 255, 0, 0.3)",
										blue: "rgba(0, 0, 255, 0.3)",
										fuchsia: "rgba(255, 0, 255, 0.3)" };

//constructor - init objects 
var Game = function(){
	
	//keypress vars
	this.left_key_down = false
	this.right_key_down = false;
	this.space_key_down = false;
	
	//global gravity
	this.gravity = 0.9;
	
	this.previous_tick = 0;
	this.current_tick = 0;
	this.frames_per_second = 60;
	this.current_fps = 0;
	this.frames = 0;
	this.accumulator = 0;
	
	//call the preloadImages routine - it will start the game via a callback
	this.imageManager = new ImageManager();

	//pre load the images	
	//player colors
	this.imageManager.addImage("runnerImageBlack", "./images/runnerBlack.png");
	this.imageManager.addImage("runnerImageFuchsia", "./images/runnerFuchsia.png");
	this.imageManager.addImage("runnerImageGreen", "./images/runnerGreen.png");
	//blocks
	this.imageManager.addImage("blockImage", "./images/block.png");
	//floor
	this.imageManager.addImage("floorImage", "./images/floor_two.png");
	//load the images, pass the context
	this.imageManager.loadImages(this, this.initObjects);
};

Game.prototype.initObjects = function() {	
	//store this context
	var oldthis = this;
	
	//the floor
	this.floor = null;
	this.floor = new Floor();
	this.floor.setFloorImage(this.imageManager);
	
	//player object
	this.player = null;
	//if player does not exist
	if (this.player == null){
		oldthis.player = new Player();
		//set the player color
		//set the image using the imageManager
		oldthis.player.setPlayerImage(oldthis.imageManager);
	};
	
	//block objects array
	this.block_array = new Array();
	for (var x = 20; x > 0; x--){
		var block = new Block();
		block.setBlockImage(this.imageManager);
		block.setPosition(x * block.getWidth(), block.getHeight() * x);
		this.block_array[x] = block;
	}
	
	this.block_array[1].setColor(color_hash.fuchsia);
	this.block_array[3].setColor(color_hash.blue);
						
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
	
	
	//set up the floor
	this.floor.setWidth(canvas.width);
	//set the position of the floor
	this.floor.setPosition(0, (canvas.height - this.floor.getTileWidth()));
	
	//get the ground position
	this.ground = this.floor.position.y;
		
	//put the player in the starting position
	this.player.setPosition(200, (this.floor.position.y - this.player.getHeight()));
		
	//show the canvas	
	this.canvas.fadeIn(1000);

	//start the main loop
	this.timeout();
};

//main loop - lets try a variable speed one ;-)
Game.prototype.timeout = function(){
	//store the previous tick
	this.previous_tick = this.current_tick;
			
	//get the new tick
	this.current_tick = (new Date).getTime();
	
	//skip the first timer
	if (this.previous_tick == 0){
		// this.update();
		// this.draw();
	}else{
		//update with the delta (delta = time between frames)
		var delta = (this.current_tick - this.previous_tick);
		
		//store the delta, test for fps
		this.accumulator = this.accumulator + delta;
		if (this.accumulator >= 1000){
			//greater than a second update current frame display
			this.current_fps = this.frames;
			this.frames = 1;
			this.accumulator = 0;
		}else{
			//not greater than a second, count another frame
			this.frames++;
		}		
		
		//update the scene
		this.update(delta/1000);
		//draw the scene
		this.draw();		
	}
	
	//call myself
		
	 var self = this;
	// 	var fps = 60;
	setTimeout(function() { self.timeout() }, 1000/this.frames_per_second);
};

//update the positions etc
Game.prototype.update = function(delta){
		
	//if space was pressed - JUMP!
	if(this.player.jumping == false && this.space_key_down == true){
		console.log("jump!");
		//start making the player jump
		this.player.jumping = true;
		this.player.setVelocity(this.player.velocity.x, this.player.jump_speed);		
	}
	
	//if player is jumping
	if(this.player.jumping == true){
			//move player by y velocity
			//decrement y by gravity
			if (this.player.position.y + this.player.velocity.y < (this.ground - this.player.getHeight())){
				this.player.position.y = this.player.position.y + this.player.velocity.y;
				this.player.setVelocity(this.player.velocity.x, this.player.velocity.y + this.gravity);
			} else {
				//we hit the floor
				this.player.jumping = false;
				//set to be on the floor 
				this.player.setPosition(this.player.position.x, this.ground - this.player.getHeight());
			}
	}

	if(this.player.moving == false && this.right_key_down == true){
		//start moving the player to the right
		this.player.moving = true;
		this.player.setVelocity(+this.player.speed, this.player.velocity.y);
	} else if (this.player.moving == false && this.left_key_down == true){
		//start moving the player to the left
		this.player.moving = true;
		this.player.setVelocity(-this.player.speed, this.player.velocity.y);
	} else {
		this.player.moving = false;
	}
	
	//if the player is moving, then move
	if (this.player.moving == true){
		var newPositionX = this.player.position.x + this.player.velocity.x;
		if (newPositionX > 0 && newPositionX < (canvas.width - this.player.getWidth())){
				this.player.position.x = newPositionX;
		}
	}
		
	//update blocks
	for (var x = (this.block_array.length - 1); x > 0; x--){
		var block = new Block();
		block = this.block_array[x];
		if (block.position.y < (this.ground - block.getHeight())){
			block.setVelocity(0, block.velocity.y + this.gravity)
			block.position.y = block.position.y + block.velocity.y;
		}else{
			//hit the floor
			block.position.y = this.ground - block.getHeight();
		}
	} // end of for loop
		
};

//actually draw
Game.prototype.draw = function(){
	//clear the screen
	this.context.fillStyle = "rgb(230,230,230)";
	this.context.fillRect(0, 0, this.canvas.width(), this.canvas.height());
	
	//draw the floor
	this.floor.draw(this.context);
			
	//draw the block array
	for (var x = (this.block_array.length - 1); x > 0; x--){
		var block = new Block();
		block = this.block_array[x];
		block.draw(this.context);
	}
	
	//draw the player
	this.player.draw(this.context);
	
	
	//display the current fps
	this.context.fillStyle = "rgb(0, 0, 0)";
	this.context.font = "Courier 12px/120%";
	this.context.fillText("fps: " + this.current_fps, 10, 20);
		
};

//keydown event
Game.prototype.keyDown = function(e) {
	var keyCode = e.keyCode;
	
	//grab the right context
	var self = e.data.self;
	
	//which key was pressed?
	switch (keyCode) {
		case ARROW.LEFT:
			self.left_key_down = true;
			break;
		case ARROW.RIGHT:
			self.right_key_down = true;
			break;
		case ARROW.DOWN:
			break;
		case ARROW.UP:
			break;
		case SPACE:
			self.space_key_down = true;
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
			self.left_key_down = false;
			break;
		case ARROW.RIGHT:
			self.right_key_down = false;
			break;
		case ARROW.DOWN:
			break;
		case ARROW.UP:
			break;
		case SPACE:
			self.space_key_down = false;
			break;		
	};
};
