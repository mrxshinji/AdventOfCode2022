const fs = require("fs");
const readline = require("readline");

async function ropeBridge() {
  const fileStream = fs.createReadStream("./day9/day9.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let map = {
    "0-0": true,
  };
  // expected {`${x}-${y}` : (true/false) where it will turn true  when T passed by
  // x = row , y = column, negative number allowed
  let currentH = [0, 0];
  let currentT = [0, 0];
  for await (const line of rl) {
    let split = line.split(" ");
    let qty = parseInt(split[1]);
    for (let i = 0; i < qty; i++) {
      switch (split[0]) {
        case "U":
          currentH[0]++;
          currentT = routine(currentH, currentT, map);
          break;
        case "D":
          currentH[0]--;
          currentT = routine(currentH, currentT, map);
          break;
        case "L":
          currentH[1]--;
          currentT = routine(currentH, currentT, map);
          break;
        case "R":
          currentH[1]++;
          currentT = routine(currentH, currentT, map);
          break;
        default:
        // code block
      }
    }
  }
  console.log(map);
  const valuesMap = Object.values(map).filter((el) => el === true);
  console.log(valuesMap.length);
}

ropeBridge();

// -------------------- routine function shared across the cases  --------------------

const routine = (currentH, currentT, map) => {
  checkCurrentH(currentH, map);
  currentT = compareAndMove(currentT, currentH);
  setCurrentT(currentT, map);
  return currentT;
};

// --------------------------------- ADD NODES  ---------------------------------

// check is current exist in the map, if does not exsit ,create a key (acting as node)
const checkCurrentH = (arr, map) => {
  let key = `${arr[0]}-${arr[1]}`;
  if (!map[key]) {
    // will always check the value is false or undefined or true
    map[key] = false;
  }
};

const setCurrentT = (arr, map) => {
  let key = `${arr[0]}-${arr[1]}`;
  if (!map[key]) {
    // will always check the value is false or undefined or true
    map[key] = true;
  }
};

// --------------------------------- Compare Locatio and Move if needed  ---------------------------------

// compare location T:[] to H:[], and move accordingly // return location for T [row,col]
const compareAndMove = (T, H) => {
  //diff = distance between T and H
  let diffY = H[0] - T[0];
  let diffX = H[1] - T[1];
  if (Math.abs(diffY) < 2 && Math.abs(diffX) < 2) {
    return T;
  }

  // too far away at Y axis
  if (Math.abs(diffY) === 2 && Math.abs(diffX) === 0) {
    let newRowT = T[0] + diffY / 2;
    return [newRowT, T[1]];
  }
  if (Math.abs(diffY) === 2 && Math.abs(diffX) === 1) {
    let newRowT = T[0] + diffY / 2;
    let newColT = T[1] + diffX;
    return [newRowT, newColT];
  }

  // too far away at X axis
  if (Math.abs(diffY) === 0 && Math.abs(diffX) === 2) {
    let newColT = T[1] + diffX / 2;
    return [T[0], newColT];
  }
  if (Math.abs(diffY) === 1 && Math.abs(diffX) === 2) {
    let newRowT = T[0] + diffY;
    let newColT = T[1] + diffX / 2;
    return [newRowT, newColT];
  }
};
