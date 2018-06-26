let canvasElem = document.getElementById('playerScreen');
let ctx = canvasElem.getContext('2d');

let env = [];
let bckgrd = new Image();

createEnv(randomFD(), createFirstArray(), Math.floor(Math.random()*3 + 2));

function createFirstArray(){
  let firstArray = [];
  let rndmNmbr = Math.floor(Math.random() * (19-5) + 5);
  for (let i=-1; i<2; i++){
  firstArray[rndmNmbr+i] = 3;}
  return firstArray;
}

function randomFD(){
  let random = ["U","D"];
  return random[Math.floor(Math.random() * 2)];
}

function drawFrame(){
  ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);
  drawEnv(env);
}

function createEnv(direction, firstRow, paths){
  if (direction === "U"){
    for (let i=0; i<24; i++){env[i] = firstRow[i];}}
  else if (direction === "D"){
    for (let i=0; i<24; i++){env[i+312] = firstRow[i];}}
  else if (direction === "L"){
    for (let i=0; i<14; i++){env[i*24] = firstRow[i];}}
  else if (direction === "R"){
    for (let i=0; i<14; i++){env[i*24 + 23] = firstRow[i];}}

  let pathDir = [0,0,0,0];
  for (let i=0; i<24; i++){
    if (env[i] === 3){pathDir[0]=1;}
    if (env[i+312] === 3){pathDir[3]=1;}
  }
  for (let i=0; i<14; i++){
    if (env[i*24] === 3){pathDir[1]=1;}
    if (env[i*24+23] === 3){pathDir[2]=1;}
  }
  let pathDirSum = 0;
  countPDS();
  function countPDS(){
  pathDirSum = 0;
  for (let i=0; i<pathDir.length; i++){pathDirSum += pathDir[i]}
  if (pathDirSum < paths){
    let rndPathDir = Math.floor(Math.random() * pathDir.length);
    if (pathDir[rndPathDir] === 0){pathDir[rndPathDir] = 1;}
    countPDS();
    }
  }

  if (pathDir[0] === 1 && direction != "U"){let boundArray = createBoundArray(0); for (let i=0; i<24; i++){env[i] = boundArray[i];}}
  if (pathDir[1] === 1 && direction != "L"){let boundArray = createBoundArray(1); for (let i=0; i<14; i++){env[i*24] = boundArray[i];}}
  if (pathDir[2] === 1 && direction != "R"){let boundArray = createBoundArray(2); for (let i=0; i<14; i++){env[i*24 + 23] = boundArray[i];}}
  if (pathDir[3] === 1 && direction != "D"){let boundArray = createBoundArray(3); for (let i=0; i<24; i++){env[i+312] = boundArray[i];}}

  console.log("build roads: " + buildRoads(pathDir));

//  for (let i=0; i<336; i++){
//    if (env[i] == null){env[i] = Math.floor(Math.random() * 3);}
//  }

  console.log(env);
  console.log(direction, paths, pathDir, pathDirSum);
  drawFrame();
}

function environment(number, posX, posY){
  bckgrd.src = "gfx/1.png";
  bckgrd.addEventListener("load", function(){
    if (number === 0){ctx.drawImage(bckgrd, 32, 32, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 1){ctx.drawImage(bckgrd, 32, 320, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 2){
      //ctx.fillStyle = "#a3d444";
      //ctx.fillRect((j*32),(i*32),32,32);
      ctx.drawImage(bckgrd, 192, 416, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 3){ctx.drawImage(bckgrd, 192, 608, 32, 32, posX * 32, posY * 32,32,32);}
  });
}

function drawEnv(world){
  for (let i=0; i<world.length; i++){
    let posX = i-(24*Math.floor(i/24));
    let posY = Math.floor(i/24);
    environment(world[i], posX, posY);

  }
}

function createBoundArray(bounds){
  let rndmNmbr = 0;
  let boundArray = [];
  if (bounds === 0 || bounds === 3){rndmNmbr = Math.floor(Math.random() * (19-5) + 5);}
  else if (bounds === 1 || bounds === 2){rndmNmbr = Math.floor(Math.random() * (9-5) + 5);}
  for (let i=-1; i<2; i++){
  boundArray[rndmNmbr+i] = 3;}
  return boundArray;
}

function buildRoads(pathDir){
  let pathDirSum = 0;
  let pos = [];
    for (let i=0; i<pathDir.length; i++){
      pathDirSum += pathDir[i];
      if (pathDir[i] === 1){
      pos[2*i] = 0;
      pos[2*i+1] = 0;}
    }
  if (pathDir[0] === 1){for (let i=0; i<24; i++)
    {if (env[i] === 3 && env[i-1] === 3 && env[i+1] === 3){pos[0]=i; pos[1]=0;}}
  }
  if (pathDir[1] === 1){for (let i=0; i<14; i++)
    {if (env[24*i] === 3 && env[24*(i-1)] === 3 && env[24*(i+1)] === 3){pos[2]=0; pos[3]=i;}}
  }
  if (pathDir[2] === 1){for (let i=0; i<14; i++)
    {if (env[24*i+23] === 3 && env[24*(i-1)+23] === 3 && env[24*(i+1)+23] === 3){pos[4]=23; pos[5]=i;}}
  }
  if (pathDir[3] === 1){for (let i=0; i<24; i++)
    {if (env[i+312] === 3 && env[i+311] === 3 && env[i+313] === 3){pos[6]=i; pos[7]=13;}}
  }

  let sizeX = [];
  let sizeY = [];

  if (pathDirSum === 2){
    for (let i=0; i<=pos.length; i+=2){
      if (pos[i] != null){
      sizeX.push(pos[i]);}
    }
    for (let i=1; i<=pos.length; i+=2){
      if (pos[i] != null){
      sizeY.push(pos[i]);}
    }
    sizeX = sizeX[1]-sizeX[0];
    sizeY = sizeY[1]-sizeY[0];
  }

  return sizeX;
}
