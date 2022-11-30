class Level1 {
    constructor(player, backdrop1, backdrop2, open, emptyTree, idleMush, mushSprout, mushPulse, 
        canvasWidth, canvasHeight, imgSize, mushSound) {
        this.mushrooms = []
        // array of booleans telling whether the mushroom has sprouted yet
        this.interact = []
        this.player = player
        this.backdrop1 = backdrop1
        this.backdrop2 = backdrop2
        this.open = open
        this.emptyTree = emptyTree
        this.idleMush = idleMush
        this.mushSprout = mushSprout
        this.mushPulse = mushPulse
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.imgSize = imgSize
        this.imgCount = 0
        this.time = false
        this.nextLevel = false
        this.allMushrooms = false
        this.mushSound = mushSound
        this.hatFound = false

    }

    init() {
        this.mushrooms[0] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth/2 - 170, 
    canvasHeight/2 + 130, imgSize, this.mushSound)
        this.mushrooms[1] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth/3 - 270, 
    canvasHeight/2 + 85, imgSize, this.mushSound)
        this.mushrooms[2] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth/2 + 70, 
    canvasHeight/2 + 150, imgSize, this.mushSound) 
        this.mushrooms[3] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth/2 + 185, 
    canvasHeight/2 + 115, imgSize, this.mushSound)
        this.mushrooms[4] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth + 30, 
    canvasHeight/2 + 80, imgSize, this.mushSound)
        this.mushrooms[5] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth + 150, 
    canvasHeight/2 + 140, imgSize, this.mushSound)
        this.mushrooms[6] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth + 270, 
    canvasHeight/2 + 20, imgSize, this.mushSound)
        this.mushrooms[7] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth + 340, 
    canvasHeight/2, imgSize, this.mushSound)
        this.mushrooms[8] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth + 400, 
    canvasHeight/2 + 120, imgSize, this.mushSound)
        this.mushrooms[9] = new Mushroom(idleMush, mushSprout, mushPulse, canvasWidth + 570, 
    canvasHeight/2 + 60, imgSize, this.mushSound)
      
    }

    render() {
      image(this.backdrop1, 0, 0)
      image(this.backdrop2, 700, 0)
          if (this.mushrooms[0].interacted == true &&  
            this.mushrooms[1].interacted == true &&
            this.mushrooms[2].interacted == true &&  
            this.mushrooms[3].interacted == true &&
            this.mushrooms[4].interacted == true &&  
            this.mushrooms[5].interacted == true &&
            this.mushrooms[6].interacted == true &&  
            this.mushrooms[7].interacted == true &&
            this.mushrooms[8].interacted == true &&  
            this.mushrooms[9].interacted == true) {
            this.time = true
            setTimeout(this.time = false, 5000)
            if (this.time) {
              image(this.open[floor(this.imgCount) % this.open.length], 
                  1240, 25, 160, 230)
              this.imgCount += 0.1
            } else {
              this.foundTunnel()
              image(this.open[11], 1240, 25, 160, 230)
          }
        }

        this.mushrooms.forEach(mush => {
            mush.collide(this.player)
            mush.update()
            mush.render()
          });
    }
  
  foundTunnel() {
    if (this.player.pos.x > 1210 && this.player.pos.x < 1270 &&
        this.player.pos.y < 200 && this.player.pos.y > 140 &&
        this.keyPressed()) {
      this.nextLevel = true
    }
  }
  
  keyPressed() {
    if (keyCode == 32) {
      return true
    } else {
      return false
    }
  }
  
  allMushroomsInteracted() {
    if (this.mushrooms[0].interacted == true &&  
            this.mushrooms[1].interacted == true &&
            this.mushrooms[2].interacted == true &&  
            this.mushrooms[3].interacted == true &&
            this.mushrooms[4].interacted == true &&  
            this.mushrooms[5].interacted == true &&
            this.mushrooms[6].interacted == true &&  
            this.mushrooms[7].interacted == true &&
            this.mushrooms[8].interacted == true &&  
            this.mushrooms[9].interacted == true)
      this.allMushrooms = true
  }
  
    // checkClickedMush() {
    //   this.interact[]
    // }

  update() {
    
  }
}