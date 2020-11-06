// import { alert } from "blockly";

const dimension = { w: 200, h: 200 };

const restrictedCoordinates = [
  [1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1],
  [1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0]
];

const path = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

const target = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

const start = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];

let rows = 5;
let col = 5;
let factor = 40;
let status = 0;

let x = 120;
let y = 80;
let dx = 0;
let dy = 0;

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

function drawBlock(ctx, color, coordinates, src) {
  let image = new Image();
  image.src = src;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < rows; j++) {
      if (coordinates[i][j] === 1) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.drawImage(image, j * factor, i * factor, factor, factor);
        ctx.strokeRect(j * factor, i * factor, factor, factor);
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
        // while (y < dimension.w + 2 * factor) {
        //   await sleep(500);
        //   y += factor;
        // }
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      x += dx;
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
        // while (y < dimension.w + 2 * factor) {
        //   await sleep(500);
        //   y += factor;
        // }
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
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
        // while (y < dimension.w + 2 * factor) {
        //   await sleep(500);
        //   y += factor;
        // }
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      y += dy;
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
        // while (y < dimension.w + 2 * factor) {
        //   await sleep(500);
        //   y += factor;
        // }
        // alert("game over");
        return;
      }
      if (status === 0) {
        checkDestination(dx, dy);
      }
      y += dy;
    } else {
      status = 2;
    }
  }
}

function collisionDetection(dx, dy) {
  let tempX = x + dx;
  let tempY = y + dy;

  if (restrictedCoordinates[tempY / factor][tempX / factor] === 1) {
    // x += dx;
    // y += dy;
    // status = 2;
    return true;
  }
  return false;
}

function checkDestination(dx, dy) {
  let tempX = x + dx;
  let tempY = y + dy;
  if (target[tempY / factor][tempX / factor] === 1) {
    // alert("you win!");
    status = 1;
  }
}

function restoreGame(value) {
  status = value;
  x = 120;
  y = 80;
  dx = 0;
  dy = 0;
}

export default dimension;
export {
  restrictedCoordinates,
  target,
  start,
  path,
  drawGrid,
  drawBlock,
  east,
  west,
  north,
  south,
  drawCharacter,
  status,
  restoreGame
};
