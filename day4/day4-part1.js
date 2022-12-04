const fs = require("fs");
const readline = require("readline");

async function getTotalPair() {
  const fileStream = fs.createReadStream("./day4/day4.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let totalContainPair = 0;
  for await (const line of rl) {
    const mappedLine = mapLine(line);
    totalContainPair += compare(mappedLine);
  }
  console.log(totalContainPair);
  return totalContainPair;
}

function compare(obj) {
  let one;
  let two;
  // if any part of the range of the 2 pair is same, definitely there will be containPair
  if (obj.first[0] === obj.second[0] || obj.first[1] === obj.second[1]) {
    return 1;
  }

  // always set the smaller number of the range to One
  if (obj.first[0] < obj.second[0]) {
    one = obj.first;
    two = obj.second;
  } else if (obj.first[0] > obj.second[0]) {
    two = obj.first;
    one = obj.second;
  }
  if (one[1] > two[1]) {
    return 1;
  } else {
    return 0;
  }
}

function mapLine(line) {
  const pairs = line.split(",");
  const pairObj = {
    first: pairs[0].split("-").map((el) => parseInt(el)),
    second: pairs[1].split("-").map((el) => parseInt(el)),
  };
  return pairObj;
}

getTotalPair();
