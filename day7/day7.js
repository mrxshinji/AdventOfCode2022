const fs = require("fs");
const readline = require("readline");

class Node {
  constructor(name) {
    this.name = name;
    this.value = 0;
    this.parent = null;
    this.children = [];
  }
}

async function getSpace() {
  const fileStream = fs.createReadStream("./day7/day7.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let data = [];
  for await (const line of rl) {
    data.push(line);
  }

  let store = new Node("/");

  // ------------------------ BUILD TREE ----------------------------------------
  // pointer
  let currentNode = store;
  currentNode.parent = null;
  for (let line of data) {
    let split = line.split(" ");
    if (split[0] === "$") {
      // pointer to children node
      if (split[1] === "cd" && split[2] !== "/" && split[2] !== "..") {
        currentNode = currentNode.children.find(
          (node) => node.name === split[2]
        );
      }
      if (split[1] === "cd" && split[2] === "..") {
        currentNode = currentNode.parent;
      }
      if (split[1] === "cd" && split[2] === "ls") {
        pass;
      }
    } else {
      // dir === create children
      if (split[0] === "dir") {
        let name = split[1];
        let temp = new Node(name);
        temp.parent = currentNode;
        currentNode.children.push(temp);
      }

      // if line start with number == add the value to the current pointer
      else {
        currentNode.value += parseInt(split[0]);
      }
    }
  }

  // ------------------------ Get storage Size ----------------------------------------
  // get sum of each dir value + children and store it to dirStore
  let dirStore = {};

  getSize(store, dirStore);

  // ------------------------------------ PART 1 ------------------------------------------
  // calculate sum of all directories less then
  const entries = Object.entries(dirStore).filter((item) => item[1] <= 100000);
  const answerPart1 = entries.reduce((a, b) => a + b[1], 0);
  console.log(answerPart1);

  // ------------------------------------ PART 2 ------------------------------------------

  const MAX_DISKSIZE = 70000000;
  const REQUIREMENT = 30000000;

  const currentRemaining = MAX_DISKSIZE - dirStore[`root_/`];
  const spaceToDelete = REQUIREMENT - currentRemaining;
  const entries2 = Object.entries(dirStore)
    .filter((item) => item[1] > spaceToDelete)
    .sort((a, b) => a[1] - b[1]);
  const answerPart2 = entries2[0];
  console.log(answerPart2);
  return { answerPart1, answerPart2 };
}

getSpace();

// ------------------------ Get storage Size ----------------------------------------
// to calculate each dir value and store it into object for post process recursively
// make sure no repeat of similar filename input using parent_child
function getSize(obj, dict) {
  let key = `${
    obj.parent === null ? `root_${obj.name}` : `${obj.parent.name}_${obj.name}`
  }`;
  if (obj.children.length === 0) {
    dict[key] = obj.value;
    return dict[key];
  } else {
    dict[key] =
      obj.value +
      obj.children
        .map((el) => {
          let children = getSize(el, dict);
          return children;
        })
        .reduce((a, b) => a + b, 0);

    return dict[key];
  }
}
