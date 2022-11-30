class Level2 {
  constructor(player, tunnel1, tunnel2, sleepHedge, madHedge,
              canvasWidth, canvasHeight, imgSize) {
    this.player = player
    this.lines = []
    this.tunnel1 = tunnel1
    this.tunnel2 = tunnel2
    this.sleepHedge = sleepHedge
    this.madHedge = madHedge
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.imgSize = imgSize
    this.sleepHedgeCount = 0
    this.madHedgeCount = 0
    this.hatFound = false
    this.blanket = false
  }
    
  init() {
    this.lines[0] = new Line(1365, 0, 1326, 70)
    this.lines[1] = new Line(1326, 70, 1257, 205)
    this.lines[2] = new Line(1257, 205, 1204, 260)
    this.lines[3] = new Line(1204, 260, 1076, 326)
    this.lines[4] = new Line(1076, 326, 1050, 342)
    this.lines[5] = new Line(1050, 342, 1026, 375)
    this.lines[6] = new Line(1026, 375, 950, 420)
    this.lines[7] = new Line(950, 420, 754, 420)
    this.lines[8] = new Line(754, 420, 700, 404)
    this.lines[9] = new Line(700, 404, 580, 392)
    this.lines[10] = new Line(580, 392, 496, 302)
    this.lines[11] = new Line(496, 302, 434, 279)
    this.lines[12] = new Line(434, 279, 381, 276)
    this.lines[13] = new Line(381, 276, 289, 269)
    this.lines[14] = new Line(289, 269, 205, 222)
    this.lines[15] = new Line(205, 222, 109, 176)
    this.lines[16] = new Line(109, 176, 71, 123)
    this.lines[17] = new Line(71, 123, 12, 21)
    this.lines[18] = new Line(12, 21, 7, 0)
  }
  
  render() { 
    image(this.tunnel1, 700, 0)
    image(this.tunnel2, 0, 0)
    
    
    // draws curve Benjamin will walk along
    for (let i = 0; i < 19; i++) {
      this.lines[i].render()
    }
    
    if (!this.blanket) {
      image(this.madHedge[floor(this.madHedgeCount) %
          this.madHedge.length], 
          788, 320, 130, 130)
    }

    image(this.sleepHedge[floor(this.sleepHedgeCount) %
          this.sleepHedge.length], 
          860, 74, 100, 100)
    
    let norm = this.lines[0].normal
    this.lines.forEach(line => {
      let norm = line.normal
      if (this.player.checkLineCollision(line.p1, line.p2)) {
        this.player.vel.y *= -1
        // check if player is colliding with each line
        // how can the player only walk on the lines?
        // rotating the player in relation to the normal of the current...
        // ...line it is touching -- fixed by push/pop method
      } 
    });
    
    
    // wondering if i should put the push/pop stuff in the render method of Level2 instead of the render method of BenjaminSprite because the mechanics of this level is different than the other levels
    
    //push()
    
    //translate(this.player.pos.x, this.player.pos.y/2)
    // let angle = this.player.pos.dot(norm)
    // rotate(angle)
    //this.rotate(angle)
    //this.translate(-this.player.pos.x, -this.player.pos.y/2)
    
    // this.player.render()
    // this.player.update()
    
    //pop()
    
  }

  update() {
    this.sleepHedgeCount += 0.05
    this.madHedgeCount += 0.15
  }
}

