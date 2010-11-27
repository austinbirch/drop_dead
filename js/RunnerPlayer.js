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
	
	//player jump speed
	this.jump_speed = -10;
	
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

//set the player's color
RunnerPlayer.prototype.setColor = function(color) {
	this.color = color;
};


