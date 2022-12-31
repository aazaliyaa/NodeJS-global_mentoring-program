import { createServer } from "http";
import express, { json } from "express";

const app = express();
app.use(json());

// default URL to API
app.use("/", function (req, res) {
  res.send("node-ex-api works :-)");
});

const server = createServer(app);
const port = 3000;
server.listen(port);

console.debug("Server listening on port " + port);
