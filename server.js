const express = require("express");
const app = express();
const dbConnection = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
dbConnection();
// app.get("/", (req, res) => {
//   res.send("Hello World 123!");
// });
app.use(router);
app.get("/", (req, res) => res.json({ message: "Hello world" }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
