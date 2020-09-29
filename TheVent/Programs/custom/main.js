// Entry program for the main.board file.

const spriteId = "owner";
const global = "owner.moving";

// Set initial character, and sprite stances.
rpgcode.setCharacterStance("", "JUMP_WEST");
rpgcode.setSpriteStance(spriteId, "SIT_UP");

// Have the character jump out of the event.
jumpOut();

/*
 * Animates the character jumping out of the vent. 
 */
function jumpOut() {
   rpgcode.animateCharacter("", "JUMP_WEST", function() {
      rpgcode.setCharacterStance(spriteId, "EAST");
      rpgcode.delay(500, function() {
         situp();
      }, false);
   }); 
}

/*
 * Animates the enemy sitting up from the couch.
 */
function situp() {
   rpgcode.animateSprite(spriteId, "SIT_UP", function() {
      // Place the speech bubble on the board as layer image.
      rpgwizard.craftyBoard.board.layers[1].images.push({src: "speech.png", x: 503, y: 267, id: "0349182b-7b6e-43ef-ac8a-ea514a7d8a6e"});
      rpgcode.animateSprite(spriteId, "IDLE", function() {
         rpgcode.animateSprite(spriteId, "IDLE", function() {
            // Remove the speech bubble from the board.
            rpgwizard.craftyBoard.board.layers[1].images.pop();

            // Set the enemies location to the first waypoint.
            const loc = rpgcode.getSpriteLocation("p0", false, false);
            rpgcode.setSpriteLocation(spriteId, loc.x, loc.y, 1, false);
            rpgcode.setGlobal(global, true);

            // Board startup program is complete.
            rpgcode.endProgram();
         });
      });
   });
}