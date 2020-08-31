var canvas = document.getElementById("s1");
var background = document.getElementById("background");


var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// global variables
var auto=0,xbg=0;   //background

function gameloop(){
    //background
    ctx.drawImage(background, xbg ,0, canvas.width, canvas.height);
    xbg -= 1.5;
    ctx.drawImage(background, xbg+canvas.width ,0, canvas.width, canvas.height);
    if( xbg < (-1*canvas.width) ){
        xbg = 0;
    }
}

// fps
function start() {
    window.requestAnimationFrame(start);  // refresh rate of screen 
    gameloop();
}
start();