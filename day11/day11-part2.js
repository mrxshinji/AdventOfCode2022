const fs = require("fs");
const readline = require("readline");

class Monkey {
  // name, symbol, number, testValue, trueMonkeyKey, falseMonkeyKey
  constructor() {
    this.name = "";
    this.startingItems = [];
    this.symbol = "";
    this.operationNumber = 0;
    this.testValue = 0;
    this.trueMonkeyKey = 0;
    this.falseMonkeyKey = 0;
    this.inspected = 0;
  }
}

async function findFirstMarkerLength() {
  const fileStream = fs.createReadStream("./day11/day11.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const data = [];
  for await (const line of rl) {
    let mappedLine = line.split(" ").filter((el) => el !== "");
    data.push(mappedLine);
  }

  const store = mappedData(data);
  const ROUND = 10000;

  const newStore = itemShuffle(store, ROUND);
  console.log(newStore);
  const inspectedTimes = Object.values(newStore)
    .map((el) => el.inspected)
    .sort((a, b) => b - a);

  const ansPart2 = inspectedTimes[0] * inspectedTimes[1];
  console.log(ansPart2);
}

findFirstMarkerLength();

const getNumberFromArr = (arr) => {
  let numbers = arr.map((el) => parseInt(el)).filter((el) => el >= 0);
  return numbers;
};

const mappedData = (data) => {
  let key = 0;
  let store = {};
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "Monkey") {
      key = parseInt(data[i][1]);
      store[key] = new Monkey();
      store[key].name = key;
    }
    if (data[i][0] === "Starting") {
      let items = getNumberFromArr(data[i]);
      store[key].startingItems = store[key].startingItems.concat(items);
      store[key].inspected += items.length;
    }
    if (data[i][0] === "Operation:") {
      store[key].symbol = data[i][4];
      store[key].operationNumber = getNumberFromArr(data[i])[0];
    }
    if (data[i][0] === "Test:") {
      store[key].testValue = getNumberFromArr(data[i])[0];
    }
    if (data[i][1] === "true:") {
      store[key].trueMonkeyKey = getNumberFromArr(data[i])[0];
    }
    if (data[i][1] === "false:") {
      store[key].falseMonkeyKey = getNumberFromArr(data[i])[0];
    }
  }
  return store;
};

const operation = (old, symbol, operationNumber) => {
  let value = 0;
  if (operationNumber > 0) {
    value = operationNumber;
  } else {
    value = old;
  }
  switch (symbol) {
    case "*":
      return old * value;
    case "+":
      return old + value;
    default:
      return old;
  }
};

const itemShuffle = (store, ROUND) => {
  const numberofMonkeys = Object.keys(store).length;
  const reducer = Object.values(store)
    .map((el) => el.testValue)
    .reduce((a, b) => a * b, 1);
  // shuffle per Round
  for (let i = 0; i < ROUND; i++) {
    // Worry level calculation
    for (let k = 0; k < numberofMonkeys; k++) {
      // add worry level and then // 3 , reverse for more optimized throwing FIFO
      const current = store[k];
      current.startingItems = current.startingItems
        .map((el) => {
          return (
            operation(el, current.symbol, current.operationNumber) % reducer
          );
        })
        .reverse();

      // throw bag
      for (let item = current.startingItems.length - 1; item >= 0; item--) {
        const divisible = current.startingItems[item] % current.testValue;
        if (divisible === 0) {
          store[current.trueMonkeyKey].startingItems.push(
            current.startingItems.pop()
          );
          store[current.trueMonkeyKey].inspected++;
        } else {
          store[current.falseMonkeyKey].startingItems.push(
            current.startingItems.pop()
          );
          store[current.falseMonkeyKey].inspected++;
        }
      }
    }
  }

  // reduce overInspected (round not pass yet)
  for (let key = 0; key < numberofMonkeys; key++) {
    store[key].inspected =
      store[key].inspected - store[key].startingItems.length;
  }

  return store;
};
