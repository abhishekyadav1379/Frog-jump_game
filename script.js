var canvas = document.getElementById("s1");
var background = document.getElementById("background");


var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// global variable 
var auto=0,xbg=0;   //background
var xwater=0;  vel_water=4; //water

function gameloop(){
    //background
    ctx.drawImage(background, xbg ,0, canvas.width, canvas.height);
    
    // water
    ctx.drawImage(water, xwater ,520, canvas.width, 140);
    xwater -= vel_water;
    ctx.drawImage(water, xwater+canvas.width ,520, canvas.width, 140);
    if( xwater < (-1*canvas.width) ){
        xwater = 0;
    }

}

// fps
function start() {
    window.requestAnimationFrame(start);  // refresh rate of screen 
   gameloop();
}
start();