var titleCanvas = "titleCanvas";
const scale = rpgcode.getScale();

/*
 * Shows the control screen, and waits for input.
 */
function showControls() {
   rpgcode.setImage("ui/controls.png", 0, 0, 800 * scale, 600 * scale, titleCanvas);
   rpgcode.renderNow(titleCanvas);
   rpgcode.registerKeyDown("SPACE", showBoard, false);
}

/*
 * Sends the character to the board.
 */
function showBoard() {
   rpgcode.destroyCanvas(titleCanvas);
   rpgcode.sendToBoard("main.board", 11, 3.5, 1);
   rpgcode.endProgram();
}

// Show the title screen image, and wait for input.
rpgcode.createCanvas(800 * scale, 600 * scale, titleCanvas);
rpgcode.setImage("ui/title.png", 0, 0, 800 * scale, 600 * scale, titleCanvas);
rpgcode.renderNow(titleCanvas);
rpgcode.registerKeyDown("SPACE", showControls, false);