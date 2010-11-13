//player object

var Player = function(){
	this.playerImage = new Image();
	//when the image has finished loading
	this.playerImage.load = function(){
		
	}
	this.playerImage.src = "./images/runner.png"
	this.position = new Vector(50, 50);
	this.velocity = 0;
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
	
};

//return the player's width
Player.prototype.getWidth = function() {
	return this.playerImage.width;
};
//return the player's height
Player.prototype.getHeight = function() {
	console.log("returning height - " + this.playerImage.height);
	return this.playerImage.height;
};


