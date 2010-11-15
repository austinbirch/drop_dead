//player object

var Player = function(){
	this.playerImage = null;
	
	//default player position
	this.position = new Vector(50, 50);
	
	//default player velocity
	this.speed = 7;
	//current scale (to scale movement)
	this.scale = new Vector(1, 1);
	//x and y velocities
	this.velocity = new Vector(0,0);
	
	//player jump speed
	this.jump_speed = -20;
	
	//default acceleration
	this.defaultAcceleration = 5;
	//current acceleration
	this.acceleration = 4;
	this.jumping = false;
	this.moving = false;
};

Player.prototype.setPlayerImage = function(imageManager) {
	this.playerImage = imageManager.getImage("runnerImage");
};

Player.prototype.update = function(delta) {
	
};


//draw the player
Player.prototype.draw = function(ctx) {
	ctx.drawImage(this.playerImage, this.position.x, this.position.y);
};

//set the position of the player
Player.prototype.setPosition = function(x, y) {
	this.position.setVector(x, y);
};

Player.prototype.setVelocity = function(x, y) {
	this.velocity.setVector(x, y);
};

//return the player's width
Player.prototype.getWidth = function() {
	return this.playerImage.width;
};
//return the player's height
Player.prototype.getHeight = function() {
	return this.playerImage.height;
};


