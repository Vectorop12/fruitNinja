var play = 1;
var end = 0;
var gameState = 1;

var swordImage;
var fruit1, fruit2, fruit3, fruit4;

var score = 0;

function preload(){
 swordImage = loadImage("sword.png") 
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 monster1 = loadImage("alien1.png");
 monster2 = loadImage("alien2.png");
 gameoverImage = loadImage("gameover.png");
 swooshSound = loadSound("knifeSwooshSound.mp3")
 gameoverSound = loadSound("gameover.mp3")
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(200,200,10,10);
  sword.addImage(swordImage);
  
  fruitGroup = new Group();
  monsterGroup = new Group();
  
  
  
}

function draw(){
  background("lightblue");
  sword.x = World.mouseX;
  sword.y = World.mouseY;
  
  if(sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    swooshSound.play();
    score = score+1;
  }
  
  if(sword.isTouching(monsterGroup)){
    monsterGroup.destroyEach();
    gameoverSound.play();
    gameover();
  }
  
   if(gameState === end){
    fruitGroup.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(-1);
    monsterGroup.setLifetimeEach(-1);
  } 
  
  
  fruit();
  enemy();

  drawSprites();
  text("Score: "+ score, 500,50);
}

function fruit(){
  if(World.frameCount%80 === 0){
    var fruit = createSprite(700,200,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
     
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
     
  
   
    }
  }
  
function enemy(){
  if(World.frameCount%80 === 0){
   var monster = createSprite(700,400,20,20);
    monster.scale= 0.6;
    r = Math.round(random(1,2));
    if(r == 1){
      monster.addImage(monster1);
    }else if (r == 2){
      monster.addImage(monster2);
    }
  
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 100;
    
    monsterGroup.add(monster);
    
  } 
    
  }

function gameover(){
  var gameover = createSprite(300,300);
  gameover.addImage(gameoverImage);
  gameState = end;
  sword.visible = false;
 
}

