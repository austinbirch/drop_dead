//player object

var Player = function(){
	//default player position
	this.position = new Vector(50, 50);
	//default player velocity
	this.defaultVelocity = 100;
	//current velocity
	this.velocity = 100;
	//default acceleration
	this.defaultAcceleration = 5;
	//current acceleration
	this.acceleration = 4;
	this.playerImage = null;
	this.movingLeft = false;
	this.movingRight = false;
};

Player.prototype.setPlayerImage = function(imageManager) {
	this.playerImage = imageManager.getImage("runnerImage");
};


//move the player left
Player.prototype.moveLeft = function(delta) {
		oldPos = this.position;
		//add the acceleration
		this.velocity = this.velocity + this.acceleration;
		newPos = new Vector(this.position.x - (this.velocity * delta), this.position.y);
		if (newPos.x > 0 && newPos.x < (800 - this.getWidth())){
			//if new position is within bounds
			this.position = newPos;
		}
};
//stop moving the player left
Player.prototype.stopMoveLeft = function() {
	this.movingLeft = false;
	//reset acceleration & velocity
	this.velocity = this.defaultVelocity;
	this.acceleration = this.defaultAcceleration;
};
//move the player right
Player.prototype.moveRight = function(delta) {
	oldPos = this.position;
	//add the acceleration
	this.velocity = this.velocity + this.acceleration;
	newPos = new Vector(this.position.x + (this.velocity * delta), this.position.y);
	if (newPos.x > 0 && newPos.x < (800 - this.getWidth())){
		//if new position is within bounds
		this.position = newPos;
	}
};
//stop moving the player right
Player.prototype.stopMoveRight = function() {
	this.movingRight = false;
	//reset acceleration & velocity
	this.velocity = this.defaultVelocity;
	this.acceleration = this.defaultAcceleration;
};

//draw the player
Player.prototype.draw = function(ctx) {
	ctx.drawImage(this.playerImage, this.position.x, this.position.y);
};

//set the position of the player
Player.prototype.setPosition = function(x, y) {
	this.position.setVector(x, y);
};

//return the player's width
Player.prototype.getWidth = function() {
	return this.playerImage.width;
};
//return the player's height
Player.prototype.getHeight = function() {
	return this.playerImage.height;
};


