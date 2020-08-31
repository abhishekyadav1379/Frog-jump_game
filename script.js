var canvas = document.getElementById("s1");
var background = document.getElementById("background");


var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function gameloop(){
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
}

// fps
function start() {
    window.requestAnimationFrame(start);  // refresh rate of screen 
   gameloop();
}
start();