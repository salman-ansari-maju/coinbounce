const express = require("express");
const app = express();
const dbConnection = require("./database/index");
const PORT = require("./config/index");

dbConnection();
app.get("/", (req, res) => {
  res.send("Hello World123!");
});

app.get("/", (req, res) => res.json({ message: "Hello world" }));

app.listen(port, () => {
  console.log(`Example app listening on port ${PORT}`);
});
