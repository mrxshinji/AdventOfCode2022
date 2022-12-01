const fs = require("fs");
const readline = require("readline");

async function getHighest() {
  const fileStream = fs.createReadStream("./day1/day1.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let eachSum = 0;
  let topThree = [0, 0, 0];
  for await (const line of rl) {
    if (parseInt(line) > 0) {
      eachSum = eachSum + parseInt(line);
    } else {
      if (topThree[0] < eachSum) {
        topThree[2] = topThree[1];
        topThree[1] = topThree[0];
        topThree[0] = eachSum;
      } else if (topThree[1] < eachSum) {
        topThree[2] = topThree[1];
        topThree[1] = eachSum;
      } else if (topThree[2] < eachSum) {
        topThree[2] = eachSum;
      }
      eachSum = 0;
    }
  }
  return topThree;
}

let topThreeTotal;
let highest;
getHighest().then((res) => {
    topThreeTotal = res.reduce((initial, value) => initial + value, 0)
    highest = res[0]
    console.log({topThreeTotal, highest})
});

