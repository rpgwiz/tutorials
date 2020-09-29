// List of assets used by the game.
var assets = {
  "images": [
      "speech.png",
      "ui/powered_by.png",
      "ui/counter_1.png",
      "ui/counter_2.png",
      "ui/counter_3.png",
      "ui/counter_4.png",
      "ui/counter_5.png",
      "ui/counter_6.png",
      "ui/title.png",
      "ui/controls.png",
      "ui/game_over.png",
      "ui/win.png"
  ]
}

// UI related
var viewport = rpgcode.getViewport();
var scale = rpgcode.getScale();
var alpha = 0.1;

// Character
var characterSpeed = 1.5;
var characterId = "guy";

// Game state
rpgcode.setGlobal("interacting", false);
rpgcode.setGlobal("jumping", false);
rpgcode.setGlobal("items", 0);
rpgcode.setGlobal("gameOver", false);
rpgcode.setGlobal("owner.moving", false);


// poweredByCanvas
var poweredByImageId = "ui/powered_by.png";
var poweredByCanvas = "poweredBy";
var poweredByImage = null;

/////////////////////////////////////////////////////////////////////////////////////////
// Main Function
/////////////////////////////////////////////////////////////////////////////////////////
rpgcode.loadAssets(assets, function() {
   setup();
   fadeIn();
});

/////////////////////////////////////////////////////////////////////////////////////////
// Setup Code
/////////////////////////////////////////////////////////////////////////////////////////
function setup() {
   // Character setup
   rpgcode.setCharacterSpeed(characterId, characterSpeed);
   
   // Watermark setup
   poweredByImage = rpgcode.getImage(poweredByImageId);
   poweredByImage.scaledWidth = poweredByImage.width * scale;
   poweredByImage.scaledHeight = poweredByImage.height * scale;
   var x = Math.floor(viewport.width / 2) - Math.floor(poweredByImage.scaledWidth / 2);
   var y = Math.floor(viewport.height / 2) - Math.floor(poweredByImage.scaledHeight / 2);
   rpgcode.createCanvas(poweredByImage.scaledWidth, poweredByImage.scaledHeight, poweredByCanvas);
   rpgcode.setCanvasPosition(x, y, poweredByCanvas);
}

/*
 * Start the actual game by loading the Title.js program.
 */
function start() {
   rpgcode.destroyCanvas(poweredByCanvas);
   rpgcode.clearCanvas();
   rpgcode.setGlobalAlpha(1.0);
   rpgcode.endProgram("Title.js");
}

/////////////////////////////////////////////////////////////////////////////////////////
// Watermark Code
/////////////////////////////////////////////////////////////////////////////////////////
function fadeIn() {
   drawLogo();
   
   alpha += 0.1
   if (alpha < 1.1) {
      rpgcode.delay(100, fadeIn);
   } 
   else {
      alpha -= 0.1
      rpgcode.delay(1500, fadeOut);
   }
}

function fadeOut() {
   drawLogo();
   
   alpha -= 0.1
   if (alpha > 0) {
      rpgcode.delay(100, fadeOut);
   } else {
      rpgcode.delay(1000, start);
   }
}

function drawLogo() {
   rpgcode.clearCanvas(poweredByCanvas);
   rpgcode.setGlobalAlpha(alpha);
   rpgcode.setImage(poweredByImageId, 0, 0, poweredByImage.scaledWidth, poweredByImage.scaledHeight, poweredByCanvas);
   rpgcode.renderNow(poweredByCanvas);
}