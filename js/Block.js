//block object

var Block = function(){
	this.blockImage = new Image();
	//when the image has finished loading
	this.blockImage.load = function(){
		
	}
	this.blockImage.src = "./images/block.png"
	this.position = new Vector(50, 50);
	this.velocity = 0;
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


