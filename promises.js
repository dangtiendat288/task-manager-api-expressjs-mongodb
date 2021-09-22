// const add = (a, b) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(a + b);
//     }, 2000);
//   });
// };

// add(2, 3)
//   .then((sum) => {
//     console.log(sum);
//     return add(sum, 4);
//   })
//   .then((sum2) => {
//     console.log(sum2);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const User = require("./src/models/user");
const Task = require("./src/models/task");

require("./src/db/mongoose");

// User.find({}).then((users) => {
//   console.log(users);
// });

// Task.findByIdAndRemove("613b3202413438ea9fb71374")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCountUncompletedTask = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCountUncompletedTask("613acf6b3fb6509c577d19a1").then((count) => {
  console.log(count);
});

// User.findByIdAndUpdate("613adb7762d5e16dcf48930d", { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log("Count", result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const updateAgeAndCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, {
//     age,
//   });
//   const count = await User.countDocuments({ age: 1 });

//   return count;
// };

// updateAgeAndCount("613adb7762d5e16dcf48930d", 1).then((count) => {
//   console.log(count);
// });
