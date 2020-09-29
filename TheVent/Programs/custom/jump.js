// Check first if we have enough items to jump.
if (rpgcode.getGlobal("items") >= 5) {
   rpgcode.setGlobal("gameOver", true);
   rpgcode.setGlobal("jumping", true);

   // Animate the character based on their direction.
   const characterId = "guy.character";
   const direction = rpgcode.getCharacterDirection();
   if (direction === "WEST" || direction === "NORTH") {
      rpgcode.animateCharacter(characterId, "JUMP_WEST", finish);
   } else {
      rpgcode.animateCharacter(characterId, "JUMP_EAST", finish);
   }
   
   /*
    * Called when the jump animation is finished, ends the game.
    */
   function finish() {
      const loc = rpgcode.getCharacterLocation(false, false);
      rpgcode.setCharacterLocation(characterId, loc.x, loc.y, 0, false);
      rpgcode.setGlobal("jumping", false);
      rpgcode.endProgram("Won.js");
   }
} else {
   // Not enough items, end the program.
   rpgcode.endProgram();
}

