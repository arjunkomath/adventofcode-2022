let forest = [];

let highestScenicScore = 0;

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

      // console.log("tree height", treeHeight, `{${i}, ${j}}`);

      const scenicScore = [left.reverse(), right, top.reverse(), bottom].reduce(
        (acc, item, idx) => {
          return (
            acc *
            (filterUntil(item, (item) => item < treeHeight).length +
              (item.length !==
              filterUntil(item, (item) => item < treeHeight).length
                ? 1
                : 0))
          );
        },
        1
      );

      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }

  console.log("highestScenicScore", highestScenicScore);
});

// filter an array and stop at the first item that doesn't match the condition
function filterUntil(array, condition) {
  for (let i = 0; i < array.length; i++) {
    if (!condition(array[i])) {
      return array.slice(0, i);
    }
  }
  return array;
}
