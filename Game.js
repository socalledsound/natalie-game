class Game {
    constructor(idle, idleRight, leftWalk, rightWalk, backdrop1, backdrop2, idleMush, 
      mushSprout, mushPulse, open, emptyTree, mushSound, backSound, tunnel1, tunnel2, sleepHedge, madHedge){
    this.player = null
    this.levels = []
    this.level = null
    this.currentLevel = 1
    this.idle = idle
    this.idleRight = idleRight
    this.leftWalk = leftWalk
    this.rightWalk = rightWalk
    this.backdrop1 = backdrop1
    this.backdrop2 = backdrop2
    this.idleMush = idleMush
    this.mushSprout = mushSprout
    this.mushPulse = mushPulse
    this.open = open
    this.emptyTree = emptyTree
    this.canvasWidth = 700
    this.canvasHeight = 500
    this.imgSize = 150
    this.fadeColor = null
    this.gameWon = false
    this.mushSound = mushSound
    this.backSound = backSound
    this.tunnel1 = tunnel1
    this.tunnel2 = tunnel2
    this.sleepHedge = sleepHedge
    this.madHedge = madHedge
  }
  
  init(){
    this.player = new BenjaminSprite(this.idle, this.idleRight,
                                     this.leftWalk,
                                     this.rightWalk, this.canvasWidth/2,
                                     this.canvasHeight/2 + 130, 150)
    
    this.levels[0] = new Level1(this.backdrop1,
                                this.backdrop2, this.open, this.emptyTree, 
                                this.idleMush, this.mushSprout,
                                this.mushPulse, this.canvasWidth, 
                                this.canvasHeight, this.imgSize,
                                this.mushSound)
    
    this.levels[1] = new Level2(this.tunnel1, this.tunnel2,
                                this.sleepHedge, this.madHedge,
                                this.canvasWidth, this.canvasHeight,
                                this.imgSize)

    this.levels[0].init()
    this.levels[1].init(this.player)
    this.level = this.levels[this.currentLevel]
  }
  
  nextLevel() {
    this.currentLevel ++
    this.level = this.levels[this.currentLevel]
  }
  
  
  
  render(){
    if (this.level.hatFound) {
      this.gameWon = true
      this.level.render()
      this.player.render()
      this.fadeColor = color(17, 14, 26);
      this.fadeColor.setAlpha(128 + 128 * sin(millis() /
                              3000));
      fill(this.fadeColor);
      rect(0, 0, 1400, 500);
    } else if (this.level.nextLevel) {
      this.nextLevel()
    } else {
      this.level.render()
      this.player.render()
    }
  }
  
  update(){
    this.player.update()
    //console.log(this.player)
    this.level.update(this.player)

  }
  
  drawEndScreen() {
    background(255)
  }
}


    
