const request = require("supertest");
const Task = require("../src/models/task");
const app = require("../src/app");
const {
  userOneId,
  userOne,
  setupDatabase,
  taskOne,
  userTwo,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ description: "This is my new task!" })
    .expect(201);

  //   console.log(response.body);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBe(false);
});

test("Should return all tasks for userOne", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test("Should not delete other users' tasks", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400);

  const task = Task.findById(taskOne._id);

  expect(task).not.toBeNull();
});
