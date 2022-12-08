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

  if (
    Math.max(Number(firstPairStart), Number(secondPairStart)) <=
    Math.min(Number(firstPairEnd), Number(secondPairEnd))
  ) {
    result++;
  }
});

// Read all lines
lineReader.on("close", function () {
  console.log("Result: " + result);
});
