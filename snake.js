const canvas = document.getElementById("canvas");
const ekran = document.getElementById("ekran");
const skor = document.getElementById("skor");
const btn = document.getElementById("btn");


const ctx = canvas.getContext("2d");



//* Değişkenler ve diziler
var snakes = [];
var dx = 0, dy = 0;
var apples = [];
var ax = 0, ay = 0;
var sayac = 0;



//*Yılanı ekleme
function ekle(){
    for(let i = 20; i>0; i--){
        snakes.push({"x":i*2, "y":15});
    }
}
ekle();
console.log(snakes.length);


//* Yön Bulma
document.addEventListener("keydown", (e)=>{
    if((e.keyCode==87 || e.keyCode==38) && dy != 2){
        dy = -2;
        dx = 0;
    }
    else if((e.keyCode==83 || e.keyCode==40) && dy != -2){
        dy = 2;
        dx = 0;
    }
    else if((e.keyCode==68 || e.keyCode==39) && dx != -2){
        dy = 0;
        dx = 2;
    }
    else if((e.keyCode==65 || e.keyCode==37) && dx != 2){
        dy = 0;
        dx = -2;
    }
});


//* Halkalar
function daire(color, a){
    ctx.beginPath();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = color;
    ctx.arc(snakes[a].x, snakes[a].y, 10, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
}

//* Yılanı çizdirme ve hareket ettirme
function yilaniCizdir(){
    if(dx==0 && dy==0){
        for(let i =0; i<snakes.length; i++){
            if(i<1){
                daire("#FF5959", i);
            }
            else{
                daire("#041C32",i);
            }
        }
    }
    else{
        snakes.pop();
        snakes.unshift({"x":snakes[0].x+dx, "y":snakes[0].y+dy});
        for(let i =0; i<snakes.length; i++){
            if(i<1){
                daire("#FF5959", i);
            }
            else{
                daire("#041C32",i);
            }
            if(snakes[i].x>=canvas.width || snakes[i].x<=0 || snakes[i].y>=canvas.height || snakes[i].y<=0){
                canvas.style.visibility = "hidden";
                ekran.style.display = "flex";
                snakes = [];
                apples = [];
                skor.innerText = sayac*20;
            }
        }
    }
}

//* elmayı çizdirme
ax = Math.random()*canvas.width-5;
ay = Math.random()*canvas.height-5;
apples.push({"x":ax, "y":ay});

function apple(){
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(apples[0].x, apples[0].y, 10, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();

    for(let i=0; i<snakes.length; i++){
        if(temas(snakes[i].x, snakes[i].y, 10, apples[0].x, apples[0].y, 10)){
            sayac++;
            skor.innerText = sayac*20;
            apples[0].x = Math.random()*canvas.width-5;
            apples[0].y = Math.random()*canvas.height-5;
        }
    }
}


function temas(x1, y1, r1, x2, y2, r2){
    var xfark = x1 - x2;
    var yfark = y1 - y2;
    var hipo = Math.sqrt((xfark*xfark)+(yfark*yfark));
    if(hipo<r1+r2){
        return true;
    }
    return false;
}

btn.onclick=()=>{
    canvas.style.visibility = "initial";
    ekran.style.display = "none";
    ekle();
    ax = Math.random()*canvas.width-5;
    ay = Math.random()*canvas.height-5;
    apples.push({"x":ax, "y":ay});
    dx = 0;
    dy = 0;
    sayac = 0;
    skor.innerText = sayac*20;
}



//! Ana fonksiyon
function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    yilaniCizdir();
    apple();
}
setInterval(loop, 1000/100);

// ! İzlediğiniz için teşekür ederim