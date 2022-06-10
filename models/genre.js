const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

const Genre = mongoose.model("genres", genreSchema);

module.exports = Genre;
