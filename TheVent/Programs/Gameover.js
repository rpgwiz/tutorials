var gameOverCanvas = "gameOverCanvas";
const scale = rpgcode.getScale();

// Show the gameover screen image, and wait for input.
rpgcode.createCanvas(800 * scale, 600 * scale, gameOverCanvas);
rpgcode.setImage("ui/game_over.png", 0, 0, 800 * scale, 600 * scale, gameOverCanvas);
rpgcode.renderNow(gameOverCanvas);
rpgcode.registerKeyDown("SPACE", rpgcode.restart, false);