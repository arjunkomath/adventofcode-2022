let result = 0;

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  const [firstPair, secondPair] = line.split(",");

  const [firstPairStart, firstPairEnd] = firstPair.split("-");
  const [secondPairStart, secondPairEnd] = secondPair.split("-");

  // check if first pair fits in second pair
  if (
    Number(firstPairStart) >= Number(secondPairStart) &&
    Number(firstPairStart) <= Number(secondPairEnd) &&
    Number(firstPairEnd) >= Number(secondPairStart) &&
    Number(firstPairEnd) <= Number(secondPairEnd)
  ) {
    result++;
    console.log("First pair fits in second pair", firstPair, secondPair);
  } else if (
    Number(secondPairStart) >= Number(firstPairStart) &&
    Number(secondPairStart) <= Number(firstPairEnd) &&
    Number(secondPairEnd) >= Number(firstPairStart) &&
    Number(secondPairEnd) <= Number(firstPairEnd)
  ) {
    result++;
    console.log("Second pair fits in first pair", firstPair, secondPair);
  }
});

// Read all lines
lineReader.on("close", function () {
  console.log("Result: " + result);
});
