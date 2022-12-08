const cargo = [];

// Read file input.txt line by line
const lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("input.txt"),
});

// Read each line
lineReader.on("line", function (line) {
  if (line.includes("move")) {
    console.log("line", line);
    const [count, items] = line.replace("move", "").split("from");
    const [from, to] = items.split("to");
    console.log("count", count);
    console.log("range", from, to);

    const idxFrom = Number(from) - 1;
    const idxTo = Number(to) - 1;

    let iteratorCount = Number(count);
    while (iteratorCount) {
      const item = cargo[idxFrom].shift();
      cargo[idxTo].unshift(item);
      iteratorCount--;
    }
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
  console.log("Cargo: ", cargo);

  let result = "";

  cargo.forEach((stack) => {
    result += stack[0];
  });

  console.log("Result: " + result);
});
