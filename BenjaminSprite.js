class BenjaminSprite {
    constructor(idleLeft, idleRight, left, right, x, y, size,
                 mapSize){
        this.idleLeft = idleLeft
        this.idleRight = idleRight
        this.left = left
        this.right = right
        this.w = 100
        this.h = 100
        this.imgCount = 0
        this.imgSize = size
        this.mapSize = mapSize
        this.pos = createVector(x, y)
        this.centerXOffset = this.w/1.5
        this.centerYOffset = this.h/1.5
        this.vel = createVector(0,0)  
        this.acc = createVector(0,0)
        this.friction = 0.7
        // -2 = walking left, -1 = idle left, 
        // 1 = idle right, 2 = walking right
        this.dir = -1
        this.gravity = 0.1
        this.rotationValue = 0
      
    }

    bounceEdges() {
    if(this.pos.x < -this.mapSize - this.imgSize/3 || 
       this.pos.x > this.mapSize - this.imgSize/3) {
      this.vel.x *= 0
      this.acc.mult(0)
    }
    if(this.pos.y < -this.mapSize - this.imgSize/3 || this.pos.y
       > this.mapSize - this.imgSize/3) {    
      this.vel.y *= 0
      this.acc.mult(0)
    }
    }
  
  // checkLineCollision(line){
  //     if(this.pos.y > line.p - this.r){
  //       this.vel.y *= -1
  //       this.pos.y = yVal - this.r 
  //     }
  // }
  
  checkLineCollision(startPoint, endPoint) {

    return ((endPoint.y - startPoint.y) * (this.pos.x - startPoint.x)).toFixed(0) === ((this.pos.y - startPoint.y) * (endPoint.x - startPoint.x)).toFixed(0) &&
            ((startPoint.x > this.pos.x && this.pos.x > endPoint.x) || (startPoint.x < this.pos.x && this.pos.x < endPoint.x)) &&
            ((startPoint.y >= this.pos.y && this.pos.y >= endPoint.y) || (startPoint.y <= this.pos.y && this.pos.y <= endPoint.y));


}
  
  // intersects(a,b,c,d,p,q,r,s) {
  //   var det, gamma, lambda;
  //   det = (c - a) * (s - q) - (r - p) * (d - b);
  //   if (det === 0) {
  //     return false;
  //   } else {
  //     lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
  //     gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
  //     return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)
  //   }
  // }


    move(x, y){
        //console.log('moving: ', x, y)
        this.acc.add(x, y)
        this.vel.add(this.acc)
        this.acc.mult(0)
    }

    render(){


      push()

      rotate(this.rotatationValue)

      if (keyIsDown(LEFT_ARROW)) {
        this.dir = -2
        image(this.left[floor(this.imgCount) %
                        this.left.length], this.pos.x,
              this.pos.y, this.imgSize,
              this.imgSize)
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.dir = 2
        image(this.right[floor(this.imgCount) %
                        this.right.length], this.pos.x,
             this.pos.y, this.imgSize,
             this.imgSize)
      } else if (this.dir == 2) {
        image(this.idleRight[floor(this.imgCount) % 
                          this.idleRight.length],
                this.pos.x, this.pos.y, this.imgSize, 
                this.imgSize)
      } else {
        image(this.idleLeft[floor(this.imgCount) % 
                          this.idleLeft.length],
                this.pos.x, this.pos.y, this.imgSize, 
                this.imgSize)
      }
      pop()
    // push()
    // translate(this.pos.x, this.pos.y/2)
    // rotate()
    // translate(-this.pos.x, -this.pos.y/2)
    // pop()
      
      
    }

    reposition(x, y, theta){
      this.pos.x = x - this.centerXOffset
      this.pos.y = y - this.centerYOffset
      this.rotationValue = theta
    }

    collide(ob) {
      let d = this.pos.dist(ob.pos)
      if (d < 50) {
        ob.clicked = true;
      }
    }
  
    update(){
      this.vel.mult(this.friction)
      this.pos.add(this.vel)
      this.imgCount+= 0.165
      
    }

}