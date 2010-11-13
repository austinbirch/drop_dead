//player object

var Player = function(){
	
	//define the player image
	this.playerImage = new Image();
	
	
	this.height = 0;
	this.width = 0;
	
	//when the player image has been loaded 
	//store reference to player
	var player = this;
	this.playerImage.onload = function() {
		//this has switched context
		player.width = this.width;
		player.height = this.height;
	};
	
	console.log("player height: " + this.height);
	this.position = new Vector(50, 50);
	this.velocity = 0;
	
	//load the image for the player
	this.playerImage.src = "./images/runner.png"
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
	return this.width;
};
//return the player's height
Player.prototype.getHeight = function() {
	return this.height;
};


