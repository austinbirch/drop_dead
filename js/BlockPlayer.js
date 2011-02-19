//block player class

var BlockPlayer = function(){
	//player color
	this.color = "rgba(255, 0, 0, 0.7)";
	this.player_name = "enemy";
	
	//default player position
	this.position = new Vector(32*4, 5);
	//width of player mark, should be == to block width
	this.width = 0;
	//height of player mark
	this.height = 15;
	
	this.minimum_move_rate = 1/8;
	this.current_rate = 0;
	
	this.maximum_fire_rate = 1/2;
	this.current_fire_rate = 0;
	
	this.boundingRect = new Rect(0, 0, 0, 0);
	
	//are we moving?
	this.moving = false;
}

BlockPlayer.prototype.draw = function(ctx) {
	//draw the player bounding rectangle
	ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	//draw the player name
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.font = "10px Monaco, Courier";
	ctx.fillText(this.player_name, this.position.x + 2, this.position.y + 10);
};

//update the position
BlockPlayer.prototype.updatePosition = function(delta, newPos) {
	this.current_rate = this.current_rate + delta;
	
	//if we are allowed to move, then move
	if (this.current_rate > this.minimum_move_rate){
		//we can move
		this.position.x = newPos;
		//reset the current rate
		this.current_rate = 0;
	}
	
};

//get the bounding rect
BlockPlayer.prototype.getBoundingRect = function() {
	width = 0, height = 0;
	
	width = this.width;
	height = this.height;
	
	//80% of actual rect
	col_width = width * 0.80;
	col_height = height * 0.80;
	
	col_x_offset = (width - col_width) / 2;
	col_y_offset = (height - col_height) / 2;
		
	this.boundingRect.setRect(this.position.x + col_x_offset, this.position.y + col_y_offset, col_width, col_height);
	
	return this.boundingRect;
};


BlockPlayer.prototype.fireBlock = function(delta, blockArray, imageManager) {
	//check for maximum fire rate
	this.current_fire_rate = this.current_fire_rate + delta;
	if (this.current_fire_rate > this.maximum_fire_rate){
		//add a block to the array, give it a velocity
		var firedBlock = new Block();
		firedBlock.color = this.color;
		firedBlock.position = new Vector(this.position.x, this.position.y);
		firedBlock.moving = true;
		//set the block image
		firedBlock.setBlockImage(imageManager);
		blockArray.push(firedBlock);
		this.current_fire_rate = 0;
	}
};

//set the player color
BlockPlayer.prototype.setColor = function(color) {
	this.color = color;
};


