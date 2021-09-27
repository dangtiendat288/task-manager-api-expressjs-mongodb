const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  console.log(process.env.SG_API_KEY);
  console.log(process.env.JWT_SECRET_KEY);
  console.log(process.env.MONGODB_URL);
});
