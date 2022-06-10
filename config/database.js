const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async (connection) => {
    console.log("Connection successful!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });
