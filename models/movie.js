const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    releaseDate: {
      type: Date,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genres",
    },
  },
  { versionKey: false }
);

const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;
