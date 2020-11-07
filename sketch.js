var PLAY  = 1;
var END = 0;

var gameState = PLAY;

var ghost, ghostImage;
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;

var block, blockGroup;

function preload ()
{
  ghostImage = loadImage ("ghost-standing.png");
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  climberImage = loadImage ("climber.png");
}

function setup ()
{
  createCanvas (600, 600);
  
  tower = createSprite (300, 300, 50, 50);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite (300, 300, 30, 30);
  ghost.addImage ("ghost-standing", ghostImage);
  ghost.scale = 0.3;
  
  doorGroup = new Group ();
  climberGroup = new Group ();
  blockGroup = new Group ();
}

function draw ()
{
  background ("black");
  
  if (gameState === PLAY)
    {
      if (keyDown("space")) 
        {
          ghost.velocityY = -13;
        }
      
       if (keyDown("left")) 
        {
          ghost.x = ghost.x - 5;
        }
      
       if (keyDown("right")) 
        {
          ghost.x = ghost.x + 13;
        }
       
      if (ghost.isTouching(climberGroup))
        {
          ghost.velocityY = 0;
        }
      ghost.velocityY = ghost.velocityY + 1;
      if (tower.y > 400)
      {
      tower.y = 300;
      }
      if (ghost.y > 600 || ghost.isTouching(blockGroup)) 
        {
        gameState = END;
        }
        doors ();
      
    }
  
  else if (gameState === END)
    {
     tower.destroy();
     ghost.destroy();
     doorGroup.destroyEach();
     climberGroup.destroyEach();
     blockGroup.destroyEach();
      
     textSize (30);
     fill ("yellow");
     text ("GAME OVER", 220, 300);
    }

  drawSprites();
}

function doors ()
{ 
  if (frameCount % 300 === 0)
  {
  door = createSprite (400, -10, 30, 30);
  door.x = Math.round(random(150, 350));
  door.addImage ("door", doorImage);
  door.velocityY = 1;
    
  door.lifetime = 600;
  doorGroup.add(door);
  
  climber = createSprite (door.x,230, 30, 30);
  climber.y = door.y +70
  climber.addImage ("climber", climberImage);
  climber.velocityY = 1;
    
  climber.lifetime = 600;
  climberGroup.add(climber);
    
  block = createSprite (door.x,230, 70, 20);
  block.y = door.y +90
  block.velocityY = 1;
  block.visible = false;
    
  block.lifetime = 600;
  blockGroup.add (block);
    
  ghost.depth = block.depth +1;
  }
}