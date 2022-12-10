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
    "0,0": true,
  };
  // expected {`${x}-${y}` : (true/false) where it will turn true  when T passed by
  // x = row , y = column, negative number allowed
  // 0 is Head, 9 is tail
  let locationSet = {
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
    3: [0, 0],
    4: [0, 0],
    5: [0, 0],
    6: [0, 0],
    7: [0, 0],
    8: [0, 0],
    9: [0, 0],
  };
  let currentKeys = Object.keys(locationSet);
  for await (const line of rl) {
    let split = line.split(" ");
    let qty = parseInt(split[1]);
    for (let i = 0; i < qty; i++) {
      switch (split[0]) {
        case "U":
          locationSet["0"][0]++;
          locationSet = routine(locationSet, currentKeys, map);
          break;
        case "D":
          locationSet["0"][0]--;
          locationSet = routine(locationSet, currentKeys, map);
          break;
        case "L":
          locationSet["0"][1]--;
          locationSet = routine(locationSet, currentKeys, map);
          break;
        case "R":
          locationSet["0"][1]++;
          locationSet = routine(locationSet, currentKeys, map);
          break;
        default:
        // code block
      }
    }
  }
  console.log({ map });
  const valuesMap = Object.values(map).filter((el) => el === true);
  const ans = valuesMap.length;
  console.log(ans);
  return ans;
}

ropeBridge();


// -------------------- routine function shared across the cases  --------------------

const routine = (locationSet, currentKeys, map) => {
  for (let y = 1; y < currentKeys.length; y++) {
    let follower = currentKeys[y];
    let leader = currentKeys[y - 1];
    locationSet[follower] = compareAndMove(
      locationSet[follower],
      locationSet[leader]
    );
    if (currentKeys[y] === "9") {
      setCurrentT(locationSet[follower], map);
    } else {
      setCurrent(locationSet[follower], map);
    }
  }
  return locationSet;
};

// --------------------------------- ADD NODES  ---------------------------------
// check is current exist in the map, if does not exsit ,create a key (acting as node)
const setCurrent = (arr, map) => {
  let key = `${arr[0]},${arr[1]}`;
  if (!map[key]) {
    map[key] = false;
  }
};

const setCurrentT = (arr, map) => {
  let key = `${arr[0]},${arr[1]}`;
  if (!map[key]) {
    map[key] = true;
  }
};

// --------------------------------- Compare Locatio and Move if needed  ---------------------------------

// compare location F:[] to L:[], and move accordingly // return location for T [row,col]
// follower = F , Leader = L
const compareAndMove = (F, L) => {
  //diff = distance between T and H
  let diffY = L[0] - F[0];
  let diffX = L[1] - F[1];
  if (Math.abs(diffY) < 2 && Math.abs(diffX) < 2) {
    return F;
  }

  // too far away at Y axis
  // X axis diff = 0, move up or down
  if (Math.abs(diffY) === 2) {
    if (Math.abs(diffX) === 0) {
      let newRowF = F[0] + diffY / 2;
      return [newRowF, F[1]];
    }
    // X axis diff = 1 n move diagonally
    else if (Math.abs(diffX) === 1) {
      let newRowF = F[0] + diffY / 2;
      let newColF = F[1] + diffX;
      return [newRowF, newColF];
    }
    // X axis diff = 2 n move diagonally
    else if (Math.abs(diffX) === 2) {
      let newRowF = F[0] + diffY / 2;
      let newColF = F[1] + diffX / 2;
      return [newRowF, newColF];
    }
  }

  // too far away at X axis
  // Y axis diff = 0 , move lefr or right
  if (Math.abs(diffX) === 2) {
    if (Math.abs(diffY) === 0) {
      let newColF = F[1] + diffX / 2;
      return [F[0], newColF];
    }
    // Y axis diff = 1 , move diagonally
    else if (Math.abs(diffY) === 1) {
      let newRowF = F[0] + diffY;
      let newColF = F[1] + diffX / 2;
      return [newRowF, newColF];
    }
    // Y axis diff = 2 , move diagonally
    else if (Math.abs(diffY === 2)) {
      let newRowF = F[0] + diffY / 2;
      let newColF = F[1] + diffX / 2;
      return [newRowF, newColF];
    }
  }
};
