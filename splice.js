let dict = {
  1: ["a", "b", "c"],
  2: ["e", "f", "g"],
};

let quantity = 2;

let temp = dict[1].splice(dict[1].length - quantity, dict[1].length).concat(dict[2])

dict[2] = temp
console.log(dict);
