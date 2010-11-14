//player object

var Player = function(){
	
	this.position = new Vector(50, 50);
	this.velocity = 0;
	this.playerImage = null;
};

Player.prototype.setPlayerImage = function(imageManager) {
	this.playerImage = imageManager.getImage("runnerImage");
};


//update the player
Player.prototype.update = function(canvas) {
	
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


