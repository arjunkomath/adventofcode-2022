let currentIndex = 0;
const calories = [];

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  // check if line is newline
  if (line === "") {
    currentIndex += 1;
  }

  // add calories
  if (!calories[currentIndex]) calories[currentIndex] = 0;
  calories[currentIndex] += parseInt(line);
});

// Read all lines
lineReader.on("close", function () {
  // Top 3 items in calories
  const top3 = calories.sort((a, b) => b - a).slice(0, 3);
  console.log("Top 3", top3);
  // Sum of top 3 items
  const sum = top3.reduce((a, b) => a + b, 0);
  console.log("Top 3 sum", sum);
});
