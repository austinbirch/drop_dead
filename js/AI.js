//simple ai - placeholding for real boys.

//constructor
var AI = function(){
	//how quickly our AI can move, how often it drops blocks
	this.difficulty = 0.8;
	
	this.max_fire_rate = 1;
	
	//the block that represents the AI
	this.block = new BlockPlayer();
	this.block.player_name = "AI";
	
	this.deltaAccumulator = 0;
	
};

AI.prototype.update = function(delta, playerPosX) {
	
	//update the accumulator
	this.deltaAccumulator = this.deltaAccumulator + delta;
	
	//we want to move toward the player, if the difficulty allows it
	if (playerPosX > (this.block.position.x + this.block.width)){
		//the player is to the right
		if (this.deltaAccumulator > this.difficulty){
			//we can move!
			this.block.position.x = this.block.position.x + this.block.width;
			//reset the accumulator
			this.deltaAccumulator = 0;
			this.firing = false;	
		}
	}else if (playerPosX < this.block.position.x){
		//the player is to the left
		if (this.deltaAccumulator > this.difficulty){
			//we can move!
			this.block.position.x = this.block.position.x - this.block.width;
			//reset the accumulator
			this.deltaAccumulator = 0;
			this.firing = false;
		}
	}else{
		//the player is directly underneath - don't move
		//reset the accumulator
		this.deltaAccumulator = 0;
		this.firing = true;		
	}
	
};

AI.prototype.fire = function(delta, blockArray, imageManager) {
	//replace this function
	this.block.fireBlock(delta, blockArray, imageManager);
};


AI.prototype.draw = function(context) {
	this.block.draw(context);
};

