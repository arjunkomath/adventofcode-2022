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

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  console.log("Line: ", line);

  const halfLength = line.length / 2;
  const firstCompartment = line.slice(0, halfLength);
  const secondCompartment = line.slice(halfLength);

  console.log("1st Compartment: ", firstCompartment);
  console.log("2nd Compartment: ", secondCompartment);

  // find common characters
  const commonCharacters = firstCompartment
    .split("")
    .filter((character) => secondCompartment.includes(character));

  // remove duplicates
  const uniqueCommonCharacters = [...new Set(commonCharacters)].pop();

  console.log("Common Characters: ", uniqueCommonCharacters);

  score += scores[uniqueCommonCharacters];
});

// Read all lines
lineReader.on("close", function () {
  console.log("Score: " + score);
});
