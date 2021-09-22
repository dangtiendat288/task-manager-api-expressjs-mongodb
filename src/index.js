const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

app.use(express.json()); // convert req.body into js object.
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  console.log(process.env.SG_API_KEY);
  console.log(process.env.JWT_SECRET_KEY);
  console.log(process.env.MONGODB_URL);
});
