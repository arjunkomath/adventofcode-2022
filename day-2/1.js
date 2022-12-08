let score = 0;

// Opp: A for Rock, B for Paper, and C for Scissors.
// Me:  X for Rock, Y for Paper, and Z for Scissors.
const outcomeScoreMapping = {
  AZ: 0,
  AX: 3,
  AY: 6,

  BX: 0,
  BY: 3,
  BZ: 6,

  CY: 0,
  CZ: 3,
  CX: 6,
};

// 1 for Rock, 2 for Paper, and 3 for Scissors
const actionScoreMapping = {
  X: 1,
  Y: 2,
  Z: 3,
};

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  const [opponent, me] = line.split(" ");

  console.log("Opponent: ", opponent);
  console.log("Me: ", me);
  console.log("Outcome Score: ", outcomeScoreMapping[`${opponent}${me}`]);
  console.log("Action Score: ", actionScoreMapping[me]);

  score += outcomeScoreMapping[`${opponent}${me}`] + actionScoreMapping[me];
});

// Read all lines
lineReader.on("close", function () {
  console.log("Score: " + score);
});
