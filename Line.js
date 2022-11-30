class Line {
  constructor(x1,y1, x2, y2){
        this.p1 = createVector(x1, y1)
        this.p2 = createVector(x2, y2)
        this.normal = this.calculateNormal()
        this.closest = null
  }
  
  
  // takes in two ends of a line as vectors
  calculateNormal() {
        let baseDelta = p5.Vector.sub(this.p2, this.p1)
        baseDelta.normalize()
        let normal = createVector(-baseDelta.y,
                                  baseDelta.x)
        return normal
    }
  
    // getDot(cx, cy, cr, x1, y1, x2, y2){
    //     let len = dist(x1, y1, x2, y2)
    //     return ( ((cx-x1)*(x2-x1)) + ((cy-y1)*(y2-y1)) ) /
    //       pow(len,2);    
    // }

  
//    getClosest(player){
//      const dot = getDot(player.pos.x, player.pos.y, ball.r, this.p1.x, this.p1.y, this.p2.x, this.p2.y)
  
//      const closestX =  this.p1.x + (dot * (this.p2.x-this.p1.x));
//      const closestY =  this.p1.y + (dot * (this.p2.y-this.p1.y));
//      this.closest = createVector(closestX, closestY)
//  }
  
  render(){
    stroke(200)
    strokeWeight(1)
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)

    // fill('red')
    // noStroke()
    // ellipse(this.closest.x, this.closest.y, 10)

        // stroke('green')
        // line(this.closest.x, this.closest.y, this.closest.x - (this.normal.x * 100), this.closest.y - (this.normal.y * 100), )
    }

}