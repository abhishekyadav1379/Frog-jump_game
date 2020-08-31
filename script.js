var canvas = document.getElementById("s1");
var background = document.getElementById("background");
var owl = document.getElementById("owl");


var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// global variable 
var auto=0,xbg=0;   //background
var xwater=0;  vel_water=4; //water
var xowl=0,yowl=50, boolowl=false;       //owl

function gameloop(){
    //background
    ctx.drawImage(background, xbg ,0, canvas.width, canvas.height);
    xbg -= 1.5;
    ctx.drawImage(background, xbg+canvas.width ,0, canvas.width, canvas.height);
    if( xbg < (-1*canvas.width) ){
        xbg = 0;
    }
    
    // water
    ctx.drawImage(water, xwater ,520, canvas.width, 140);
    xwater -= vel_water;
    ctx.drawImage(water, xwater+canvas.width ,520, canvas.width, 140);
    if( xwater < (-1*canvas.width) ){
        xwater = 0;
    }

    //owl
    if(boolowl){
        yowl-=0.5;
        if(yowl<51){
            boolowl=false;
        }
    }
    else{
        yowl+=0.5;
        if(yowl>101){
            boolowl=true;
        }
    }
    if(xowl>canvas.width){
        xowl=0;
    }
    ctx.drawImage(owl, xowl,yowl,100,80);
    xowl +=4;
}

// fps
function start() {
    window.requestAnimationFrame(start);  // refresh rate of screen 
    gameloop();
}
start();