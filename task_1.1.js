process.stdin.on("data", (data) => {
  const arr = data.toString().split("");
  const reversedData = arr.reverse().join("");
  process.stdout.write(reversedData + "\n\n");
});
