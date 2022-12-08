let forest = [];
let result = 0;

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  forest.push(line.split(""));
});

// Read all lines
lineReader.on("close", function () {
  console.log("forest", forest);

  // iterate over the forest
  for (let i = 0; i < forest.length; i++) {
    for (let j = 0; j < forest[i].length; j++) {
      // edges
      if (
        i == 0 ||
        j == 0 ||
        i == forest.length - 1 ||
        j == forest[i].length - 1
      ) {
        result += 1;
        continue;
      }

      // get everything to left and right
      const treeHeight = forest[i][j];

      const left = forest[i].slice(0, j);
      const right = forest[i].slice(j + 1);
      const top = forest
        .filter((_, index) => index < i)
        .map((item, _) => item[j]);
      const bottom = forest
        .filter((_, index) => index > i)
        .map((item, _) => item[j]);

      if (
        left.every((x) => treeHeight > x) ||
        right.every((x) => treeHeight > x) ||
        bottom.every((x) => treeHeight > x) ||
        top.every((x) => treeHeight > x)
      ) {
        result += 1;
      }
    }
  }

  console.log("result", result);
});
