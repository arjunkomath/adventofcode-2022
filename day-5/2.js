// let limitMoves = 5;
const cargo = [];

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  // if (!limitMoves) {
  //   return true;
  // }

  if (line.includes("move")) {
    console.log("line", line);
    const [count, items] = line.replace("move", "").split("from");
    const [from, to] = items.split("to");
    console.log("count", count);
    console.log("range", from, to);

    const idxFrom = Number(from) - 1;
    const idxTo = Number(to) - 1;

    // console.log("Cargo: BEFORE");
    // cargo.forEach((stack, idx) => {
    //   console.log(`${idx + 1}: ${stack.join(" ")}`);
    // });

    let iteratorCount = Number(count);
    let itemsToMove = [];
    while (iteratorCount) {
      const item = cargo[idxFrom].shift();
      if (item) {
        itemsToMove.push(item);
      }
      iteratorCount--;
    }

    // console.log("itemsToMove", itemsToMove);

    cargo[idxTo] = [...itemsToMove, ...cargo[idxTo]];

    // console.log("Cargo: AFTER");
    // cargo.forEach((stack, idx) => {
    //   console.log(`${idx + 1}: ${stack.join(" ")}`);
    // });

    // limitMoves--;
  } else {
    // split line by spaces
    const stacks = line.split(" ");

    stacks.forEach((stack, idx) => {
      if (stack === "---") return true;

      if (!cargo[idx]) {
        cargo[idx] = [];
      }

      cargo[idx].push(stack.replace("[", "").replace("]", ""));
    });
  }
});

// Read all lines
lineReader.on("close", function () {
  let result = "";

  cargo.forEach((stack) => {
    result += stack[0];
  });

  console.log("Result: " + result);
});
