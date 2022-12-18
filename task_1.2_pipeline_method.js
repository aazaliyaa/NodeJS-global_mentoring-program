import csvtojson from "csvtojson";
import fs from "fs";
import { pipeline } from "stream";

pipeline(
  fs.createReadStream("./csv/data.csv"),
  csvtojson(),
  fs.createWriteStream("./data.txt", "utf8"),
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("finished");
    }
  }
);
