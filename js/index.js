console.log('Hiiii');
console.log(1+Math.round(Math.random()*17))
//Variables
let inpDir = {x:0,y:0};
let foodSound = new Audio('D:/Projects/SnakesGame/music/food.mp3');
let gameOverSound = new Audio("D:/Projects/SnakesGame/music/gameover.mp3");
let moveSound = new Audio("D:/Projects/SnakesGame/music/move.mp3");
let musicSound = new Audio("D:/Projects/SnakesGame/music/music.mp3");
let speed = 4;
let lastPaintTime = 0.5;
let snakeArr = [{x : 13, y :15}]
let food ={ x:2,y:4};
let score=0;
let hscore=0;
let ite =0;


//Function
function main(ctime)
{
    window.requestAnimationFrame(main);
    
    if((ctime - lastPaintTime)/1000 < 1/speed)
       {
         return;
       }
    // console.log(ctime);
    lastPaintTime = ctime;
    gameEngine();
}
function collapse(sarr)
{
    for ( let i =1; i<sarr.length;i++)
    {
        if(sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y)
        {
            return true;
        }
    }
    return false;
}
function isCollide(sarr)
{
    if(sarr[0].x===19 || sarr[0].x===-1 || sarr[0].y===19 || sarr[0].y===-1)
    {return true;}
    else
    {return false;}
}
function gameEngine()
{
    //Array updation
    if(isCollide(snakeArr) || collapse(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inpDir = {x:0,y:0}
        if(ite===1)
        {
            hscore=score;
        }
        else
        {
            if(hscore<score)
            {
                hscore=score;
            }
        }
        
        snakeArr = [{x:12,y:17}];
        score=0;
        document.getElementById("score").innerHTML = "Score :" + score;
        document.getElementById("hscore").innerHTML = "High Score is :" + hscore;
        ite++;
        alert("Game Over. Press any key to play again!");
    }
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        console.log('at food');
        foodSound.play();
        score++;
        document.getElementById("score").innerHTML = "Score :" + score;
        console.log(`score is ${score}`);
        snakeArr.unshift({x: snakeArr[0].x +inpDir.x,y: snakeArr[0].y+inpDir.y});
        food ={x:1+Math.round(Math.random()*17),y:1+Math.round(Math.random()*17)};
    }
    //Movement
    console.log(inpDir);
    for (let i = snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    
    }
    snakeArr[0].x+=inpDir.x;
    snakeArr[0].y+=inpDir.y;

    //Render Snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    
    if(index===0)
    {
        snakeElement.classList.add('snakehead');
    }
    else
    {
        snakeElement.classList.add('snakebody');
    }
    board.appendChild(snakeElement);
});
    //Render food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




//Logic

window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    // inpDir = {x:0,y:0};
    musicSound.play();
    if(ite===0)
    ite++;
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            
            
            if((inpDir.x===0 && inpDir.y===1) && score>0)
            {
            console.log('Chacha ye galat ho raha hai');
            inpDir.x = 0; // No need to change
            inpDir.y =1;
            }
            else
            {
            inpDir.x =0; // Ok change it
            inpDir.y =-1;
            }
        break;
        case "ArrowDown":
            console.log("ArrowDown");
            if((inpDir.x===0 && inpDir.y===-1) && score>0)
            {
            console.log('Chacha ye galat ho raha hai');
            inpDir.x = 0; //No need to change
            inpDir.y =-1;
            }
            else
            {
            inpDir.x =0; // OK change it 
            inpDir.y =1;
            }
        break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            if((inpDir.x===1 && inpDir.y===0) && score>0)
            {
            console.log('Chacha ye galat ho raha hai');
            inpDir.x =1; //No need to change
            inpDir.y =0;
            }
            else
            {
            inpDir.x =-1; // OK change it 
            inpDir.y =0;
            }
        break;
        case "ArrowRight":
            console.log("ArrowRight");
            if((inpDir.x===-1 && inpDir.y===0) && score>0)
            {
            console.log('Chacha ye galat ho raha hai');
            inpDir.x =-1; //No need to change
            inpDir.y =0;
            }
            else
            {
            inpDir.x =1; // OK change it 
            inpDir.y =0;
            }
        break;


    }
});