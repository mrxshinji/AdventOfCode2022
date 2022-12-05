const fs = require("fs");
const readline = require("readline");

async function getHighestOfStack() {
  const fileStream = fs.createReadStream("./day5/day5.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let arr = [];
  for await (const line of rl) {
    arr.push(line);
  }

  // determine number of stack and create a dict from 1 - N with value of []
  const numberOfStack = (arr[0].length - 1 - 2) / 4 + 1;
  let dict = {};
  for (let i = 1; i <= numberOfStack; i++) {
    dict[i] = [];
  }
  // return { key of 1 to n : []}

  // loop through until meet digit and stop
  // digit always start from line[1] and + 4 from there, push each digit into the array dict
  for (line of arr) {
    if (!/[0-9]/g.test(line)) {
      for (let i = 1, j = 1; i < line.length; i += 4, j++) {
        if (line[i] !== " ") dict[j].push(line[i]);
      }
    }
  }
  // return { '1': [ 'N', 'Z' ], '2': [ 'D', 'C', 'M' ], '3': [ 'P' ] }

  //reverse each key to enact the scenario
  for (const [key] of Object.entries(dict)) {
    dict[key].reverse();
  }
  // return { '1': [ 'Z', 'N' ], '2': [ 'M', 'C', 'D' ], '3': [ 'P' ] } and its ready to move

  // move part
  for (line of arr) {
    if (/move/.test(line)) {
      // quantity , from stack , to stack = [i, j, k]
      let extract = line
        .split(" ")
        .filter((letter) => typeof letter === "number")
        .map((el) => parseInt(el));
      let quantity = extract[0],
        from = extract[1],
        to = extract[2];

      // reverse using temp stack and combination of pop and push
      let temp = [];
      for (let i = 0; i < quantity; i++) {
        temp.push(dict[from].pop());
      }
      for (let i = 0; i < quantity; i++) {
        dict[to].push(temp.pop());
      }
    }
  }
  console.log(dict);
}

getHighestOfStack();

//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3
