const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Lem",
  email: "lembebi@gmail.com",
  password: "aaaaaaaa!",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET_KEY) }],
};
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Dat",
  email: "dat@gmail.com",
  password: "baaaaaaa!",
  tokens: [{ token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET_KEY) }],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task 1",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task 2",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task 3",
  completed: true,
  owner: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();

  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
  userTwoId,
  userTwo,
  taskOne,
};
