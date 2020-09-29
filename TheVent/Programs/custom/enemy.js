const spriteId = "owner"; // Sprite ID for the owner enemy.
const ownerMoving = "owner.moving"; // Global, is the owner currently moving.

const moveDelay = 1200; // Amount of time it takes between points.
const thinkTime = 2000; // Amount of time spent idle thinking.
const fastModifier = 1.5;

const fastChance = 1.5;
const moveChance = 0.75;
const thinkChance = 0.75;

// If the moving global is already set, then set it.
if (rpgcode.getGlobal(ownerMoving)) {
   rpgcode.setGlobal(ownerMoving, false);
   rpgcode.setSpriteStance(spriteId, "WEST");
   moveToPoint(1); // Start running around.
}

/*
 * Makes the owner enemy idle for a time.
 */
function doIdle(start, i) {
   rpgcode.animateSprite(spriteId, "IDLE", function() {
      const elapsed = Date.now() - start;
      if (elapsed >= thinkTime) {
         moveToPoint(++i);
      } else {
         doIdle(start, i);
      }
   });
}

/*
 * Selects the next point to move to based on enemy's current location.
 */
function selectNextPoint(i) {
   var p = "p";
   var goToPn = false;
   if (i > 7) {
      i = 1;
   } else if (i == 2 || i == 3 || i == 7) {
      goToPn = Math.random() >= moveChance;
   }

   if (i < 4 && !goToPn) {
       rpgcode.setSpriteStance(spriteId, "WEST");
   } else {
      rpgcode.setSpriteStance(spriteId, "EAST");
   }

   if (goToPn) {
      p += "n";
      if (i == 2 || i == 3) {
         i = 5;
      } else {
         i = 1;
      }
   } else {
      p += i;
   }

   return [i, p];
}

/*
 * Moves the enemy to the point.
 */
function moveToPoint(i) {
   if (rpgcode.getGlobal("gameOver")) {
      // Don't bother if we are in gameover.
      return;
   }

   // Select the next point to move to.
   const result = selectNextPoint(i);
   i = result[0];
   p = result[1];

   // Decided whether or not to modifier the enemy move speed.
   var modifier = 1;
   if (Math.random() >= (fastChance / (rpgcode.getGlobal("items") + 1))) {
      modifier = fastModifier / (rpgcode.getGlobal("items") + 1);
   }

   // Move the sprite to the desired point.
   const loc = rpgcode.getSpriteLocation(p, false, false);
   rpgcode.moveSpriteTo(spriteId, loc.x, loc.y, moveDelay * modifier, function() {
      // Sprite has moved, either go idle, or immediately move again.
      if (Math.random() >= thinkChance) {
         doIdle(Date.now(), i);
      } else {
         moveToPoint(++i);
      }
   });
}