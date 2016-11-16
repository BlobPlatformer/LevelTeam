"use strict";

/* Classes and Libraries */
const Game = require('./game');
const Tiles = require('./tiles');


/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var input = {
  up: false,
  down: false,
  left: false,
  right: false
}


var spritesheet = new Image();
spritesheet.src = 'assets/basicTiles.jpg';
var tiles = new Tiles();
var map = tiles.getMap();
var blocks = tiles.getBlocks();


/**
 * @function onkeydown
 * Handles keydown events
 */
window.onkeydown = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      
      break;
    case "ArrowDown":
    case "s":
      
      break;
    case "ArrowLeft":
    case "a":
      
      break;
    case "ArrowRight":
    case "d":
      
      break;
  }
}

/**
 * @function onkeyup
 * Handles keydown events
 */
window.onkeyup = function(event) {
  switch(event.key) {
    case "ArrowUp":
    case "w":
      
      break;
    case "ArrowDown":
    case "s":
      
      break;
    case "ArrowLeft":
    case "a":
      
      break;
    case "ArrowRight":
    case "d":
      
      break;
  }
}

/**
 * @function masterLoop
 * Advances the game in sync with the refresh rate of the screen
 * @param {DOMHighResTimeStamp} timestamp the current time
 */
var masterLoop = function(timestamp) {
  game.loop(timestamp);
  window.requestAnimationFrame(masterLoop);
}
masterLoop(performance.now());

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {DOMHighResTimeStamp} elapsedTime indicates
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {
	
}


/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */
function render(elapsedTime, ctx) {
  
  for(var i = 0; i<map.length; i++){
	  var row = Math.floor(i/tiles.getWidth());
	  var col = i%tiles.getWidth();
	  ctx.drawImage(
        // image
        spritesheet,
        // source rectangle
        (map[i]-1) * 16, 0, 16, 16,
        // destination rectangle
        col * 16, row * 16, 16, 16
      );
  }
}

