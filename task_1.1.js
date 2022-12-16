process.stdin.on("data", (data) => {
  arr = data.toString().split("");
  data = arr.reverse().join("");
  process.stdout.write(data + "\n\n");
});
