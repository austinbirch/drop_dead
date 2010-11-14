//block object

var Block = function(){
	//create a space for its image
	this.blockImage = null;
	this.position = new Vector(100, 100);
	this.velocity = 0;
};

//set the block image using the imagemanager
Block.prototype.setBlockImage = function(imageManager) {
	this.blockImage = imageManager.getImage("blockImage");
};


//update the block
Block.prototype.update = function(canvas) {
	
};

//draw the block
Block.prototype.draw = function(ctx) {
	ctx.drawImage(this.blockImage, this.position.x, this.position.y);
};

//set the position of the block
Block.prototype.setPosition = function(x, y) {
	this.position.setVector(x, y);
};

//return the block's width
Block.prototype.getWidth = function() {
	return this.blockImage.width;
};
//return the block's height
Block.prototype.getHeight = function() {
	console.log("returning height - " + this.blockImage.height);
	return this.blockImage.height;
};


