const fs = require("fs");
const readline = require("readline");

async function getTotalScore() {
  const fileStream = fs.createReadStream("./day3/day3.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // get arr from each line
  let arr = [];
  for await (const line of rl) {
    arr.push(line);
  }

  // tabulate score while pop from the line array
  let prioritySum = 0;
  while (arr.length > 2) {
    let group = {
      first: mapString(arr.pop()),
      second: mapString(arr.pop()),
      third: mapString(arr.pop()),
    };
    prioritySum += compare(group);
  }

  console.log(prioritySum);
  return prioritySum;
}

// compare function
function compare(object) {
  // convert first compartment into dictionary
  // place all item as false
  let dict = {};
  let priorityScore = 0;
  object.first.forEach((item) => (dict[item] = false));
  // compare second compartment to dict
  // detect specific key and turn its value to true
  object.second.forEach((item) => {
    if (dict[item] === false) {
      dict[item] = true;
    }
  });

  // if any item in third compare with dict has a true, will return priorityScore
  object.third.forEach((item) => {
    if (dict[item] === true) {
      priorityScore = convertLetterToPriority(item);
      return priorityScore;
    }
  });

  // if fail
  return null;
}

// map function
function mapString(string) {
  return string.split("").filter((v, i, a) => a.indexOf(v) === i);
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
