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
  let totalOverlap = 0;
  for await (const line of rl) {
    const mappedLine = mapLine(line);
    totalOverlap += compare(mappedLine);
  }
  console.log(totalOverlap);
  return totalOverlap;
}

function compare(obj) {
  // always overlap
  if (obj.first[0] === obj.second[0] || obj.first[1] === obj.second[1]) {
    return 1;
  }
  
  let one;
  let two;
  // always set the smaller number of the range to One
  if (obj.first[0] < obj.second[0]) {
    one = obj.first;
    two = obj.second;
  } else if (obj.first[0] > obj.second[0]) {
    two = obj.first;
    one = obj.second;
  }
  // then compare is the One[1] bigger then two[0]
  // first [1, 5] second [2, 7]
  // One[1] == 5 > Two[0] == 2, thus there is overlap
  if (one[1] >= two[0]) {
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
