
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(windowWidth,windowHeight)
  
  monkey = createSprite (100,500,20,20)
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2

  //obstacle = createSprite(300,500,600,20)
  
  
  ground = createSprite(width/2,height,width,20);
  ground.x = ground.width /2;
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
  score=0;
  
  
}


function draw() {
background("green")
  
   if(ground.x < 0) {
     ground.x = ground.width/2;
   }
    spawnObstacles();
    spawnBanana();
  
    if(touches.length>0||keyDown("space")&& monkey.y >=300){
      monkey.velocityY= -12;
      touches=[]
    }
      
      if(bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
        score=score+1
      }
      
      monkey.velocityY = monkey.velocityY + 0.8
      
      
      
      monkey.collide(ground);
   if(obstaclesGroup.isTouching(monkey)) {
     monkey.scale=monkey.scale-0.01             
     obstaclesGroup.destroyEach()
   }
  if(bananaGroup.isTouching(monkey)){
    monkey.scale=monkey.scale+0.5
    bananaGroup.destroyEach()
  }
  drawSprites();
  fill("white")
  text("score: "+ score, 500,50);
  
  
  fill("black")
  textSize(20)
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time: "+ survivalTime, 100,50)
}



function spawnObstacles(){
  if(frameCount % 200 === 0){
    obstacles = createSprite(600,520,40,10);
    obstacles .x = Math.round(random(550,600));
    obstacles .addImage(obstaceImage);
    obstacles .scale=0.2;
    obstacles .velocityX = -3
    
    //assign lifeTime to the variable
    monkey.lifeTime = 500;
    
    //adjust to depth
    obstacles .depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
    obstaclesGroup.add(obstacles);
    
  }
}
function spawnBanana(){
  if(frameCount % 150 === 0){
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(250,300));
    banana.addImage(bananaImage);
    banana.scale=0.2;
    banana.velocityX = -3
    
    //assign lifeTime to the variable
    monkey.lifeTime = 500;
    
    //adjust to depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
    bananaGroup.add(banana);
  }
  }
