const fs = require("fs");
const readline = require("readline");

async function findTrees() {
  const fileStream = fs.createReadStream("./day8/day8.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let data = [];
  for await (const line of rl) {
    data.push(line.split(""));
  }

  let answerPartOne = countTrees(data);
  let answerPartTwo = findHighestScore(data);
  console.log({ answerPartOne, answerPartTwo });
}

findTrees();

// ----------------------------------- PART 1 -----------------------------------
// count trees that are visible
function countTrees(data) {
  let counter = 0;
  for (let row = 0; row < data[0].length; row++) {
    for (let col = 0; col < data.length; col++) {
      // if tree at edges, they are forever visible
      let current = data[row][col];
      if (
        row === 0 ||
        col === 0 ||
        row === data.length - 1 ||
        col === data[0].length - 1
      ) {
        counter++;
      }

      // for non edge case
      else {
        let visibilityLeft = 0;
        let visibilityRight = 0;
        let visibilityDown = 0;
        let visibilityUp = 0;
        for (let k = 1; k < data.length; k++) {
          // travel left
          if (col - k >= 0 && visibilityLeft === 0) {
            data[row][col - k] >= current ? visibilityLeft++ : visibilityLeft;
          }
          // travel Right
          if (col + k < data.length && visibilityRight === 0) {
            data[row][col + k] >= current ? visibilityRight++ : visibilityRight;
          }
          // travel Down
          if (row + k < data[0].length && visibilityDown === 0) {
            data[row + k][col] >= current ? visibilityDown++ : visibilityDown;
          }

          // travel Up
          if (row - k >= 0 && visibilityUp === 0) {
            data[row - k][col] >= current ? visibilityUp++ : visibilityUp;
          }
        }

        if (
          visibilityLeft === 0 ||
          visibilityRight === 0 ||
          visibilityDown === 0 ||
          visibilityUp === 0
        ) {
          counter++;
        }
      }
    }
  }
  return counter;
}

// ----------------------------------- PART 1 -----------------------------------

// ----------------------------------- PART 2 -----------------------------------

function findHighestScore(data) {
  let highestSceneScore = 0;
  for (let row = 0; row < data[0].length; row++) {
    for (let col = 0; col < data.length; col++) {
      // if tree at edges, ignore
      let current = data[row][col];
      if (
        row === 0 ||
        col === 0 ||
        row === data.length - 1 ||
        col === data[0].length - 1
      ) {
        continue;
      }

      // for non edge case
      else {
        // initialization
        let current = data[row][col];

        let countLeft = 0,
          leftStopper = false;
        let countRight = 0,
          rightStopper = false;
        let countDown = 0,
          downStopper = false;
        let countUp = 0,
          upStopper = false;

        // setup k to travel all direction per node
        for (let k = 1; k < data.length; k++) {
          // travel left
          if (col - k >= 0 && !leftStopper) {
            if (data[row][col - k] < current) {
              countLeft++;
            } else {
              countLeft++;
              leftStopper = true;
            }
          }
          // travel Right
          if (col + k < data[0].length && !rightStopper) {
            if (data[row][col + k] < current) {
              countRight++;
            } else {
              countRight++;
              rightStopper = true;
            }
          }
          // travel Down
          if (row + k < data.length && !downStopper) {
            if (data[row + k][col] < current) {
              countDown++;
            } else {
              countDown++;
              downStopper = true;
            }
          }

          // travel Up
          if (row - k >= 0 && !upStopper) {
            if (data[row - k][col] < current) {
              countUp++;
            } else {
              countUp++;
              upStopper = true;
            }
          }
        }
        // end of  k loop
        let currentScenicScore = countLeft * countDown * countRight * countUp;
        highestSceneScore =
          currentScenicScore > highestSceneScore
            ? currentScenicScore
            : highestSceneScore;
      }
    }
  }
  return highestSceneScore;
}
