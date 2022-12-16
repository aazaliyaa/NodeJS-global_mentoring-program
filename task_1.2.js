const csv = require("csvtojson");
const fs = require("fs");

const csvFilePath = "./csv/data.csv";

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    let data = JSON.stringify(jsonObj);
    fs.writeFileSync("data.txt", data);
  });
