const fs = require("fs");
const readline = require("readline");

async function getTotalScore() {
  const fileStream = fs.createReadStream("./day3/test.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let prioritySum = 0;
  for await (const line of rl) {
    const splitMap = splitString(line);
    prioritySum += compare(splitMap);
  }
  console.log(prioritySum);
  return prioritySum;
}

//compare function
function compare(object) {
  // convert first compartment into dictionary
  let firstDict = {};
  object.first.forEach((el) => (firstDict[el] = true));

  // compare second compartment to firstDict
  // assumed no more then 1 item has 2 similar item
  let priorityScore = 0;
  object.second.forEach((el) => {
    if (firstDict[el] === true) {
      priorityScore = convertLetterToPriority(el);
      return;
    }
  });
  return priorityScore;
}

// split string into 2 comparment using substring method
function splitString(string) {
  const first = string
    .substring(0, string.length / 2)
    .split("")

  const second = string
    .substring(string.length / 2, string.length)
    .split("")

  return {
    first,
    second,
  };
}

// convert letter to priority score
// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
function convertLetterToPriority(letter) {
  // lowercase
  if (/[a-z]/.test(letter)) {
    return letter.charCodeAt() - 96;
  }
  // uppercase
  else if (/[A-Z]/.test(letter)) {
    return letter.charCodeAt() - 64 + 26;
  } else {
    return 0;
  }
}

getTotalScore();
