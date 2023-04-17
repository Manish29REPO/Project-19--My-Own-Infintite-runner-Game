var pathImg;
var mainCyclist;
var car;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;


function preload(){
    pathImg = loadImage("Road.png");
    mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
    mainRacerDown = loadAnimation("mainPlayer3.png");
    carImg = loadImage("car.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);
path=createSprite(windowWidth/2,windowHeight/2);
path.addImage(pathImg);
path.velocityX = -5;

mainCyclist  = createSprite(150,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("SahilFell", mainRacerDown )
mainCyclist.scale=0.1;
mainCyclist.setCollider("rectangle",0,0,40,40)

obstaclesGroup = new Group();

}

function draw() {
 background(0);

 drawSprites();
 textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
   if (gameState === PLAY){
    
      distance = distance + Math.round(getFrameRate()/60);
      path.velocityX = -(6 + 2*distance/150);
     
      mainCyclist.y = World.mouseY;
     
      edges= createEdgeSprites();
      mainCyclist .collide(edges);

      if(path.x < 0 ){
         path.x = width/2;
       } 

      spawnObstacles();
     
      if(obstaclesGroup.isTouching(mainCyclist)){
         gameState = END};
   
      }
      else if (gameState === END){
      path.velocityX = 0;
      mainCyclist.velocityX = 0;
      obstaclesGroup.setVelocityXEach(0);

      mainCyclist.changeAnimation( "SahilFell",mainRacerDown);
      }
}

   function spawnObstacles() {
    if(frameCount % 80 === 0) {
       var y = Math.round(random(50, height-50))
       car = createSprite(windowWidth, y)
       car.addImage(carImg)
       car.velocityX = -10
       car.scale = 0.4
       obstaclesGroup.add(car)
}
   }
