let canvasElem = document.getElementById('playerScreen');
let ctx = canvasElem.getContext('2d');

let env = [];

createEnv();

function drawFrame(){
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
  drawEnv(env);
}

function createEnv(){
  for (let i=0; i<336; i++){
    env[i] = Math.floor(Math.random() * 4);
  }
  console.log(env);
  drawFrame();
}

function environment(number){
  if (number === 0){ctx.fillStyle = "#ceeb81";}
  if (number === 1){ctx.fillStyle = "#a3d444";}
  if (number === 2){ctx.fillStyle = "#679e02";}
  if (number === 3){ctx.fillStyle = "#36691d";}
  //else {alert('error :(')}
}

function drawEnv(world){
  for (let i=0; i<world.length; i++){
    let posX = i-(24*Math.floor(i/24));
    let posY = Math.floor(i/24);
    environment(world[i]);
    ctx.fillRect(posX,posY,32,32);
  }
}
