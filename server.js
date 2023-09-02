const express = require("express");
const app = express();
const dbConnection = require("./database/index");
const { PORT } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

dbConnection();
// app.get("/", (req, res) => {
//   res.send("Hello World 123!");
// });

// Express middleware to send and recived data in JSON

app.use(express.json());
app.use(router);
app.get("/", (req, res) => res.json({ message: "Hello world" }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
