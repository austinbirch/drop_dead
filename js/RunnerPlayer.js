var RunnerPlayer=function(){this.playerImage=null;this.color="white";this.player_name="player";this.position=new Vector(50,50);this.speed=7;this.scale=new Vector(1,1);this.velocity=new Vector(0,0);this.boundingRect=new Rect(0,0,0,0);this.jump_speed=-7;this.max_lives=2;this.lives=this.max_lives;this.defaultAcceleration=5;this.acceleration=4;this.jumping=false;this.moving=false};RunnerPlayer.prototype.setPlayerImage=function(b){switch(this.color){case"fuchsia":this.playerImage=b.getImage("runnerImageFuchsia");break;case"green":this.playerImage=b.getImage("runnerImageGreen");break;case"white":this.playerImage=b.getImage("runnerImageWhite");break;default:this.playerImage=b.getImage("runnerImageWhite");break}};RunnerPlayer.prototype.update=function(b){};RunnerPlayer.prototype.draw=function(b){b.drawImage(this.playerImage,this.position.x,this.position.y);b.fillStyle="rgb(255, 255, 255)";b.font="12px Courier";b.fillText(this.player_name,(this.position.x-10),(this.position.y-5));b.fillText("lives left: "+this.lives,(b.canvas.width-100),20)};RunnerPlayer.prototype.setPosition=function(d,c){this.position.setVector(d,c)};RunnerPlayer.prototype.setVelocity=function(d,c){this.velocity.setVector(d,c)};RunnerPlayer.prototype.getWidth=function(){return this.playerImage.width};RunnerPlayer.prototype.getHeight=function(){return this.playerImage.height};RunnerPlayer.prototype.getBoundingRect=function(){width=0,height=0;width=this.getWidth();height=this.getHeight();col_width=width*0.8;col_height=height*0.8;col_x_offset=(width-col_width)/2;col_y_offset=(height-col_height)/2;this.boundingRect.setRect(this.position.x+col_x_offset,this.position.y+col_y_offset,col_width,col_height);return this.boundingRect};RunnerPlayer.prototype.setColor=function(b){this.color=b};