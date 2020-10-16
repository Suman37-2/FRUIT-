var play=1;
var end=0;
var gameState=1;
var sword;
var swordimg;
var fruitgrp,fruit,enemygrp,monster,monsterimg;
var fruit1,fruit2,fruit3,fruit4;
var score=0;
var overimg,oversound,cutsound;

function preload(){
  swordimg=loadImage("sword.png");
  monsterimg=loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  overimg=loadImage("gameover.png");
  oversound=loadSound("gameover.mp3");
  cutsound=loadSound("knifeSwooshSound.mp3");
}
function setup(){
  createCanvas(500,500);
  
sword=createSprite(40,200,20,20); sword.addImage(swordimg); 
sword.scale=0.7;
  
  fruitgrp=new Group();
  enemygrp=new Group();
 
  gameState="play";
}
function draw(){
   background("pink");
  
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  enemy();
  fruity();
  
  if(gameState==="play"){
  if (fruitgrp.isTouching(sword)){
    fruitgrp.destroyEach();
    cutsound.play();
    score=score+2;
  }
    if(enemygrp.isTouching(sword)){
      oversound.play();
      gameState="end";
    }
    
  }
  if(gameState==="end"){
 fruitgrp.destroyEach();
 fruitgrp.setVelocityXEach=0;
    
 enemygrp.destroyEach();
 enemygrp.setVelocityXEach=0;
    
 sword.addImage(overimg);
    sword.x=250;
    sword.y=250;
    sword.scale=2;
  }
  
drawSprites();
}
function enemy(){
  if(frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterimg);
    monster.velocityX=-(8+score/10);
    monster.y=Math.round(random(100,300));
    enemygrp.add(monster);
  }
}
function fruity(){
  if(frameCount%80===0){
    
    pos=Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    
    if(pos==1){
      fruit.x=400;
      fruit.velocityX=-(7+score/4);
    }
    if(pos==2){
      fruit.x=0;
      fruit.velocityX=(7+score/4);
    }
    
    x=Math.round(random(1,4));
    if(x == 1){
      fruit.addImage(fruit1);
    } else if(x == 2){
      fruit.addImage(fruit2);
    } else if(x == 3){
      fruit.addImage(fruit3);
    } else if(x == 4){
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruitgrp.add(fruit);
  }
  
  fill("blue");
  textSize(20);
  text("Score : "+score,400,50);
}