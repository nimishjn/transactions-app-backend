const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, {});

mongoose.connection
  .once("open", () => {
    console.log("> dbInit.js - Connected to MongoDB.");
  })
  .on("error", (err) => {
    console.log("! dbInit.js - Error connecting to mongoDB:", err);
  });
