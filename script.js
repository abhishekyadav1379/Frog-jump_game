var menu = document.getElementById("menu");
var canvas = document.getElementById("s1");
var background = document.getElementById("background");
var owl = document.getElementById("owl");
var stone = document.getElementById("stone");
var plant = document.getElementById("plant");
var drone = document.getElementById("drone");
var frog = document.getElementById("frog");
var insect1 = document.getElementById("insect1");
var gameover1 = document.getElementById("gameover");


var ctx = canvas.getContext('2d');
canvas.width = 1366;// window.innerWidth;
canvas.height = 657; //window.innerHeight;

//touch event 
window.addEventListener("touchstart", touch1, false);
function touch1(){
    page=2;
    if (tou ==0){
        page = 2;
        tou =1;
    }
    if (page==2){
        if(fx >= -10 && fx <canvas.width-100 && event.touches[0].clientX>670){
            if(space==0){
            document.getElementById("frogjump").play(); 
            auto = 1;
            space=1;
            }
        }
    }

}

// touch move
window.addEventListener("touchmove", touchmove1);
function touchmove1(){
    if(event.touches[0].clientX<670){
        if( fx > -1 && fx < canvas.width-100){
            fx-=10;
        }
    }
}

//key-event
window.addEventListener("keydown", moveSomething, false);
function moveSomething(e) {
    switch(e.keyCode) {
    case 32:
        // space bar
        if(fx >= -10 && fx <canvas.width-100){
        if(space==0){
        document.getElementById("frogjump").play(); 
        auto = 1;
        space=1;
        }
    }
        break;
    case 65: //A
    if( fx > -1 && fx < canvas.width-100){
        fx-=10;
    }
        break;      
    case 13:   //enter
        document.getElementById("river").play();
        page=2;  
        break;
    case 16:   //shift
        page=4;
        break;
    case 27: //Esc (for cheat code)
        score +=50;
        break;
    case 20:
        page =5;
    }
}

// global variables
var auto=0,space=0;
var auto=0,xbg=0;   //background
var xwater=0;  vel_water=5; //water
var fx=0,fy=canvas.height-100, xjump=8;  //frog
var ins_x=canvas.width, ins_y=450, Bool=false;  //insect 
var xbg=0;   //background
var xowl=0,yowl=50, boolowl=false;       //owl
var px=canvas.width,px2=canvas.width+canvas.width/1.35;      // plant
var px3 = canvas.width+canvas.width/2.2, px4 = canvas.width+canvas.width/4; //plant
var life = 100; //Health
var score = 0; // Score
var page = 1; //page
var stx=Math.floor(Math.random()*(canvas.width-50)), sty=-150; //stone
var level =1;
var ydro =50, Booldrone=false; //drone
var x=1,y=1, rn = Math.floor(Math.random() * 120) + canvas.width; //bomb
var tou = 0;

// Menu
function menu1(){
    ctx.drawImage(menu,0,0,canvas.width,canvas.height);
}

//Instruction
function Inst(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width,canvas.height);
    ctx.font="40px Gill Sans";
    ctx.fillStyle = "black";
    ctx.fillText("   -:Frog Jump:-",50,100);
    ctx.fillText("Jump - Spacebar", 50, 150);
    ctx.fillText("Move Backward - A",50,200);
    ctx.fillText("Pause - Capslock",50,250);
    ctx.fillText("Continue - Enter",50,300);
    ctx.fillText("Press Enter to New Game",50,350);

}

//Pause
function pause1(){
    document.getElementById("river").pause();
    ctx.font="40px Gill Sans";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Pause", canvas.width/2, canvas.height/2);
}
function gameloop(){
    //background
    ctx.drawImage(background, xbg ,0, canvas.width, canvas.height);
    xbg -= 1.5;
    ctx.drawImage(background, xbg+canvas.width ,0, canvas.width, canvas.height);
    if( xbg < (-1*canvas.width) ){
        xbg = 0;
    }
    
    // river flow
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
    if(fy>=557){
        space=0;
    }
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

    // drone
    if(score>200){ 
        if( ydro>49 && Booldrone == false )
        {
            ydro += 0.5;
            if( ydro>=100 )
            {
                Booldrone = true;
            }
        }
        if(Booldrone == true)
            {
                ydro -= 0.5;
                if( ydro<51 )
                {
                    Booldrone = false;
                    ydro = 50;
                }
            }
        ctx.drawImage(drone,20,ydro, 150 ,80);
    
        // bomb
        var eA;
        eA = Math.PI*2;
        if(y<canvas.height)
        {
            x = rn*Math.log(y);
        } 
        if(y>canvas.height)
        {
            x = 1;
            y = 1;
            rn = Math.floor(Math.random() * 120) + 80;
            document.getElementById("gun").play();
        }
        ctx.beginPath(); 
        ctx.fillStyle = 'black';
        x_bomb_pos =x+130;
        y_bomb_pos = y+60+ydro;
        ctx.arc( x_bomb_pos, y_bomb_pos, 10, 0, eA );   
        ctx.fill(); 
        y += 5; 
            
        // drone and frog collision 
        if((y_bomb_pos>=canvas.height-100 && y_bomb_pos<=canvas.height) &&
             (   (fx+20 <= x_bomb_pos) && (x_bomb_pos<=fx+120)   ) )
            {
                life -= 50;
                document.getElementById("beep").play();
                y +=500;    //  when bomb and frog both values are same.
            }
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
    if(fy>=557){
        space=0;
    }
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
    px -=vel_water;
    px2 -=vel_water;
    px3 -=vel_water;

    ctx.drawImage(plant, px, 520, 80, 100);
    ctx.drawImage(plant,px2,520,80,100);
    ctx.drawImage(plant,px3,520,80,100);

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
    ins_x -= 4;

    //stone
    if(score >300){
    ctx.drawImage(stone,stx,sty,70,150);
    sty += 8;
    if(sty>canvas.height+150){
        stx = Math.floor(Math.random()*(canvas.width-50));
        sty = -150;
    }

    //stone collision
    if(  (stx + 50)>=fx && (stx <= fx+100) && (sty+150>=fy) && (sty <= fy+50)    ){
        life -= 50;
    }
}

    //life text
    ctx.font="30px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Health : " + life + "%", 100, 50);    

    //perfect collsion
    if ( ((fx+100-30) >= (px)) && ((fx)<=(px+80-30)) && ((fy+50-30)>=(520)) && ((fy)<= (520 +100-30)) 
    ||    ((fx+100-30) >= (px2)) && ((fx)<=(px2+80-30)) && ((fy+50-30)>=(520)) && ((fy)<= (520 +100-30)) 
    ||    ((fx+100-30) >= (px3)) && ((fx)<=(px3+80-30)) && ((fy+50-30)>=(520)) && ((fy)<= (520 +100-30)) ){
        document.getElementById("beep").play();
        life -=1;
        if(life<0){
            page=3;
        }
    }

    //score
    ctx.font="30px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText("score : " + score, canvas.width-100, 50);

    // Level 2 
    if(score>100){
        vel_water=8;
        xjump=6;
    }

    // socre increment
    if(   ((fx+100-5 >= px) && (px <= fx+100+5) && (fy<(canvas.height-100))) 
    || ((fx+100-5 >= px2) && (px2 <= fx+100+5) && (fy<(canvas.height-100)))
    || ((fx+100-5 >= px3) && (px3 <= fx+100+5) && (fy<(canvas.height-100)))   )
    {
        score +=1;
    }

    //Level 
    if(score>100 && score <200){
        level =2;
    }
    else if(score>200 && score <300){
        level=3;
    }
    else if(score>300){
        level = 4;
    }

    // gameover condition
    if(life<0){
            page=3;
        }
    ctx.font="30px Comic Sans MS";
    ctx.fillStyle = "black";
    // ctx.textAlign = "center";
    ctx.fillText("Level " + level, canvas.width/2, 50);

}
//gameover
function gameover(){
    ctx.drawImage(gameover1, 0,0,canvas.width,canvas.height);
    document.getElementById("river").pause();
    document.getElementById("gameover_music").play();
    ctx.font="40px Gill Sans";
    ctx.fillStyle = "black";
    ctx.fillText(score, 900, 450);
}
// fps
function start() {
    window.requestAnimationFrame(start);  // refresh rate of screen 
    if(page==1){
        menu1();
    }
    else if(page==2){
        gameloop();
    }         
    else if(page==3){
        gameover();
    }
    else if(page==4){
        Inst();
    }
    else if(page==5){
        pause1();
    }
}
start();