//background class - displays a moveable background

var Background = function(){
	//create a space for the image
	this.backgroundImage = null;
	this.position = new Vector(0, 0);
	this.tiled_origin = new Vector(0, 0);
	this.tiled_width = 0;
	this.tiled_height = 0;
	//offsets for background image
	this.offset_x = 0;
	this.offset_y = 0;
	//canvas = viewport
	this.viewport_width = 800;
	this.viewport_height = 500;
}

//set the background image
Background.prototype.setBackgroundImage = function(imageManager) {
	this.backgroundImage = imageManager.getImage("bg");
};

//draw the background image
Background.prototype.draw = function(ctx) {
	
	//draw height tiled
	var accumulatedHeight = 0;
	while (accumulatedHeight < ctx.canvas.width){
		
		var accumulatedWidth = 0;
		//draw width tiled
		while (accumulatedWidth < ctx.canvas.width){
			ctx.drawImage(this.backgroundImage, this.tiled_origin.x + accumulatedWidth, this.tiled_origin.y + accumulatedHeight);
			accumulatedWidth = accumulatedWidth + this.backgroundImage.width;
		}
		accumulatedWidth = 0;
		accumulatedHeight = accumulatedHeight + this.backgroundImage.height;
	}
	
};

//update position
Background.prototype.updatePosition = function(deltaVector) {
		//update the base background position 
		this.tiled_origin = new Vector(this.tiled_origin.x + deltaVector.x, this.tiled_origin.y + deltaVector.y);
		
		//calculate offset
		offset_x = this.tiled_origin.x;
		offset_y = this.tiled_origin.y;
		
		//for horizontal
		var requiredExtraHorizontal = offset_x / this.backgroundImage.width;
		//round it up, we want to overdraw
		requiredExtraHorizontal = Math.ceil(requiredExtraHorizontal);
		//for vertical
		var requiredExtraVertical = offset_y / this.backgroundImage.height;
		//round it up
		requiredExtraVertical = Math.ceil(requiredExtraVertical);
		
		//horizontal
		if (deltaVector.x <= 0){
			//offset was negative, which means that we need to draw on the right hand side
			//move the origin right by the extra tiles, add the extra tiles to the end 
			this.tiled_origin.x = this.tiled_origin.x + (this.backgroundImage.width * requiredExtraHorizontal);
			this.tiled_width = this.viewport_width - (this.backgroundImage.width * requiredExtraHorizontal);			
		} else {
			//offset was positive, which means we need to move to the right, and take some width away
			this.tiled_origin.x = this.tiled_origin.x - (this.backgroundImage.width * requiredExtraHorizontal);
			this.tiled_width = this.viewport_width + (this.backgroundImage.width * requiredExtraHorizontal);
		}
		
		
};

