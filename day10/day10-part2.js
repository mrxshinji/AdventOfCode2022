const fs = require("fs");
const readline = require("readline");

async function findFirstMarkerLength() {
  const fileStream = fs.createReadStream("./day10/day10.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let currentX = 1;
  let storeArr = [];
  for await (const line of rl) {
    let split = line.split(" ");
    let command = split[0];
    let value = split[1];

    if (command === "addx") {
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          storeArr.push(currentX);
        } else if (i === 1) {
          storeArr.push(currentX);
          currentX += parseInt(value);
        }
      }
    } else if (command === "noop") {
      storeArr.push(currentX);
    }
  }

  let grid = [[], [], [], [], [], []];

  let currentPos = resetPos();
  currentPos[0] = "#";
  currentPos[1] = "#";
  currentPos[2] = "#";
  for (let i = 0; i < storeArr.length; i++) {
    // first row cycle 1 - 40
    // check currentPost first before execute addX
    if (i < 40) {
      let current = i;
      currentPos = drawGrid(current, i, currentPos, grid[0], storeArr);
    } else if (i < 80) {
      let current = i - 40;
      currentPos = drawGrid(current, i, currentPos, grid[1], storeArr);
    } else if (i < 120) {
      let current = i - 80;
      currentPos = drawGrid(current, i, currentPos, grid[2], storeArr);
    } else if (i < 160) {
      let current = i - 120;
      ccurrentPos = drawGrid(current, i, currentPos, grid[3], storeArr);
    } else if (i < 200) {
      let current = i - 160;
      currentPos = drawGrid(current, i, currentPos, grid[4], storeArr);
    } else if (i < 240) {
      let current = i - 200;
      currentPos = drawGrid(current, i, currentPos, grid[5], storeArr);
    }
  }

  // ans
  console.log(grid);
}

findFirstMarkerLength();

// reset arr
const resetPos = () => {
  let arr = [];
  for (let i = 0; i < 40; i++) {
    arr.push(".");
  }
  return arr;
};

// 1. push answer to row
// 2. reset pos
// 3. set pos based on cycle
const drawGrid = (current, cycle, currentPos, row, storeArr) => {
  row.push(currentPos[current]);
  currentPos = resetPos();
  let startingPos = storeArr[cycle + 1] - 1;
  currentPos[startingPos] = "#";
  currentPos[startingPos + 1] = "#";
  currentPos[startingPos + 2] = "#";
  return currentPos;
};
