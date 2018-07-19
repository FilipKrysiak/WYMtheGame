let canvasElem = document.getElementById('playerScreen');
let ctx = canvasElem.getContext('2d');
let paths = [];
let env = [];
let bckgrd = new Image();

pathGenerator();

function environment(number, posX, posY){
  bckgrd.src = "gfx/1.png";
  bckgrd.addEventListener("load", function(){
    if (number === 0){ctx.drawImage(bckgrd, 32, 32, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 1){ctx.drawImage(bckgrd, 32, 320, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 2){
      //ctx.fillStyle = "#a3d444";
      //ctx.fillRect((j*32),(i*32),32,32);
      ctx.drawImage(bckgrd, 32, 32, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 3){ctx.drawImage(bckgrd, 32, 608, 32, 32, posX * 32, posY * 32,32,32);}
    if (number === 13){
      ctx.drawImage(bckgrd, 32, 32, 32, 32, posX * 32, posY * 32,32,32);
      ctx.drawImage(bckgrd, 0, 608, 32, 32, posX * 32, posY * 32,32,32);
    }
  });
}

function drawEnv(world){
  for (let i=0; i<world.length; i++){
    let posX = i-(24*Math.floor(i/24));
    let posY = Math.floor(i/24);
    environment(world[i], posX, posY);
  }
}

function switchMap(){
  //funkcja generująca entryDirection "ULRD" i zmieniająca pathsy miejscami L-P, G-D, lub sprawdzająca powrót do bazy
}

function pathGenerator(entryDirection){
  let pathSum = 0;
  while (true){
    pathSum = 0;
    if (entryDirection != "U"){
      paths[0] = Math.round(Math.random()) * (Math.floor((Math.random()* 16)) + 4);
    }
    if (paths[0] != 0){pathSum++;}
    if (entryDirection != "L"){
      paths[1] = Math.round(Math.random()) * ((Math.floor((Math.random() * 6)) * 24) + 96);
    }
    if (paths[1] != 0){pathSum++;}
    if (entryDirection != "R"){
      paths[2] = Math.round(Math.random()) * ((Math.floor((Math.random() * 6)) * 24) + 119);
    }
    if (paths[2] != 0){pathSum++;}
    if (entryDirection != "D"){
      paths[3] = Math.round(Math.random()) * (Math.floor((Math.random() * 16)) + 316);
    }
    if (paths[3] != 0){pathSum++;}
    if (pathSum ==2){break;}
  }
  for (let i=0; i<paths.length; i++){
    if (paths[i] < 2  ){paths[i] = null;}
  }
  console.log(paths);
  pathJoiner(paths, pathSum);
}

function pathJoiner(paths, pathSum){
  console.log(pathSum)
  let pathsLngth = [];
  let startY = 0;
  for (let i=0; i<paths.length; i++){
    if (paths[i] != null){pathsLngth.push(paths[i]);}
  }
  pathsLngth.sort(compareNo);
  let pathsX = pathsLngth[1]%24 - pathsLngth[0]%24;
  //if (pathsX > 0){pathsX +=1;}
  //else {pathsX -= 1;}
  let pathsY = Math.floor(pathsLngth[1]/24) - Math.floor(pathsLngth[0]/24) + 1;
  if (pathSum == 2){
    console.log("Case 1 ");
    console.log(pathsX, pathsY);
    for (let i=0; i<pathsY; i++){
      startX = (pathsX / pathsY) * (i + 1);
      for (let j=0; j<Math.floor(Math.abs(pathsX/pathsY)) + 1; j++){
        console.log(i, (Math.floor(startX) + j));
        env[pathsLngth[0] + Math.floor(startX) + j + i * 24] = 3;
      //if (Math.floor(startX) + j == pathsX){break;}
      }
    }

  }
  else if (pathSum == 3){
    console.log("Case 2");
  }
  else if (pathSum == 4){
    console.log("Case 3");
  }
  else {
    console.log("No road");
  }
  for (let i=0; i<336; i++){
    if (env[i] !=3){
      env[i] = Math.floor(Math.random()*3);
    }
  }
  for (let i=0; i<pathsLngth.length; i++){
    env[pathsLngth[i]] = 3;
  }
  drawEnv(env);
}

function compareNo(a, b) {
    return a - b;
}
