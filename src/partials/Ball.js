import { SVG_NS} from '../settings';

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;



    this.ping = new Audio('public/sounds/6_1njp68r.mp3')
    
        
    this.reset();

  }//constructor

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

this.vy= 0;
while(this.vy ===0){
this.vy = Math.floor(Math.random() * 10 - 5);
} //generates a number between 5 and -5 based on this.vy. This guarantees that if vy is large, vx is small (and vice versa)
this.vx = this.direction * (8 - Math.abs(this.vy));
    }


  wallCollision(){
    const hitLeft = this.x  - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const  hitBottom = this.y + this.radius >= this.boardHeight;

  if(hitTop || hitBottom){
    this.vy = -this.vy;
    } else if (hitLeft || hitRight){
    // this.reset();
    this.vx = -this.vx;
    }//else if
  }//method

  paddleCollision(player1, player2){

    if(this.vx > 0 /*moving to the right*/){
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;

      if(
        
        (this.x + this.radius >= leftX) // right edge of the ball is >= left edge of paddle
       && (this.x  + this.radius <= rightX) //right edge of ball is <= right edge of paddle
       && (this.y >= topY && this.y <= bottomY) //ball Y is >= paddle top Y and <= paddle bottom Y
      )
      {
          this.vx = -this.vx;
          this.ping.play();
          //add sounds
      }//second if

    } else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if(
        (this.x - this.radius <= rightX)
        &&(this.x - this. radius >= leftX)
        &&(this.y >= topY && this.y <= bottomY)
      )
      {
        this.vx = -this.vx;
        this.ping.play();
      }//if after else
    }//else
  }//paddle method

  goal(player){
    player.score++;
    this.reset();
    console.log(player.score);
  }
  render(svg, player1, player2) {

    this.x  += this.vx;
    this.y += this.vy;
    this.wallCollision();
    this.paddleCollision(player1, player2);
  
    //draws ball
    let circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttributeNS(null, 'r', this.radius);
    circle.setAttributeNS(null, 'cx', this.x);
    circle.setAttributeNS(null, 'cy', this.y);
    circle.setAttributeNS(null, 'fill', 'lightblue');
    circle.setAttributeNS(null, 'stroke', 'yellow');

    svg.appendChild(circle);

    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    if(rightGoal){
        this.goal(player1);
        this.direction = -1;
    } else if (leftGoal) {
        this.goal(player2);
        this.direction = 1;
    }//else if
  }

}