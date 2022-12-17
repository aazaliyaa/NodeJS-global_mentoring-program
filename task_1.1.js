process.stdin.on("data", (data) => {
  const arr = data.toString().split("");
  const reverseData = arr.reverse().join("");
  process.stdout.write(reverseData + "\n\n");
});
