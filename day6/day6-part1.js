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
  let counter = 0;
  while (store.length < 4) {
    // reset store
    store = [];

    // push store data
    const l1 = data[counter];
    const l2 = data[counter + 1];
    const l3 = data[counter + 2];
    const l4 = data[counter + 3];
    const check = [l1, l2, l3, l4];

    // check for unique
    store = check.filter((v, i, a) => a.indexOf(v) === i);

    counter++;
    console.log({ store, counter });
  }
  const answer = counter + 3;
  console.log({ answer });
  return answer;
}

findFirstMarkerLength();
