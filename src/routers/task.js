const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET /tasks?completed=false
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:asc
router.get("/tasks", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// router.get("/tasks", auth, async (req, res) => {
//   try {
//     await req.user.populate("tasks");
//     res.send(req.user.tasks);
//     // const tasks = await Task.find({ owner: req.user._id });
//     // res.send(tasks);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get("/tasks/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send("Not a valid update.");
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send("Task not found");
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(400).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
