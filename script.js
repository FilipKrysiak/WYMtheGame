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
  for (let i=0; i<14; i++){
    for (let j=0; j<24; j++){
  environment(world[((i+1)*(j+1)-1)]);
  ctx.fillRect((j*32),(i*32),32,32);
    }
  }
}
