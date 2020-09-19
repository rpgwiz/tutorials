rpgcode.setColor(255, 255, 255, 1);
rpgcode.setFont(28, "Lucida Console");

let cursorX = 250;
let cursorY = 383;
let action = "fight";
let inAction = false;
let enemyTurn = false;

rpgcode.registerKeyDown("LEFT_ARROW", function() {
   action = "fight";
   cursorX = 250;
   cursorY = 383;
   draw();
}, false);

rpgcode.registerKeyDown("RIGHT_ARROW", function() {
   action = "run";
   cursorX = 430;
   cursorY = 383;
   draw();
}, false);

rpgcode.registerKeyDown("ENTER", function() {
   if (inAction === true || enemyTurn === true) {
      return;
   }
   
   if (action === "fight") {
      inAction = true;
      
      doPlayerAttack();
   }
}, false);

draw();

function draw() {
   rpgcode.clearCanvas();
   
   const character = rpgcode.getCharacter();
   rpgcode.drawText(65, 320, character.name);
   rpgcode.drawText(220, 320, character.level);
   rpgcode.drawText(310, 320, character.health);
   rpgcode.drawText(390, 320, character.magic);
   rpgcode.drawText(540, 320, character.experience);
   
   rpgcode.drawText(65, 400, character.name);
   
   rpgcode.drawText(270, 400, "Fight");
   rpgcode.drawText(450, 400, "Run");
   
   rpgcode.drawImage("cursor.png", cursorX, cursorY, 10, 17, 0);
   
   rpgcode.renderNow();
}

function doPlayerAttack() {
   draw();
   
   rpgcode.drawText(40, 40, action);
   rpgcode.renderNow();

   rpgcode.animateSprite("enemy-1", "DEFEND", handlePlayerAttack);
}

function handlePlayerAttack() {
   enemyTurn = true;
   inAction = false;

   const character = rpgcode.getCharacter();
   const attackPower = character.attack;

   const enemy = getEnemy("enemy-1");
   enemy.health = enemy.health - attackPower;
   
   draw();

   if (0 < enemy.health) {
      // Continue the battle, enemy has some health
      rpgcode.delay(1000, doEnemyAttack, false);
   } else {
      rpgcode.restart();
   } 
}

function doEnemyAttack() {
   draw();
   
   rpgcode.drawText(40, 40, "Enemy Attack");
   rpgcode.renderNow();

   rpgcode.animateSprite("enemy-1", "ATTACK", handleEnemyAttack);
}

function handleEnemyAttack() {
   const enemy = getEnemy("enemy-1");
   const attackPower = enemy.attack;

   const character = rpgcode.getCharacter();
   character.health = character.health - attackPower;

   draw();

   if (0 < character.health) {
      // Continue the battle, player character has some health
      enemyTurn = false;
   } else {
      rpgcode.restart();
   }   
}

// Utility functions
function getEnemy(enemyId) {
   return rpgcode.getSprite(enemyId).sprite.enemy;
}