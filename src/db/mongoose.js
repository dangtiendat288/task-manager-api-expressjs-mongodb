const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParse: true,
  // useCreateIndex: true,
});
