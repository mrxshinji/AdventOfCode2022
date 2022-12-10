const fs = require("fs");
const readline = require("readline");

async function findFirstMarkerLength() {
  const fileStream = fs.createReadStream("./day10/test.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let currentX = 1;
  let sumArr = [];
  for await (const line of rl) {
    let split = line.split(" ");
    let command = split[0];
    let value = split[1];

    if (command === "addx") {
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          sumArr.push(currentX);
        } else if (i === 1) {
          sumArr.push(currentX);
          currentX += parseInt(value);
        }
      }
    } else if (command === "noop") {
      sumArr.push(currentX);
    }
  }

  console.log(sumArr)

  const partOneArr = [];
  partOneArr.push(sumArr[19] * 20);
  partOneArr.push(sumArr[59] * 60);
  partOneArr.push(sumArr[99] * 100);
  partOneArr.push(sumArr[139] * 140);
  partOneArr.push(sumArr[179] * 180);
  partOneArr.push(sumArr[219] * 220);

  const ansPart1 = partOneArr.reduce((a, b) => a + b, 0);
  console.log(ansPart1);

  
}
findFirstMarkerLength();
