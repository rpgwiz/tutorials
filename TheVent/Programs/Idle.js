// Run the if statement if were are not already animated.
if (!this.isAnimated) {
   var id = this.sprite.id;
   this.isAnimated = true;
   var animate = function() {
      // Recursively call "animate", looping the idle animation.
      rpgcode.animateSprite(id, "SOUTH", animate);
   };
   animate();
}