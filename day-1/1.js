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
  // Do something after reading all lines
  console.log("Done", Math.max(...calories));
});
