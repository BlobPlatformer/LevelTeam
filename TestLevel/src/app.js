"use strict";

/* Classes and Libraries */
const Game = require('./game');
const Player = require('./player');
const Tiles = require('./tiles');
const Camera = require('./camera');
const Vector = require('./vector');

/* Global variables */
var canvas = document.getElementById('screen');
var game = new Game(canvas, update, render);
var player = new Player(16*10,16*35) ;
var input = {
  up: false,
  down: false,
  left: false,
  right: false
}
var groundHit = false;


var spritesheet = new Image();
spritesheet.src = 'assets/blobGameLevelSheet.png';
var spriteArray = [{x: 0, y: 0}, {x: 16, y: 0},{x: 32, y: 0}, {x: 48, y: 0},{x: 64, y: 0}, {x: 80, y: 0},{x: 96, y: 0}, {x: 112, y: 0},{x: 128, y: 0},
					{x: 0, y: 16}, {x: 16, y: 16},{x: 32, y: 16}, {x: 48, y: 16},{x: 64, y: 16}, {x: 80, y: 16},{x: 96, y: 16}, {x: 112, y: 16},{x: 128, y: 16},
					{x: 0, y: 32}, {x: 16, y: 32},{x: 32, y: 32}, {x: 48, y: 32},{x: 64, y: 32}, {x: 80, y: 32},{x: 96, y: 32}, {x: 112, y: 32},{x: 128, y: 32},
					{x: 0, y: 48}, {x: 16, y: 48},{x: 32, y: 48}, {x: 48, y: 48},{x: 64, y: 48}, {x: 80, y: 48},{x: 96, y: 48}, {x: 112, y: 48},{x: 128, y: 48},
					{x: 0, y: 64}, {x: 16, y: 64},{x: 32, y: 64}, {x: 48, y: 64},{x: 64, y: 64}, {x: 80, y: 64},{x: 96, y: 64}, {x: 112, y: 64},{x: 128, y: 64},
					{x: 0, y: 80}, {x: 16, y: 80},{x: 32, y: 80}, {x: 48, y: 80},{x: 64, y: 80}, {x: 80, y: 80},{x: 96, y: 80}, {x: 112, y: 80},{x: 128, y: 80},
					{x: 0, y: 96}, {x: 16, y: 96},{x: 32, y: 96}, {x: 48, y: 96},{x: 64, y: 96}, {x: 80, y: 96},{x: 96, y: 96}, {x: 112, y: 96},{x: 128, y: 96},
					{x: 0, y: 112}, {x: 16, y: 112},{x: 32, y: 112}, {x: 48, y: 112},{x: 64, y: 112}, {x: 80, y: 112},{x: 96, y: 112}, {x: 112, y: 112},{x: 128, y: 112},
					{x: 0, y: 128}, {x: 16, y: 128},{x: 32, y: 128}, {x: 48, y: 128},{x: 64, y: 128}, {x: 80, y: 128},{x: 96, y: 128}, {x: 112, y: 128},{x: 128, y: 128}];

var tiles = new Tiles();
var map = tiles.getMap();
var blocks = tiles.getBlocks();

var camera = new Camera(map, canvas);

/**
 * @function onkeydown
 * Handles keydown events
 */
window.onkeydown = function(event) {
  //event.preventDefault();
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = true;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = true;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = true;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = true;
      event.preventDefault();
      break;
  }
}

/**
 * @function onkeyup
 * Handles keydown events
 */
window.onkeyup = function(event) {
  //event.preventDefault();
  switch(event.key) {
    case "ArrowUp":
    case "w":
      input.up = false;
      event.preventDefault();
      break;
    case "ArrowDown":
    case "s":
      input.down = false;
      event.preventDefault();
      break;
    case "ArrowLeft":
    case "a":
      input.left = false;
      event.preventDefault();
      break;
    case "ArrowRight":
    case "d":
      input.right = false;
      event.preventDefault();
      break;
  }
}

window.onkeypress = function(event) {
  event.preventDefault();
  if(event.keyCode == 32 || event.keyCode == 31) {
    player.jump();
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
  player.update(elapsedTime, input);
  if(player.velocity.y >= 0) {
    if(tiles.isFloor(player.position, camera)) {
      //player.velocity = {x:0,y:0};
      player.velocity.y = 0;
      player.floor = (Math.floor((player.position.y+32)/16) * 16) - 32;
    }
    else {
      player.floor = player.position.y+player.velocity.y+1;
    }
  }
  camera.update(player);
}


/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {DOMHighResTimeStamp} elapsedTime indicates
  * the number of milliseconds passed since the last frame.
  * @param {CanvasRenderingContext2D} ctx the context to render to
  */

function render(elapsedTime, ctx) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //tilemap level background
  //ctx.translate(camera.x, 0);
  var row;
  var col;
  for(var i=0; i<map.length; i++) {
    row = i%tiles.getWidth();
    col = Math.floor(i/tiles.getWidth());
    //ctx.save();
    //ctx.restore();
    ctx.drawImage(
    spritesheet,
         spriteArray[map[i]-1].x,spriteArray[map[i]-1].y,16,16,
        row*16+camera.x,col*16+camera.y,16,16//+camera.y+(16*35),16,16
    );
  }
  //ctx.translate(-camera.x, 0)
  //player
  player.render(elapsedTime, ctx);
}


