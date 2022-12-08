let score = 0;

// Lowercase item types a through z have priorities 1 through 26.
const priorities = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .reduce((acc, item, index) => {
    acc[item] = index + 1;
    return acc;
  }, {});

// Uppercase item types A through Z have priorities 27 through 52.
const priorities2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  .split("")
  .reduce((acc, item, index) => {
    acc[item] = index + 27;
    return acc;
  }, {});

const scores = { ...priorities, ...priorities2 };

const lines = [];

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  lines.push(line);
});

// Read all lines
lineReader.on("close", function () {
  // group lines by 3
  const groupedLines = lines.reduce((acc, line, index) => {
    if (index % 3 === 0) {
      acc.push([]);
    }

    acc[acc.length - 1].push(line);

    return acc;
  }, []);

  // iterate over each group of 3 lines
  groupedLines.forEach((group) => {
    const [one, two, three] = group;
    // find common charecter in one two and three
    const common = one
      .split("")
      .find((char) => two.includes(char) && three.includes(char));

    score += scores[common];
  });

  console.log("Score: " + score);
});
