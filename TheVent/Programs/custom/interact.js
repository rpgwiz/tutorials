// We are interacting with something.
rpgcode.setGlobal("interacting", true);

// Get the sprite ID either from a vector that triggered this, or from the sprite that triggered this.
var spriteId = "";
if (this.vectorId) {
   // Storing target ID on the vector itself.
   spriteId = this.vectorId;
} else if (this.sprite) {
   // Triggered straight from the sprite.
   spriteId = this.sprite.id;
}

const characterId = "guy.character";
if (rpgcode.getSprite(spriteId)) {
   // Play the directional grab animation.
   const direction = rpgcode.getCharacterDirection();
   if (direction === "WEST" || direction === "NORTH") {
      rpgcode.animateCharacter(characterId, "INTERACT_WEST", finish);
   } else {
      rpgcode.animateCharacter(characterId, "INTERACT_EAST", finish);
   }
} else {
   rpgcode.resetActivationChecks(characterId);
   rpgcode.endProgram();
}

function finish() {
   try {
      // Destroy the sprite on the board, and increment the number of player items.
      rpgcode.destroySprite(spriteId);
      var i = rpgcode.getGlobal("items");
      if (i < 5) {
         rpgcode.setGlobal("items", ++i);
         rpgcode.setGlobal("interacting", false);
         rpgwizard.craftyBoard.board.layers[2].images[1].src = "ui/counter_" + (i+1) + ".png";
      }

      rpgcode.resetActivationChecks(characterId);
      rpgcode.endProgram();
   } catch (ex) {
      console.log(ex);
      rpgcode.resetActivationChecks(characterId);
      rpgcode.endProgram();
   }
}