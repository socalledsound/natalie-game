// overall this is really good!  just a few thoughts below.
// but in general, I think the structure is right!
// with the way you set up the levels, you make it really easy to add
// more levels, and in general there's a really good seperation of
// rendering functions and keeping track of things functions, which
// is always a good idea!

let idle = []
let idleRight = []
let leftWalk = []
let rightWalk = []

let mushIdle
let mushSprout = []
let mushPulse = []

let sleepHedgeSprite
let madHedgeSprite
let sleepHedge = []
let madHedge = []
let tunnel
let tunnel2

let origImgSize = 100
let imgSize = 150
let imgCount = 0
let canvasWidth = 700
let canvasHeight = 500
let benjamin
// mapSize must be multiples of 700
const mapSize = 1400
let benPos
let scroll = {x: 0, y: 0}
let sky, murky, murky2, startScreen

let game
let level1
let level2
let mushrooms = []
let opening
let open = []
let emptyTree, endScreen
let gameWon = false
let mushSound, backSound


function preload() {
  mushSound = loadSound("sounds/mushroomSound.mp3");
  backSound = loadSound("sounds/backSound.mp3");
  
  idleSprite = loadImage('benjaminImages/BenjaminIdleSpriteSheet.png')
  idleRightSprite = loadImage('benjaminImages/BenjiIdleRight.png')
  leftSprite = loadImage('benjaminImages/BenjiWalkingLeftSpriteSheet.png')
  rightSprite = loadImage('benjaminImages/BenjiWalkingRightSpriteSheet.png')

  idleMush = loadImage('mushroom/mushIdle.png')
  sproutingMush = loadImage('mushroom/mushStatic.png')
  pulseMush = loadImage('mushroom/mushPulse.png')
  
  sleepHedgeSprite = loadImage('hedgeImage/SleepingHedgeSprite.png')
  madHedgeSprite = loadImage('hedgeImage/madHedgeSprite.png')

  startScreen  = loadImage('landscapes/startScreen.png')
  endScreen  = loadImage('benjaminImages/endScreen.png')
  murky = loadImage('landscapes/murky.png')
  murky2 = loadImage('landscapes/murky2Final.png')
  opening = loadImage('landscapes/opening.png')
  emptyTree = loadImage('landscapes/emptyTree.png')
  tunnel = loadImage('landscapes/tunnelLevel.png')
  tunnel2 = loadImage('landscapes/tunnel2.png')
}
// i think you should do the image getting inside function setup(){}
function startGame(){
  //backSound.play()
  // CK small thing here -- I'd use global variables like const numIdleImages = 12 here
  // also, it might make sense to have objects that hold these image arrays, just for
  // simplicity.  so, like, 
  // const playerImages = {} in the global space and then store each array on named keys,
  // this way you can just pass playerImgs and mushroomImgs in to Game?
  // but, not very important
  for(let i = 0; i < 12; i++){
    idle[i] = idleSprite.get(i * origImgSize, 0, origImgSize,
                             origImgSize)
  }
  for(let i = 0; i < 12; i++){
    idleRight[i] = idleRightSprite.get(i * origImgSize, 0,
                                  origImgSize,
                                  origImgSize)
  }
  for(let i = 0; i < 4; i++){
    leftWalk[i] = leftSprite.get(i * origImgSize, 0,
                                 origImgSize, origImgSize)
  }
  for(let i = 0; i < 4; i++){
    rightWalk[i] = rightSprite.get(i * origImgSize, 0,
                                   origImgSize, origImgSize)
  }

  // these for loops load the 2 states of the mushrooms

  for (let i = 0; i < 11; i ++) {
    mushSprout[i] = sproutingMush.get(i * origImgSize, 0, origImgSize, origImgSize)
  }

  for (let i = 0; i < 8; i ++) {
    mushPulse[i] = pulseMush.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  
  for (let i = 0; i < 12; i ++) {
    open[i] = opening.get(i * 160, 0, 160, 230)
  }
  
  // these 2 loops load the hedge sprites
  for (let i = 0; i < 6; i ++) {
    sleepHedge[i] = sleepHedgeSprite.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  
  for (let i = 0; i < 15; i ++) {
    madHedge[i] = madHedgeSprite.get(i * origImgSize, 0, origImgSize, origImgSize)
  }
  
  // CK 
  // creating and initializing a new game
  game = new Game(idle, idleRight, leftWalk, rightWalk, 
                  murky, murky2, idleMush, mushSprout, mushPulse, open,
                  emptyTree, mushSound, backSound, tunnel, tunnel2,
                  sleepHedge, madHedge)
  game.init()
  loop()
}


function setup(){
  createCanvas(canvasWidth, canvasHeight)
}

function draw(){

  // I'd change this to two if statements, like this
  //if(started){
    // start the backsound here?
    //if(!game.gameWon){
        // running the game here
    //}else{
      // end screen/animation here
    //}
  //}
  if (game && !gameWon) {
    
    benPos = game.player.pos.copy()
    scroll = benPos.sub(350, 300) 
  
    if (scroll.x < 0) {
      translate(0, 0) 
    } else if (scroll.x > 700){
      translate(-700, 0) 
    } else {
      translate(-scroll.x, 0) 
    }

    moving()

    game.update()
    game.render()
    // this is unnecessary, you can just use game.gameWon, even better change it to game.won
    gameWon = game.gameWon
    
  } else if (gameWon) {
    benPos = game.player.pos.copy()
    scroll = benPos.sub(350, 300) 
  
    if (scroll.x < 0) {
      translate(0, 0) 
    } else if (scroll.x > 700){
      translate(-700, 0) 
    } else {
      translate(-scroll.x, 0) 
    }

    moving()
    game.update()
    game.render()
    
    setTimeout(drawEndScreen, 8000)
  
  } else {
    image(startScreen, 0, 0)
    // don't need this?
    if (mouseClicked()) {
      startGame()
    }
  }
}

function drawEndScreen() {
  image(endScreen, 700, 0)
  setTimeout(noLoop, 1000)
}

function moving() {
    if(keyIsDown(LEFT_ARROW)){
      game.player.move(-1.5, 0)
    }

    if(keyIsDown(RIGHT_ARROW)){
      game.player.move(1.5, 0)
    }
  
    if(keyIsDown(DOWN_ARROW)){
      game.player.move(0, 1.5)
    }
  
    if(keyIsDown(UP_ARROW)){
      game.player.move(0, -1.5)
    }
}

// if I were you I'd swap out this mouseClicked for the built in mousePressed,
// which p5 is always waiting for, and just update a global boolean called started
// Checks whether user clicks the 'button' on the main screen
function mouseClicked() {

  if (mouseX < 410 && mouseX > 296 && mouseY > 335 && mouseY < 400 && mouseIsPressed) {
    return true;
  } else {
    return false
  }
}

// this startButton could also hold the image and etc.
// const startButton = {
//   x: 296,
//   y: 335,
//   w: 115,
//   h: 65,
// }

// function mousePressed(){
//   if(mouseX > startButton.x && mouseX <  startButton.x + startButton.w && 
//       mouseY > startButton.y && mouseY < startButton.y + startButton.h){
//     started = true
//   }
// }



