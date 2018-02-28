//Setup the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var ballColour = "0095DD";

//Set the starting point
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

//ball variables 
var ballRadius = 10;
var ballColour = "0095DD";

//Paddle Variables 
var paddleHeight = 10 ;
var paddleWidth = 85;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ')';

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
function draw() {
   
   ctx.clearRect(0,0, canvas.width,canvas.height);
    drawball();
    drawPaddle();
    x +=dx;
    y +=dy;
    
    if(y+dy > canvas.height-ballRadius||y+dy<ballRadius){
    dy=-dy
    ballColour = 'rgb(' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ')';
    paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ')';
    }
    
    if(x+dx > canvas.width-ballRadius||x+dx<ballRadius){
        dx=-dx
        ballColour = 'rgb(' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ')';
        paddleColour = 'rgb(' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ',' + (Math.floor(Math.random() * 256-30)) + ')';
        }
    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 8;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 8;
    }
   
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