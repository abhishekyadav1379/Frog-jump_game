var canvas = document.getElementById("s1");
var background = document.getElementById("background");
var owl = document.getElementById("owl");
var plant = document.getElementById("plant");

var frog = document.getElementById("frog");
var insect1 = document.getElementById("insect1");


var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("keydown", moveSomething, false);
function moveSomething(e) {
    switch(e.keyCode) {
    case 32:
        // space bar
        
        if(space==0){
        console.log("space");
        auto = 1;
        space=1;
        }
        break;
    case 65:
        fx-=10;
        break;        
    }
}


// global variable 
var auto=0,space=0;
var auto=0,xbg=0;   //background
var xwater=0;  vel_water=4; //water
var fx=0,fy=canvas.height-100, xjump=6;  //frog
var ins_x=canvas.width, ins_y=450, Bool=false;  //insect 
var xbg=0;   //background
var auto=0;
var space =0;
var xowl=0,yowl=50, boolowl=false;       //owl
var px=canvas.width,px2=canvas.width+canvas.width/1.25;      // plant
var px3 = canvas.width+canvas.width/2.2, px4 = canvas.width+canvas.width/4;


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


     //frog
     if(auto==1){
        fy -=10;
        fx+=xjump;
        if(fy<=400){
            auto=0;
            fy +=10;
        }
    }
    if(auto==0 && fy>=400 && fy <canvas.height-100){
        fy +=10;
        fx+=xjump;
    }
    if(fy==557){
        space=0;
    }
    // console.log(fy);
    ctx.drawImage(frog,fx,fy,100,50);
    if(fx>=0){
        fx-=1;
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

    //frog 
    if(auto==1){
        fy -=10;
        fx+=xjump;
        if(fy<=400){
            auto=0;
            fy +=10;
        }
    }
    if(auto==0 && fy>=400 && fy <canvas.height-100){
        fy +=10;
        fx+=xjump;
    }
    if(fy>=557){
        space=0;
    }
    // console.log(fy);
    ctx.drawImage(frog,fx,fy,100,50);
    if(fx>=0){
        fx-=1;
    }
    //plant 
    if(px<-20){
        px=canvas.width;
    }
    if(px2<-20){
        px2=canvas.width;
    }
    if(px3<-20){
        px3 = canvas.width;
    }    
    if(px4<-20){
        px4 =canvas.width;
    }
    px -=vel_water;
    px2 -=vel_water;
    px3 -=vel_water;
    px4 -=vel_water;

    ctx.drawImage(plant, px, 520, 80, 100);
    ctx.drawImage(plant,px2,520,80,100);
    ctx.drawImage(plant,px3,520,80,100);
    ctx.drawImage(plant, px4, 520,80,100)

    //insect
    if( ins_y>449 && Bool == false )
    {
        ins_y += 1;
        if( ins_y>=500 )
        {
            Bool = true;
        }
    }
    if(Bool == true)
        {
            ins_y -= 1;
            if( ins_y<450 )
            {
                Bool = false;
                ins_y = 450;
            }
        }
        if(ins_x<-50){
            ins_x=canvas.width;
        }
    ctx.drawImage(insect1, ins_x,ins_y,50,30);
    ins_x -= 5;


}

// fps
function start() {
    window.requestAnimationFrame(start);  // refresh rate of screen 
    gameloop();
}
start();