//player object

var RunnerPlayer = function(){
	this.playerImage = null;
	
	//player color - determines which image is loaded. default = black
	this.color = "white";
	//player name
	this.player_name = "austin"
	
	//default player position
	this.position = new Vector(50, 50);
	
	//default player velocity
	this.speed = 7;
	//current scale (to scale movement)
	this.scale = new Vector(1, 1);
	//x and y velocities
	this.velocity = new Vector(0,0);
	
	//bounding rectangle for the player
	this.boundingRect = new Rect(0, 0, 0, 0);
	
	//player jump speed
	this.jump_speed = -7;
	
	//default acceleration
	this.defaultAcceleration = 5;
	//current acceleration
	this.acceleration = 4;
	this.jumping = false;
	this.moving = false;
};

RunnerPlayer.prototype.setPlayerImage = function(imageManager) {
	switch (this.color) {
		case 'fuchsia':
			this.playerImage = imageManager.getImage("runnerImageFuchsia");
			break;
		case 'green':
			this.playerImage = imageManager.getImage("runnerImageGreen");
			break;
		case 'white':
			this.playerImage = imageManager.getImage("runnerImageWhite");
			break;
		default:
			this.playerImage = imageManager.getImage("runnerImageWhite");
			break;
	}
};

RunnerPlayer.prototype.update = function(delta) {
	
};


//draw the player
RunnerPlayer.prototype.draw = function(ctx) {
	ctx.drawImage(this.playerImage, this.position.x, this.position.y);
	//draw the player text
	ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
	ctx.font = "10px Monaco, Courier";
	ctx.fillText(this.player_name, (this.position.x - 10), (this.position.y - 5));
};

//set the position of the player
RunnerPlayer.prototype.setPosition = function(x, y) {
	this.position.setVector(x, y);
};

RunnerPlayer.prototype.setVelocity = function(x, y) {
	this.velocity.setVector(x, y);
};

//return the player's width
RunnerPlayer.prototype.getWidth = function() {
	return this.playerImage.width;
};
//return the player's height
RunnerPlayer.prototype.getHeight = function() {
	return this.playerImage.height;
};

RunnerPlayer.prototype.getBoundingRect = function() {
	width = 0, height = 0;
	
	width = this.getWidth();
	height = this.getHeight();
	
	//80% of actual rect
	col_width = width * 0.80;
	col_height = height * 0.80;
	
	col_x_offset = (width - col_width) / 2;
	col_y_offset = (height - col_height) / 2;
		
	this.boundingRect.setRect(this.position.x + col_x_offset, this.position.y + col_y_offset, col_width, col_height);
	
	return this.boundingRect;
};


//set the player's color
RunnerPlayer.prototype.setColor = function(color) {
	this.color = color;
};


