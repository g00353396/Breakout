//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//Set the starting point
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var score =0;
var scoreColor = 'rgb(' + (Math.floor(Math.random() * 256-120)) + ',' + (Math.floor(Math.random() * 256-120)) + ',' + (Math.floor(Math.random() * 256-120)) + ')';


//ball variables 
var ballRadius = 10;
var ballColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';

//Paddle Variables 
var paddleHeight = 10 ;
var paddleWidth = 85;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';

//Draw the paddle 
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = paddleColour;
    ctx.fill();
    ctx.closePath();
}

//Draw the ball 
function drawball(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = ballColour;
    ctx.fill();
    ctx.closePath();
}

//Brick variables 
var brickRowCount =4;
var brickColumnCount =6;
var brickWidth = 65;
var brickHeight = 15;
var brickPadding = 10;
var brickOffsetTop = 28;
var brickOffsetLeft = 25;
var brickColor = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';

//Brick Array
var bricks = [];
for(c=0;c<brickColumnCount;c++){
    bricks[c] =[];
    for(r=0;r<brickRowCount;r++){
        bricks[c][r]= { x:0,y:0,status:1};
    }
}

//Draw Score Function
function drawScore(){
    ctx.font = "17px Arial ";
    ctx.fillStyle = scoreColor;
    ctx.fillText("Score : "+score, 8,20);
    document.getElementById("gamescore").innerHTML = "Score: " + score;
}
//Draw Bricks Function
function drawBricks(){
    for(c=0;c<brickColumnCount;c++) {
        for(r=0;r<brickRowCount;r++){
            if(bricks[c][r].status ==1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x =brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
                
            }
        }
    }
}
function collisionDetection(){
    for(c=0;c<brickColumnCount;c++){
        for(r=0;r<brickRowCount;r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x<b.x+brickWidth && y < b.y+brickHeight){
                    dy = -dy;
                    b.status =0;
                    score = ++;
                    ballColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
                    brickColor = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
                    scoreColor = 'rgb(' + (Math.floor(Math.random() * 256-100)) + ',' + (Math.floor(Math.random() * 256-100)) + ',' + (Math.floor(Math.random() * 256-100)) + ')';
                }
            }
        }
    }
}
function additionalFunction(){
    if(x+dx > canvas.width-ballRadius || x + dx <ballRadius){
        dx = -dx;
        ballColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
        paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
        brickColor = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
    }
  if(y+dy < ballRadius){
      dy = -dy;
      ballColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
      paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
      brickColor = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
  }else if (y+dy > canvas.height-ballRadius){
      if(x > paddleX && x < paddleX + paddleWidth){
          dy=-dy;
          ballColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';
      paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ',' + (Math.floor(Math.random() * 256-45)) + ')';

      }else{
      alert("Game Over");
      document.location.reload();
      }
  }
}
function paddleMove(){
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 8;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 8;
    }
}


function draw() {
   
   ctx.clearRect(0,0, canvas.width,canvas.height);
    drawball();
    drawPaddle();
    drawBricks();
    drawScore();
    x +=dx;
    y +=dy;
    collisionDetection();
    additionalFunction();
    paddleMove();
    
   
   
}
//Listeners 
document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

//key down function
function keyDownHandler(e){
    if(e.keyCode == 39){
        rightPressed = true;
    }
    else if(e.keyCode == 37){
        leftPressed = true;
    }
}
// key up function 
function keyUpHandler(e){
    if(e.keyCode == 39){
        rightPressed = false;
    }
    else if(e.keyCode == 37){
        leftPressed = false;
    }
}
setInterval(draw,10);