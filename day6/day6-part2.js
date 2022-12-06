const fs = require("fs");
const readline = require("readline");

async function findFirstMarkerLength() {
  const fileStream = fs.createReadStream("./day6/day6.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let data = "";
  for await (const line of rl) {
    data = line;
  }

  let store = [];
  let initial = {};
  let counter = 0;
  while (store.length < 14 && counter < data.length) {
    // reset store
    store = [];

    // if counter === 0
    if (counter === 0) {
      for (let i = 0; i < 14; i++) {
        initial[i] = data[i];
      }
    } else {
      delete initial[counter - 1];
      initial[counter + 13] = data[counter + 13];
    }

    // check for unique
    store = Object.values(initial).filter((v, i, a) => a.indexOf(v) === i);

    counter++;
    console.log({ store, counter });
  }
  const answer = counter + 13;
  console.log({ answer });
  return answer;
}

findFirstMarkerLength();
