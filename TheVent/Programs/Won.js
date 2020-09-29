var winCanvas = "winCanvas";
const scale = rpgcode.getScale();

// Show the win screen image, and wait for input.
rpgcode.createCanvas(800 * scale, 600 * scale, winCanvas);
rpgcode.setImage("ui/win.png", 0, 0, 800 * scale, 600 * scale, winCanvas);
rpgcode.renderNow(winCanvas);
rpgcode.registerKeyDown("SPACE", rpgcode.restart, false);