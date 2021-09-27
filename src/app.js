const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json()); // convert req.body into js object.
app.use(userRouter);
app.use(taskRouter);

app.get("", (req, res) => {
  res.send("Connected!");
});
module.exports = app;
