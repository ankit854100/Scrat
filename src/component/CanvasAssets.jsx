import level1, { level5, level9 } from "../Levels";

const dimension = { w: 280, h: 280 };

let level = JSON.parse(JSON.stringify(level5));

let coordinates = level.coordinates;

const path = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

let rows = 7;
let col = 7;
let factor = 40;
let status = 0;

let x = 0;
let y = 0;

let dx = 0;
let dy = 0;
let carrots = 0;
let direction = "left";
let isCollect = false;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < col; j++) {
    if (coordinates[i][j] === 4) {
      x = j * factor;
      y = i * factor;
    }
  }
}

function drawGrid(ctx, color) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = color;
      ctx.fillRect(j * factor, i * factor, factor, factor);
      ctx.strokeRect(j * factor, i * factor, factor, factor);

      ctx.closePath();
    }
  }
}

function drawBlock(ctx, color, coordinates, src, value) {
  let image = new Image();
  image.src = src;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      if (coordinates[i][j] === value) {
        ctx.beginPath();
        // ctx.strokeStyle = color;
        ctx.drawImage(
          image,
          j * factor + 4,
          i * factor + 4,
          factor - 8,
          factor - 10
        );
        // ctx.strokeRect(j * factor, i * factor, factor, factor);
        ctx.closePath();
      }
    }
  }
}

function drawCharacter(ctx, color, src) {
  let image = new Image();
  image.src = src;
  ctx.beginPath();
  // ctx.strokeStyle = color;
  ctx.drawImage(image, x, y, factor, factor);
  // ctx.strokeRect(x, y, factor, factor);
  ctx.closePath();
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function west() {
  await sleep(1000);

  if (status === 0) {
    dx = -factor;
    dy = 0;

    if (x + dx >= 0) {
      if (collisionDetection(dx, dy)) {
        x += dx;
        y += dy;
        await sleep(1000);
        status = 2;
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      direction = "left";
      if (!checkTrees(dx, dy)) x += dx;
    } else {
      status = 2;
    }
  }

  // await sleep(1000);
}

async function east() {
  await sleep(1000);
  if (status === 0) {
    dx = factor;
    dy = 0;
    if (x + dx < dimension.w) {
      if (collisionDetection(dx, dy)) {
        x += dx;
        y += dy;
        await sleep(1000);
        status = 2;
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      direction = "right";
      x += dx;
    } else {
      status = 2;
    }
  }
}

async function north() {
  await sleep(1000);
  if (status === 0) {
    dy = -factor;
    dx = 0;
    if (y + dy >= 0) {
      if (collisionDetection(dx, dy)) {
        x += dx;
        y += dy;
        await sleep(1000);
        status = 2;
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      if (!checkTrees(dx, dy)) y += dy;
    } else {
      status = 2;
    }
  }
}

async function south() {
  await sleep(1000);
  if (status === 0) {
    dy = factor;
    dx = 0;
    if (y + dy < dimension.h) {
      if (collisionDetection(dx, dy)) {
        x += dx;
        y += dy;
        await sleep(1000);
        status = 2;
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      if (!checkTrees(dx, dy)) y += dy;
    } else {
      status = 2;
    }
  }
}

function collisionDetection(dx, dy) {
  let tempX = x + dx;
  let tempY = y + dy;

  if (coordinates[tempY / factor][tempX / factor] === 1) {
    // x += dx;
    // y += dy;
    // status = 2;
    return true;
  }
  return false;
}

function checkTrees(dx, dy) {
  let tempX = x + dx;
  let tempY = y + dy;
  if (coordinates[tempY / factor][tempX / factor] === 2) {
    // alert("you win!");
    return true;
  }
  return false;
}

function checkDestination(dx, dy) {
  let tempX = x + dx;
  let tempY = y + dy;
  if (coordinates[tempY / factor][tempX / factor] === 5) {
    // alert("you win!");
    status = 1;
  }
}

function checkCarrots() {
  if (coordinates[y / factor][x / factor] === 3) {
    carrots++;
    coordinates[y / factor][x / factor] = 0;
    console.log(carrots);
  }
}

function setIsCollect(value) {
  isCollect = value;
}

function restoreGame(value) {
  level = JSON.parse(JSON.stringify(level5));
  coordinates = level.coordinates;
  status = value;
  direction = "left";
  carrots = 0;
  dx = 0;
  dy = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < col; j++) {
      if (coordinates[i][j] === 4) {
        x = j * factor;
        y = i * factor;
      }
    }
  }
  // console.log(coordinates);
}

export default dimension;
export {
  path,
  drawGrid,
  drawBlock,
  east,
  west,
  north,
  south,
  drawCharacter,
  status,
  restoreGame,
  direction,
  coordinates,
  setIsCollect,
  checkCarrots,
  carrots
};
