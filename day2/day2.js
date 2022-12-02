const fs = require("fs");
const readline = require("readline");

function calculateScorePart1(arr) {
    // A X = rock 1      win 6
    // B Y = paper 2     lose 0
    // C Z = scissors 3  draw 3

    // if p1 use A/Rock
    if (arr[0] === 'A') {
        // draw
        if (arr[1] === 'X') return 1 + 3;
        if (arr[1] === 'Y') return 2 + 6;
        if (arr[1] === 'Z') return 3 + 0;
    }

    // if p1 use B/Paper
    if (arr[0] === 'B') {
        // draw
        if (arr[1] === 'X') return 1 + 0;
        if (arr[1] === 'Y') return 2 + 3;
        if (arr[1] === 'Z') return 3 + 6;
    }

    // if p1 use C/Scissors
    if (arr[0] === 'C') {
        // draw
        if (arr[1] === 'X') return 1 + 6;
        if (arr[1] === 'Y') return 2 + 0;
        if (arr[1] === 'Z') return 3 + 3;
    }
}

function calculateScorePart2(arr) {
    // A rock 1     X lose 0 
    // B paper 2    Y draw 3
    // C scissors 3 Z win 6

    // if p1 use A/Rock
    if (arr[0] === 'A') {
        // draw
        if (arr[1] === 'X') return 3 + 0; // me scissors
        if (arr[1] === 'Y') return 1 + 3; // me rock
        if (arr[1] === 'Z') return 2 + 6; // me paper
    }

    // if p1 use B/Paper
    if (arr[0] === 'B') {
        // draw
        if (arr[1] === 'X') return 1 + 0; // me rock
        if (arr[1] === 'Y') return 2 + 3; // me paper
        if (arr[1] === 'Z') return 3 + 6; // me scisccors
    }

    // if p1 use C/Scissors
    if (arr[0] === 'C') {
        // draw
        if (arr[1] === 'X') return 2 + 0; // me paper
        if (arr[1] === 'Y') return 3 + 3; // me scissors
        if (arr[1] === 'Z') return 1 + 6; // me rock
    }
}

async function getTotalScore() {
    const fileStream = fs.createReadStream("./day2/day2.txt");
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let total1 = 0;
    let total2 = 0;
    for await (const line of rl) {
        let arr = line.split(' ')
        total1 += calculateScorePart1(arr)
        total2 += calculateScorePart2(arr)
    }
    console.log({total1, total2})
  }

  getTotalScore()