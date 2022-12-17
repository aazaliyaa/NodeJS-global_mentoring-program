const csvtojson = require("csvtojson");
const fs = require("fs");

const rStream = fs.createReadStream("./csv/data.csv");
const wStream = fs.createWriteStream("./data.txt", "utf8");

rStream.pipe(csvtojson()).pipe(wStream);

rStream.on("error", (error) => {
  console.error(error.message);
});

wStream.on("error", (error) => {
  console.error(error.message);
});
